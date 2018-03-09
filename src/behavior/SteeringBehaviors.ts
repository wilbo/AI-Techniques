import Vector2D from '../utils/Vector2D'
import Vehicle from '../entity/Vehicle'
import DecelerationLevel from './DecelerationLevel'
import Utils from '../utils/utils'
import Entity from '../entity/base/Entity'
import Obstacle from '../entity/Obstacle'

class SteeringBehaviors {
	public wanderTarget: Vector2D

	private readonly _wanderRadius: number = 80 // the radius of the constraining circle for the wander behavior
	private readonly _wanderDistance: number = 40 // distance the wander circle is projected in front of the agent
	private readonly _wanderJitter: number = 40 // the maximum amount of displacement along the circle each frame

	private readonly _distanceFromBoundary = 30 // for hiding spot

	constructor(private _vehicle: Vehicle) {

		// create a vector to a target position on the wander circle
		const theta = Math.random() * (Math.PI * 2)
		this.wanderTarget = new Vector2D(this._wanderRadius * Math.cos(theta), this._wanderRadius * Math.sin(theta))
	}

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
	public flee(targetPos: Vector2D, panicDistance = 0): Vector2D {
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
		const toTarget = Vector2D.subtract(targetPos, this._vehicle.position) // calculate the distance to the target position
		const dist = toTarget.length

		if (dist > 0) {
			// the speed required to reach the target given the desired deceleration, '0.5' is tweaker.
			let speed = dist / (deceleration * 0.5)
			speed = Math.min(speed, this._vehicle.maxSpeed) // make sure the velocity does not exceed the max
			const desiredVelocity = Vector2D.multiply(toTarget, speed / dist)
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

	/**
	 * A vector wandering in random directions
	 */
	public wander(): Vector2D {
		const random = new Vector2D(Utils.randomClamped() * this._wanderJitter, Utils.randomClamped() * this._wanderJitter)
		// add a small random vector to the target's position
		this.wanderTarget = Vector2D.normalize(Vector2D.add(this.wanderTarget, random))
		// increase the length to the same as the wander circle radius
		this.wanderTarget = Vector2D.multiply(this.wanderTarget, this._wanderRadius)
		// move the target into a position WanderDist in front of the agent
		return Vector2D.add(this.wanderTarget, new Vector2D(this._wanderDistance, 0))
	}

	/**
	 * Hide from a target behind an obstacle
	 * @param target the vehicle that is about to hide
	 * @param obstacles The obstacles to choose from
	 */
	public hide(target: Vehicle, obstacles: Obstacle[]) {
		let distToClosest = Number.MAX_VALUE
		let bestHidingSpot = new Vector2D()

		for (const obstacle of obstacles) {
			const hidingSpot = this.getHidingPosition(obstacle.position, obstacle.radius, target.position)
			const distance = Vector2D.distanceSq(hidingSpot, this._vehicle.position)

			if (distance < distToClosest) {
				distToClosest = distance
				bestHidingSpot = hidingSpot
			}
		}

		if (distToClosest === Number.MAX_VALUE) {
			return this.evade(target)
		}

		return this.arrive(bestHidingSpot, DecelerationLevel.fast)
	}

	/**
	 * Returns a hiding position based on a target and obstacle
	 * @param obstaclePosition The position of the obstacle
	 * @param obstacleRadius The radius of the obstacle
	 * @param targetPosition the position of the target to hide from
	 */
	private getHidingPosition(obstaclePosition: Vector2D, obstacleRadius: number, targetPosition: Vector2D): Vector2D {
		// calculate how far away the agent is to be from the chosen obstacle’s bounding radius
		const distAway = obstacleRadius + this._distanceFromBoundary
		// calculate the heading toward the object from the target
		const toOb = Vector2D.normalize(Vector2D.subtract(obstaclePosition, targetPosition))
		// scale it to size and add to the obstacle's position to get the hiding spot.
		return Vector2D.add(Vector2D.multiply(toOb, distAway), obstaclePosition)
	}
}

export default SteeringBehaviors
