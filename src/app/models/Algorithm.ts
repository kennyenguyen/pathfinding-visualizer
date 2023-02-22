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

export class Algorithm {

    public matrix: MatrixNode[][];
    public reachedEnd: boolean;
    public visualize: Visualize;

    constructor(matrix: MatrixNode[][], visualize: Visualize) {
        this.matrix = matrix;
        this.reachedEnd = false;
        this.visualize = visualize;
    }

    public findStartNode() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                if (this.matrix[i][j].state == state.start) {
                    return this.matrix[i][j];
                }
            }
        }
    }

    public findEndNode() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                if (this.matrix[i][j].state == state.end) {
                    return this.matrix[i][j];
                }
            }
        }
    }

    async switchButton(ms: number) {
        return setTimeout(() => {this.visualize.canVisualize = true;}, ms);
    }

    async drawVisited(node_list: Array<MatrixNode>, ms: number) {
        node_list.forEach(element => {
            setTimeout(() => {
                this.matrix[element.row][element.col].state = state.visited;
            }, ms);
        });
    }

    async drawShortestPath(node_list: Array<MatrixNode>, ms: number) {
        if (this.reachedEnd) {
            node_list.forEach(element => {
                setTimeout(() => {
                    this.matrix[element.row][element.col].state = state.shortestPath;
                }, ms);
            });
        }
    }

    drawVisitedForMove(node_list: Array<MatrixNode>) {
        node_list.forEach(element => {
            this.matrix[element.row][element.col].state = state.visited;
        });
    }

    drawShortestPathForMove(node_list: Array<MatrixNode>) {
        if (this.reachedEnd) {
            node_list.forEach(element => {
                this.matrix[element.row][element.col].state = state.shortestPath;
            });
        }
    }

}
