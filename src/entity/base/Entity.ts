import World from '../../game/World'
import Vector2D from '../../utils/Vector2D'
import EntityList from './EntityList'
import Context from '../../context/Context'
import EntityType from './EntityType'

abstract class Entity {
	private _id: number
	private _tagged = false

	public constructor(
		private _world: World,
		public type: EntityType,
		public boundingRadius: number,
		public position: Vector2D) {
		// Add this new entity to entity list
		this._id = _world.entities.nextId
		_world.entities.add(this)
	}

	public abstract update(delta: number): void
	public abstract render(context: Context): void

	public get id(): number {
		return this._id
	}

	public get isTagged(): boolean {
		return this._tagged
	}

	public tag(): void {
		this._tagged = true
	}

	public unTag(): void {
		this._tagged = false
	}

	public tagNeighbors(radius: number): void {
		for (const entity of this._world.entities.list) {
			entity.unTag() // clear any current tag
			const to = Vector2D.subtract(this.position, entity.position)
			const range = radius + entity.boundingRadius // take the bounding radius into account

			if (entity !== this && to.lengthSq < (range * range)) {
				entity.tag()
			}
		}
	}
}

export default Entity
