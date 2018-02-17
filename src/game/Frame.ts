import World from './World'

class Frame {
	private _running = false
	private _lastFrameTimeMs = 0
	private _maxFPS = 60
	private _delta = 0
	private _timestep = 1000 / this._maxFPS
	private _inactiveTime = 0
	private _stopTime = 0

	constructor(private _world: World) { }

	public start(): void {
		this._running = true
		this._inactiveTime += (performance.now() - this._stopTime)
		requestAnimationFrame(this.loop)
	}

	public stop(): void {
		this._running = false
		this._stopTime = performance.now()
	}

	// Source:
	// https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

	private loop = (timestamp: number) => {
		if (!this._running) { return }

		// resume where we were left in time
		timestamp -= this._inactiveTime

		// throttle the frame rate.
		if (timestamp < this._lastFrameTimeMs + (1000 / this._maxFPS)) {
			requestAnimationFrame(this.loop)
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

		this._world.render()
		requestAnimationFrame(this.loop)
	}

	private panic(): void {
		this._delta = 0
	}

}

export default Frame
