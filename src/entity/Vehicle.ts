import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'

class Vehicle extends MovingEntity {
	constructor(
		world: World,
		position: Vector2D = new Vector2D(0, 0),
	) { super(world, position) }
}

export default Vehicle
