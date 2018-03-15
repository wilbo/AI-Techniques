import GraphNode from './GraphNode'

class GraphEdge {
	constructor(
		public from: number,
		public to: number,
		public cost: number = 1,
	) { }
}

export default GraphEdge
