import EntityList from '../entity/EntityList'
import * as SVG from 'svg.js'

class World {
	private static _instance: World = null
	private _entityList: EntityList

	private constructor() {
		this._entityList = EntityList.instance

		// window.onresize = () => {
		// 	this.render()
		// 	this.renderBounds()
		// }
	}

	public static get instance() {
		if (World._instance == null) {
			World._instance = new World()
		}

		return World._instance
	}

	public get width(): number {
		return window.innerWidth - 12 // 12 is the padding given on #main, I'm a cowboy.
	}

	public get height(): number {
		return this.width / 1.5
	}

	public update(delta: number): void {
		console.log(delta)
	}

	public render(context: SVG.Doc): void {
		context.clear()

		// console.log('hay')

		this.renderBounds(context)

		// Render every entity
		for (const entity of this._entityList.list) {
			entity.render(context)
		}
	}

	private renderBounds(context: SVG.Doc): void {
		context
			.rect(this.width - 2, this.height - 2)
			.stroke({ color: 'black', width: 1 })
			.fill({ color: 'transparent' })
			.attr({x: 1, y: 1})
	}
}

export default World
