import { Component, OnInit } from '@angular/core';
import { MatrixNode } from 'src/app/models/MatrixNode';
import { Visualize } from 'src/app/models/Visualize';

enum state {
    empty = 0,
    wall = 1,
    start = 2,
    end = 3,
    visited = 4,
    shortestPath = 5,
    weight = 6
}

enum algo {
    DFS = 0,
    BFS = 1,
    Dijkstra = 2,
    AStar = 3
}

@Component({
    selector: 'app-matrixgrid',
    templateUrl: './matrixgrid.component.html',
    styleUrls: ['./matrixgrid.component.css']
})
export class MatrixgridComponent implements OnInit {

    matrix: MatrixNode[][];
    isClicked: boolean;
    isStartClick: boolean;
    isEndClick: boolean;
    reachedEnd: boolean;
    choseAlgo: boolean;
    addWeight: boolean;
    algorithm: number;
    algorithmNames: string[];
    visualize: Visualize;

    constructor() {

        this.matrix = new Array<Array<MatrixNode>>();
        this.isClicked = false;
        this.isStartClick = false;
        this.isEndClick = false;
        this.reachedEnd = false;
        this.choseAlgo = false;
        this.addWeight = false;
        this.algorithm = algo.DFS;
        this.algorithmNames = ["DFS", "BFS", "Dijkstra", "AStar"];
        this.visualize = new Visualize();
        this.visualize.canVisualize = true;

        for (let i = 0; i < 30; i++) {
            let row = new Array<MatrixNode>();
            for (let j = 0; j < 63; j++) {
                row.push(new MatrixNode());
            }
            this.matrix.push(row);
        }

    }

    ngOnInit() { }

    public addNode(i: number, j: number) {
        if (this.matrix[i][j].value == undefined) {
            this.matrix[i][j].row = i;
            this.matrix[i][j].col = j;
            this.matrix[i][j].value = 1;
            if (i == 14 && j == 17) {
                this.matrix[i][j].state = state.start;
            } else if (i == 14 && j == 50) {
                this.matrix[i][j].state = state.end;
            } else {
                this.matrix[i][j].state = state.empty;
            }
        }
    }

    public countAndCreate(num: number, i: number) {
        for (let idx = 0; idx < num; idx++) {
            this.addNode(i, idx);
        }
        return new Array(num);
    }

    public count(num: number) {
        return new Array(num);
    }

    public addWall(i: number, j: number) {
        if (this.visualize.canVisualize == true) {
            if (this.isClicked == true) {
                if (this.matrix[i][j].state != state.start && this.matrix[i][j].state != state.end) {
                    if (this.addWeight == false) {
                        if (this.matrix[i][j].state == state.weight) {
                            this.matrix[i][j].state = state.wall;
                            this.matrix[i][j].value = 1;
                        } else {
                            this.matrix[i][j].state = (this.matrix[i][j].state == state.wall) ? state.empty : state.wall;
                        }
                    } else if (this.algorithm == algo.Dijkstra || this.algorithm == algo.AStar) {
                        this.matrix[i][j].state = (this.matrix[i][j].state == state.weight) ? state.empty : state.weight;
                        this.matrix[i][j].value = (this.matrix[i][j].value == 10) ? 1 : 10;
                    }
                }
            }
        }
    }

    public checkMouseDown(i: number, j: number) {
        this.isClicked = true;
        let start = this.findStartNode();
        let end = this.findEndNode();
        if (i == start.row && j == start.col) {
            this.isStartClick = true;
        }
        if (i == end.row && j == end.col) {
            this.isEndClick = true;
        }
        if (!this.isStartClick) {
            this.addWall(i, j);
        }
    }

    public checkMouseUp() {
        this.isClicked = false;
        this.isStartClick = false;
        this.isEndClick = false;
    }

    public addWallOrMoveNode(i: number, j: number) {}

    public moveStartNode(i: number, j: number) {}

    public moveEndNode(i: number, j: number) {}

    public clearBoard() {}

    public startVisualize(canVisualize: boolean, isMoveNode?: boolean) {}

    public clearBoardForVisualize(fromStartVis?: boolean) {}

    public findStartNode() {}

    public findEndNode() {}

    public toggleAddWeight() {}

    public selected(selectedAlgo: string) {}

    public clearWeight() {}

    public algorithmToString() {}

    public DFSAlgo(isMoveNode?: boolean) {}

    public BFSAlgo(isMoveNode?: boolean) {}

    public DijkstraAlgo(isMoveNode?: boolean) {}

    public AStarAlgo(isMoveNode?: boolean) {}

}
