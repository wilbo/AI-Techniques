import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'
import SteeringBehaviors from '../behavior/SteeringBehaviors'
import Context from '../context/Context';

class Vehicle extends MovingEntity {
	private _steering = new SteeringBehaviors(this)
	private _target = this.randomVector()

	constructor(
		public world: World,
		public position: Vector2D = new Vector2D(),
	) {
		super(world, position)
		this.velocity = new Vector2D()
	}

	public update(delta: number): void {
		// if (Vector2D.equalsRounded(this._target, this.position)) {
		// 	this._target = this.randomVector()
		// }

		const steeringForce = this._steering.arrive(this._target) // calculate the combined force from each steering behavior in the vehicle’s list		
		const acceleration = Vector2D.divide(steeringForce, this.mass) // acceleration = force / mass
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta)) // update velocity
		this.velocity = Vector2D.truncate(this.velocity, this.maxSpeed) // make sure vehicle does not exceed maximum velocity
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta)) // update the position

		// update the heading if the vehicle has a velocity greater than a very small value
		if (this.velocity.lengthSq > 0.00000001) {
			this.heading = Vector2D.normalize(this.velocity)
			this.side = Vector2D.perp(this.heading)			
		}
	}

	public render(context: Context): void {
		super.render(context)
		context.drawEntity(this._target, 6, 'orange')	
	}

	private randomVector(): Vector2D {
		const randX = Math.floor(Math.random() * this.world.width - (this.world.width / 2))
		const randY = Math.floor(Math.random() * this.world.height - (this.world.height / 2))
		return new Vector2D(randX, randY)
	}
}

export default Vehicle
