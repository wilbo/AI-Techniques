import ILevel from './ILevel'
import Wall from '../../entity/Wall'
import * as Background from '../../assets/world.png'
import World from '../../game/World'
import Vector2D from '../../utils/Vector2D'
import Utils from '../../utils/Utils'
import Matrix2D from '../../utils/Matrix2D'
import ConfigurationList from '../../configurations/base/ConfigurationList'
import largeTree from '../../configurations/obstacles/largeTree'
import smallTree from '../../configurations/obstacles/smallTree'
import rocks from '../../configurations/obstacles/rocks'
import barrels from '../../configurations/obstacles/barrels'
import barrels2 from '../../configurations/obstacles/barrels2'
import tires from '../../configurations/obstacles/tires'
import Vehicle from '../../entity/Vehicle'
import WanderAroundMap from '../../state/states/vehicle/WanderAroundMap'
import FollowMouseClick from '../../state/states/vehicle/FollowMouseClick'
import VehicleType from '../../entity/VehicleType'
import GoToStart from '../../state/states/vehicle/GoToStart'
import PointOfInterest from './base/PointOfInterest'
import FuzzyModule from '../../fuzzy/FuzzyModule'
import FuzzyAnd from '../../fuzzy/operators/FuzzyAnd'

class Level1 implements ILevel {
	public readonly configurations: ConfigurationList = new ConfigurationList(this._world)
	public readonly imagePath: string = Background
	public readonly grid: number[][] = [
		[14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
		[14, 14,  5,  5,  5,  5,  5,  5, 14, -1, -1,  5,  5,  5,  5,  5,  5,  5,  5, 14, 14, 14],
		[14,  5,  5,  5,  5,  5,  5,  5,  5, -1, -1,  5, 14, 14, -1, -1, 14, 14,  5, -1, -1, 14],
		[14,  5,  5, -1, 14, 14, 14,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 14, 14],
		[14,  5,  5, 14, 14, -1, 14,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 14],
		[14,  5,  5,  5,  5,  5,  5,  5,  5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,  5,  5, 14],
		[14,  5,  5,  5,  5,  5,  5,  5,  5, 14, -1, 14, -1, 14, 14, 14, 14, 14, 14,  5,  5, 14],
		[14,  5,  5, 14, 14, 14, -1,  5,  5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,  5,  5, 14],
		[14,  5,  5, 14, 14, 14, -1,  5,  5,  5,  5,  5,  5,  5, 14, 14, 14, 14, 14,  5,  5, 14],
		[14,  5,  5, -1, -1, 14, 14, 14,  5,  5,  5,  5,  5,  5,  5, 14, 14, -1, -1,  5,  5, 14],
		[14,  5,  5, -1, -1, 14, 14, 14, 14, 14, 14, 14, 14,  5,  5, 14, 14, -1, -1,  5,  5, 14],
		[14,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 14],
		[14, 14,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 14, 14],
		[14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
	]
	public pointsOfInterest: PointOfInterest[] = [
		new PointOfInterest('pit', new Vector2D(216, 264)),
		new PointOfInterest('start1', new Vector2D(360, -216)),
		new PointOfInterest('start2', new Vector2D(360, -264)),
		new PointOfInterest('finish1', new Vector2D(-360, -216)),
		new PointOfInterest('finish2', new Vector2D(-360, -264)),
	]

	constructor(private _world: World) {
		// objects
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

		const fm = new FuzzyModule()

		const distToPit = fm.createFLV('distToFuel')
		const close = distToPit.addLeftShoulderSet('close', 0, 50000, 100000)
		const medium = distToPit.addTriangularSet('medium', 50000, 150000, 250000)
		const far = distToPit.addRightShoulderSet('far', 200000, 250000, 1000000)

		const fuelLevel = fm.createFLV('fuelLevel')
		const low = fuelLevel.addLeftShoulderSet('low', 0, 250, 500)
		const okay = fuelLevel.addTriangularSet('okay', 250, 750, 1250)
		const loads = fuelLevel.addRightShoulderSet('loads', 1000, 1500, 2500)

		const fuelAdvice = fm.createFLV('fuelAdvice')
		const keepDriving = fuelAdvice.addLeftShoulderSet('keepDriving', 0, 33, 66)
		const fillTank = fuelAdvice.addRightShoulderSet('fillTank', 33, 66, 100)

		fm.addRule(new FuzzyAnd([close, low]), fillTank)
		fm.addRule(new FuzzyAnd([close, okay]), keepDriving)
		fm.addRule(new FuzzyAnd([close, loads]), keepDriving)

		fm.addRule(new FuzzyAnd([medium, low]), fillTank)
		fm.addRule(new FuzzyAnd([medium, okay]), keepDriving)
		fm.addRule(new FuzzyAnd([medium, loads]), keepDriving)

		fm.addRule(new FuzzyAnd([far, low]), fillTank)
		fm.addRule(new FuzzyAnd([far, okay]), fillTank)
		fm.addRule(new FuzzyAnd([far, loads]), keepDriving)

		// vehicles
		this.configurations.add('wanderer', () => new Vehicle(this._world, new WanderAroundMap(), fm, VehicleType.Black4))
		this.configurations.add('followMouseClick', () => new Vehicle(this._world, new FollowMouseClick(), fm, VehicleType.Yellow5))
		this.configurations.add('raceCar1', () => new Vehicle(this._world, new GoToStart(), fm, VehicleType.Blue5))
		this.configurations.add('raceCar2', () => new Vehicle(this._world, new GoToStart(), fm, VehicleType.Red5))
	}

	public init(): void {
		this.configurations.createAll()
	}

	// TODO: move this somewhere
	public poi(name: string): PointOfInterest {
		const poi = this.pointsOfInterest.find((x) => x.name === name)

		if (typeof poi === 'undefined') {
			throw new Error('Point of interest is undefined')
		}

		return poi
	}
}

export default Level1
