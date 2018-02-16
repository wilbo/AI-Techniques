import * as SVG from 'svg.js'
import World from './World'

class Frame {
	private _running = false
	private _limit = 300
	private _lastFrameTimeMs = 0
	private _maxFPS = 60
	private _delta = 0
	private _timestep = 1000 / this._maxFPS

	constructor(private _world: World, private _context: SVG.Doc) { }

	public start(): void {
		this._running = true
		this.loop(0)
	}

	public stop(): void {
		this._running = false
	}

	// Source:
	// https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

	private loop = (timestamp: number) => {
		// Throttle the frame rate.
		if (timestamp < this._lastFrameTimeMs + (1000 / this._maxFPS)) {
			window.requestAnimationFrame(this.loop)
			return
		}

		this._delta += timestamp - this._lastFrameTimeMs
		this._lastFrameTimeMs = timestamp

		let numUpdateSteps = 0
		while (this._delta >= this._timestep) {
			this._world.update(this._timestep)
			this._delta -= this._timestep

			if (++numUpdateSteps >= 240) {
				this.panic()
				break
			}
		}

		this._world.render(this._context)
		window.requestAnimationFrame(this.loop)
	}

	private panic(): void {
		this._delta = 0
	}

}

export default Frame
