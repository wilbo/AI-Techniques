import * as SVG from 'svg.js'
import Context from './Context';
import Vector2D from '../utils/Vector2D';

class SvgContext implements Context {
	private _context: SVG.G
	
	constructor(
		private _element: HTMLElement,
		public width: number = 1000,
		public height: number = 600
	) {
		this._context = SVG(_element).group()
		this._context.translate(width / 2, height / 2) // center the context origin
	}

	public get(): SVG.G {
		return this._context
	}
	
	public clear(): void{
		this._context.clear()
	}

	public drawEntity(position: Vector2D, size: number, color: string = 'black'): void {
		this._context
			.circle(size)
			.translate(-size / 2, -size / 2)
			.move(position.x, position.y)
			.fill({ color: color })
	}

	public drawVehicle(position: Vector2D, angle: number = 0): void {
		this._context
			.polyline([0, 0, 30, 8, 0, 16])
			.translate(-10, -8)
			.rotate(angle - 90, position.x + 8, position.y + 8)
			.move(position.x, position.y)
	}

	public drawText(text: string, position: Vector2D = new Vector2D()) : void {
		this._context.text(text).move(position.x, position.y)
	}
}

export default SvgContext
