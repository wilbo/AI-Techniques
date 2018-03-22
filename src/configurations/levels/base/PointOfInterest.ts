import Vector2D from '../../../utils/Vector2D'

class PointOfInterest {
	constructor(
		/**
		 * The name of the point of interest
		 */
		public name: string,

		/**
		 * The location of the point of interest
		 */
		public point: Vector2D,

		/**
		 * Wether this point of interest is currently occupied
		 */
		public occupied: boolean = false,

		/**
		 * Wether this point of interest is reserved and will be occupied in the near future
		 */
		public reserved: boolean = false,
	) { }
}

export default PointOfInterest
