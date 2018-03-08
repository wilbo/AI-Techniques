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
}

export default Utils
