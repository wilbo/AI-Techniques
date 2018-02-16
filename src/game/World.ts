import * as SVG from 'svg.js'
import EntityList from '../entity/EntityList'

class World {
	constructor(
		public height: number,
		public width: number,
		private _context: SVG.Doc,
	) {
		window.onresize = () => {
			this.render()
		}
	}

	public update(delta: number): void {
		for (const entity of EntityList.instance.list) {
			entity.update(delta)
		}
	}

	public render(): void {
		this._context.clear()
		for (const entity of EntityList.instance.list) {
			entity.render(this._context)
		}
	}
}

export default World
