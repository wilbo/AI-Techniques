import Vector2D from './Vector2D'

interface IVector2D {
	x: number
	y: number

	/**
		* Check wether both x and y are zero
		*/
	isZero(): boolean

	/**
		* Set x and y both to zero
		*/
	zero(): void

	/**
		* The length / magnitude of the vector
		*/
	length(): number

	/**
		* The squared length of the vector (thereby avoiding the sqrt)
		*/
	lengthSq(): number

	/**
		* Normalizes the vector if it matches a certain condition
		*/
	normalize(): Vector2D

	/**
		* The dot product of this and v2
		*/
	dot(vector: Vector2D): number

	/**
		* Returns positive if v2 is clockwise of this vector, negative if counterclockwise
		* (assuming the Y axis is pointing down, X axis to right like a Window app)
		*/
	sign(vector: Vector2D): number

	/**
		* The vector that is perpendicular to this one
		*/
	perp(): Vector2D

	/**
		* Adjusts x and y so that the length of the vector does not exceed max
		*/
	truncate(max: number): Vector2D

	/**
		* The distance between this and the vector
		*/
	distance(vector: Vector2D): number

	/**
		* The distance between this and the vector squared
		*/
	distanceSq(vector: Vector2D): number

	/**
		* returns the vector that is the reverse of this vector
		*/
	reverse(): Vector2D

	/**
		* Adds a vector to the current vector
		*/
	add(vector: Vector2D): Vector2D

	/**
		* Subtracts a vector to the current vector
		*/
	subtract(vector: Vector2D): Vector2D

	/**
		* Multiplies a vector to the current vector
		*/
	multiply(value: number): Vector2D

	/**
		* Divides a vector to the current vector
		*/
	divide(value: number): Vector2D

	/**
		* Check's wether the vector is equal to the current vector
		*/
	equals(vector: Vector2D): boolean
}

export default IVector2D
