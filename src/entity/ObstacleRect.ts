import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import EntityType from './base/EntityType'
import Utils from '../utils/utils'

class ObstacleRect extends Entity {
	constructor(
		public world: World,
		public width: number = Utils.randomInt(100, 250),
		public height: number = Utils.randomInt(100, 250),
		public position: Vector2D = Vector2D.random(world.width, world.height),
	) { super(world, EntityType.ObstacleRect, width, position) }

	public update(delta: number): void { return }

	public render(context: Context): void {
		context.drawObstacleRect(this.position, this.width, this.height)
	}
}

export default ObstacleRect
