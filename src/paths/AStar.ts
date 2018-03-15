import Graph from './Graph'
import Vector2D from '../utils/Vector2D'

class AStar {
	private readonly _movementCost = 10
	private readonly _movementCostDiagonal = 14

	constructor(
		private _graph: Graph,
	) { }

	public findPath(from: number[], to: number[]): number[][] {
		console.log(from, to)

		// TODO: implement

		return []
	}

}

export default AStar
