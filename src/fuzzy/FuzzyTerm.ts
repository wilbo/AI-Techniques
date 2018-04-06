abstract class FuzzyTerm {
	/**
	 * All terms must implement a virtual constructor
	 */
	public abstract clone(): FuzzyTerm

	/**
	 * Retrieves the degree of membership of the term
	 */
	public abstract get dom(): number

	/**
	 * Clears the degree of membership of the term
	 */
	public abstract clearDom(): void

	/**
	 * Updates the DOM of a consequent when a rule fires
	 */
	public abstract orWithDom(value: number): void
}

export default FuzzyTerm
