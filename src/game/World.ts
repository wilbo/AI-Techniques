import * as SVG from 'svg.js'
import EntityList from '../entity/EntityList'
import Entity from '../entity/Entity'

class World {
	public fps: number = 0

	constructor(
		public height: number,
		public width: number,
		private _context: SVG.G,
	) { }

	public update(delta: number): void {
		for (const entity of EntityList.instance.list) {
			entity.update(delta)
		}
	}

	public render(): void {
		this._context.clear()
		for (const entity of EntityList.instance.list) {
			entity.render(this._context)
			this.wrapAround(entity, this.width * 0.5, this.height * 0.5)
		}

		this.drawFps()
	}

	// make the world 'infinite'
	private wrapAround(entity: Entity, maxX: number, maxY: number): void {
		if (entity.position.x > maxX) { entity.position.x = -maxX }
		if (entity.position.x < -maxX) { entity.position.x = maxX }
		if (entity.position.y < -maxY) { entity.position.y = maxY }
		if (entity.position.y > maxY) { entity.position.y = -maxY }
	}

	private drawFps(): void {
		this._context.text(this.fps.toFixed(2) + ' fps').move(-(this.width / 2) + 10, this.height / 2 - 28)
	}
}

export default World
