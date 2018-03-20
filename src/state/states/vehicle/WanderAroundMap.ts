import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import GetFuel from './GetFuel'

class WanderAroundMap implements IState<Vehicle> {
	public name = 'wander around map'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		vehicle.steering.obstacleAvoidanceOn = true
		vehicle.steering.wanderOn = true
	}

	public execute(vehicle: Vehicle): void {
		if (vehicle.isMoving) {
			vehicle.fuel--
		}

		if (vehicle.fuel < 500) {
			vehicle.changeState(new GetFuel())
		}
	}

	public exit(vehicle: Vehicle): void {
		console.log('exit' + name)
	}
}

export default WanderAroundMap
