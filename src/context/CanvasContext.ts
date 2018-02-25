import Context from './Context';
import Vector2D from '../utils/Vector2D';

class CanvasContext implements Context {
	private _context: CanvasRenderingContext2D
	private r = 0
	
	constructor(
		private _element: HTMLElement,
		public width: number = 1000,
		public height: number = 600
	) {
		const canvas = document.createElement('canvas')
		canvas.height = height
		canvas.width = width
		_element.appendChild(canvas)
		this._context = canvas.getContext('2d')
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
		this._context.beginPath()
		this._context.arc(Math.round(position.x), Math.round(position.y), size, 0, 2 * Math.PI)
		this._context.fillStyle = color
		this._context.fill()
		this.reset()
	}

	public drawVehicle(position: Vector2D, size: number = 8, angle: number = 0): void {	
		this._context.translate(position.x, position.y)
		this._context.rotate(angle)
		this._context.beginPath()
		this._context.moveTo(size, (size * 1.25))
    this._context.lineTo(-size + size, -(size * 3.5) + (size * 1.25))
		this._context.lineTo(-(size * 2) + size, (size * 1.25))
		this._context.lineTo(-size + size, -(size * 0.25) + (size * 1.25))
		this._context.fill()
		this.reset()
		
		// vehicle origin
		// this.drawEntity(position, 4, 'red')		
	}

	public drawText(text: string, position: Vector2D = new Vector2D()) : void {
		this._context.fillText(text, Math.round(position.x), Math.round(position.y), 200)
		this.reset()
	}
}

export default CanvasContext
