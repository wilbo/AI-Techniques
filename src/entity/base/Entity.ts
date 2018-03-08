import World from '../../game/World'
import Vector2D from '../../utils/Vector2D'
import EntityList from './EntityList'
import Context from '../../context/Context'

abstract class Entity {
	private _id: number

	public constructor(public world: World, public position: Vector2D = new Vector2D()) {
		// Add this new entity to entity list
		this._id = EntityList.instance.nextId
		EntityList.instance.add(this)
	}

	public get id(): number {
		return this._id
	}

	public abstract update(delta: number): void
	public abstract render(context: Context): void
}

export default Entity
