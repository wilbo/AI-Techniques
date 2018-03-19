interface IState<Entity> {
	name: string
	enter(entity: Entity): void
	execute(entity: Entity): void
	exit(entity: Entity): void
}

export default IState
