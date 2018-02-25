import Entity from './Entity'
import Vector2D from '../utils/Vector2D'
import World from '../game/World'
import Context from '../context/Context';

class MovingEntity extends Entity {
	public velocity: Vector2D = new Vector2D()			//
	public heading: Vector2D = new Vector2D() 												// normalized vector pointing in the direction the entity is heading.
	public side: Vector2D														// vector perpendicular to the heading vector
	public mass: number	= 0.5												//
	public maxSpeed: number = 300 									// maximum speed at which this entity may travel.
	public maxForce: number 												// maximum force this entity can produce to power itself (think rockets and thrust)
	public maxTurnRate: number 											// maximum rate (radians per second) at which this vehicle can rotate
	public origin = new Vector2D(0, -1)

	constructor(world: World, position: Vector2D = new Vector2D()) { super(world, position) }

	public update(delta: number): void { }

	public render(context: Context): void {
		context.drawVehicle(this.position, 8, Vector2D.angle(this.heading))
	}
}

export default MovingEntity
