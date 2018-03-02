import Context from './Context'
import Vector2D from '../utils/Vector2D'
import ImageLoader from '../utils/ImageLoader'
import VehicleType from '../utils/VehicleType'

class CanvasContext implements Context {
	private _context: CanvasRenderingContext2D

	constructor(
		private _element: HTMLElement,
		public width: number = 1000,
		public height: number = 600
	) {
		const canvas = document.createElement('canvas')
		canvas.height = height
		canvas.width = width
		_element.appendChild(canvas)
		this._context = canvas.getContext('2d') as CanvasRenderingContext2D
		this.reset()
	}
	
	public clear(): void {
		this._context.clearRect(-this.width * 0.5, -this.height * 0.5, this.width, this.height)
	}

	public reset(): void {
		this._context.fillStyle = 'black'
		this._context.setTransform(1, 0, 0, 1, 0, 0);
		this._context.translate(this.width / 2, this.height / 2) // origin (0, 0) in the center
		this._context.font = '16px Arial';
		this._context.rotate(0)
	}

	public drawEntity(position: Vector2D, size: number, color: string = 'black'): void {
		this._context.fillStyle = color
		this._context.beginPath()
		this._context.arc(Math.round(position.x), Math.round(position.y), size, 0, 2 * Math.PI)
		this._context.fill()
		this.reset()
	}

	public drawVehicle(position: Vector2D, angle: number = 0, vehicleType: VehicleType): void {			
		const image = ImageLoader.vehicle(vehicleType)
		this._context.translate(position.x, position.y)
		this._context.rotate(angle)
		this._context.drawImage(image, -(image.width / 2), -(image.height / 2)) // center the image origin
		this._context.fill()
		this.reset()
	}

	public drawText(text: string, position: Vector2D = new Vector2D()) : void {
		this._context.fillText(text, Math.round(position.x), Math.round(position.y), 200)
		this.reset()
	}
}

export default CanvasContext
