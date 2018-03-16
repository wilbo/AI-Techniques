import GraphNode from './GraphNode'
import IArrayPosition from '../../utils/IArrayPosition'
import Context from '../../context/Context'

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
	 * Return the walkable nodes surrounding a node
	 * @param node The node to start searching from
	 */
	public surrounding(node: GraphNode): GraphNode[] {
		const { row, column } = node
		const output: GraphNode[] = []

		const north = this.node({ row: row - 1, column })
		const northEast = this.node({ row: row - 1, column: column + 1 })
		const east = this.node({ row, column: column + 1 })
		const southEast = this.node({ row: row + 1, column: column + 1 })
		const south = this.node({ row: row + 1, column })
		const southWest = this.node({ row: row + 1, column: column - 1 })
		const west = this.node({ row, column: column - 1 })
		const northWest = this.node({ row: row - 1, column: column - 1 })

		if (north && north.walkable) { output.push(north) }
		if (northEast && northEast.walkable) { output.push(northEast) }
		if (east && east.walkable) { output.push(east) }
		if (southEast && southEast.walkable) { output.push(southEast) }
		if (south && south.walkable) { output.push(south) }
		if (southWest && southWest.walkable) { output.push(southWest) }
		if (west && west.walkable) { output.push(west) }
		if (northWest && northWest.walkable) { output.push(northWest) }

		return output
	}

	/**
	 * Return a node at a certain position in the nodes array
	 * @param IArrayPosition the position in the nodes collection
	 */
	public node({ row, column }: IArrayPosition): GraphNode | null {
		if (!this.exists({ row, column })) {
			return null
		}

		return this.nodes[row][column]
	}

	/**
	 * Draw the nodes collection on the context
	 */
	public draw(context: Context): void {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				const node = this.nodes[y][x]
				if (node.walkable) {
					// context.drawText(node.row + ',' + node.column, node.position)
					context.drawEntity(node.position, 3, 'blue')
				}
			}
		}
	}

	/**
	 * Check wether a array position exists in the nodes collection
	 * @param IArrayPosition the position in the nodes collection
	 */
	private exists({ row, column }: IArrayPosition): boolean {
		return (row >= 0 && row < this.rows) && (column >= 0 && column < this.columns)
	}
}

export default Graph
