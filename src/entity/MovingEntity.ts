import * as SVG from 'svg.js'
import Entity from './Entity'
import Vector2D from '../utils/Vector2D'
import World from '../game/World'

class MovingEntity extends Entity {
	protected _velocity: Vector2D
	protected _heading: Vector2D // normalized vector pointing in the direction the entity is heading.
	protected _side: Vector2D // vector perpendicular to the heading vector
	protected _mass: number
	protected _maxSpeed: number // maximum speed at which this entity may travel.
	protected _maxForce: number // maximum force this entity can produce to power itself (think rockets and thrust)
	protected _maxTurnRate: number // maximum rate (radians per second) at which this vehicle can rotate

	constructor(world: World, position: Vector2D = new Vector2D()) { super(world, position) }

	public get velocity(): Vector2D { return this._velocity }
	public get heading(): Vector2D { return this._heading }
	public get side(): Vector2D { return this._side }
	public get mass(): number { return this._mass }
	public get maxSpeed(): number { return this._maxSpeed }
	public get maxForce(): number { return this._maxForce }
	public get maxTurnRate(): number { return this._maxTurnRate }

	public update(delta: number): void {
		throw new Error('Method not implemented.')
	}

	public render(context: SVG.G): void {
		context.polyline([0, 0, 30, 10, 0, 20]).x(this.position.x).y(this.position.y).center(0, 0)
	}
}

export default MovingEntity
