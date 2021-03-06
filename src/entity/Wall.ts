import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import EntityType from './base/EntityType'
import Utils from '../utils/Utils'

class Wall extends Entity {
	constructor(
		public world: World,
		public from: Vector2D,
		public to: Vector2D,
	) { super(world, EntityType.Wall, 1, Vector2D.subtract(from, to)) }

	public get normalized(): Vector2D {
		const temp = Vector2D.normalize(Vector2D.subtract(this.to, this.from))
		return new Vector2D(-temp.y, temp.x)
	}

	public update(delta: number): void { return }

	public render(context: Context): void {
		context.drawWall(this.from, this.to)
		context.drawEntity(Vector2D.add(Vector2D.divide(Vector2D.add(this.to, this.from), 2), Vector2D.multiply(this.normalized, 6)), 3)
	}
}

export default Wall
