
import EntityList from '../entity/base/EntityList'
import Entity from '../entity/base/Entity'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'

class World {
	public fps: number = 0

	constructor(public context: Context) { }

	public update(delta: number): void {
		for (const entity of EntityList.instance.list) {
			entity.update(delta)
		}
	}

	public render(): void {
		this.context.clear()
		for (const entity of EntityList.instance.list) {
			entity.render(this.context)
			this.wrapAround(entity, this.context.width * 0.5, this.context.height * 0.5)
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
		// tslint:disable-next-line:max-line-length
		this.context.drawText(this.fps.toFixed(2) + ' fps', new Vector2D(-(this.context.width * 0.5) + 10, this.context.height * 0.5 - 10))
	}
}

export default World
