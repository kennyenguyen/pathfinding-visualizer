export class MatrixNode {
    public row: number;
    public col: number;
    public value: number;
    public state: number;
    // 0 = empty cell, 1 = wall, 2 = start, 3 = end, 4 = visited
}
