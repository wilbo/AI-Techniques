import Vector2D from '../utils/Vector2D'
import Vehicle from '../entity/Vehicle'

enum Deceleration {
	fast = 1,
	normal = 2, 
	slow = 3 
}

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

	public arrive(targetPos: Vector2D, deceleration: Deceleration = Deceleration.normal): Vector2D {
		const ToTarget = Vector2D.subtract(targetPos, this._vehicle.position) // calculate the distance to the target position
		const dist = ToTarget.length

		if (dist > 0) {
			const tweaker = 0.5 // this value is required to provide fine tweaking of the deceleration
			let speed = dist / (deceleration * tweaker) // the speed required to reach the target given the desired deceleration
			speed = Math.min(speed, this._vehicle.maxSpeed) // make sure the velocity does not exceed the max
			const desiredVelocity = Vector2D.multiply(ToTarget, speed / dist)
			return Vector2D.subtract(desiredVelocity, this._vehicle.velocity)
		}

		return new Vector2D(0, 0);
	}
}

export default SteeringBehaviors
