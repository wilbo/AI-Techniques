import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'
import * as SVG from 'svg.js'

class Vehicle extends MovingEntity {
	constructor(
		world: World,
		position: Vector2D = new Vector2D(),
	) {
		super(world, position)
		this.velocity = new Vector2D()
	}

	public update(delta: number): void {
		// calculate the combined force from each steering behavior in the vehicle’s list
		// Vector2D SteeringForce = m_pSteering->Calculate();
		// TODO: const steeringForce: Vector2D = this.steering.calculate()

		// Acceleration = Force/Mass
		// SVector2D acceleration = SteeringForce / m_dMass;
		// TODO: acceleration: SVector2D ???
		const acceleration: number = 1 / this.mass

		// update velocity
		// m_vVelocity += acceleration * time_elapsed;
		this.velocity.addValue(acceleration * delta)

		// make sure vehicle does not exceed maximum velocity
		// m_vVelocity.Truncate(m_dMaxSpeed);
		this.velocity.truncate(this.maxSpeed)

		// update the position
		// m_vPos += m_vVelocity * time_elapsed;
		this.position.add(this.velocity.multiply(delta))

		// update the heading if the vehicle has a velocity greater than a very small value
		// if (m_vVelocity.LengthSq() > 0.00000001) {
		// 	m_vHeading = Vec2DNormalize(m_vVelocity);
		// 	m_vSide = m_vHeading.Perp();
		// }
		if (this.velocity.lengthSq() > 0.00000001) {
			this.heading = this.velocity.normalize()
			this.side = this.heading.perp()
		}
	}
}

export default Vehicle

// // // float acceleration = ForceOnShip / m_fMass;
// const acceleration = .001 / this.mass
// // // m_Velocity += acceleration * TimeElapsedSinceLastUpdate;
// this.velocity.addValue(acceleration * delta)
// // // m_vPosition += m_Velocity * TimeElapsedSinceLastUpdate;
// this.velocity = this.velocity.truncate(1)
// this.position.x += this.velocity.multiply(delta).x

// // reset
// if (this.position.x > 400) {
// 	this.position = new Vector2D(-400, 0)
// }
