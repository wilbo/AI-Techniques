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
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	}

	public normalize(): Vector2D {
		const length = this.length()
		this.x /= length
		this.y /= length
		return this
	}

	public lengthSq(): number {
		throw new Error('Method not implemented.')
	}

	public dot(vector: Vector2D): number {
		throw new Error('Method not implemented.')
	}

	public sign(vector: Vector2D): number {
		throw new Error('Method not implemented.')
	}

	public perp(): Vector2D {
		throw new Error('Method not implemented.')
	}

	public truncate(max: number): Vector2D {
		throw new Error('Method not implemented.')
	}

	public distance(vector: Vector2D): number {
		throw new Error('Method not implemented.')
	}

	public distanceSq(vector: Vector2D): number {
		throw new Error('Method not implemented.')
	}

	public reverse(): Vector2D {
		throw new Error('Method not implemented.')
	}

	/**
		* Operators
		*/

	public add(vector: Vector2D): Vector2D {
		this.x += vector.x
		this.y += vector.y
		return this
	}

	public subtract(vector: Vector2D): Vector2D {
		this.x -= vector.x
		this.y -= vector.y
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
