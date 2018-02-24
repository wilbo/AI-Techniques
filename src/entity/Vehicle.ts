import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import MovingEntity from './MovingEntity'
import SteeringBehaviors from '../behavior/SteeringBehaviors'
import Context from '../context/Context';

class Vehicle extends MovingEntity {
	private _steering = new SteeringBehaviors(this)
	private _target = this.randomVector()
	private _angle: number = 0

	constructor(
		public world: World,
		public position: Vector2D = new Vector2D(),
	) {
		super(world, position)	
		this.velocity = new Vector2D()
	}

	public update(delta: number): void {
		if (Vector2D.equalsRounded(this._target, this.position)) {
			this._target = this.randomVector()
		}

		// calculate the combined force from each steering behavior in the vehicle’s list
		const steeringForce = this._steering.seek(this._target)

		// Acceleration = Force/Mass
		const acceleration = Vector2D.divide(steeringForce, this.mass)
		// const acceleration = Vector2D.divide(new Vector2D(), this.mass)

		// update velocity
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta))

		// make sure vehicle does not exceed maximum velocity
		this.velocity = Vector2D.vTruncate(this.velocity, this.maxSpeed)

		// update the position
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta))

		// update the heading if the vehicle has a velocity greater than a very small value
		if (this.velocity.lengthSq() > 0.00000001) {
			this.heading = Vector2D.vNormalize(this.velocity)
			this.side = Vector2D.vPerp(this.heading)
		}

		const origin = new Vector2D(0, -1)
		const cosT = this.heading.dot(origin) / (this.heading.length() * origin.length())
		this._angle = Math.acos(cosT)
		if (this.heading.sign(origin) === 1) {
			this._angle = (Math.PI * 2) - this._angle
		}
	}

	public render(context: Context): void {
		context.drawVehicle(this.position, 8, this._angle)

		// stuff
		// context.drawEntity(Vector2D.add(this.heading, this.position), 10, 'red')
		// context.drawEntity(Vector2D.add(this.side, this.position), 10, 'blue')
		// context.drawEntity(Vector2D.add(this.velocity, this.position), 10, 'green')
		// context.drawEntity(this._target, 10, 'orange')
	}

	private randomVector(): Vector2D {
		const randX = Math.floor(Math.random() * this.world.width - (this.world.width / 2))
		const randY = Math.floor(Math.random() * this.world.height - (this.world.height / 2))
		return new Vector2D(randX, randY)
	}

	private toDegree(radians: number): number {
		return radians * (180 / Math.PI)
	}
}

export default Vehicle
