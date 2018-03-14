
import EntityList from '../entity/base/EntityList'
import Entity from '../entity/base/Entity'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import Graph from '../paths/Graph'
import GraphNode from '../paths/GraphNode'
import Matrix2D from '../utils/Matrix2D'
import ObstacleRect from '../entity/ObstacleRect'
import Utils from '../utils/Utils'
import GraphGenerator from '../paths/GraphGenerator'

class World {
	public fps: number = 0
	public ng: GraphNode[] // TODO: change to: Graph

	constructor(
		public context: Context,
		public width: number,
		public height: number,
		public cell: number = 48,
	) {
		// apply view matrix
		this.context.view = Matrix2D.view(width, height)
		// generate walls
		this.generateWorldBounds()
		// generate graph
		this.ng = new GraphGenerator(this).generateGraph()
	}

	public update(delta: number): void {
		for (const entity of EntityList.instance.list) {
			entity.update(delta)
		}
	}

	public render(): void {
		this.context.clear(this.width, this.height)
		for (const entity of EntityList.instance.list) {
			entity.render(this.context)
			this.wrapAround(entity)
		}

		this.drawFps()
		this.drawGraph()
	}

	/**
	 *
	 */
	private generateWorldBounds(): void {
		const halfWidth = this.width * 0.5
		const halfHeight = this.height * 0.5

		// the bounds around the circuit
		new ObstacleRect(this, this.width, this.cell, new Vector2D(-halfWidth, halfHeight), true) // top
		new ObstacleRect(this, this.width, this.cell, new Vector2D(-halfWidth, -halfHeight + this.cell), true) // bottom
		new ObstacleRect(this, this.cell, this.height - (this.cell * 2), new Vector2D(-halfWidth, halfHeight - this.cell), true) // left
		new ObstacleRect(this, this.cell, this.height - (this.cell * 2), new Vector2D(halfWidth - this.cell, halfHeight - this.cell), true) // right
		new ObstacleRect(this, this.cell * 4, this.cell * 2, new Vector2D(-(this.cell * 8), this.cell * 3.5), true) // island top left
		new ObstacleRect(this, this.cell * 4, this.cell * 3, new Vector2D(-(this.cell * 8), -(this.cell * .5)), true) // island bottom left
		new ObstacleRect(this, this.cell * 6, this.cell, new Vector2D(-(this.cell * 4), -(this.cell * 2.5)), true) // "
		new ObstacleRect(this, this.cell * 2, this.cell * 2, new Vector2D(-(this.cell * 2), (this.cell * 5.5)), true) // top mid square
		new ObstacleRect(this, this.cell * 2, this.cell * 2, new Vector2D(this.cell * 8, (this.cell * 5.5)), true) // top right square
		new ObstacleRect(this, this.cell * 6, this.cell, new Vector2D(this.cell, (this.cell * 4.5)), true) // pit rectangle
		new ObstacleRect(this, this.cell * 4, this.cell * 5, new Vector2D(this.cell * 4, (this.cell * 1.5)), true) // island middle right
		new ObstacleRect(this, 4, this.cell * 4, new Vector2D(-(this.cell * 2), (this.cell * 3.5)), true) // thin upright
		new ObstacleRect(this,  this.cell * 4, 4, new Vector2D(0, (this.cell * 1.5)), true) // thin flat 1
		new ObstacleRect(this,  this.cell * 4, 4, new Vector2D(-(this.cell * 2), -(this.cell * 0.5) + 4), true) // thin flat 2
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

	private drawGraph(): void {
		for (const node of this.ng) {
			this.context.drawEntity(node.position, 3, 'blue')
		}
	}
}

export default World
