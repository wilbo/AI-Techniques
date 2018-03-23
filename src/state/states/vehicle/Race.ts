import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import FillTank from './FillTank'
import DoNothing from './DoNothing'
import PointOfInterest from '../../../configurations/levels/base/PointOfInterest'
import Utils from '../../../utils/Utils'
import WanderAroundMap from './WanderAroundMap'

class Race implements IState<Vehicle> {
	public name = 'race'

	private _targetPoi: PointOfInterest

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()
		// set speed
		vehicle.setSpeedMultiplier()
		// Start race
		const start1 = vehicle.world.level.poi('start1')
		const start2 = vehicle.world.level.poi('start2')
		const finish1 = vehicle.world.level.poi('finish1')
		const finish2 = vehicle.world.level.poi('finish2')

		this._targetPoi = Vector2D.equalsRounded(vehicle.position, start1.point, vehicle.world.cellSize * 0.5) ? finish1 : finish2
		this._targetPoi.reserved = true

		// initialize path following
		const path = vehicle.world.findPath(vehicle.position, this._targetPoi.point)
		vehicle.steering.targetPositions = path
		vehicle.steering.targetPosition = vehicle.steering.targetPositions[0]
		vehicle.steering.followPathOn = true
	}

	public execute(vehicle: Vehicle): void {
		if (Vector2D.equalsRounded(vehicle.position, this._targetPoi.point, 24)) {
			vehicle.stateMachine.changeState(new WanderAroundMap())
		}
	}

	public exit(vehicle: Vehicle): void {
		vehicle.setSpeedMultiplier()
	}
}

export default Race
