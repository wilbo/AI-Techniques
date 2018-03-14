import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import EntityType from './base/EntityType'
import Utils from '../utils/Utils'

class ObstacleRect extends Entity {
	constructor(
		public world: World,
		public width: number = Utils.randomInt(100, 250),
		public height: number = Utils.randomInt(100, 250),
		public position: Vector2D = Vector2D.random(world.width, world.height),
		public invisble: boolean = false,
	) { super(world, EntityType.ObstacleRect, width, position) }

	public update(delta: number): void { return }

	public render(context: Context): void {
		if (!this.invisble) {
			context.drawObstacleRect(this.position, this.width, this.height)
		}
	}

	/**
	 * Return the top left vector position
	 */
	public get topLeft(): Vector2D {
		return this.position
	}

	/**
	 * Return the top right vector position
	 */
	public get topRight(): Vector2D {
		return new Vector2D(this.position.x + this.width, this.position.y)
	}

	/**
	 * Return the bottom left vector position
	 */
	public get bottomLeft(): Vector2D {
		return new Vector2D(this.position.x, this.position.y - this.height)
	}

	/**
	 * Return the bottom right vector position
	 */
	public get bottomRight(): Vector2D {
		return new Vector2D(this.position.x + this.width, this.position.y - this.height)
	}
}

export default ObstacleRect
