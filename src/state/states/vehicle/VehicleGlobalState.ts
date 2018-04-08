import IState from '../../IState'
import Vehicle from '../../../entity/Vehicle'
import DoNothing from './DoNothing'
import GetFuel from './GetFuel'
import FillTank from './FillTank'
import Vector2D from '../../../utils/Vector2D'

class VehicleGlobalState implements IState<Vehicle> {
	public name = 'vehicle global state'

	public enter(vehicle: Vehicle): void {}

	public execute(vehicle: Vehicle): void {
		const { currentState, defaultState } = vehicle.stateMachine

		if (vehicle.isMoving) {
			vehicle.fuel -= vehicle.fuelSubtractor
		}

		if (vehicle.fuel >= vehicle.fuelMax && !vehicle.stateMachine.isInState(defaultState)) {
			vehicle.fuel = vehicle.fuelMax
			vehicle.stateMachine.toDefaultState()
		}

		// Commented because:
		// Getting fuel is currenty based on fuzzy logic
		//
		// if (vehicle.fuel < 500 && !(currentState instanceof GetFuel) && !(currentState instanceof FillTank)) {
		// 	vehicle.stateMachine.changeState(new GetFuel())
		// }

		// run every second
		if (vehicle.accSeconds > 1) {
			if (this.calculateFuelAdvice(vehicle, vehicle.distToPit, vehicle.fuel) > 50) {
				vehicle.stateMachine.changeState(new GetFuel())
			}
			
			vehicle.accSeconds = 0
		}

		if (vehicle.fuel < 1 && !(currentState instanceof DoNothing)) {
			vehicle.stateMachine.changeState(new DoNothing())
		}
	}

	public exit(vehicle: Vehicle): void {}

	private calculateFuelAdvice(vehicle: Vehicle, dist: number, fuelLevel: number): number {
		vehicle.fuzzyModule.fuzzify('distToFuel', dist)
		vehicle.fuzzyModule.fuzzify('fuelLevel', fuelLevel)

		return vehicle.fuzzyModule.deFuzzify('fuelAdvice')
	}
}

export default VehicleGlobalState
