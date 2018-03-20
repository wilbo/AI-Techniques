import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import Matrix2D from '../../../utils/Matrix2D'
import WanderAroundMap from './WanderAroundMap'

class FillTank implements IState<Vehicle> {
	public name = 'fill tank'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
	}

	public execute(vehicle: Vehicle): void {
		vehicle.fuel += 4

		if (vehicle.fuel >= vehicle.fuelMax) {
			vehicle.changeState(new WanderAroundMap())
		}
	}

	public exit(vehicle: Vehicle): void {
		console.log('exit' + name)
	}
}

export default FillTank
