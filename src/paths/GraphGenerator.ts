import Utils from '../utils/Utils'
import GraphNode from './GraphNode'
import Graph from './Graph'
import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import GraphEdge from './GraphEdge'
import Matrix2D from '../utils/Matrix2D'

class GraphGenerator {
	private _currentId = 0

	/**
	 * Reflects world.png
	 * 0 = walkable, 1 = unwalkable
	 */
	private readonly _grid: number[][] = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]

	constructor(private cellSize: number) { }

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
	public generateGraph(): Graph { // TODO: change to: Graph
		const nodes: GraphNode[][] = []

		for (let row = 0; row < this.rows; row++) {
			nodes[row] = []
			for (let column = 0; column < this.columns; column++) {
				const walkable = this._grid[row][column]
				nodes[row][column] = new GraphNode(++this._currentId, this.coordToNodePosition(row, column), !walkable)
			}
		}

		return new Graph(nodes)
	}

	/**
	 * Transform a node position to a vector point in pixels
	 * @param column column index
	 * @param row row index
	 */
	private coordToNodePosition(row: number, column: number): Vector2D {
		return new Vector2D((column * this.cellSize) + (this.cellSize * 0.5), (row * this.cellSize) + (this.cellSize * 0.5))
	}
}

export default GraphGenerator
