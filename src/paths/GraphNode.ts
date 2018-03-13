import Vector2D from '../utils/Vector2D'
import GraphEdge from './GraphEdge'

class GraphNode {
	public index: number
	public edges: GraphEdge[] = []

	constructor(
		public position: Vector2D,
	) { }
}

export default GraphNode
