import * as _ from 'lodash'
import Graph from './Graph'
import Vector2D from '../utils/Vector2D'
import GraphNode from './GraphNode'
import Utils from '../utils/Utils'
import IArrayPosition from './IArrayPosition'

class AStar {
	private readonly _movementCost = 10
	private readonly _movementCostDiagonal = 14

	private _closedSet: GraphNode[] = []	// The set of nodes already evaluated
	private _openSet: GraphNode[] = [] // The set of currently discovered nodes that are not evaluated yet

	constructor(private _graph: Graph) { }

	public findPath(start: IArrayPosition, end: IArrayPosition): IArrayPosition[] {
		this.resetValues()

		const startNode = this._graph.node(start)
		const endNode = this._graph.node(end)

		if (!startNode || !endNode) {
			return []
		}

		if (!startNode.walkable || !endNode.walkable) {
			return []
		}

		let neighbors: GraphNode[] = []
		let currentNode: GraphNode | undefined = startNode

		// initially, only the start node is known.
		currentNode.inOpenSet = true
		this._openSet.push(currentNode)

		// fill intital closed set with unwalkable nodes
		this.fillInitalClosedSet()

		while (!_.isEmpty(this._openSet)) {
			// the currentnode is the node with the lowest f value
			currentNode = _.minBy(this._openSet, (node) => node.fValue)

			if (!currentNode) { continue }

			// 'move' the currentnode to the closed set
			currentNode.inOpenSet = false
			_.remove(this._openSet, currentNode)
			currentNode.inClosedSet = true
			this._closedSet.push(currentNode)

			// end of path reached
			if (currentNode === endNode) {
				return this.createPathFrom(endNode)
			}

			// get surrounding nodes
			neighbors = this._graph.surrounding(currentNode)

			for (const neighbor of neighbors) {
				if (neighbor.inClosedSet) { continue } // skip iteration if the neighbour is in the closed set

				const nextGValue = this.calculateGValue(currentNode, neighbor)

				// skip iteration, we are looking for the smallest G value
				if (neighbor.inOpenSet && nextGValue > neighbor.gValue) { continue }

				neighbor.gValue = nextGValue
				neighbor.hValue = this.manhattanDistance(neighbor)
				neighbor.setFValue()
				neighbor.parent = currentNode

				if (!neighbor.inOpenSet) {
					neighbor.inOpenSet = true
					this._openSet.push(neighbor)
				}
			}
		}

		return []
	}

	/**
	 * Calculate cost of the path from the end node
	 */
	private manhattanDistance({ row, column }: IArrayPosition | GraphNode): number {
		return (Math.abs(row) - Math.abs(column)) * this._movementCost
	}

	/**
	 * Calculate cost of the path to a neigbour
	 * @param current current node
	 * @param neighbor a neigbour node of the current node
	 */
	private calculateGValue(current: GraphNode, neighbor: GraphNode): number {
		return current.gValue + ((neighbor.row - current.row === 0 || neighbor.column - current.column === 0) ? this._movementCost : this._movementCostDiagonal)
	}

	/**
	 * Fill the initial closed set with nodes that aren't walkable
	 */
	private fillInitalClosedSet(): void {
		for (let row = 0; row < this._graph.rows; row++) {
			for (let column = 0; column < this._graph.columns; column++) {
				const node = this._graph.node({ row, column })
				if (node && !node.walkable) {
					node.gValue = 0
					node.hValue = 0
					node.setFValue()

					node.inClosedSet = true
					this._closedSet.push(node)
				}
			}
		}
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

	private resetValues(): void {
		this._closedSet = []
		this._openSet = []

		for (let row = 0; row < this._graph.rows; row++) {
			for (let column = 0; column < this._graph.columns; column++) {
				const node = this._graph.node({ row, column }) as GraphNode
				node.defaults()
			}
		}
	}
}

export default AStar
