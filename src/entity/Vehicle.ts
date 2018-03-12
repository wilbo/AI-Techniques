import IMovingEntity from './base/IMovingEntity'
import Entity from './base/Entity'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import Context from '../context/Context'
import SteeringBehaviors from '../behavior/SteeringBehaviors'
import EntityType from './base/EntityType'
import Matrix2D from '../utils/Matrix2D'

class Vehicle extends Entity implements IMovingEntity {
	private _steering = new SteeringBehaviors(this)
	private _target = Vector2D.random(this.world.context.width, this.world.context.height)
	private _steeringForce: Vector2D
	private _f: Vector2D

	constructor(
		public world: World,
		public position = new Vector2D(),
		public velocity = new Vector2D(),
		public heading = new Vector2D(),
		public side = new Vector2D(),
		public mass = 0.5,
		public maxSpeed = 300,
		public maxForce = 1,
		public maxTurnRate = 0.05,
	) { super(world, EntityType.Vehicle, 25, position) }

	public get speed(): number {
		return this.velocity.length
	}

	public get speedSq(): number {
		return this.velocity.lengthSq
	}

	public get atMaxSpeed(): boolean {
		return this.maxSpeed * this.maxSpeed >= this.velocity.lengthSq
	}

	public update(delta: number): void {
		if (Vector2D.equalsRounded(this._target, this.position)) {
			this._target = Vector2D.random(this.world.context.width, this.world.context.height)
		}

		this._steeringForce = this._steering.obstacleAvoidance()
		// this._steeringForce = this._steering.seek(this._target)
		// this._steeringForce = this._steering.wander()
		const acceleration = Vector2D.divide(this._steeringForce, this.mass) // acceleration = force / mass
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta)) // update velocity
		this.velocity = Vector2D.truncate(this.velocity, this.maxSpeed) // make sure vehicle does not exceed maximum velocity
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta)) // update the position

		if (this.velocity.lengthSq > 0.00000001) {
			// update the heading if the vehicle has a velocity greater than a very small value
			this.heading = Vector2D.normalize(this.velocity)
			this.side = Vector2D.perp(this.heading)
		}

		// this._f = this._steering.obstacleAvoidance()
	}

	public render(context: Context) {
		context.drawVehicle(this.position, Vector2D.angle(this.heading))
	}
}

export default Vehicle
