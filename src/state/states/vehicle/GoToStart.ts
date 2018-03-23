import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import FillTank from './FillTank'
import DoNothing from './DoNothing'
import PointOfInterest from '../../../configurations/levels/base/PointOfInterest'
import RacePending from './RacePending'

class GoToStart implements IState<Vehicle> {
	public name = 'go to start'

	private _targetPoi: PointOfInterest

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()

		const poi1 = vehicle.world.level.poi('start1')
		const poi2 = vehicle.world.level.poi('start2')

		if (!poi1.occupied && !poi1.reserved) { // TODO: only check for reserved here
			this._targetPoi = poi1
		} else if (!poi2.occupied && !poi2.reserved) {
			this._targetPoi = poi2
		} else {
			// no poi available
			// TODO: // ChangeState(new ...)
		}

		if (typeof this._targetPoi !== 'undefined') {
			this._targetPoi.reserved = true

			// initialize path following
			const path = vehicle.world.findPath(vehicle.position, this._targetPoi.point)
			vehicle.steering.targetPositions = path
			vehicle.steering.targetPosition = vehicle.steering.targetPositions[0]
			vehicle.steering.followPathOn = true
		}
	}

	public execute(vehicle: Vehicle): void {
		// TODO: Check underway if poi becomes occupied
		// if so, then plan another path

		if (typeof this._targetPoi !== 'undefined' && Vector2D.equalsRounded(vehicle.position, this._targetPoi.point, 24)) {
			vehicle.stop()
			this._targetPoi.occupied = true
			vehicle.stateMachine.changeState(new RacePending())
		}
	}

	public exit(vehicle: Vehicle): void {	}
}

export default GoToStart
