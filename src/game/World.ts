import * as SVG from 'svg.js'
import EntityList from '../entity/EntityList'
import Vector2D from '../utils/Vector2D'

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
			this.wrapAround(entity.position, this.width, this.height)
		}

		this.drawFps()
	}

	// Treats the world as a toroid
	private wrapAround(position: Vector2D, maxX: number, maxY: number): void {
		if (position.x > maxX) { position.x = 0.0 }
		if (position.x < 0) { position.x = maxX }
		if (position.y < 0) { position.y = maxY }
		if (position.y > maxY) { position.y = 0.0 }
	}

	private drawFps(): void {
		this._context.text(this.fps.toFixed(2) + ' fps').move(-(this.width / 2) + 10, this.height / 2 - 28)
	}
}

export default World
