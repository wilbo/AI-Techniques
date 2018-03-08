import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'

class Obstacle extends Entity {
	constructor(
		public world: World,
		public position: Vector2D = Vector2D.random(world.context.width, world.context.height),
		public size: number = Math.ceil(Math.random() * 100),
	) { super(world, position) }

	public update(delta: number): void { return }

	public render(context: Context): void {
		context.drawObstacle(this.position, this.size)
	}
}

export default Obstacle
