import World from './World'

class Frame {
	private _running = false
	private _lastFrameTimeMs = 0
	private _maxFPS = 60
	private _delta = 0
	private _timestep = 1000 / this._maxFPS
	private _inactiveTime = 0
	private _stopTime = 0
	private _fps = 60
	private _framesThisSecond = 0
	private _lastFpsUpdate = 0

	constructor(private _world: World) { }

	public start(): void {
		// track inactive time to allow the game to be paused
		this._inactiveTime += (performance.now() - this._stopTime)

		// start the loop
		this._running = true
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

		// fps calculations
		if (timestamp > this._lastFpsUpdate + 1000) { // update every second
			this._fps = 0.25 * this._framesThisSecond + (1 - 0.25) * this._fps // 0.25 is the decay
			this._world.fps = this._fps

			this._lastFpsUpdate = timestamp
			this._framesThisSecond = 0
		}

		this._framesThisSecond++

		// track the accumulated time that hasn't been simulated yet
		this._delta += timestamp - this._lastFrameTimeMs
		this._lastFrameTimeMs = timestamp

		// simulate the total elapsed time in fixed-size chunks
		while (this._delta >= this._timestep) {
			this._world.update(this._timestep / 1000)
			this._delta -= this._timestep
		}

		// split the render from the update
		this._world.render()
		requestAnimationFrame(this.loop)
	}
}

export default Frame
