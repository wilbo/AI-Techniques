import VehicleType from '../context/helpers/VehicleType'

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
	public static getRandomInt(min: number, max: number): number {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min
	}
}

export default Utils
