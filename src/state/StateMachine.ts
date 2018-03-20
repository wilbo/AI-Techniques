import Entity from '../entity/base/Entity'
import IState from './IState'

class StateMachine<T> {
	public currentState: IState<T>

	constructor(
		private _owner: T,
		public globalState: IState<T>,
		public readonly defaultState: IState<T>,
	) {
		this.globalState.enter(_owner)
		this.defaultState.enter(_owner)
		this.currentState = defaultState
	}

	/**
	 * Execute current and global state every update loop
	 */
	public update(): void {
		if (this.globalState) { this.globalState.execute(this._owner) }
		if (this.currentState) { this.currentState.execute(this._owner) }
	}

	/**
	 * Change te current state to a new state
	 * @param state the new state
	 */
	public changeState(state: IState<T>): void {
		// this.defaulState = this.currentState
		this.currentState.exit(this._owner)
		this.currentState = state
		this.currentState.enter(this._owner)
	}

	/**
	 * Revert back to the previous state
	 */
	public toDefaultState(): void {
		this.changeState(this.defaultState)
	}

	/**
	 * Wether the current state equals to the given state
	 * @param state the given state
	 */
	public isInState(state: IState<T>): boolean {
		return state.name === this.currentState.name
	}
}

export default StateMachine
