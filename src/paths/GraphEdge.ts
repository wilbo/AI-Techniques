import GraphNode from './GraphNode'

class GraphEdge {
	constructor(
		public destination: GraphNode,
		public cost: number = 1,
	) { }
}

export default GraphEdge
