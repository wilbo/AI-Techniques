import Wall from '../../entity/Wall'

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
	 * A list of walls that will keep moving entities on the circuit
	 */
	readonly walls: Wall[]
}

export default ILevel
