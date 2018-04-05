import FuzzySet from './FuzzySet'

class FuzzySetLeftShoulder extends FuzzySet {
	private _peakPoint: number
	private _leftOffset: number
	private _rightOffset: number

	constructor(peak: number, left: number, right: number) {
		super(((peak + right) + peak) / 2)
		this._peakPoint = peak
		this._leftOffset = left
		this._rightOffset = right
	}

	public calculateDom(value: number): number {
		// preventing divide by zero errors
		if (this._rightOffset === 0 && this._peakPoint === value ||
			this._leftOffset === 0 && this._peakPoint === value) {
			return 1
		}

		// find dom if right of center
		if ((value >= this._peakPoint) && (value < (this._peakPoint + this._rightOffset))) {
			const grad = 1 / -this._rightOffset
			return grad * (value - this._peakPoint) + 1
		}

		// find dom left of center
		if ((value < this._peakPoint) && (value >= this._peakPoint - this._leftOffset)) {
			return 1
		}

		// out of range of this fuzzy linguistic variable
		return 0
	}
}

export default FuzzySetLeftShoulder
