import Vector2D from '../utils/Vector2D'

class SteeringBehaviors {
	public seek(targetPos: Vector2D): Vector2D {
		// const desiredVelocity = Vec2DNormalize(TargetPos - m_pVehicle->Pos()) * m_pVehicle->MaxSpeed()
		// return (desiredVelocity - m_pVehicle->Velocity())
		return new Vector2D()
	}
}

export default SteeringBehaviors
