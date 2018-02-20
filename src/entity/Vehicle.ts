import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'
import * as SVG from 'svg.js'

class Vehicle extends MovingEntity {
	constructor(
		world: World,
		position: Vector2D = new Vector2D(0, 0),
	) { super(world, position) }

	public update(delta: number): void {
		// const { height, width } = this.world
		// const { x, y } = this.position
		// if (x > width) {
		// 	this.position.x = 0
		// }
		// this.position.x += 2

		// calculate the combined force from each steering behavior in the vehicle’s list
		// Vector2D SteeringForce = m_pSteering->Calculate();

		// Acceleration = Force/Mass
		// SVector2D acceleration = SteeringForce / m_dMass;

		// update velocity
		// m_vVelocity += acceleration * time_elapsed;

		// make sure vehicle does not exceed maximum velocity
		// m_vVelocity.Truncate(m_dMaxSpeed);

		// update the position
		// m_vPos += m_vVelocity * time_elapsed;

		// update the heading if the vehicle has a velocity greater than a very small value
		// if (m_vVelocity.LengthSq() > 0.00000001) {
		// 	m_vHeading = Vec2DNormalize(m_vVelocity);
		// 	m_vSide = m_vHeading.Perp();
		// }

		// treat the screen as a toroid
		// WrapAround(m_vPos, m_pWorld->cxClient(), m_pWorld->cyClient());

	}
}

export default Vehicle
