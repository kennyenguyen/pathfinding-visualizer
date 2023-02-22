import { MatrixNode } from "./MatrixNode";

export class AStarNode {
    public node: MatrixNode;
    public f: number;
    public g: number;
    public h: number;
    public parent: AStarNode;

    constructor(parent: AStarNode, node: MatrixNode) {
        this.node = node;
        this.parent = parent;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }
}
