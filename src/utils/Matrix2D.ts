import Vector2D from './Vector2D'

class Matrix2D {
	public static view(width: number = 1000, height: number = 600): Matrix2D {
		return new Matrix2D(
			1, 0, width * 0.5,
			0, -1, height * 0.5,
		)
	}

	public static pointToWorldSpace(point: Vector2D, heading: Vector2D, side: Vector2D, position: Vector2D): Vector2D {
		if (heading.x === 0) { return point }
		const transformation = new Matrix2D()
		transformation.translate(position) // calling translation first won't break things !!!
		transformation.rotate(heading, side)
		return transformation.transformVector2D(point)
	}

	public static pointToLocalSpace(point: Vector2D, heading: Vector2D, side: Vector2D, position: Vector2D): Vector2D {
		if (heading.x === 0) { return point }
		const tx = -(Vector2D.dot(position, heading))
		const ty = -(Vector2D.dot(position, side))
		const transformation = new Matrix2D(
			heading.x, side.x, tx,
			heading.y, side.y, ty,
		)

		return transformation.transformVector2D(point)
	}

	public static vectorToWorldSpace(vector: Vector2D, heading: Vector2D, side: Vector2D): Vector2D {
			const transformation = new Matrix2D()
			transformation.rotate(heading, side)
			return transformation.transformVector2D(vector)
	}

	constructor(
		public m11: number = 1, public m12: number = 0, public m13: number = 0,
		public m21: number = 0, public m22: number = 1, public m23: number = 0,
	) { }

	public multiply(matrix: Matrix2D): void {
		const temp = new Matrix2D()

		temp.m11 = (this.m11 * matrix.m11) + (this.m12 * matrix.m21)
		temp.m12 = (this.m11 * matrix.m12) + (this.m12 * matrix.m22)
		temp.m13 = (this.m11 * matrix.m13) + (this.m12 * matrix.m23) + this.m13

		temp.m21 = (this.m21 * matrix.m11) + (this.m22 * matrix.m21)
		temp.m22 = (this.m21 * matrix.m12) + (this.m22 * matrix.m22)
		temp.m23 = (this.m21 * matrix.m13) + (this.m22 * matrix.m23) + this.m23

		this.m11 = temp.m11
		this.m12 = temp.m12
		this.m13 = temp.m13
		this.m21 = temp.m21
		this.m22 = temp.m22
		this.m23 = temp.m23
	}

	/**
	 * Create a rotation matrix from a 2D vector
	 */
	public rotate(heading: Vector2D, side: Vector2D): void {
		const matrix = new Matrix2D()
		matrix.m11 = heading.x
		matrix.m12 = heading.y
		matrix.m21 = side.x
		matrix.m22 = side.y
		this.multiply(matrix)
	}

	/**
	 * Create a translation matrix from a 2D vector
	 */
	public translate(vector: Vector2D) {
		const matrix = new Matrix2D()
		matrix.m13 = vector.x
		matrix.m23 = vector.y
		this.multiply(matrix)
	}

	public transformVector2DList(vectors: Vector2D[]): Vector2D[] {
		return vectors.map((vector) => this.transformVector2D(vector))
	}

	public transformVector2D(vector: Vector2D): Vector2D {
		const tempX = (this.m11 * vector.x) + (this.m21 * vector.y) + (this.m13)
		const tempY = (this.m12 * vector.x) + (this.m22 * vector.y) + (this.m23)
		return new Vector2D(tempX, tempY)
	}
}

export default Matrix2D
