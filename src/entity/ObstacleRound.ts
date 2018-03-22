import Entity from './base/Entity'
import Context from '../context/Context'
import World from '../game/World'
import Vector2D from '../utils/Vector2D'
import EntityType from './base/EntityType'
import Utils from '../utils/Utils'
import ImageLoader from '../utils/ImageLoader'

class ObstacleRound extends Entity {
	private _image: HTMLImageElement

	constructor(
		public world: World,
		public position: Vector2D = Utils.randomVector(world),
		public radius: number = world.cellSize * 0.5,
		public imagePath: string = '',
	) { super(world, EntityType.ObstacleRound, radius, position) }

	public update(delta: number): void { return }

	public render(context: Context): void {
		if (typeof this._image === 'undefined') {
			this._image = ImageLoader.vehicle(this.imagePath)
		} else {
			context.drawObstacleRound(this.position, this.radius, this._image, this.world.devMode)
		}
	}
}

export default ObstacleRound
