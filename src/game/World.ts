
import EntityList from '../entity/base/EntityList'
import Entity from '../entity/base/Entity'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import Graph from '../paths/Graph'
import GraphNode from '../paths/GraphNode'

class World {
	public fps: number = 0
	public navigationGraph: Graph

	constructor(public context: Context) { }

	public get width(): number { return this.context.width }
	public get height(): number { return this.context.height }

	public update(delta: number): void {
		for (const entity of EntityList.instance.list) {
			entity.update(delta)
		}
	}

	public render(): void {
		this.context.clear()
		for (const entity of EntityList.instance.list) {
			entity.render(this.context)
			this.wrapAround(entity)
		}

		this.drawFps()
	}

	/**
	 * Generate a navigation graph
	 */
	public generateGraph(): void {
		this.navigationGraph = new Graph()

		this.floodfill(new Vector2D(24, 0))
		for (const node of this.navigationGraph.nodes) {
			this.context.drawEntity(node.position, 3, 'blue')
		}

		this.navigationGraph.print()
	}

	/**
	 * Recursively fill the navigationgraph with nodes/positions
	 * @param vector The starting vector
	 * @param step The amount of pixels to move each step, the default value is the current tilesize
	 * @param maxX The max width to fill with positions
	 * @param maxY The max height to fill with positions
	 */
	private floodfill(vector: Vector2D, step: number = 48, maxX: number = this.width * 0.5, maxY: number = this.height * 0.5): void {
		if (
			vector.x > maxX ||
			vector.x < -maxX ||
			vector.y > maxY ||
			vector.y < -maxY ||
			this.navigationGraph.exists(vector)
		) { return }

		this.navigationGraph.addNode(new GraphNode(vector))

		this.floodfill(new Vector2D(vector.x, vector.y + step))
		this.floodfill(new Vector2D(vector.x + step, vector.y))
		this.floodfill(new Vector2D(vector.x, vector.y - step))
		this.floodfill(new Vector2D(vector.x - step, vector.y))
	}

	/**
	 * Make the world act as a toroid
	 */
	private wrapAround(entity: Entity, maxX: number = this.width * 0.5, maxY: number = this.height * 0.5): void {
		if (entity.position.x > maxX) { entity.position.x = -maxX }
		if (entity.position.x < -maxX) { entity.position.x = maxX }
		if (entity.position.y < -maxY) { entity.position.y = maxY }
		if (entity.position.y > maxY) { entity.position.y = -maxY }
	}

	private drawFps(): void {
		this.context.drawText(this.fps.toFixed(2) + ' fps', new Vector2D(-(this.width * 0.5) + 10, this.height * 0.5 - 10))
	}
}

export default World
