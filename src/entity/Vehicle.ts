import IMovingEntity from './base/IMovingEntity'
import Entity from './base/Entity'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import Context from '../context/Context'
import SteeringBehaviors from '../behavior/SteeringBehaviors'
import EntityType from './base/EntityType'
import Matrix2D from '../utils/Matrix2D'
import VehicleType from './VehicleType'
import IStateEntity from '../state/IStateEntity'
import IState from '../state/IState'

class Vehicle extends Entity implements IMovingEntity, IStateEntity<Vehicle> {
	public velocity = new Vector2D()
	public heading = new Vector2D()
	public side = new Vector2D()
	public mass = 1
	public maxSpeed = 200
	public maxForce = 1000
	public maxTurnRate = 1
	public vehicleType = VehicleType.Red5
	public steering = new SteeringBehaviors(this)
	public updateHook: (delta: number) => void

	public readonly fuelMax = 1000
	public fuel = this.fuelMax

	private _angle: number

	constructor(
		public world: World,
		public currentState: IState<Vehicle>,
		public position = new Vector2D(0, 140),
	) {
		super(world, EntityType.Vehicle, 16, position)
		this.currentState.enter(this)
	}

	public get speed(): number {
		return this.velocity.length
	}

	public get speedSq(): number {
		return this.velocity.lengthSq
	}

	public get atMaxSpeed(): boolean {
		return this.maxSpeed * this.maxSpeed >= this.velocity.lengthSq
	}

	public stop(): void {
		this.velocity = new Vector2D()
	}

	public update(delta: number): void {
		this.currentState.execute(this)

		if (typeof this.updateHook !== 'undefined') {
			this.updateHook(delta)
		}

		const acceleration = Vector2D.divide(this.steering.calculate(), this.mass) // acceleration = force / mass
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta)) // update velocity
		this.velocity = Vector2D.truncate(this.velocity, this.maxSpeed) // make sure vehicle does not exceed maximum velocity
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta)) // update the position

		if (this.velocity.lengthSq > 0.00000001) {
			this.heading = Vector2D.normalize(this.velocity)
			this.side = Vector2D.perp(this.heading)
		}

		this._angle = Vector2D.angle(this.heading)
	}

	public render(context: Context) {
		context.drawVehicle(this.position, this._angle, this.vehicleType)

		if (this.world.devMode) {
			context.drawText('     state: ' + this.currentState.name, this.position)
			context.drawText(`     fuel: ${this.fuel}/${this.fuelMax}`, Vector2D.subtract(this.position, new Vector2D(0, 20)))
		}
	}

	public changeState(state: IState<Vehicle>): void {
		this.currentState.exit(this)
		this.currentState = state
		this.currentState.enter(this)
	}
}

export default Vehicle
