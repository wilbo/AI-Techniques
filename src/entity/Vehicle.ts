import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'

class Vehicle extends MovingEntity {
	constructor(
		world: World,
		position: Vector2D = new Vector2D(0, 0),
	) { super(world, position) }

	public update(delta: number): void {
		const { height, width } = this.world
		const { x, y } = this.position

		if (x > width) {
			this.position.x = 0
		}

		this.position.x += 2
	}
}

export default Vehicle
