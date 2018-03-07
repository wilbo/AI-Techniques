import Vector2D from './Vector2D'

class Matrix2D {
	private _matrix: number[][]

	constructor(value?: number[][] | Vector2D) {
		if (typeof value === 'undefined') {
			this._matrix = Matrix2D.identity
		} else if (value instanceof Vector2D) {
			this._matrix = Matrix2D.identity
			this._matrix[0][0] = value.x
			this._matrix[1][0] = value.y
			this._matrix[2][0] = value.w
		} else {
			this._matrix = value
		}
	}

	/**
	 * Return the matrix values
	 */
	public get m(): number[][] {
		return this._matrix
	}

	public static get empty(): number[][] {
		return [[],[],[]]
	}

	public get toVector(): Vector2D {
		return new Vector2D(this._matrix[0][0], this._matrix[1][0])
	}

	/**
	 * Initialize an identity matrix
	 */
	public static get identity(): number[][] {
		return [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]]
	}

	public static add(matrix1: Matrix2D, matrix2: Matrix2D): Matrix2D {
		Matrix2D.errorCheck(matrix1)
		Matrix2D.errorCheck(matrix2)
		
		var result = Matrix2D.empty
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				result[i][j] = matrix1.m[i][j] + matrix2.m[i][j]
			}
		}
		return new Matrix2D(result);
	}

	public static subtract(matrix1: Matrix2D, matrix2: Matrix2D): Matrix2D {
		Matrix2D.errorCheck(matrix1)
		Matrix2D.errorCheck(matrix2)

		var result = Matrix2D.empty
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				result[i][j] = matrix1.m[i][j] - matrix2.m[i][j]
			}
		}
		return new Matrix2D(result);
	}

	public static multiply(matrix1: Matrix2D, matrix2: Matrix2D): Matrix2D {
		Matrix2D.errorCheck(matrix1)
		Matrix2D.errorCheck(matrix2)

		var result = Matrix2D.empty
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				result[i][j] = 0;
				for (let k = 0; k < 3; k++) {
					result[i][j] += matrix1.m[i][k] * matrix2.m[k][j];					
				}
			}
		}
		return new Matrix2D(result);
	}	

	public static multiplyByValue(matrix: Matrix2D, value: number): Matrix2D {
		Matrix2D.errorCheck(matrix)

		var result = Matrix2D.empty
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				result[i][j] = matrix.m[i][j] * value
			}
		}
		return new Matrix2D(result);
	}

	public static multiplyByVector(matrix: Matrix2D, vector: Vector2D): Vector2D {
		Matrix2D.errorCheck(matrix)

		return  Matrix2D.multiply(matrix, new Matrix2D(vector)).toVector
	}

	public static view(width: number, height: number): Matrix2D {
		const scaleStep = 10 // Scale every vector * scaleStep
		const centerX = width / 2
		const centerY = height / 2
		const flipX = Math.cos(Math.PI) // rotate 180deg / 3.14radian around X-axis

		return new Matrix2D([
			[scaleStep, 0, centerX],
			[0, flipX * scaleStep, centerY],
			[0, 0, 1]])
	}

	private static errorCheck(matrix: Matrix2D): void {
		if (typeof matrix === 'undefined') {
			throw new Error('Matrix is not defined')
		}
	}
}

export default Matrix2D
