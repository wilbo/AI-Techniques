import * as SVG from 'svg.js'
import Frame from './Frame'
import World from './World'

class Game {
	constructor() {
		const context = SVG('main')
		const frame = new Frame(World.instance, context)
		frame.start()
	}
}

export default Game
