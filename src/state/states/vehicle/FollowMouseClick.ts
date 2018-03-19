import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import Matrix2D from '../../../utils/Matrix2D'
import FillTank from './FillTank'

class FollowMouseClick implements IState<Vehicle> {
	public name = 'follow mouse click'

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		vehicle.world.onClickListeners.push(this.onWorldClick.bind(vehicle))
	}

	// tslint:disable-next-line:no-empty
	public execute(vehicle: Vehicle): void {}

	public exit(vehicle: Vehicle): void {
		console.log('exit' + name)
	}

	private onWorldClick = function(this: Vehicle, clickedPosition: Vector2D): void {
		const path = this.world.findPath(this.position, clickedPosition)

		if (path.length > 0) {
			this.steering.targetPositions = path
			this.steering.targetPosition = this.steering.targetPositions[0]
			this.steering.followPathOn = true
		}
	}
}

export default FollowMouseClick
