import GraphNode from './GraphNode'
import GraphEdge from './GraphEdge'
import Vector2D from '../utils/Vector2D'
import Context from '../context/Context'
import Matrix2D from '../utils/Matrix2D'

class Graph {
	constructor(
		public nodes: GraphNode[][] = [],
	) { }

	public get columns(): number {
		return this.nodes[0].length
	}

	public get rows(): number {
		return this.nodes.length
	}

	/**
	 * Return nodes around a node from a certain position
	 */
	// public surroundingNodes(position: Vector2D): GraphNode[] {
	// 		TODO: implement
	// }

	/**
	 * Return a node at a certain position in the nodes array
	 */
	public nodeAt(row: number, column: number): GraphNode {
		return this.nodes[row][column]
	}

	public draw(context: Context): void {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				const node = this.nodes[y][x]
				const position = Matrix2D.vector2DToView(node.position, context.view)
				if (node.walkable) {
					context.drawText(node.id + '', position)
					context.drawEntity(position, 3, 'blue')
				}
			}
		}
	}
}

export default Graph
