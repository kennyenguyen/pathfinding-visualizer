import { Component, OnInit } from '@angular/core';
import { AStar } from 'src/app/models/AStar';
import { BFSAlgorithm } from 'src/app/models/BFS';
import { DFSAlgorithm } from 'src/app/models/DFS';
import { Dijkstra } from 'src/app/models/Dijkstra';
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

    public addWallOrMoveNode(i: number, j: number) {
        if (this.isStartClick == false && this.isEndClick == false) {
            this.addWall(i, j);
        } else if (this.isStartClick == true) {
            this.moveStartNode(i, j);
        } else {
            this.moveEndNode(i, j);
        }
    }

    public moveStartNode(i: number, j: number) {
        if (this.visualize.canVisualize == true) {
            let oldStart = this.findStartNode();
            oldStart.state = state.empty;
            if (this.matrix[i][j].state != state.wall && this.matrix[i][j].state != state.end && this.matrix[i][j].state != state.weight && this.matrix[i][j].value != 10) {
                this.matrix[i][j].state = state.start;
            } else {
                oldStart.state = state.start;
            }
        }
        if (this.choseAlgo == true) {
            this.startVisualize(this.visualize.canVisualize, true);
        }
    }

    public moveEndNode(i: number, j: number) {
        if (this.visualize.canVisualize == true) {
            let oldEnd = this.findEndNode();
            oldEnd.state = state.empty;
            if (this.matrix[i][j].state != state.wall && this.matrix[i][j].state != state.start && this.matrix[i][j].state != state.weight && this.matrix[i][j].value != 10) {
                this.matrix[i][j].state = state.end;
            } else {
                oldEnd.state = state.end;
            }
        }
        if (this.choseAlgo == true) {
            this.startVisualize(this.visualize.canVisualize, true);
        }
    }

    public clearBoard() {
        this.choseAlgo = false;
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (this.matrix[i][j].state != state.start && this.matrix[i][j].state != state.end) {
                    this.matrix[i][j].state = state.empty;
                }
                if (this.matrix[i][j].value == 10) {
                    this.matrix[i][j].state = state.weight;
                }
                if (this.matrix[i][j].state != state.weight) {
                    this.matrix[i][j].value = 1;
                }
            }
        }
    }

    public startVisualize(canVisualize: boolean, isMoveNode?: boolean) {
        this.choseAlgo = true;
        if (canVisualize) {
            this.visualize.canVisualize = false;
            this.clearBoardForVisualize(true);
            switch (this.algorithm) {
                case algo.DFS:
                    this.DFSAlgo(isMoveNode);
                    break;
                case algo.BFS:
                    this.BFSAlgo(isMoveNode);
                    break;
                case algo.Dijkstra:
                    this.DijkstraAlgo(isMoveNode);
                    break;
                case algo.AStar:
                    this.AStarAlgo(isMoveNode);
                    break;
            }
        }
    }

    public clearBoardForVisualize(fromStartVis?: boolean) {
        if (fromStartVis == true) {
            this.choseAlgo = true;
        } else {
            this.choseAlgo = false;
        }
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (this.matrix[i][j].state == state.shortestPath || this.matrix[i][j].state == state.visited) {
                    this.matrix[i][j].state = state.empty;
                }
                if (this.matrix[i][j].value == 10) {
                    this.matrix[i][j].state = state.weight;
                }
            }
        }
    }

    public findStartNode() {
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (this.matrix[i][j].state == state.start) {
                    return this.matrix[i][j];
                }
            }
        }
    }

    public findEndNode() {
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (this.matrix[i][j].state == state.end) {
                    return this.matrix[i][j];
                }
            }
        }
    }

    public toggleAddWeight() {
        this.addWeight = !this.addWeight;
    }

    public selected(selectedAlgo: string) {
        switch (selectedAlgo) {
            case "BFS":
                this.clearWeight();
                this.algorithm = algo.BFS;
                break;
            case "DFS":
                this.clearWeight();
                this.algorithm = algo.DFS;
                break;
            case "Dijkstra":
                this.algorithm = algo.Dijkstra;
                break;
            case "AStar":
                this.algorithm = algo.AStar;
                break;
        }
    }

    public clearWeight() {
        let m = this.matrix.length;
        let n = this.matrix[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (this.matrix[i][j].state == state.weight) {
                    this.matrix[i][j].state = state.empty;
                    this.matrix[i][j].value = 1;
                }
            }
        }
    }

    public algorithmToString() {
        switch (this.algorithm) {
            case algo.DFS:
                return "DFS";
            case algo.BFS:
                return "BFS";
            case algo.Dijkstra:
                return "Dijkstra";
            case algo.AStar:
                return "AStar";
        }
    }

    public DFSAlgo(isMoveNode?: boolean) {
        let dfsAlgo = new DFSAlgorithm(this.matrix, this.visualize);
        dfsAlgo.DFSAlgo(isMoveNode);
    }

    public BFSAlgo(isMoveNode?: boolean) {
        let bfsAlgo = new BFSAlgorithm(this.matrix, this.visualize);
        bfsAlgo.BFSAlgo(isMoveNode);
    }

    public DijkstraAlgo(isMoveNode?: boolean) {
        let dijkstraAlgo = new Dijkstra(this.matrix, this.visualize);
        dijkstraAlgo.DijkstraAlgo(isMoveNode);
    }

    public AStarAlgo(isMoveNode?: boolean) {
        let aStarAlgo = new AStar(this.matrix, this.visualize);
        aStarAlgo.AStarAlgo(isMoveNode);
    }

}
