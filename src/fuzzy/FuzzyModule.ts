import FuzzyVariable from './FuzzyVariable'
import FuzzyRule from './FuzzyRule'
import FuzzyTerm from './FuzzyTerm'

class FuzzyModule {
	constructor(
		private _flvs: { [flv: string]: FuzzyVariable } = {},
		private _rules: FuzzyRule[] = [],
	) { }

	/**
	 * Creates a new fuzzy linguistic variable
	 * @returns reference to new fuzzy linguistic variable
	 */
	public createFLV(name: string): FuzzyVariable {
		this._flvs[name] = new FuzzyVariable()
		return this._flvs[name]
	}

	/**
	 * Adds a rule to the module
	 */
	public addRule(antecedent: FuzzyTerm, consequence: FuzzyTerm): void {
		this._rules.push(new FuzzyRule(antecedent, consequence))
	}

	/**
	 * Calls the fuzzify method of the named fuzzy linguistic variable
	 */
	public fuzzify(name: string, value: number): void {
		this._flvs[name].fuzzify(value)
	}

	/**
	 * Returns a crisp value of a fuzzy linguistic variable
	 * @param name name of the fuzzy linguistic variable
	 */
	public deFuzzify(name: string): number {
		// Make sure the key exists
		if (typeof this._flvs[name] === 'undefined') {
			throw new Error('Key not found')
		}

		// clear the dom's of all consequents
		this.setConfidencesOfConsequentsToZero()

		// process the rules
		for (const rule of this._rules) {
			rule.calculate()
		}

		// defuzzify
		return this._flvs[name].deFuzzify()
	}

	/**
	 * Zeros the DOMs of the consequents of each rule
	 */
	private setConfidencesOfConsequentsToZero(): void {
		for (const rule of this._rules) {
			rule.setConfidenceOfConsequentToZero()
		}
	}
}

export default FuzzyModule
