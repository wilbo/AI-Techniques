import Vector2D from './Vector2D'
import EntityList from '../entity/base/EntityList'
import ObstacleRect from '../entity/ObstacleRect'
import Matrix2D from './Matrix2D'
import World from '../game/World'
import IArrayPosition from './IArrayPosition'

class Utils {
	/**
	 * Returns a random float between -1 and 1
	 */
	public static randomClamped(): number {
		return Math.random() - Math.random()
	}

	/**
	 * Converts radians to degrees
	 */
	public static toDegree(radians: number): number {
		return radians * (180 / Math.PI)
	}

	/**
	 * Converts degrees to radians
	 */
	public static toRadian(degrees: number): number {
		return degrees * (Math.PI / 180)
	}

	/**
	 * Returns a random in between two values
	 * @param min the lowest possible number
	 * @param max the highest possible number
	 */
	public static randomInt(min: number, max: number): number {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min
	}

	/**
	 * Given 2 lines in 2D space AB, CD this returns true if an intersection occurs
	 * and sets dist to the distance the intersection occurs along AB. Also sets the
	 * 2d vector point to the point of intersection
	 */
	public static lineIntersection(vector1: Vector2D, vector2: Vector2D, vector3: Vector2D, vector4: Vector2D, dist: number, point: Vector2D): boolean {
		const rTop = (vector1.y - vector3.y) * (vector4.x - vector3.x) - (vector1.x - vector3.x) * (vector4.y - vector3.y)
		const rBot = (vector2.x - vector1.x) * (vector4.y - vector3.y) - (vector2.y - vector1.y) * (vector4.x - vector3.x)
		const sTop = (vector1.y - vector3.y) * (vector2.x - vector1.x) - (vector1.x - vector3.x) * (vector2.y - vector1.y)
		const sBot = (vector2.x - vector1.x) * (vector4.y - vector3.y) - (vector2.y - vector1.y) * (vector4.x - vector3.x)

		if ((rBot === 0) || (sBot === 0)) {
			return false
		}

		const r = rTop / rBot
		const s = sTop / sBot

		if ((r > 0) && (r < 1) && (s > 0) && (s < 1)) {
			dist = Vector2D.distance(vector1, vector2) * r
			point = Vector2D.add(Vector2D.multiply(Vector2D.subtract(vector2, vector1), r), vector1)
			return true
		}

		dist = 0
		return false
	}

	/**
	 * Transform a node position to a vector point in pixels
	 * @param coordinate the coordinate to be transformed into a vector
	 * @param world the world this applies to
	 */
	public static coordinateToPosition(coordinate: IArrayPosition, world: World): Vector2D {
		// create a vector in the middle of the cell
		const vector = new Vector2D((coordinate.column * world.cellSize) + (world.cellSize * 0.5), (coordinate.row * world.cellSize) + (world.cellSize * 0.5))
		// convert the vector to view coordinates
		return Matrix2D.vector2DToView(vector, world.viewMatrix)
	}

	/**
	 * Transform a node position to a vector point in pixels
	 * @param position the position to transform
	 * @param world the world this applies to
	 * @param inDefault wether the position vector is in default coordinate system or in world view
	 */
	public static positionToCoordinate(position: Vector2D, world: World, inDefault = false): IArrayPosition {
		// convert the position to default coordinate system
		position = inDefault ? position : Matrix2D.vector2DToDefault(position, world.viewMatrix)
		return {
			row: Math.floor(position.y / world.cellSize),
			column: Math.floor(position.x / world.cellSize),
		}
	}

	/**
	 * Returns a random vector inside world space
	 */
	public static randomVector(world: World): Vector2D {
		const randX = Math.floor(Math.random() * world.hPixels - (world.hPixels / 2))
		const randY = Math.floor(Math.random() * world.vPixels - (world.vPixels / 2))
		return new Vector2D(randX, randY)
	}

	/**
	 * Returns a random vector on the circuit
	 */
	public static randomCircuitVector(world: World): Vector2D {
		return world.navGraph.getRandomWalkableNode().position
	}
}

export default Utils
