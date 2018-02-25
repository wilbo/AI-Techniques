import Vector2D from '../utils/Vector2D'
import Vehicle from '../entity/Vehicle'

class SteeringBehaviors {

	constructor(private _vehicle: Vehicle) { }

	public seek(targetPos: Vector2D): Vector2D {
		const normalized = Vector2D.normalize(Vector2D.subtract(targetPos, this._vehicle.position))
		return Vector2D.subtract(Vector2D.multiply(normalized, this._vehicle.maxSpeed), this._vehicle.velocity)
	}

	public flee(targetPos: Vector2D, panicDistance: number = 0): Vector2D  {
		if (panicDistance && Vector2D.distanceSq(this._vehicle.position, targetPos) > (panicDistance * panicDistance)) {
			return new Vector2D(0, 0)
		}

		const normalized = Vector2D.normalize(Vector2D.subtract(this._vehicle.position, targetPos))
		return Vector2D.subtract(Vector2D.multiply(normalized, this._vehicle.maxSpeed), this._vehicle.velocity)
	}
}

export default SteeringBehaviors
