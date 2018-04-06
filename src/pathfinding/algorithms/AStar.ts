import * as _ from 'lodash'
import GraphNode from '../graph/GraphNode'
import Graph from '../graph/Graph'
import IArrayPosition from '../../utils/IArrayPosition'
import Vector2D from '../../utils/Vector2D'
import Context from '../../context/Context'

class AStar {
	private _evaluated: GraphNode[] = []
	private _closedSet: GraphNode[] = []	// The set of nodes already evaluated
	private _openSet: GraphNode[] = [] // The set of currently discovered nodes that are not evaluated yet

	constructor(private _graph: Graph) { }

	/**
	 * Find the shortest path from start to end
	 * @param start Array position in graph of start
	 * @param end Array position in graph of end
	 */
	public findPath(start: IArrayPosition, end: IArrayPosition): IArrayPosition[] {
		this.resetValues()

		const startNode = this._graph.node(start)
		const endNode = this._graph.node(end)

		if (!startNode || !endNode) { //  || !startNode.walkable || !endNode.walkable
			return []
		}

		this._closedSet = []
		this._openSet = []
		this._evaluated = []

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
				const tentativeGScore = currentNode.gScore + neighbor.cost

				// this is not a better path
				if (tentativeGScore >= neighbor.gScore) { continue }

				// the best path until now
				this.addToEvaluatedSet(currentNode)
				neighbor.parent = currentNode
				neighbor.gScore = tentativeGScore
				neighbor.fScore = neighbor.gScore + this.manhattanDistance(neighbor, endNode)
			}
		}

		return []
	}

	/**
	 * Draw a current Astar algorithm to the screen
	 */
	public draw(context: Context, path: Vector2D[]): void {
		for (const node of this._evaluated) {
			context.drawEntity(node.position, 5, 'black', false)
		}

		for (const vector of path) {
			context.drawEntity(vector, 5, 'red', false)
		}
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

	private addToEvaluatedSet(node: GraphNode): void {
		if (typeof this._evaluated.find((x) => x === node) === 'undefined') {
			this._evaluated.push(node)
		}
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
