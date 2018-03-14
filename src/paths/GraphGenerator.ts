import Utils from '../utils/Utils'
import GraphNode from './GraphNode'
import Graph from './Graph'
import Vector2D from '../utils/Vector2D'
import World from '../game/World'

class GraphGenerator {
	private _nodes: GraphNode[] = []

	constructor(
		private _world: World,
	) { }

	/**
	 * Generate a navigation graph
	 */
	public generateGraph(): GraphNode[] { // TODO: change to: Graph
		this.floodfill(new Vector2D(this._world.cell * 0.5, 0))
		this.removeNodesOutOfBounds()

		// TODO: add edges

		// TODO: generate graph from GraphNode[]
		// return new Graph()
		return this._nodes
	}

	/**
	 * Recursively fill the navigationgraph with nodes/positions
	 * @param vector The starting vector
	 * @param step The amount of pixels to move each step, the default value is the current tilesize
	 * @param maxX The max width to fill with positions
	 * @param maxY The max height to fill with positions
	 */
	private floodfill(vector: Vector2D, step: number = this._world.cell, maxX: number = this._world.width * 0.5, maxY: number = this._world.height * 0.5): void {
		if (
			vector.x > maxX ||
			vector.x < -maxX ||
			vector.y > maxY ||
			vector.y < -maxY ||
			this.exists(vector)
		) { return }

		this._nodes.push(new GraphNode(vector))

		this.floodfill(new Vector2D(vector.x, vector.y + step))
		this.floodfill(new Vector2D(vector.x + step, vector.y))
		this.floodfill(new Vector2D(vector.x, vector.y - step))
		this.floodfill(new Vector2D(vector.x - step, vector.y))
	}

	/**
	 * Remove the nodes that are placed inside ObstacleRects
	 */
	private removeNodesOutOfBounds() {
		const toBeRemoved: number[] = []

		// collect removable indexes
		for (const node of this._nodes) {
			if (Utils.insideAllObstacleRect(node.position)) {
				toBeRemoved.push(this._nodes.indexOf(node))
			}
		}

		// remove nodes at indexes
		for (let i = toBeRemoved.length - 1; i >= 0; i--) {
			this._nodes.splice(toBeRemoved[i], 1)
		}
	}

	/**
	 * Evaluate wether a node contains a certain position Vector in the graph
	 * @param position The position to evaluate
	 */
	private exists(position: Vector2D): boolean {
		return this._nodes.some((node) => Vector2D.equals(node.position, position))
	}
}

export default GraphGenerator
