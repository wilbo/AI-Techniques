
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
import AStar from '../paths/AStar'

class World {
	public fps: number = 0
	public entities: EntityList
	public viewMatrix: Matrix2D

	private _context: Context
	private _aStar: AStar
	private _navGraph: Graph

	constructor(
		public element: HTMLElement,
		public hCells: number = 22,
		public vCells: number = 14,
		public cellSize: number = 48,
	) {
		// init viewmatrix
		this.viewMatrix = Matrix2D.view(this.hPixels, this.vPixels)

		// entities
		this.entities = new EntityList(this)

		// configuring context
		this._context = new Context(this)
		this._context.setClick(this.onWorldClick)

		// pathfinding
		this._navGraph = new GraphGenerator(this).generate()
		this._aStar = new AStar(this._navGraph)
		this._navGraph.draw(this._context)
		console.log(this._navGraph)
		console.log(this._navGraph.surrounding(this._navGraph.nodes[5][7]))
	}

	public get hPixels(): number {
		return this.hCells * this.cellSize
	}

	public get vPixels(): number {
		return this.vCells * this.cellSize
	}

	public update(delta: number): void {
		for (const entity of this.entities.list) {
			entity.update(delta)
		}
	}

	public render(): void {
		this._context.clear(this.hPixels, this.vPixels)
		for (const entity of this.entities.list) {
			entity.render(this._context)
			this.wrapAround(entity)
		}

		this.drawFps()
	}

	/**
	 * Make the world act as a toroid
	 */
	private wrapAround(entity: Entity, maxX: number = this.hPixels * 0.5, maxY: number = this.vPixels * 0.5): void {
		if (entity.position.x > maxX) { entity.position.x = -maxX }
		if (entity.position.x < -maxX) { entity.position.x = maxX }
		if (entity.position.y < -maxY) { entity.position.y = maxY }
		if (entity.position.y > maxY) { entity.position.y = -maxY }
	}

	private drawFps(): void {
		this._context.drawText(this.fps.toFixed(2) + ' fps', new Vector2D(-(this.hPixels * 0.5) + 10, -(this.vPixels * 0.5) + 10))
	}

	private onWorldClick = (evt: MouseEvent): void => {
		const x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - (evt.target as HTMLCanvasElement).offsetLeft
		const y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - (evt.target as HTMLCanvasElement).offsetTop
		const position = Utils.positionToCoordinate(new Vector2D(x, y), this, true)
		const path = this._aStar.findPath({row: 11, column: 18}, position)
		console.log(path)

		for (const arrayPosition of path) {
			const node = this._navGraph.node(arrayPosition)

			if (node) {
				this._context.drawEntity(node.position, 6, 'red')
			}
		}
	}
}

export default World
