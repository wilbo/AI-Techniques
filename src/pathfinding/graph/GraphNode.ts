import Vector2D from '../../utils/Vector2D'

class GraphNode {
	public parent: GraphNode | undefined
	public inClosedSet: boolean
	public inOpenSet: boolean

	public gScore: number // cost of the path from the start node
	public fScore: number // g + h

	public isDiagonal: boolean

	constructor(
		public row: number,
		public column: number,
		public position: Vector2D,
		public walkable: boolean,
	) { this.defaults() }

	/**
	 * Reset every pathfinding value
	 */
	public defaults(): void {
		this.parent = undefined
		this.inClosedSet = false
		this.inOpenSet = false
		this.isDiagonal = false

		this.gScore = Number.MAX_SAFE_INTEGER
		this.fScore = Number.MAX_SAFE_INTEGER
	}
}

export default GraphNode
