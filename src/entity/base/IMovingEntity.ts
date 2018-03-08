
import Entity from './Entity'
import Vector2D from '../../utils/Vector2D'

interface IMovingEntity {
	velocity: Vector2D //
	heading: Vector2D // normalized vector pointing in the direction the entity is heading.
	side: Vector2D // vector perpendicular to the heading vector
	mass: number //
	maxSpeed: number // maximum speed at which this entity may travel.
	maxForce: number // maximum force this entity can produce to power itself (think rockets and thrust)
	maxTurnRate: number // maximum rate (radians per second) at which this vehicle can rotate

	// calculated properties
	speed: number
	speedSq: number
	atMaxSpeed: boolean
}

export default IMovingEntity
