import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import FillTank from './FillTank'
import DoNothing from './DoNothing'
import PointOfInterest from '../../../configurations/levels/base/PointOfInterest'

class GoToStart implements IState<Vehicle> {
	public name = 'go to start'

	private targetPoi: PointOfInterest

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()

		const poi1 = vehicle.world.level.poi('start1')
		const poi2 = vehicle.world.level.poi('start2')

		if (!poi1.occupied && !poi1.reserved) { // TODO: only check for reserved here
			this.targetPoi = poi1
		} else if (!poi2.occupied && !poi2.reserved) {
			this.targetPoi = poi2
		} else {
			// no poi available
			// TODO: // ChangeState(new ...)
		}

		if (typeof this.targetPoi !== 'undefined') {
			this.targetPoi.reserved = true

			// initialize path following
			const path = vehicle.world.findPath(vehicle.position, this.targetPoi.point)
			vehicle.steering.targetPositions = path
			vehicle.steering.targetPosition = vehicle.steering.targetPositions[0]
			vehicle.steering.followPathOn = true
		}
	}

	public execute(vehicle: Vehicle): void {
		// TODO: Check underway if poi becomes occupied
		// if so, then plan another path

		if (typeof this.targetPoi !== 'undefined' && Vector2D.equalsRounded(vehicle.position, this.targetPoi.point, 24)) {
			this.targetPoi.occupied = true
			this.targetPoi.reserved = false
			vehicle.stop()
		}
	}

	public exit(vehicle: Vehicle): void {
		if (typeof this.targetPoi !== 'undefined') {
			this.targetPoi.occupied = false
			this.targetPoi.reserved = false
		}
	}
}

export default GoToStart
