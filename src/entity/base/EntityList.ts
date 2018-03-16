import Entity from './Entity'
import ObstacleRound from '../ObstacleRound'
import Vehicle from '../Vehicle'
import EntityType from './EntityType'
import Wall from '../Wall'
import ObstacleRect from '../ObstacleRect'
import World from '../../game/World'

class EntityList {
	private _entities: Entity[] = []

	constructor(private _world: World) {}

	public add(entity: Entity): void {
		this._entities.push(entity)
	}

	public get nextId(): number {
		return this._entities.length + 1
	}

	public get list(): Entity[] {
		return this._entities
	}

	public get obstaclesRound(): ObstacleRound[] {
		return this._entities.filter((e) => e.type === EntityType.ObstacleRound) as ObstacleRound[]
	}

	public get obstaclesRect(): ObstacleRect[] {
		return this._entities.filter((e) => e.type === EntityType.ObstacleRect) as ObstacleRect[]
	}

	public get vehicles(): Vehicle[] {
		return this._entities.filter((e) => e.type === EntityType.Vehicle) as Vehicle[]
	}

	public get walls(): Wall[] {
		return this._entities.filter((e) => e.type === EntityType.Wall) as Wall[]
	}
}

export default EntityList
