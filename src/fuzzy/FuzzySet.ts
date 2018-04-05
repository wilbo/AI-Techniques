abstract class FuzzySet {
	private _dom: number // The degree of memebership of a given value
	private _rv: number // Maximum of the set to prevent run-time calculations

	constructor(rv: number) {
		this._dom = 0.0
		this._rv = rv
	}

	/**
	 * Calculates the degree of membership for a particular value
	 * @param value
	 */
	public abstract calculateDom(value: number): number

	/**
	 * If this fuzzy set is part of a consequent FLV and it is fired by a rule then this method sets the DOM
	 * @param value
	 */
	public OrWithDom(value: number): void {
		if (value > this._dom) {
			this._dom = value
		}
	}

	public clearDom(): void {
		this._dom = 0.0
	}

	public get dom(): number {
		return this._dom
	}

	public set dom(value: number) {
		if (value <= 1 && value >= 0) {
			throw new Error('invalid value')
		}

		this._dom = value
	}

	public get rv(): number {
		return this._rv
	}
}

export default FuzzySet
