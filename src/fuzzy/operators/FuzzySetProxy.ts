import FuzzyTerm from '../FuzzyTerm'
import FuzzySet from '../FuzzySet'

class FuzzySetProxy extends FuzzyTerm {

	constructor(private _fuzzySet: FuzzySet) {
		super()
	}

	public clone(): FuzzyTerm {
		return new FuzzySetProxy(this._fuzzySet)
	}

	public get dom(): number {
		return this._fuzzySet.dom
	}

	public clearDom(): void {
		this._fuzzySet.clearDom()
	}

	public orWithDom(value: number): void {
		this._fuzzySet.orWithDom(value)
	}
}

export default FuzzySetProxy
