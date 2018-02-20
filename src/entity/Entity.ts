import * as SVG from 'svg.js'
import World from '../game/World'
import EntityList from '../entity/EntityList'
import Vector2D from '../utils/Vector2D'

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

	public render(context: SVG.G): void {
		context.circle(20).center(0, 0)
	}
}

export default Entity
