import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import Vector2D from '../../../utils/Vector2D'
import FillTank from './FillTank'
import DoNothing from './DoNothing'
import PointOfInterest from '../../../configurations/levels/base/PointOfInterest'
import Race from './Race'

class RacePending implements IState<Vehicle> {
	public name = 'race pending'

	private _started = false
	private _startDelayMs = 2000
	private _start1: PointOfInterest
	private _start2: PointOfInterest

	public enter(vehicle: Vehicle): void {
		vehicle.steering.reset()

		this._start1 = vehicle.world.level.poi('start1')
		this._start2 = vehicle.world.level.poi('start2')
	}

	public execute(vehicle: Vehicle): void {
		// both cars are ready at the start
		if (this._start1.occupied && this._start2.occupied && !this._started) {
			this._started = true
			// start racing after a delay
			setTimeout(() => vehicle.stateMachine.changeState(new Race()), this._startDelayMs)
		}
	}

	public exit(vehicle: Vehicle): void {
		// reset start poi's
		this._start2.clear()
		this._start1.clear()
	}
}

export default RacePending
