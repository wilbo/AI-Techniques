import Entity from './Entity'

class EntityList {
	private static _instance: EntityList
	private _list: Entity[] = []

	private constructor() {
		this._list = []
	}

	public static get instance(): EntityList {
		if (this._instance == null || typeof this._instance == 'undefined') {
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
