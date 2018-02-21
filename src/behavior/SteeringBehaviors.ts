import Vector2D from '../utils/Vector2D'
import Vehicle from '../entity/Vehicle'

class SteeringBehaviors {

	constructor(private _vehicle: Vehicle) {

	}

	public seek(targetPos: Vector2D): Vector2D {
		// c++
		// Vector2D DesiredVelocity = Vec2DNormalize(TargetPos - m_pVehicle->Pos()) * m_pVehicle->MaxSpeed();
		// return (DesiredVelocity - m_pVehicle->Velocity());

		const normalized = Vector2D.vNormalize(Vector2D.subtract(targetPos, this._vehicle.position))
		const multiplied = Vector2D.multiply(normalized, this._vehicle.maxSpeed)
		return Vector2D.subtract(multiplied, this._vehicle.velocity)
	}
}

export default SteeringBehaviors
