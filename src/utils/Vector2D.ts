import IVector2D from './IVector2D'

class Vector2D implements IVector2D {
	constructor(
		public x: number = 0,
		public y: number = 0,
	) { }

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

	public perp(): Vector2D {
		return new Vector2D(-this.y, this.x)
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
			this.multiply(max)
		}

		return this
	}

	public reverse(): Vector2D {
		return new Vector2D(-this.x, -this.y)
	}

	public normalize(): Vector2D {
		const length = this.length()
		this.x /= length
		this.y /= length
		return this
	}

	/**
		* Operators
		*/

	public add(vector: Vector2D): Vector2D {
		this.x += vector.x
		this.y += vector.y
		return this
	}

	public addValue(value: number): Vector2D {
		this.x += value
		this.y += value
		return this
	}

	public subtract(vector: Vector2D): Vector2D {
		this.x -= vector.x
		this.y -= vector.y
		return this
	}

	public subtractValue(value: number): Vector2D {
		this.x -= value
		this.y -= value
		return this
	}

	public multiply(value: number): Vector2D {
		this.x *= value
		this.y *= value
		return this
	}

	public divide(value: number): Vector2D {
		this.x *= value
		this.y *= value
		return this
	}

	public equals(vector: Vector2D): boolean {
		return vector.x === this.x && vector.y === this.y
	}
}

export default Vector2D
