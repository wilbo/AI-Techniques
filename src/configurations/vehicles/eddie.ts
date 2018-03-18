import World from '../../game/World'
import Vehicle from '../../entity/Vehicle'
import Vector2D from '../../utils/Vector2D'
import VehicleType from '../../entity/VehicleType'
import Configuration from '../base/Configuration'

/**
 * This is Eddie
 *
 * Eddie is a drunk driver that will crash into walls.
 */
const eddie: Configuration = (world: World): Vehicle => {
	const vehicle = new Vehicle(world, 'Eddie')
	vehicle.steering.obstacleAvoidanceOn = true
	vehicle.steering.wanderOn = true
	vehicle.vehicleType = VehicleType.Green4
	return vehicle
}

export default eddie
