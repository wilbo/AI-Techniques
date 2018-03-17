import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Vehicle from '../entity/Vehicle'
import Controls from './Controls'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import ObstacleRound from '../entity/ObstacleRound'
import Matrix2D from '../utils/Matrix2D'
import VehicleType from '../context/helpers/VehicleType'
import Utils from '../utils/Utils'

interface IControlsState {
	mounted: boolean
}

class Game extends React.Component<{}, IControlsState> {
	private _initialState: IControlsState = { mounted: false }

	private element: HTMLElement
	private world: World
	private frame: Frame
	private vehicle: Vehicle
	// private positions: Vector2D[]

	constructor(props: {}) {
		super(props)
		this.state = this._initialState
	}

	public componentDidMount() {
		if (this.element != null) {
			this.world = new World(this.element)
			this.world.onClickListener = this.onWorldClick
			this.frame = new Frame(this.world)
			this.vehicle = new Vehicle(this.world, new Vector2D(-120, 0))
			// this.vehicle.steering.wanderOn = true
			this.vehicle.steering.wallAvoidanceOn = true

			// this.drunkDriver(Utils.randomVector(this.world))
			// this.drunkDriver(Utils.randomVector(this.world))
			// this.drunkDriver(Utils.randomVector(this.world))
			// this.drunkDriver(Utils.randomVector(this.world))
			// this.drunkDriver(Utils.randomVector(this.world))
			// this.drunkDriver(Utils.randomVector(this.world))

			this.setState({ mounted: true })
		}
	}

	public onWorldClick = (clickedPosition: Vector2D): void => {
		const path = this.world.findPath(this.vehicle.position, clickedPosition)

		if (path.length > 0) {
			this.vehicle.steering.followPathPositions = path
			this.vehicle.steering.currentFollowPathPosition = this.vehicle.steering.followPathPositions[0]
			this.vehicle.steering.followPathOn = true
		}
	}

	public carChase(): void {
		const obstacle1 = new ObstacleRound(this.world)
		const obstacle2 = new ObstacleRound(this.world)
		const obstacle3 = new ObstacleRound(this.world)
		const obstacle4 = new ObstacleRound(this.world)
		const obstacle5 = new ObstacleRound(this.world)
		const obstacle6 = new ObstacleRound(this.world)

		const v1 = new Vehicle(this.world)
		const v2 = new Vehicle(this.world)

		v1.steering.targetAgent = v2
		v1.steering.pursuitOn = true
		v1.steering.obstacleAvoidanceOn = true
		v1.vehicleType = VehicleType.Blue4
		v1.maxSpeed = 360
		v1.position = new Vector2D(200, 200)

		v2.steering.targetAgent = v1
		v2.steering.evadeOn = true
		// v2.steering.hideOn = true
		v2.steering.wanderOn = true
		v2.steering.obstacleAvoidanceOn = true
	}

	public drunkDriver(start: Vector2D): void {
		const v = new Vehicle(this.world, start)
		v.steering.wanderOn = true
		v.steering.wallAvoidanceOn = true
	}

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			overflow: 'hidden',
		}

		return (
			<>
				<div ref={(r) => (r) && (this.element = r)} style={style} />
				{this.state.mounted ? <Controls frame={this.frame} world={this.world} /> : null}
			</>
		)
	}
}

export default Game
