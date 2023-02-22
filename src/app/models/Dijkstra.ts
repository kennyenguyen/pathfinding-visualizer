import { Stack } from "stack-typescript";
import { Algorithm } from "./Algorithm";
import { MatrixNode } from "./MatrixNode";
import { Visualize } from "./Visualize";

enum state {
    empty = 0,
    wall = 1,
    start = 2,
    end = 3,
    visited = 4,
    shortestPath = 5,
    weight = 6
}

export class Dijkstra extends Algorithm {

    constructor(matrix: MatrixNode[][], visualize: Visualize) {
        super(matrix, visualize);
    }

    public DijkstraAlgo(isMoveNode?: boolean) {

        let m = this.matrix.length;
        let n = this.matrix[0].length;
        let node_list_shortest = new Array<MatrixNode>();
        let node_list_visited = new Array<MatrixNode>();
        let start_node = this.findStartNode();
        let q = new Set<MatrixNode>();
        let dist = new Array<Array<number>>();
        let prev = new Array<Array<MatrixNode>>();

        for (let i = 0; i < m; i++) {
            let rowDist = new Array<number>();
            let rowPrev = new Array<MatrixNode>();
            for (let j = 0; j < n; j++) {
                rowDist.push(Number.MAX_SAFE_INTEGER);
                rowPrev.push(undefined);
            }
            dist.push(rowDist);
            prev.push(rowPrev);
        }

        q = this.createSet();
        q.add(this.matrix[start_node.row][start_node.col])

        dist[start_node.row][start_node.col] = 0;

        while (q.size > 0) {

            let u = this.minDistance(q, dist);

            q.delete(u);

            // up
            if (u.row - 1 >= 0 && this.matrix[u.row - 1][u.col].state != state.wall && this.isInSet(q, this.matrix[u.row - 1][u.col])) {
                let alt = dist[u.row][u.col] + this.matrix[u.row - 1][u.col].value;
                if (dist[u.row - 1][u.col] > alt) {
                    dist[u.row - 1][u.col] = alt;
                    prev[u.row - 1][u.col] = u;
                }
            }

            // down
            if (u.row + 1 < m && this.matrix[u.row + 1][u.col].state != state.wall && this.isInSet(q, this.matrix[u.row + 1][u.col])) {
                let alt = dist[u.row][u.col] + this.matrix[u.row + 1][u.col].value;
                if (dist[u.row + 1][u.col] > alt) {
                    dist[u.row + 1][u.col] = alt;
                    prev[u.row + 1][u.col] = u;
                }
            }

            // left
            if (u.col - 1 >= 0 && this.matrix[u.row][u.col - 1].state != state.wall && this.isInSet(q, this.matrix[u.row][u.col - 1])) {
                let alt = dist[u.row][u.col] + this.matrix[u.row][u.col - 1].value;
                if (dist[u.row][u.col - 1] > alt) {
                    dist[u.row][u.col - 1] = alt;
                    prev[u.row][u.col - 1] = u;
                }
            }

            // right
            if (u.col + 1 < n && this.matrix[u.row][u.col + 1].state != state.wall && this.isInSet(q, this.matrix[u.row][u.col + 1])) {
                let alt = dist[u.row][u.col] + this.matrix[u.row][u.col + 1].value;
                if (dist[u.row][u.col + 1] > alt) {
                    dist[u.row][u.col + 1] = alt;
                    prev[u.row][u.col + 1] = u;
                }
            }

            if (this.matrix[u.row][u.col].state == state.end) {
                this.reachedEnd = true;
                node_list_shortest = this.getShortestPath(u, prev);
                break;
            }

            if (this.matrix[u.row][u.col].state != state.start) {
                node_list_visited.push(this.matrix[u.row][u.col]);
            }

        }

        if (isMoveNode == true) {
            this.drawVisitedForMove(node_list_visited);
            this.drawShortestPathForMove(node_list_shortest);
            this.visualize.canVisualize = true;
        } else {
            Promise.all([this.drawVisited(node_list_visited, 100), this.drawShortestPath(node_list_shortest, 100), this.switchButton(100)]);
        }

    }

    public minDistance(q: Set<MatrixNode>, dist: Array<Array<number>>) {
        let min = <MatrixNode>q.values().next().value;
        q.forEach(element => {
            if (dist[min.row][min.col] > dist[element.row][element.col]) {
                min = element;
            }
        });
        return min;
    }

    public isInSet(q: Set<MatrixNode>, v: MatrixNode) {
        let res = false;
        q.forEach(element => {
            if (v.row == element.row && v.col == element.col) {
                res = true;
            }
        });
        return res;
    }

    public getShortestPath(u: MatrixNode, prev: MatrixNode[][]) {
        let shortest = new Array<MatrixNode>();
        let parent = prev[u.row][u.col];
        while (parent != this.findStartNode()) {
            shortest.push(parent);
            if (parent != undefined) {
                parent = prev[parent.row][parent.col];
            }
        }
        return shortest.reverse();
    }

    public createSet() {
        
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        let node_list = new Set<MatrixNode>();
        let visited = new Array<Array<boolean>>();

        for (let i = 0; i < m; i++) {
            let row = new Array<boolean>();
            for (let j = 0; j < n; j++) {
                row.push(false);
            }
            visited.push(row);
        }

        let string_stack = new Stack<string>();
        let start_node = this.findStartNode();

        string_stack.push(start_node.row + ',' + start_node.col);

        while (string_stack.size > 0) {

            let x = string_stack.pop();
            let row = +x.split(',')[0];
            let col = +x.split(',')[1];

            if (row < 0 || col < 0 || row >= m || col >= n || visited[row][col] || this.matrix[row][col].state == state.wall) {
                continue;
            }

            visited[row][col] = true;

            if (row != start_node.row || col != start_node.col) {
                node_list.add(this.matrix[row][col]);
            }

            string_stack.push((row - 1) + ',' + col); // up
            string_stack.push((row + 1) + ',' + col); // down
            string_stack.push(row + ',' + (col - 1)); // left
            string_stack.push(row + ',' + (col + 1)); // right

        }

        return node_list;

    }

}
