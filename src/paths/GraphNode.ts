import Vector2D from '../utils/Vector2D'
import GraphEdge from './GraphEdge'

class GraphNode {
	constructor(
		public id: number,
		public position: Vector2D,
		public walkable: boolean,
	) { }
}

export default GraphNode
