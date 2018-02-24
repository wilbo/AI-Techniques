import EntityList from '../entity/EntityList'
import Entity from '../entity/Entity'
import Context from '../context/Context';
import Vector2D from '../utils/Vector2D';

class World {
	public height: number
	public width: number
	public fps: number = 0

	constructor(
		private _context: Context,
	) {
		this.width = _context.width
		this.height = _context.height
	}

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
		this._context.drawText(this.fps.toFixed(2) + ' fps', new Vector2D(-(this.width / 2) + 10, this.height / 2 - 10))
	}
}

export default World
