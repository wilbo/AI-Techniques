
import EntityList from '../entity/base/EntityList'
import Entity from '../entity/base/Entity'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import Matrix2D from '../utils/Matrix2D'
import Utils from '../utils/Utils'
import AStar from '../pathfinding/algorithms/AStar'
import Graph from '../pathfinding/graph/Graph'
import GraphGenerator from '../pathfinding/graph/GraphGenerator'
import GraphNode from '../pathfinding/graph/GraphNode'
import EntityType from '../entity/base/EntityType'
import ILevel from '../configurations/levels/ILevel'
import Level1 from '../configurations/levels/Level1'

class World {
	public fps: number = 0
	public entities: EntityList
	public viewMatrix: Matrix2D
	public navGraph: Graph
	public onClickListeners: Array<((clickedPosition: Vector2D) => void)> = []
	public devMode: boolean = false

	private _level: ILevel
	private _context: Context
	private _aStar: AStar
	private _currentPath: Vector2D[] = []

	constructor(
		public readonly element: HTMLElement,
		public readonly cellSize: number = 48, // The number of pixels a cell represents
		public readonly hCells: number = 22, // The number of horizontal cells
		public readonly vCells: number = 14, // The number of vertical cells
	) {
		// viewmatrix
		this.viewMatrix = Matrix2D.view(this.hPixels, this.vPixels)

		// entities
		this.entities = new EntityList(this)

		// level
		this._level = new Level1(this)

		// configuring context
		this._context = new Context(this)
		this._context.setClick(this.clickToVector)
		this._context.setBackground(this._level.imagePath)

		// pathfinding
		this.navGraph = new GraphGenerator(this, this._level.grid).generate()
		this._aStar = new AStar(this.navGraph)
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

	/**
	 * Toggles between dev mode to enable develeopment visualizations
	 */
	public toggleDevMode(): void {
		this.devMode = !this.devMode
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

		if (this.devMode) {
			this.navGraph.draw(this._context)
			this._aStar.draw(this._context, this._currentPath)
		}
	}

	public findPath(from: Vector2D, to: Vector2D): Vector2D[] {
		const fromCoordinate = Utils.positionToCoordinate(from, this)
		const toCoordinate = Utils.positionToCoordinate(to, this)
		if ((this.navGraph.node(toCoordinate) as GraphNode).walkable) {
			const path = this._aStar.findPath(fromCoordinate, toCoordinate)
			this._currentPath = path.map((arrayPosition) => (this.navGraph.node(arrayPosition) as GraphNode).position)
			this._currentPath.push(to) // add the last 'clicked' vector
			return this._currentPath
		}

		return []
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

	private clickToVector = (evt: MouseEvent): void => {
		if (this.onClickListeners.length > 0) {
			const x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - (evt.target as HTMLCanvasElement).offsetLeft
			const y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - (evt.target as HTMLCanvasElement).offsetTop
			const vector = Matrix2D.vector2DToView(new Vector2D(x, y), this.viewMatrix)
			for (const listener of this.onClickListeners) {
				listener(vector)
			}
		}
	}
}

export default World
