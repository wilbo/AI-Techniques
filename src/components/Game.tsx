import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Vehicle from '../entity/Vehicle'
import Controls from './Controls'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import Obstacle from '../entity/Obstacle'

class Game extends React.Component {
	private element: HTMLElement
	private world: World
	private frame: Frame

	public componentDidMount() {
		if (this.element != null) {
			// adding a canvas element
			const canvas = document.createElement('canvas')
			canvas.width = 1000
			canvas.height = 600
			this.element.appendChild(canvas)

			// creating context
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

			// creating game, loop and entities
			const context = new Context(ctx, canvas.width, canvas.height)
			this.world = new World(context)
			this.frame = new Frame(this.world)
			const v = new Vehicle(this.world)

			const obstacle1 = new Obstacle(this.world)
			const obstacle2 = new Obstacle(this.world)
			const obstacle3 = new Obstacle(this.world)
			const obstacle4 = new Obstacle(this.world)
			const obstacle5 = new Obstacle(this.world)
			const obstacle6 = new Obstacle(this.world)
		}
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
