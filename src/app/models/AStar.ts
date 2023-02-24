import { Algorithm } from "./Algorithm";
import { AStarNode } from "./AStarNode";
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

export class AStar extends Algorithm {

    constructor(matrix: MatrixNode[][], visualize: Visualize) {
        super(matrix, visualize);
    }

    public AStarAlgo(isMoveNode?: boolean) {

        let m = this.matrix.length;
        let n = this.matrix[0].length;
        let node_list_shortest = new Array<MatrixNode>();
        let node_list_visited = new Array<MatrixNode>();
        let start_node = new AStarNode(undefined, this.findStartNode());
        let yet_to_visit_list = new Array<AStarNode>();
        let visited_list = new Array<AStarNode>();
        let move_row = [-1, 0, 1, 0];
        let move_col = [0, -1, 0, 1];

        yet_to_visit_list.push(start_node);

        while (yet_to_visit_list.length > 0) {

            let curr_node = yet_to_visit_list[0];
            let curr_index = 0;

            for (let i = 0; i < yet_to_visit_list.length; i++) {
                if (yet_to_visit_list[i].f < curr_node.f) {
                    curr_node = yet_to_visit_list[i];
                    curr_index = i;
                }
            }

            yet_to_visit_list.splice(curr_index, 1);
            visited_list.push(curr_node);

            // reached the end
            if (curr_node.node.state == state.end) {
                this.reachedEnd = true;
                node_list_shortest = this.getShortestPath(curr_node);
                break;
            }

            let children = Array<AStarNode>();

            for (let i = 0; i < 4; i++) {
                let node_row = curr_node.node.row + move_row[i];
                let node_col = curr_node.node.col + move_col[i];
                if (node_row < 0 || node_col < 0 || node_row >= m || node_col >= n || this.matrix[node_row][node_col].state == state.wall) {
                    continue;
                }
                let new_node = new AStarNode(curr_node, this.matrix[node_row][node_col]);
                children.push(new_node);
            }

            for (let i = 0; i < children.length; i++) {
                if (this.isInList(visited_list, children[i])) {
                    continue;
                }
                children[i].g = curr_node.g + children[i].node.value;
                children[i].h = this.manhattanDistance(children[i].node);
                children[i].f = children[i].g + children[i].h;
                if (this.isInList(yet_to_visit_list, children[i])) {
                    continue;
                }
                yet_to_visit_list.push(children[i]);
            }

        }

        visited_list.forEach(element => {
            if (element.node.state != state.start && element.node.state != state.end) {
                node_list_visited.push(element.node);
            }
        });

        if (isMoveNode == true) {
            this.drawVisitedForMove(node_list_visited);
            this.drawShortestPathForMove(node_list_shortest);
            this.visualize.canVisualize = true;
        } else {
            Promise.all([this.drawVisited(node_list_visited, 100), this.drawShortestPath(node_list_shortest, 100), this.switchButton(100)]);
        }

    }

    public manhattanDistance(curr_node: MatrixNode) {
        let end_node = this.findEndNode();
        return Math.abs(curr_node.row - end_node.row) + Math.abs(curr_node.col - end_node.col);
    }

    public isInList(list: Array<AStarNode>, node: AStarNode) {
        let res = false;
        list.forEach(element => {
            if (element.node.row == node.node.row && element.node.col == node.node.col) {
                res = true;
            }
        });
        return res;
    }

    public getShortestPath(node: AStarNode) {
        let shortest = new Array<MatrixNode>();
        let parent = node.parent;
        while (parent.node != this.findStartNode()) {
            shortest.push(parent.node);
            if (parent != undefined) {
                parent = parent.parent;
            }
        }
        return shortest.reverse();
    }

}
