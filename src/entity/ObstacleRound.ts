import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import EntityType from './base/EntityType'
import Utils from '../utils/utils'

class ObstacleRound extends Entity {
	constructor(
		public world: World,
		public position: Vector2D = Vector2D.random(world.width, world.height),
		public radius: number = Utils.randomInt(20, 150),
	) { super(world, EntityType.ObstacleRound, radius, position) }

	public update(delta: number): void { return }

	public render(context: Context): void {
		context.drawObstacleRound(this.position, this.radius)
	}
}

export default ObstacleRound
