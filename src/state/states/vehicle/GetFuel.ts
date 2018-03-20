import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import Matrix2D from '../../../utils/Matrix2D'
import FillTank from './FillTank'
import DoNothing from './DoNothing'

class GetFuel implements IState<Vehicle> {
	public name = 'get fuel'

	private pitPosition = new Vector2D(216, 264)

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()

		// initialize path following
		const path = vehicle.world.findPath(vehicle.position, this.pitPosition)
		vehicle.steering.targetPositions = path
		vehicle.steering.targetPosition = vehicle.steering.targetPositions[0]
		vehicle.steering.followPathOn = true
	}

	public execute(vehicle: Vehicle): void {
		vehicle.fuel--

		if (Vector2D.equalsRounded(vehicle.position, this.pitPosition, 24)) {
			vehicle.stop()
			vehicle.changeState(new FillTank())
		}

		if (vehicle.fuel === 0) {
			vehicle.changeState(new DoNothing())
		}
	}

	public exit(vehicle: Vehicle): void {
		console.log('exit' + name)
	}
}

export default GetFuel
