import IState from './IState'

interface IStateEntity<T> {
	currentState: IState<T>
	changeState(state: IState<T>): void
}

export default IStateEntity
