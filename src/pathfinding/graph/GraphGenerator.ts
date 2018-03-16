import Graph from './Graph'
import GraphNode from './GraphNode'
import Utils from '../../utils/Utils'
import World from '../../game/World'

class GraphGenerator {
	constructor(
		private _world: World,
		private _grid: number[][],
	) { }

	public get columns(): number {
		return this._grid[0].length
	}

	public get rows(): number {
		return this._grid.length
	}

	public get grid(): number[][] {
		return this.grid
	}

	/**
	 * Generate a navigation graph
	 */
	public generate(): Graph {
		const nodes: GraphNode[][] = []

		for (let row = 0; row < this.rows; row++) {
			nodes[row] = []
			for (let column = 0; column < this.columns; column++) {
				const walkable = this._grid[row][column]
				nodes[row][column] = new GraphNode(row, column, Utils.coordinateToPosition({ row, column }, this._world), !walkable)
			}
		}

		return new Graph(nodes)
	}
}

export default GraphGenerator
