import { MatrixNode } from "./MatrixNode";

export class QItem {
    row: number;
    col: number;
    distance: number;
    shortestPath: Array<MatrixNode>;
}
