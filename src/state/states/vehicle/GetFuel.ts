import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
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
		if (Vector2D.equalsRounded(vehicle.position, this.pitPosition, 24)) {
			vehicle.stop()
			vehicle.stateMachine.changeState(new FillTank())
		}
	}

	public exit(vehicle: Vehicle): void {}
}

export default GetFuel
