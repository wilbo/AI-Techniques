import GraphNode from './GraphNode'
import GraphEdge from './GraphEdge'
import Vector2D from '../utils/Vector2D'

class Graph {
	constructor(
		public nodes: { [index: number]: GraphNode } = {},
		private _nextNodeIndex = 0,
	) { }

	/**
	 * Return a node by index
	 */
	public getNode(index: number): GraphNode {
		return this.nodes[index]
	}

	/**
	 * Add a node to the graph
	 */
	public addNode(node: GraphNode): void {
		node.index = ++this._nextNodeIndex
		this.nodes[node.index] = node
	}

	/**
	 * Add an egde between two nodes
	 * @param from The index value of the start node
	 * @param to  The index value of the end node
	 */
	public addEdge(from: number, to: number): void {
		if (typeof this.nodes[from] === 'undefined' || typeof this.nodes[to] === 'undefined') {
			throw new Error(`The node at index ${from} or either ${to} is undefined`)
		}

		const destionationNode = this.nodes[to]
		this.nodes[from].edges.push(new GraphEdge(destionationNode))
	}

	/**
	 * Print the current Graph class to the console
	 */
	public print(): void {
		let output = ''

		for (const index in this.nodes) {
			if (this.nodes.hasOwnProperty(index)) {
				output +=  '[' + index + ']'
				for (const edge of this.nodes[index].edges) {
					output += ' -> ' + edge.destination.index
				}
				output += '\n'
			}
		}

		console.log(output)
	}
}

export default Graph
