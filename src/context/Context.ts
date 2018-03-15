import Vector2D from '../utils/Vector2D'
import VehicleType from './helpers/VehicleType'
import ImageLoader from './helpers/ImageLoader'
import Matrix2D from '../utils/Matrix2D'

import * as Background from '../assets/world.png'

class Context {
	public view: Matrix2D
	public ctx: CanvasRenderingContext2D
	public canvas: HTMLCanvasElement

	constructor(
		element: HTMLElement,
		width: number,
		height: number,
	) {
		this.canvas = document.createElement('canvas')
		this.canvas.width = width
		this.canvas.height = height
		this.canvas.style.backgroundImage = `url(${Background})` // TODO: move this to world or graphgenerator
		element.appendChild(this.canvas)
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
	}

	public setClick(action: (evt: MouseEvent) => void): void {
		this.canvas.addEventListener('mousedown', action)
	}

	public setView(width: number, height: number) {
		this.view = Matrix2D.view(width, height)
		this.defaults()
	}

	public clear(width: number, height: number): void {
		this.ctx.clearRect(-(width * 0.5), -(height * 0.5), width, height)
	}

	public defaults(): void {
		const { m11, m12, m21, m22, m13, m23 } = this.view
		this.ctx.setTransform(m11, m12, m21, m22, m13, m23)
		this.ctx.fillStyle = 'black'
		this.ctx.strokeStyle = 'black'
		this.ctx.font = '16px Arial'
	}

	public drawEntity(position: Vector2D, radius: number = 3, color: string = 'black'): void {
		this.ctx.translate(position.x, position.y)
		this.ctx.fillStyle = color
		this.ctx.beginPath()
		this.ctx.arc(0, 0, radius, 0, 2 * Math.PI)
		this.ctx.fill()
		this.defaults()
	}

	public drawVehicle(position: Vector2D, rotation: number = 0, vehicleType: VehicleType = VehicleType.Green5): void {
		const image = ImageLoader.vehicle(vehicleType)
		this.ctx.translate(position.x, position.y)
		this.ctx.rotate(rotation)
		this.ctx.drawImage(image, -(image.width * 0.5), -(image.height * 0.5)) // center the image origin
		this.defaults()
	}

	public drawObstacleRound(position: Vector2D, radius: number, fill: boolean = false, color: string = 'black'): void {
		this.ctx.translate(position.x, position.y)
		this.ctx.strokeStyle = color
		this.ctx.beginPath()
		this.ctx.arc(0, 0, radius, 0, 2 * Math.PI)
		fill ? this.ctx.fill() : this.ctx.stroke()
		this.defaults()
	}

	public drawObstacleRect(position: Vector2D, width: number, height: number, fill: boolean = false, color: string = 'black'): void {
		this.ctx.translate(position.x, position.y - height)
		this.ctx.strokeStyle = color
		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(width, 0)
		this.ctx.lineTo(width, height)
		this.ctx.lineTo(0, height)
		this.ctx.lineTo(0, 0)
		fill ? this.ctx.fill() : this.ctx.stroke()
		this.defaults()
	}

	public drawText(text: string, position: Vector2D = new Vector2D()): void {
		this.ctx.translate(position.x, position.y)
		this.ctx.scale(1, -1)
		this.ctx.fillText(text, 0, 0, 200)
		this.defaults()
	}

	public drawShape(vectors: Vector2D[], position: Vector2D, fill: boolean = true): void {
		this.ctx.translate(position.x, position.y)
		this.ctx.beginPath()
		this.ctx.moveTo(vectors[0].x, vectors[0].y)
		for (let i = 1; i < vectors.length; i++) {
			this.ctx.lineTo(vectors[i].x, vectors[i].y)
		}
		fill ? this.ctx.fill() : this.ctx.stroke()
		this.defaults()
	}

	public drawWall(from: Vector2D, to: Vector2D, color: string = 'black'): void {
		this.ctx.strokeStyle = color
		this.ctx.beginPath()
		this.ctx.moveTo(from.x, from.y)
		this.ctx.lineTo(to.x, to.y)
		this.ctx.stroke()
		this.defaults()
	}
}

export default Context
