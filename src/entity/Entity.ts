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

	public render(context: SVG.Doc): void {
		context.polyline([0, 0, 30, 10, 0, 20]).x(this.position.x).y(this.position.y)
	}
}

export default Entity
