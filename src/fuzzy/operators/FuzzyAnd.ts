import FuzzyTerm from '../FuzzyTerm'

class FuzzyAnd extends FuzzyTerm {
	private _terms: FuzzyTerm[]

	constructor(terms: FuzzyTerm[], clone: boolean = false) {
		super()
		this._terms = terms

		if (clone) {
			this._terms = []
			for (const term of terms) {
				this._terms.push(term.clone())
			}
		}
	}

	public clone(): FuzzyTerm {
		return new FuzzyAnd(this._terms, true)
	}

	public get dom(): number {
		let smallest = Number.MAX_SAFE_INTEGER

		for (const term of this._terms) {
			if (term.dom < smallest) {
				smallest = term.dom
			}
		}

		return smallest
	}

	public clearDom(): void {
		for (const term of this._terms) {
			term.clearDom()
		}
	}

	public orWithDom(value: number): void {
		for (const term of this._terms) {
			term.orWithDom(value)
		}
	}
}

export default FuzzyAnd
