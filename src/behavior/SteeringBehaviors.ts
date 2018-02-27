import Vector2D from '../utils/Vector2D'
import Vehicle from '../entity/Vehicle'
import DecelerationLevel from './DecelerationLevel'

class SteeringBehaviors {
	constructor(private _vehicle: Vehicle) { }

	/**
	 * A vector seeking a target position 
	 * @param targetPos the position to move to
	 */
	public seek(targetPos: Vector2D): Vector2D {
		const normalized = Vector2D.normalize(Vector2D.subtract(targetPos, this._vehicle.position))
		return Vector2D.subtract(Vector2D.multiply(normalized, this._vehicle.maxSpeed), this._vehicle.velocity)
	}

	/**
	 * A Vector fleeing a target position 
	 * @param targetPos the position to flee away from
	 * @param panicDistance The distance from the targetPos when to flee
	 */
	public flee(targetPos: Vector2D, panicDistance = 0): Vector2D  {
		if (panicDistance && Vector2D.distanceSq(this._vehicle.position, targetPos) > (panicDistance * panicDistance)) {
			return new Vector2D(0, 0)
		}

		const normalized = Vector2D.normalize(Vector2D.subtract(this._vehicle.position, targetPos))
		return Vector2D.subtract(Vector2D.multiply(normalized, this._vehicle.maxSpeed), this._vehicle.velocity)
	}

	/**
	 * A Vector smoothly arriving at a target position
	 * @param targetPos The position to arrive on
	 * @param deceleration The level of deceleration
	 */
	public arrive(targetPos: Vector2D, deceleration = DecelerationLevel.normal): Vector2D {
		const ToTarget = Vector2D.subtract(targetPos, this._vehicle.position) // calculate the distance to the target position
		const dist = ToTarget.length

		if (dist > 0) {
			let speed = dist / (deceleration * 0.5) // the speed required to reach the target given the desired deceleration, '0.5' is tweaker.
			speed = Math.min(speed, this._vehicle.maxSpeed) // make sure the velocity does not exceed the max
			const desiredVelocity = Vector2D.multiply(ToTarget, speed / dist)
			return Vector2D.subtract(desiredVelocity, this._vehicle.velocity)
		}

		return new Vector2D(0, 0)
	}

	/**
	 * A Vector pursuing an evader
	 * @param evader The vehicle to persuit
	 */
	public pursuit(evader: Vehicle): Vector2D {
		const toEvader = Vector2D.subtract(evader.position, this._vehicle.position)
		const relativeHeading = Vector2D.dot(this._vehicle.heading, evader.heading)

		// turn directly towards the evader if its 'directly' in front
		if (Vector2D.dot(toEvader, this._vehicle.heading) > 0 && relativeHeading < -0.95) { // acos(0.95) = 18 degs
			return this.seek(evader.position)
		}

		const lookAheadTime = (toEvader.length / (this._vehicle.maxSpeed + evader.speed))
		return this.seek(Vector2D.add(evader.position, Vector2D.multiply(evader.velocity, lookAheadTime)))
	}

	/**
	 * A Vector evading a pursuer
	 * @param pursuer The vehicle to evade
	 */
	public evade(pursuer: Vehicle): Vector2D {
		const toPursuer = Vector2D.subtract(pursuer.position, this._vehicle.position)
		const lookAheadTime = (toPursuer.length / (this._vehicle.maxSpeed + pursuer.speed))
		return this.flee(Vector2D.add(pursuer.position, Vector2D.multiply(pursuer.velocity, lookAheadTime)))
	}
}

export default SteeringBehaviors
