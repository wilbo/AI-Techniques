import * as _ from 'lodash'
import GraphNode from '../graph/GraphNode'
import Graph from '../graph/Graph'
import IArrayPosition from '../../utils/IArrayPosition'
import Vector2D from '../../utils/Vector2D'

class AStar {
	private _closedSet: GraphNode[] = []	// The set of nodes already evaluated
	private _openSet: GraphNode[] = [] // The set of currently discovered nodes that are not evaluated yet

	constructor(private _graph: Graph) { }

	/**
	 * Returns the positions of the nodes in the openset for drawing purposes
	 */
	public get openSetPositions(): Vector2D[] {
		return this._openSet.map((node) => node.position)
	}

	/**
	 * Find the shortest path from start to end
	 * @param start Array position in graph of start
	 * @param end Array position in graph of end
	 */
	public findPath(start: IArrayPosition, end: IArrayPosition): IArrayPosition[] {
		this.resetValues()

		const startNode = this._graph.node(start)
		const endNode = this._graph.node(end)

		if (!startNode || !endNode || !startNode.walkable || !endNode.walkable) {
			return []
		}

		this._closedSet = []
		this._openSet = []

		this.addToOpenSet(startNode) // initially, only the start node is known
		startNode.gScore = 0 // the cost of going from start to start is zero
		startNode.fScore = this.manhattanDistance(startNode, endNode) // for the first node, that value is completely heuristic

		while (!_.isEmpty(this._openSet)) {
			const currentNode = _.minBy(this._openSet, (node) => node.fScore) as GraphNode

			if (currentNode === endNode) {
				return this.createPathFrom(endNode)
			}

			this.removeFromOpenSet(currentNode)
			this.addToClosedSet(currentNode)

			for (const neighbor of this._graph.surrounding(currentNode)) {
				if (neighbor.inClosedSet) { continue } // ignore the neighbor which is already evaluated
				if (!neighbor.inOpenSet) { this.addToOpenSet(neighbor) } // discover a new node

				// the distance from start to a neighbor
				const tentativeGScore = currentNode.gScore
				if (tentativeGScore >= neighbor.gScore) { continue } // this is not a better path

				// the best path until now
				neighbor.parent = currentNode
				neighbor.gScore = tentativeGScore
				neighbor.fScore = neighbor.gScore + this.manhattanDistance(neighbor, endNode)
			}
		}

		return []
	}

	/**
	 * Calculate cost of the path from the end node
	 */
	private manhattanDistance(node: GraphNode, goal: GraphNode): number {
		return Math.abs(node.row - goal.row) + Math.abs(node.column - goal.column)
	}

	/**
	 * Return a path from node that are tagged with parents
	 * @param node The end node of the path
	 */
	private createPathFrom(node: GraphNode): IArrayPosition[] {
		const path: IArrayPosition[] = []
		let currentNode = node

		while (currentNode.parent) {
			const { row, column } = currentNode
			path.push({ row, column })
			currentNode = currentNode.parent
		}

		path.push({ row: currentNode.row, column: currentNode.column })
		return _.reverse(path)
	}

	/**
	 * Reset the default pathfinding values
	 */
	private resetValues(): void {
		for (let row = 0; row < this._graph.rows; row++) {
			for (let column = 0; column < this._graph.columns; column++) {
				const node = this._graph.node({ row, column }) as GraphNode
				node.defaults()
			}
		}
	}

	private addToOpenSet(node: GraphNode): void {
		if (node.inOpenSet) { return }

		node.inOpenSet = true
		this._openSet.push(node)
	}

	private addToClosedSet(node: GraphNode): void {
		if (node.inClosedSet) { return }

		node.inClosedSet = true
		this._closedSet.push(node)
	}

	private removeFromOpenSet(node: GraphNode): void {
		if (!node.inOpenSet) { return }

		node.inOpenSet = false
		_.remove(this._openSet, node)
	}

	private removeFromClosedSet(node: GraphNode): void {
		if (!node.inClosedSet) { return }

		node.inClosedSet = false
		_.remove(this._closedSet, node)
	}
}

export default AStar
