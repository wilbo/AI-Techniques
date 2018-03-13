import GraphNode from './GraphNode'
import GraphEdge from './GraphEdge'
import Vector2D from '../utils/Vector2D'

class Graph {
	constructor(
		private _nodes: { [index: number]: GraphNode } = {},
		private _nextNodeIndex = 0,
	) { }

	/**
	 * Return all nodes as an array
	 */
	public get nodes(): GraphNode[] {
		// tslint:disable-next-line:radix
		return Object.keys(this._nodes).map((index) => this._nodes[parseInt(index)])
	}

	/**
	 * Return a node by index
	 */
	public getNode(index: number): GraphNode {
		return this._nodes[index]
	}

	/**
	 * Add a node to the graph
	 */
	public addNode(node: GraphNode): void {
		node.index = ++this._nextNodeIndex
		this._nodes[node.index] = node
	}

	/**
	 * Add an egde between two nodes
	 * @param from The index value of the start node
	 * @param to  The index value of the end node
	 */
	public addEdge(from: number, to: number): void {
		if (typeof this._nodes[from] === 'undefined' || typeof this._nodes[to] === 'undefined') {
			throw new Error(`The node at index ${from} or either ${to} is undefined`)
		}

		const destionationNode = this._nodes[to]
		this._nodes[from].edges.push(new GraphEdge(destionationNode))
	}

	/**
	 * Evaluate wether a node contains a certain position Vector in the graph
	 * @param position The position to evaluate
	 */
	public exists(position: Vector2D): boolean {
		for (const node of this.nodes) {
			if (Vector2D.equals(node.position, position)) {
				return true
			}
		}

		return false
	}

	/**
	 * Print the current Graph class to the console
	 */
	public print(): void {
		let output = ''

		for (const index in this._nodes) {
			if (this._nodes.hasOwnProperty(index)) {
				output +=  '[' + index + ']'
				for (const edge of this._nodes[index].edges) {
					output += ' -> ' + edge.destination.index
				}
				output += '\n'
			}
		}

		console.log(output)
	}

}

export default Graph
