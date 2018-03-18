import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import EntityType from './base/EntityType'
import Utils from '../utils/Utils'

class ObstacleRound extends Entity {
	constructor(
		public world: World,
		public position: Vector2D = Utils.randomVector(world),
		public radius: number = world.cellSize * 0.5,
		public imagePath: string = '',
	) { super(world, EntityType.ObstacleRound, radius, position) }

	public update(delta: number): void { return }

	public render(context: Context): void {
		context.drawObstacleRound(this.position, this.radius, this.imagePath)
	}
}

export default ObstacleRound
