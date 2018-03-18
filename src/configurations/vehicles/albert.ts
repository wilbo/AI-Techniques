import World from '../../game/World'
import Vehicle from '../../entity/Vehicle'
import Vector2D from '../../utils/Vector2D'
import Utils from '../../utils/Utils'
import VehicleType from '../../entity/VehicleType'
import Configuration from '../base/Configuration'

/**
 * This is Albert
 *
 * Albert is a clean driver, wandering around perfectly between the lines.
 */
const albert: Configuration = (world: World): Vehicle => {
	const vehicle = new Vehicle(world, 'Albert')
	vehicle.maxSpeed = 120
	vehicle.vehicleType = VehicleType.Blue1
	vehicle.steering.wallAvoidanceOn = true
	vehicle.steering.followPathOn = true

	const targetPosition = Utils.randomCircuitVector(world)
	vehicle.steering.targetPositions = world.findPath(vehicle.position, targetPosition)
	vehicle.steering.targetPosition = vehicle.steering.targetPositions[0]

	vehicle.updateHook = updateHook.bind({ vehicle, world, targetPosition })
	return vehicle
}

const updateHook = function(this: { vehicle: Vehicle, world: World, targetPosition: Vector2D }, delta: number): void {
	if (Vector2D.equalsRounded(this.vehicle.position, this.targetPosition, 48)) {
		this.targetPosition = Utils.randomCircuitVector(this.world)
		this.vehicle.steering.targetPositions = this.world.findPath(this.vehicle.position, this.targetPosition)
		this.vehicle.steering.targetPosition = this.vehicle.steering.targetPositions[0]
	}
}

export default albert
