import Entity from './Entity'
import ObstacleRound from '../ObstacleRound'
import Vehicle from '../Vehicle'
import EntityType from './EntityType'
import Wall from '../Wall'

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

	public get obstacles(): ObstacleRound[] {
		return this._list.filter((e) => e.type === EntityType.ObstacleRound) as ObstacleRound[]
	}

	public get vehicles(): Vehicle[] {
		return this._list.filter((e) => e.type === EntityType.Vehicle) as Vehicle[]
	}

	public get walls(): Wall[] {
		return this._list.filter((e) => e.type === EntityType.Wall) as Wall[]
	}
}

export default EntityList
