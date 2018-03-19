import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import Matrix2D from '../../../utils/Matrix2D'
import FillTank from './FillTank'

class DoNothing implements IState<Vehicle> {
	public name = 'do nothing'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		vehicle.velocity = new Vector2D()
	}

	// tslint:disable-next-line:no-empty
	public execute(vehicle: Vehicle): void {}

	public exit(vehicle: Vehicle): void {
		console.log('exit' + name)
	}
}

export default DoNothing
