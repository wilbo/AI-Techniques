import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import FillTank from './FillTank'
import DoNothing from './DoNothing'
import PointOfInterest from '../../../configurations/levels/base/PointOfInterest'

class GetFuel implements IState<Vehicle> {
	public name = 'get fuel'

	private _targetPoi: PointOfInterest

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()

		this._targetPoi = vehicle.world.level.poi('pit')
		this._targetPoi.reserved = true

		// initialize path following
		const path = vehicle.world.findPath(vehicle.position, this._targetPoi.point)
		vehicle.steering.targetPositions = path
		vehicle.steering.targetPosition = vehicle.steering.targetPositions[0]
		vehicle.steering.followPathOn = true
	}

	public execute(vehicle: Vehicle): void {
		if (Vector2D.equalsRounded(vehicle.position, this._targetPoi.point, 24)) {
			this._targetPoi.occupied = true
			vehicle.stop()
			vehicle.stateMachine.changeState(new FillTank())
		}
	}

	public exit(vehicle: Vehicle): void {
		this._targetPoi.occupied = false
		this._targetPoi.reserved = false
	}
}

export default GetFuel
