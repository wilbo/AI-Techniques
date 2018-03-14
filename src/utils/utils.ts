import VehicleType from '../context/helpers/VehicleType'
import Vector2D from './Vector2D'
import EntityList from '../entity/base/EntityList'
import ObstacleRect from '../entity/ObstacleRect'

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
	 * Checks wether a vector is located inside a single ObstacleRect
	 * @param vector the vector to check
	 * @param	obstacleRect the obstacleRect to check
	 */
	public static insideObstacleRect(vector: Vector2D, obstacleRect: ObstacleRect): boolean {
		const { topLeft, bottomRight } = obstacleRect

		if (
			vector.x >= topLeft.x && // not too much to left
			vector.y <= topLeft.y && // not too high
			vector.x <= bottomRight.x && // not too much to right
			vector.y >= bottomRight.y // not too low
		) {
			return true
		}

		return false
	}

	/**
	 * Checks wether a vector is located inside any ObstacleRect
	 * @param vector the vector to check
	 */
	public static insideAllObstacleRect(vector: Vector2D): boolean {
		for (const obstacleRect of EntityList.instance.obstaclesRect) {
			if (this.insideObstacleRect(vector, obstacleRect)) {
				return true
			}
		}

		return false
	}
}

export default Utils
