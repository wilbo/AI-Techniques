interface IState<T> {
	name: string
	enter(entity: T): void
	execute(entity: T): void
	exit(entity: T): void
}

export default IState
