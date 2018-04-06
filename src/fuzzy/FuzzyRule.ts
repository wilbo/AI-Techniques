import FuzzyTerm from './FuzzyTerm'

class FuzzyRule {
	private _antecedent: FuzzyTerm
	private _consequence: FuzzyTerm

	constructor(antecedent: FuzzyTerm, consequence: FuzzyTerm) {
		this._antecedent = antecedent.clone()
		this._consequence = consequence.clone()
	}

	public setConfidenceOfConsequentToZero(): void {
		this._consequence.clearDom()
	}

	public calculate(): void {
		this._consequence.orWithDom(this._antecedent.dom)
	}
}

export default FuzzyRule
