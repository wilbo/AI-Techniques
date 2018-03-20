import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'

class WanderAroundMap implements IState<Vehicle> {
	public name = 'wander around map'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		vehicle.steering.obstacleAvoidanceOn = true
		vehicle.steering.wanderOn = true
	}

	public execute(vehicle: Vehicle): void {}
	public exit(vehicle: Vehicle): void {}
}

export default WanderAroundMap
