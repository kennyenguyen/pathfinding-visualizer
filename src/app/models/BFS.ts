import { Queue } from "queue-typescript";
import { Algorithm } from "./Algorithm";
import { MatrixNode } from "./MatrixNode";
import { QItem } from "./QItem";
import { Visualize } from "./Visualize";

enum state {
    empty = 0,
    wall = 1,
    start = 2,
    end = 3,
    visited = 4,
    shortestPath = 5
}

export class BFSAlgorithm extends Algorithm {

    constructor(matrix: MatrixNode[][], visualize: Visualize) {
        super(matrix, visualize);
    }

    public BFSAlgo(isMoveNode?: boolean) {

        // this.matrix[1][1].value;
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        let node_list_shortest = new Array<MatrixNode>();
        let node_list_visited = new Array<MatrixNode>();
        let visited = new Array<Array<boolean>>();
        let source = new QItem();
        source.row = this.findStartNode().row;
        source.col = this.findStartNode().col;
        source.distance = 0;
        source.shortestPath = new Array<MatrixNode>();

        for (let i = 0; i < m; i++) {
            let row = new Array<boolean>();
            for (let j = 0; j < n; j++) {
                if (this.matrix[i][j].state == state.wall) {
                    row.push(true);
                } else {
                    row.push(false);
                }
            }
            visited.push(row);
        }

        let q = new Queue<QItem>();
        q.enqueue(source);
        visited[source.row][source.col] = true;

        while (q.length > 0) {
            let p = q.dequeue();

            if (this.matrix[p.row][p.col].state == state.end) {
                this.reachedEnd = true;
                node_list_shortest = p.shortestPath.slice(0, p.shortestPath.length - 1);
                break;
            }

            if (this.matrix[p.row][p.col].state != state.start && this.matrix[p.row][p.col].state != state.end) {
                node_list_visited.push(this.matrix[p.row][p.col]);
            }

            // up
            if (p.row - 1 >= 0 && visited[p.row - 1][p.col] == false) {
                let curr = new QItem();
                curr.row = p.row - 1;
                curr.col = p.col;
                curr.distance = p.distance + 1;
                curr.shortestPath = new Array<MatrixNode>();
                curr.shortestPath = curr.shortestPath.concat(p.shortestPath, [this.matrix[p.row - 1][p.col]])
                q.enqueue(curr);
                visited[p.row - 1][p.col] = true;
            }

            // down
            if (p.row + 1 < visited.length && visited[p.row + 1][p.col] == false) {
                let curr = new QItem();
                curr.row = p.row + 1;
                curr.col = p.col;
                curr.distance = p.distance + 1;
                curr.shortestPath = new Array<MatrixNode>();
                curr.shortestPath = curr.shortestPath.concat(p.shortestPath, [this.matrix[p.row + 1][p.col]])
                q.enqueue(curr);
                visited[p.row + 1][p.col] = true;
            }

            // left
            if (p.col - 1 >= 0 && visited[p.row][p.col - 1] == false) {
                let curr = new QItem();
                curr.row = p.row;
                curr.col = p.col - 1;
                curr.distance = p.distance + 1;
                curr.shortestPath = new Array<MatrixNode>();
                curr.shortestPath = curr.shortestPath.concat(p.shortestPath, [this.matrix[p.row][p.col - 1]])
                q.enqueue(curr);
                visited[p.row][p.col - 1] = true;
            }

            // right
            if (p.col + 1 < visited[0].length && visited[p.row][p.col + 1] == false) {
                let curr = new QItem();
                curr.row = p.row;
                curr.col = p.col + 1;
                curr.distance = p.distance + 1;
                curr.shortestPath = new Array<MatrixNode>();
                curr.shortestPath = curr.shortestPath.concat(p.shortestPath, [this.matrix[p.row][p.col + 1]])
                q.enqueue(curr);
                visited[p.row][p.col + 1] = true;
            }

            if (isMoveNode == true) {
                this.drawVisitedForMove(node_list_visited);
                this.drawShortestPathForMove(node_list_shortest);
                this.visualize.canVisualize = true;
            } else {
                Promise.all([this.drawVisited(node_list_visited, 100), this.drawShortestPath(node_list_shortest, 100), this.switchButton(100)]);
            }
            
        }

    }

}
