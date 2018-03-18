import World from '../../game/World'
import Vehicle from '../../entity/Vehicle'
import Vector2D from '../../utils/Vector2D'
import VehicleType from '../../entity/VehicleType'
import Configuration from '../base/Configuration'

/**
 * This is Bob
 *
 * Bob is a driver that will follow your orders. A simple mouseclick on the circuit will make him ride to that position.
 */
const bob: Configuration = (world: World): Vehicle => {
	const vehicle = new Vehicle(world, 'Bob')
	vehicle.steering.wallAvoidanceOn = true
	vehicle.vehicleType = VehicleType.Yellow5
	world.onClickListeners.push(onWorldClick.bind({ vehicle, world }))
	return vehicle
}

const onWorldClick = function(this: { vehicle: Vehicle, world: World }, clickedPosition: Vector2D): void {
	const path = this.world.findPath(this.vehicle.position, clickedPosition)

	if (path.length > 0) {
		this.vehicle.steering.targetPositions = path
		this.vehicle.steering.targetPosition = this.vehicle.steering.targetPositions[0]
		this.vehicle.steering.followPathOn = true
	}
}

export default bob
