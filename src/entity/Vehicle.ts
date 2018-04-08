import IMovingEntity from './base/IMovingEntity'
import Entity from './base/Entity'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import Context from '../context/Context'
import SteeringBehaviors from '../behavior/SteeringBehaviors'
import EntityType from './base/EntityType'
import Matrix2D from '../utils/Matrix2D'
import VehicleType from './VehicleType'
import Utils from '../utils/Utils'
import StateMachine from '../state/StateMachine'
import IState from '../state/IState'
import VehicleGlobalState from '../state/states/vehicle/VehicleGlobalState'
import ImageLoader from '../utils/ImageLoader'
import FuzzyModule from '../fuzzy/FuzzyModule'
import GetFuel from '../state/states/vehicle/GetFuel'

class Vehicle extends Entity implements IMovingEntity {
	public velocity = new Vector2D()
	public heading = new Vector2D()
	public side = new Vector2D()
	public mass = 1
	public maxForce = 1000
	public maxTurnRate = 1
	public steering = new SteeringBehaviors(this)
	public updateHook: (delta: number) => void
	public stateMachine: StateMachine<Vehicle>
	public maxSpeedMultiplier: number
	public readonly fuelMax = 2500
	public readonly fuelSubtractor = Utils.randomFloat(1, 2)
	public fuel = this.fuelMax
	public distToPit: number = 0
	public accSeconds: number = 0

	private readonly _defaultMaxSpeed = 250
	private _angle: number
	private _image: HTMLImageElement
	private _pitPosition: Vector2D

	constructor(
		public world: World,
		defaultState: IState<Vehicle>,
		public fuzzyModule: FuzzyModule,
		public vehicleType = VehicleType.Red5,
		public position = new Vector2D(0, 140),
	) {
		super(world, EntityType.Vehicle, 16, position)
		this._pitPosition = this.world.level.poi('pit').point
		this.setSpeedMultiplier()
		this.stateMachine = new StateMachine<Vehicle>(this, new VehicleGlobalState(), defaultState)
	}

	/**
	 * Calculates the maxspeed based on the position on the map
	 */
	public get maxSpeed(): number {
		const node = this.world.navGraph.node(Utils.positionToCoordinate(this.position, this.world, false))
		return (this._defaultMaxSpeed - (node !== null ? node.cost * (10 /* cost weight */) : 0)) * this.maxSpeedMultiplier
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

	public get isMoving(): boolean {
		return this.velocity.lengthSq > 0.00000001
	}

	public setSpeedMultiplier() {
		this.maxSpeedMultiplier = Utils.randomFloat(0.8, 1.2)
	}

	public stop(): void {
		this.velocity = new Vector2D()
	}

	public update(delta: number): void {
		if (typeof this.updateHook !== 'undefined') {
			this.updateHook(delta)
		}

		const acceleration = Vector2D.divide(this.steering.calculate(), this.mass) // acceleration = force / mass
		this.velocity = Vector2D.add(this.velocity, Vector2D.multiply(acceleration, delta)) // update velocity
		this.velocity = Vector2D.truncate(this.velocity, this.maxSpeed) // make sure vehicle does not exceed maximum velocity
		this.position = Vector2D.add(this.position, Vector2D.multiply(this.velocity, delta)) // update the position

		if (this.isMoving) {
			this.heading = Vector2D.normalize(this.velocity)
			this.side = Vector2D.perp(this.heading)
		}

		// update the angle of the vehicle's heading
		this._angle = Vector2D.angle(this.heading)

		// execute the globalstate and currentstate
		this.stateMachine.update()

		// this is necessary for the fuzzy logic calculation inside
		this.accSeconds += delta
		this.distToPit = Math.round(Vector2D.distanceSq(this._pitPosition, this.position))
	}

	public render(context: Context) {
		if (typeof this._image === 'undefined') {
			this._image = ImageLoader.vehicle(this.vehicleType)
		} else {
			context.drawVehicle(this.position, this._angle, this._image)
		}

		if (this.world.devMode) {
			context.drawText('      state: ' + this.stateMachine.currentState.name, this.position)
			context.drawText(`      fuel: ${Math.round(this.fuel)}/${this.fuelMax}`, Vector2D.subtract(this.position, new Vector2D(0, 20)))
			context.drawText(`      dist: ${this.distToPit}`, Vector2D.subtract(this.position, new Vector2D(0, 40)))
		}
	}
}

export default Vehicle
