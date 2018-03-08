import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import SteeringBehaviors from '../behavior/SteeringBehaviors'
import Entity from './Entity'
import IMovingEntity from './IMovingEntity'
import Context from '../context/Context'

class Vehicle extends Entity implements IMovingEntity {
	private _steering = new SteeringBehaviors(this)
	private _target = Vector2D.random(this.world.context.width, this.world.context.height)

	constructor(
		public world: World, 
		public position: Vector2D = new Vector2D(),
		public velocity: Vector2D = new Vector2D(),
		public heading: Vector2D = new Vector2D(),
		public side: Vector2D = new Vector2D(),
		public mass: number = 0.5,
		public maxSpeed: number = 300,
		public maxForce: number = 1,
		public maxTurnRate: number = .05
	) { super(world, position) }

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
		if (Vector2D.equalsRounded(this._target, this.position, 2)) {
			this._target = Vector2D.random(this.world.context.width, this.world.context.height)
		}

		const steeringForce = this._steering.arrive(this._target) // calculate the combined force from each steering behavior in the vehicle’s list	
		const acceleration = Vector2D.divide(steeringForce, this.mass) // acceleration = force / mass
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta)) // update velocity
		this.velocity = Vector2D.truncate(this.velocity, this.maxSpeed) // make sure vehicle does not exceed maximum velocity
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta)) // update the position

		if (this.velocity.lengthSq > 0.00000001) {
			this.heading = Vector2D.normalize(this.velocity) // update the heading if the vehicle has a velocity greater than a very small value
			this.side = Vector2D.perp(this.heading)			
		}
	}

	public render(context: Context) {
		context.drawEntity(this._target, 3, 'red')
		context.drawVehicle(this.position, Vector2D.angle(this.heading))		
	}
}

export default Vehicle
