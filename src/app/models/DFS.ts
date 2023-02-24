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
    shortestPath = 5
}

export class DFSAlgorithm extends Algorithm {

    constructor(matrix: MatrixNode[][], visualize: Visualize) {
        super(matrix, visualize);
    }

    public DFSAlgo(isMoveNode?: boolean) {

        let m = this.matrix.length;
        let n = this.matrix[0].length;
        let node_list = new Array<MatrixNode>();
        let visited = new Array<Array<boolean>>();

        // initialize visited
        for (let i = 0; i < m; i++) {
            let row = new Array<boolean>();
            for (let j = 0; j < n; j++) {
                row.push(false);
            }
            visited.push(row);
        }

        let string_stack = new Stack<string>();
        let start_node = this.findStartNode();
        let end_node = this.findEndNode();
        string_stack.push(start_node.row + ',' + start_node.col);

        while (string_stack.size > 0) {

            let x = string_stack.pop();
            let row = +x.split(',')[0];
            let col = +x.split(',')[1];
            
            if (row < 0 || col < 0 || row >= m || col >= n || visited[row][col] || this.matrix[row][col].state == state.wall) {
                continue;
            }

            if (row == end_node.row && col == end_node.col) {
                this.reachedEnd = true;
                break;
            }

            visited[row][col] = true;

            if (row == start_node.row && col == start_node.col) {
                this.matrix[row][col].state = state.start;
                this.matrix[row][col].value = 1;
            } else {
                node_list.push(this.matrix[row][col]);
            }

            string_stack.push(row + ',' + (col - 1)); // add left neighbor to stack
            string_stack.push(row + ',' + (col + 1)); // add right neighbor to stack
            string_stack.push((row - 1) + ',' + col); // add up neighbor to stack
            string_stack.push((row + 1) + ',' + col); // add down neighbor to stack
            
        }

        if (isMoveNode == true) {
            this.drawVisitedForMove(node_list);
            this.drawShortestPathForMove(node_list);
            this.visualize.canVisualize = true;
        } else {
            Promise.all([this.drawVisited(node_list, 100), this.drawShortestPath(node_list, 100), this.switchButton(100)]);
        }

    }

}
