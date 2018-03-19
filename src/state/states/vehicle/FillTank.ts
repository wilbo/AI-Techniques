import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import Matrix2D from '../../../utils/Matrix2D'
import WanderAroundMap from './WanderAroundMap'

class FillTank implements IState<Vehicle> {
	public name = 'fill tank'

	private pitPosition = new Vector2D(240, 288)

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		vehicle.velocity = new Vector2D()
	}

	public execute(vehicle: Vehicle): void {
		vehicle.fuel++

		if (vehicle.fuel === vehicle.fuelMax) {
			vehicle.changeState(new WanderAroundMap())
		}
	}

	public exit(vehicle: Vehicle): void {
		console.log('exit' + name)
	}
}

export default FillTank
