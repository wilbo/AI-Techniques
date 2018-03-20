import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'

class FillTank implements IState<Vehicle> {
	public name = 'fill tank'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
	}

	public execute(vehicle: Vehicle): void {
		vehicle.fuel += 4
	}

	public exit(vehicle: Vehicle): void {}
}

export default FillTank
