import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'

class DoNothing implements IState<Vehicle> {
	public name = 'do nothing'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		vehicle.stop()
	}

	public execute(vehicle: Vehicle): void {}
	public exit(vehicle: Vehicle): void {}
}

export default DoNothing
