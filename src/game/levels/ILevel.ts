import Wall from '../../entity/Wall'
import Vector2D from '../../utils/Vector2D'

interface ILevel {
	/**
	 * A grid representation of the game world, with 0's for walkable cells, 1's for not walkable cells
	 */
	readonly grid: number[][]

	/**
	 * The path to the image that will be placed on the background for htis level
	 */
	readonly imagePath: string

	/**
	 * A list of Vector2D's that can be used to create boundaries
	 */
	readonly walls: Vector2D[]
}

export default ILevel
