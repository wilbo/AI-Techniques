interface IState<Entity> {
	enter(e: Entity): void
	execute(e: Entity): void
	exit(e: Entity): void
}

export default IState
