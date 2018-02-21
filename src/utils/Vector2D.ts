import IVector2D from './IVector2D'

class Vector2D implements IVector2D {

	/*
	* Static methods & operators
	*/

	public static add(vector1: Vector2D, vector2: Vector2D): Vector2D {
		return new Vector2D(vector1.x + vector2.x, vector1.y + vector2.y)
	}

	public static addValue(vector: Vector2D, value: number): Vector2D {
		return new Vector2D(vector.x + value, vector.y + value)
	}

	public static subtract(vector1: Vector2D, vector2: Vector2D): Vector2D {
		return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y)
	}

	public static subtractValue(vector: Vector2D, value: number): Vector2D {
		return new Vector2D(vector.x - value, vector.y - value)
	}

	public static multiply(vector: Vector2D, value: number): Vector2D {
		return new Vector2D(vector.x * value, vector.y * value)
	}

	public static divide(vector: Vector2D, value: number): Vector2D {
		return new Vector2D(vector.x / value, vector.y / value)
	}

	public static equals(vector1: Vector2D, vector2: Vector2D): boolean {
		return vector1.x === vector2.x && vector1.y === vector2.y
	}

	public static vNormalize(vector: Vector2D): Vector2D {
		const length = vector.length()
		if (length > Number.EPSILON) {
			return Vector2D.divide(vector, length)
		}

		return vector
	}

	public static vTruncate(vector: Vector2D, max: number): Vector2D {
		if (vector.length() > max) {
			return Vector2D.multiply(Vector2D.vNormalize(vector), max)
		}

		return vector
	}

	public static vPerp(vector: Vector2D): Vector2D {
		return new Vector2D(-vector.y, vector.x)
	}

	public static vReverse(vector: Vector2D): Vector2D {
		return new Vector2D(-vector.x, -vector.y)
	}

	constructor(
		public x: number = 0,
		public y: number = 0,
	) { }

	/*
	* Member methods
	*/

	public zero(): void {
		this.x = 0
		this.y = 0
	}

	public isZero(): boolean {
		return this.x === 0 && this.y === 0
	}

	public length(): number {
		return Math.sqrt((this.x * this.x) + (this.y * this.y))
	}

	public lengthSq(): number {
		return (this.x * this.x) + (this.y * this.y)
	}

	public dot(vector: Vector2D): number {
		return (this.x * vector.x) + (this.y * vector.y)
	}

	public sign(vector: Vector2D): number {
		if (this.y * vector.y > this.x * vector.y) {
			return -1
		}

		return 1
	}

	public distance(vector: Vector2D): number {
		const ySeparation = vector.y - this.y
		const xSeparation = vector.x - this.x
		return Math.sqrt((ySeparation * ySeparation) + (xSeparation * xSeparation))
	}

	public distanceSq(vector: Vector2D): number {
		const ySeparation = vector.y - this.y
		const xSeparation = vector.x - this.x
		return (ySeparation * ySeparation) + (xSeparation * xSeparation)
	}

	public truncate(max: number): Vector2D {
		if (this.length() > max) {
			this.normalize()
			this.x *= max
			this.y *= max
		}		
		return this
	}

	public normalize(): Vector2D {
		const length = this.length()
		this.x /= length
		this.y /= length
		return this
	}
}

export default Vector2D
