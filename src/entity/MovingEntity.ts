import * as SVG from 'svg.js'
import Entity from './Entity'
import Vector2D from '../utils/Vector2D'
import World from '../game/World'

class MovingEntity extends Entity {
	public velocity: Vector2D = new Vector2D()			//
	public heading: Vector2D 												// normalized vector pointing in the direction the entity is heading.
	public side: Vector2D														// vector perpendicular to the heading vector
	public mass: number	= 1													//
	public maxSpeed: number = 10 										// maximum speed at which this entity may travel.
	public maxForce: number 												// maximum force this entity can produce to power itself (think rockets and thrust)
	public maxTurnRate: number 											// maximum rate (radians per second) at which this vehicle can rotate

	constructor(world: World, position: Vector2D = new Vector2D()) { super(world, position) }

	public update(delta: number): void {
		throw new Error('Method not implemented.')
	}

	public render(context: SVG.G): void {
		context
			.polyline([0, 0, 30, 10, 0, 20])
			.translate(-15, -5)
			.move(Math.round(this.position.x), Math.round(this.position.y))
	}
}

export default MovingEntity
