import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'
import * as SVG from 'svg.js'
import SteeringBehaviors from '../behavior/SteeringBehaviors'

class Vehicle extends MovingEntity {
	private _steering = new SteeringBehaviors(this)

	constructor(
		world: World,
		position: Vector2D = new Vector2D(-400, -100),
	) {
		super(world, position)
		this.velocity = new Vector2D()
	}

	public update(delta: number): void {
		// calculate the combined force from each steering behavior in the vehicle’s list
		const steeringForce = this._steering.seek(new Vector2D(400, 0))	// Vector2D SteeringForce = m_pSteering->Calculate();)

		// Acceleration = Force/Mass
		const acceleration = Vector2D.divide(steeringForce, this.mass) // SVector2D acceleration = SteeringForce / m_dMass;

		// update velocity
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta)) // m_vVelocity += acceleration * time_elapsed;

		// make sure vehicle does not exceed maximum velocity
		this.velocity = Vector2D.vTruncate(this.velocity, this.maxSpeed) // m_vVelocity.Truncate(m_dMaxSpeed);

		// update the position
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta)) // m_vPos += m_vVelocity * time_elapsed;

		// update the heading if the vehicle has a velocity greater than a very small value
		// if (m_vVelocity.LengthSq() > 0.00000001) {
		// 	m_vHeading = Vec2DNormalize(m_vVelocity);
		// 	m_vSide = m_vHeading.Perp();
		// }
		if (this.velocity.lengthSq() > 0.00000001) {
			this.heading = Vector2D.vNormalize(this.velocity)
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
