import Vector2D from '../utils/Vector2D'

class GraphNode {
	public parent: GraphNode | undefined
	public inClosedSet: boolean
	public inOpenSet: boolean

	public gValue: number // cost of the path from the start node
	public hValue: number // heuristic value
	public fValue: number // g + h

	constructor(
		public row: number,
		public column: number,
		public position: Vector2D,
		public walkable: boolean,
	) { this.defaults() }

	public setFValue(): number {
		return this.fValue = this.gValue + this.hValue
	}

	/**
	 * Reset every pathfinding value
	 */
	public defaults(): void {
		this.parent = undefined
		this.inClosedSet = false
		this.inOpenSet = false

		this.gValue = 0
		this.hValue = 0
		this.fValue = 0
	}
}

export default GraphNode
