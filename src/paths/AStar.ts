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
		const startNode = this._graph.node(start)
		const endNode = this._graph.node(end)

		if (!startNode.walkable || !endNode.walkable) {
			throw new Error('Invalid start or endPoint set!')
		}

		let neighbors: GraphNode[] = []
		let currentNode: GraphNode | undefined = startNode

		// reset fgh values
		currentNode.gValue = 0
		currentNode.hValue = 0
		currentNode.setFValue()

		// initially, only the start node is known.
		currentNode.inOpenSet = true
		this._openSet.push(currentNode)

		// fill intital closed set with unwalkable nodes
		this.fillInitalClosedSet()

		while (!_.isEmpty(this._openSet)) {
			// the currentnode is the node with the lowest f value
			currentNode = _.minBy(this._openSet, (node) => node.fValue)
			// double check
			if (typeof currentNode === 'undefined') {
				throw new Error('no element returned from _.minBy()')
			}

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
			// ..
			// neighbors = this._graph.
		}

		return []
	}

	/**
	 * 
	 */
	private fillInitalClosedSet(): void {
		for (let row = 0; row < this._graph.rows; row++) {
			for (let column = 0; column < this._graph.columns; column++) {
				const node = this._graph.node({ row, column })

				if (!node.walkable) {
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
			path.push({ row: currentNode.row, column: currentNode.column })
			currentNode = currentNode.parent
		}

		path.push({ row: currentNode.row, column: currentNode.column })
		return _.reverse(path)
	}

}

export default AStar
