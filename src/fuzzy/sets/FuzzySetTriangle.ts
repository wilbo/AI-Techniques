import FuzzySet from '../FuzzySet'

class FuzzySetTriangle extends FuzzySet {
	private _peakPoint: number
	private _leftOffset: number
	private _rightOffset: number

	constructor(mid: number, left: number, right: number) {
		super(mid)
		this._peakPoint = mid
		this._leftOffset = left
		this._rightOffset = right
	}

	public calculateDom(value: number): number {
		// preventing divide by zero errors
		if (this._rightOffset === 0 && this._peakPoint === value ||
			this._leftOffset === 0 && this._peakPoint === value) {
			return 1
		}

		// find if dom left of center
		if ((value <= this._peakPoint) && (value >= (this._peakPoint - this._leftOffset))) {
			const grad = 1 / this._leftOffset
			return grad * (value - (this._peakPoint - this._leftOffset))
		} else

		// find if dom right of center
		if ((value > this._peakPoint) && (value < (this._peakPoint + this._rightOffset))) {
			const grad = 1 / -this._rightOffset
			return grad * (value - this._peakPoint) + 1
		}

		// out of range of this fuzzy linguistic variable
		return 0
	}
}

export default FuzzySetTriangle
