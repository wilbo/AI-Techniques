import FuzzyVariable from './FuzzyVariable'
import FuzzyRule from './FuzzyRule'
import FuzzyTerm from './FuzzyTerm'

class FuzzyModule {
	constructor(
		private _flvs: { [flv: string]: FuzzyVariable },
		private _rules: FuzzyRule[],
	) { }

	/**
	 * Creates a new fuzzy linguistic variable
	 * @returns reference to new fuzzy linguistic variable
	 */
	public createFLV(name: string): FuzzyVariable {
		return this._flvs[name] = new FuzzyVariable()
	}

	/**
	 * Adds a rule to the module
	 */
	public addRule(antecedent: FuzzyTerm, consequence: FuzzyTerm): void {

	}

	/**
	 * calls the fuzzify method of the named fuzzy linguistic variable
	 */
	public fuzzify(name: string): void {

	}

	/**
	 * returns a crisp value of a fuzzy linguistic variable
	 * @param name name of the fuzzy linguistic variable
	 */
	public deFuzzify(name: string): number {
		return 0
	}

	private setConfidencesOfConsequentsToZero(): void {

	}
}
