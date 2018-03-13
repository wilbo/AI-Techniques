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
import ObstacleRect from '../entity/ObstacleRect'
import Wall from '../entity/Wall'
import * as Background from '../assets/world.png'

class Game extends React.Component {
	private element: HTMLElement
	private world: World
	private frame: Frame

	public componentDidMount() {
		if (this.element != null) {
			// adding a canvas element
			const canvas = document.createElement('canvas')
			canvas.width = 1056
			canvas.height = 624
			// canvas.style.backgroundImage = `url(${Background})`
			this.element.appendChild(canvas)

			// creating context
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

			// creating a world and loop
			const context = new Context(ctx, canvas.width, canvas.height)
			this.world = new World(context)
			this.frame = new Frame(this.world)

			this.wallAvoidanceTest()
		}
	}

	public wallAvoidanceTest(): void {
		const wall1 = new Wall(this.world, new Vector2D(-205, -200), new Vector2D(195, 200))
		const wall2 = new Wall(this.world,  new Vector2D(200, 200), new Vector2D(-200, -200))

		const v1 = new Vehicle(this.world)
		v1.position = new Vector2D(-100, 250)
		v1.steering.targetPosition = new Vector2D(-100, -250)
		v1.steering.wallAvoidanceOn = true
		v1.steering.seekOn = true

		const v2 = new Vehicle(this.world)
		v2.position = new Vector2D(100, -250)
		v2.steering.targetPosition = new Vector2D(100, 250)
		v2.steering.wallAvoidanceOn = true
		v2.steering.seekOn = true
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

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			overflow: 'hidden',
		}

		return (
			<>
				<div ref={(r) => (r) && (this.element = r)} style={style} />
				{/* tslint:disable-next-line:jsx-no-lambda */}
				<Controls frame={() => this.frame} />
			</>
		)
	}
}

export default Game
