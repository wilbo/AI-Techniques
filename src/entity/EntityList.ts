import Entity from './Entity'

class EntityList {
	private static _instance: EntityList = null
	private _list: Entity[] = []

	private constructor() {
		this._list = []
	}

	public static get instance(): EntityList {
		if (this._instance == null) {
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
}

export default EntityList
