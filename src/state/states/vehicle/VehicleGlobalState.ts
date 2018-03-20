import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import DoNothing from './DoNothing'
import GetFuel from './GetFuel'
import FillTank from './FillTank'

class VehicleGlobalState implements IState<Vehicle> {
	public name = 'vehicle global state'

	public enter(vehicle: Vehicle): void {}

	public execute(vehicle: Vehicle): void {
		const { currentState, defaultState } = vehicle.stateMachine

		if (vehicle.isMoving) {
			vehicle.fuel--
		}

		if (vehicle.fuel >= vehicle.fuelMax && !vehicle.stateMachine.isInState(defaultState)) {
			vehicle.fuel = vehicle.fuelMax
			vehicle.stateMachine.toDefaultState()
		}

		if (vehicle.fuel < 500 && !(currentState instanceof GetFuel) && !(currentState instanceof FillTank)) {
			vehicle.stateMachine.changeState(new GetFuel())
		}

		if (vehicle.fuel < 1 && !(currentState instanceof DoNothing)) {
			vehicle.stateMachine.changeState(new DoNothing())
		}
	}

	public exit(vehicle: Vehicle): void {}
}

export default VehicleGlobalState
