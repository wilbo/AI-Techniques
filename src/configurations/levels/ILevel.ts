import Wall from '../../entity/Wall'
import Vector2D from '../../utils/Vector2D'
import ConfigurationList from '../../configurations/base/ConfigurationList'
import PointOfInterest from './base/PointOfInterest'

interface ILevel {
	/**
	 * A grid representation of the game world, with:
	 * 		- positive values for walkable cells
	 * 		- (-1) for unwalkable cells
	 *
	 * The positive value will be subtracted from the max movement speed of a vehicle. In this way several types of 'terrain' can be expressed with these values.
	 */
	readonly grid: number[][]

	/**
	 * The path to the image that will be placed on the background for htis level
	 */
	readonly imagePath: string

	/**
	 * The configurations that need to be executed
	 */
	readonly configurations: ConfigurationList

	/**
	 * Store some points of interest for this level
	 */
	readonly pointsOfInterest: PointOfInterest[]

	/**
	 * Return a point of interest by name
	 */
	poi(name: string): PointOfInterest

	/**
	 * a method that will load all configurations
	 */
	init(): void
}

export default ILevel
