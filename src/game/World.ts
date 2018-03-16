
import EntityList from '../entity/base/EntityList'
import Entity from '../entity/base/Entity'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import Matrix2D from '../utils/Matrix2D'
import Utils from '../utils/Utils'
import Level1 from './levels/Level1'
import ILevel from './levels/ILevel'
import AStar from '../pathfinding/algorithms/AStar'
import Graph from '../pathfinding/graph/Graph'
import GraphGenerator from '../pathfinding/graph/GraphGenerator'

class World {
	public fps: number = 0
	public entities: EntityList
	public viewMatrix: Matrix2D

	private _level: ILevel
	private _context: Context
	private _aStar: AStar
	private _navGraph: Graph

	constructor(
		public element: HTMLElement,
		public hCells: number = 22,
		public vCells: number = 14,
		public cellSize: number = 48,
	) {
		// viewmatrix
		this.viewMatrix = Matrix2D.view(this.hPixels, this.vPixels)

		// level
		this._level = new Level1()

		// entities
		this.entities = new EntityList(this)

		// configuring context
		this._context = new Context(this)
		this._context.setClick(this.onWorldClick)
		this._context.setBackground(this._level.imageUrl)

		// pathfinding
		this._navGraph = new GraphGenerator(this, this._level.grid).generate()
		this._aStar = new AStar(this._navGraph)
	}

	/**
	 * World width in pixels
	 */
	public get hPixels(): number {
		return this.hCells * this.cellSize
	}

	/**
	 * World height in pixels
	 */
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
		this._navGraph.draw(this._context)
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

		for (const arrayPosition of path) {
			const node = this._navGraph.node(arrayPosition)
			if (node) { this._context.drawEntity(node.position, 6, 'red') }
		}
	}
}

export default World
