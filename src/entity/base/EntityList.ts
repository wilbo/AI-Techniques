import Entity from './Entity'
import Obstacle from '../Obstacle'
import Vehicle from '../Vehicle'
import EntityType from './EntityType'

class EntityList {
	private static _instance: EntityList
	private _list: Entity[] = []

	private constructor() {
		this._list = []
	}

	public static get instance(): EntityList {
		if (typeof this._instance === 'undefined') {
			this._instance = new EntityList()
		}

		return this._instance
	}

	public add(entity: Entity): void {
		this._list.push(entity)
	}

	public get nextId(): number {
		return this._list.length + 1
	}

	public get list(): Entity[] {
		return this._list
	}

	public get obstacles(): Obstacle[] {
		return this._list.filter((e) => e.type === EntityType.Obstacle) as Obstacle[]
	}

	public get vehicles(): Vehicle[] {
		return this._list.filter((e) => e.type === EntityType.Vehicle) as Vehicle[]
	}
}

export default EntityList
