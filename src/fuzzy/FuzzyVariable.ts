import FuzzySet from './FuzzySet'
import FuzzySetTriangle from './FuzzySetTriangle'
import FuzzySetLeftShoulder from './FuzzySetLeftShoulder'
import FuzzySetRightShoulder from './FuzzySetRightShoulder'

class FuzzyVariable {
	private _sets: { [name: string]: FuzzySet }
	private _minRange: number
	private _maxRange: number

	constructor() {
		this._sets = {}
		this._minRange = 0
		this._maxRange = 0
	}

	/**
	 * Add a left shoulder set to to the fuzzy variable
	 */
	public addLeftShoulderSet(name: string, minBound: number, peak: number, maxBound: number): FuzzySet {
		this._sets[name] = new FuzzySetLeftShoulder(peak, peak - minBound, maxBound - peak)
		this.adjustRangeToFit(minBound, maxBound)
		return this._sets[name]
	}

	/**
	 * Add a right shoulder set to to the fuzzy variable
	 */
	public addRightShoulderSet(name: string, minBound: number, peak: number, maxBound: number): FuzzySet {
		this._sets[name] = new FuzzySetRightShoulder(peak, peak - minBound, maxBound - peak)
		this.adjustRangeToFit(minBound, maxBound)
		return this._sets[name]
	}

	/**
	 * Add a triangular set to to the fuzzy variable
	 */
	public addTriangularSet(name: string, minBound: number, peak: number, maxBound: number): FuzzySet {
		this._sets[name] = new FuzzySetTriangle(peak, peak - minBound, maxBound - peak)
		this.adjustRangeToFit(minBound, maxBound)
		return this._sets[name]
	}

	/**
	 * Fuzzify a value by calculating its DOM in each of this variable's subsets
	 * @param value the value to fuzzify
	 */
	public fuzzify(value: number): void {
		for (const name in this._sets) {
			if (this._sets.hasOwnProperty(name)) {
				const set = this._sets[name]
				set.dom = set.calculateDom(value)
			}
		}
	}

	/**
	 * Defuzzify using MaxAv
	 */
	public deFuzzify(): number {
		let bottom = 0
		let top = 0

		for (const name in this._sets) {
			if (this._sets.hasOwnProperty(name)) {
				const set = this._sets[name]
				bottom += set.dom
				top += set.rv * set.dom
			}
		}

		if (bottom === 0) {
			return 0
		}

		return top / bottom
	}

	/**
	 * This method is called with the upper and lower bound of a set each time
	 * a new set is added to adjust the upper and lower range values accordingly
	 */
	private adjustRangeToFit(minBound: number, maxBound: number): void {
		if (minBound < this._minRange) {
			this._minRange = minBound
		}

		if (maxBound > this._maxRange) {
			this._maxRange = maxBound
		}
	}
}

export default FuzzyVariable
