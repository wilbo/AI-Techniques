import GraphNode from './GraphNode'
import Vector2D from '../utils/Vector2D'
import Context from '../context/Context'
import Matrix2D from '../utils/Matrix2D'
import IArrayPosition from './IArrayPosition'

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
	public surrounding(node: GraphNode): GraphNode[] {

		// TODO: implement
		return []
	}

	/**
	 * Return a node at a certain position in the nodes array
	 */
	public node({ row, column }: IArrayPosition): GraphNode {
		return this.nodes[row][column]
	}

	public draw(context: Context): void {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				const node = this.nodes[y][x]
				if (node.walkable) {
					context.drawText(node.row + ',' + node.column, node.position)
					context.drawEntity(node.position, 3, 'blue')
				}
			}
		}
	}
}

export default Graph
