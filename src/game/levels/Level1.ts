import ILevel from './ILevel'
import Wall from '../../entity/Wall'
import * as Background from '../../assets/world.png'
import World from '../World'
import Vector2D from '../../utils/Vector2D'
import Utils from '../../utils/Utils'
import Matrix2D from '../../utils/Matrix2D'
import ConfigurationList from '../../configurations/base/ConfigurationList'
import albert from '../../configurations/vehicles/albert'
import largeTree from '../../configurations/obstacles/largeTree'
import bob from '../../configurations/vehicles/bob'
import smallTree from '../../configurations/obstacles/smallTree'
import rocks from '../../configurations/obstacles/rocks'
import barrels from '../../configurations/obstacles/barrels'
import barrels2 from '../../configurations/obstacles/barrels2'
import eddie from '../../configurations/vehicles/eddie'
import tires from '../../configurations/obstacles/tires'

class Level1 implements ILevel {
	public readonly configurations: ConfigurationList = new ConfigurationList(this._world)
	public readonly imagePath: string = Background
	public readonly grid: number[][] = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]

	constructor(private _world: World) {
		this.addConfigurations()
		this.configurations.createAll()
	}

	private addConfigurations(): void {
		this.configurations.add('largeTree1', largeTree.bind(null, this._world, new Vector2D(4, 10)))
		this.configurations.add('largeTree2', largeTree.bind(null, this._world, new Vector2D(10, 2)))
		this.configurations.add('largeTree3', largeTree.bind(null, this._world, new Vector2D(18, 10)))
		this.configurations.add('smallTree1', smallTree.bind(null, this._world, new Vector2D(10.5, 6.5)))
		this.configurations.add('smallTree2', smallTree.bind(null, this._world, new Vector2D(12.5, 6.5)))
		this.configurations.add('rocks1', rocks.bind(null, this._world, new Vector2D(3.5, 3.5)))
		this.configurations.add('rocks2', rocks.bind(null, this._world, new Vector2D(5.5, 4.5)))
		this.configurations.add('barrels1', barrels.bind(null, this._world, new Vector2D(15.5, 2.5)))
		this.configurations.add('barrels2', barrels2.bind(null, this._world, new Vector2D(14.5, 2.5)))
		this.configurations.add('tires1', tires.bind(null, this._world, new Vector2D(19.5, 2.5)))
		this.configurations.add('tires2', tires.bind(null, this._world, new Vector2D(20.5, 2.5)))
		this.configurations.add('tires3', tires.bind(null, this._world, new Vector2D(6.5, 7.5)))
		this.configurations.add('tires4', tires.bind(null, this._world, new Vector2D(6.5, 8.5)))
		this.configurations.add('bob', bob)
		this.configurations.add('eddie', eddie)
	}
}

export default Level1
