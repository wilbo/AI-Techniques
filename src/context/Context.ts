import Vector2D from '../utils/Vector2D'
import VehicleType from './helpers/VehicleType'
import ImageLoader from './helpers/ImageLoader'
import * as Road from '../assets/racing-pack/road/road_asphalt22.png'
import Matrix2D from '../utils/Matrix2D';

class Context implements Context {
	private _context: CanvasRenderingContext2D
	private _scale: Matrix2D
	private _rotation: Matrix2D
	private _translation: Matrix2D
	private _view: Matrix2D

	constructor(
		public element: HTMLElement,
		public width: number = 1000,
		public height: number = 600
	) {
		this.createContext()
		this.defaults()
	}
	
	public clear(): void {
		this._context.clearRect(-this.width * 0.5, -this.height * 0.5, this.width, this.height)
	}

	public createContext(): void {
		const canvas = document.createElement('canvas')
		canvas.height = this.height
		canvas.width = this.width
		this.element.appendChild(canvas)
		this._context = canvas.getContext('2d') as CanvasRenderingContext2D
		this._view = Matrix2D.view(this.width, this.height)
	}

	private defaults(): void {
		this._scale = new Matrix2D()
		this._rotation = new Matrix2D()
		this._translation = new Matrix2D()
	}

	public drawEntity(position: Vector2D, size: number, color: string = 'black'): void {
		this._context.fillStyle = color
		this._context.beginPath()
		this._context.arc(Math.round(position.x), Math.round(position.y), size, 0, 2 * Math.PI)
		this._context.fill()
	}

	public drawVehicle(position: Vector2D, angle: number = 0, vehicleType: VehicleType = VehicleType.Green5): void {			
		const image = ImageLoader.vehicle(vehicleType)
		this._context.translate(position.x, position.y)
		this._context.rotate(angle)
		this._context.drawImage(image, Math.round(-(image.width / 2)), Math.round(-(image.height / 2))) // center the image origin
		this.defaults()
	}

	public drawText(text: string, position: Vector2D = new Vector2D()) : void {
		this._context.fillText(text, Math.round(position.x), Math.round(position.y), 200)
		this.defaults()
	}

	public drawShape(vectors: Vector2D[]): void {
		vectors = this.transform(vectors)
		vectors = this.transformView(vectors)

		this._context.beginPath()
		this._context.moveTo(vectors[0].x, vectors[0].y)
		for (let i = 1; i < vectors.length; i++) {
			this._context.lineTo(vectors[i].x, vectors[i].y)
		}
		this._context.fill()
	}

	/**
	 * Transform vectors based on the current tranformation matrices: translation, rotation and scale
	 * @param vectors The vectors to transform
	 */
	private transform(vectors: Vector2D[]): Vector2D[] {
		const transformation = Matrix2D.multiply(this._translation, Matrix2D.multiply(this._rotation, this._scale)) //  transformation = _translation * _rotation * _scale
		return vectors.map(vector => Matrix2D.multiplyByVector(transformation, vector))
	}

	/**
	 * Transform vectors based on the current view matrix
	 * @param vectors The vectors to transform
	 */
	private transformView(vectors: Vector2D[]): Vector2D[] {
		return vectors.map(vector => Matrix2D.multiplyByVector(this._view, vector))
	}
}

export default Context
