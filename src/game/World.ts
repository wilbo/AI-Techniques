
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
	public navGraph: Graph
	public aStar: AStar
	public context: Context

	constructor(
		private element: HTMLElement,
		public width: number,
		public height: number,
		private cellSize: number = 48,
	) {
		this.configureContext(element)
		this.navGraph = new GraphGenerator(cellSize).generateGraph()
		this.aStar = new AStar(this.navGraph)
		this.navGraph.draw(this.context)
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
		this.context.drawText(this.fps.toFixed(2) + ' fps', new Vector2D(-(this.width * 0.5) + 10, -(this.height * 0.5) + 10))
	}

	private configureContext(element: HTMLElement): void {
		this.context = new Context(element, this.width, this.height)
		this.context.setView(this.width, this.height)
		this.context.setClick(this.onWorldClick)
	}

	private onWorldClick = (evt: MouseEvent): void => {
		const x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - (evt.target as HTMLCanvasElement).offsetLeft
		const y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - (evt.target as HTMLCanvasElement).offsetTop
		this.aStar.findPath([3, 7], [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)])
	}
}

export default World
