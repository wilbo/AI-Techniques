import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Vehicle from '../entity/Vehicle'
import Controls from './Controls'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'

class Game extends React.Component {
	private element: HTMLElement
	private world: World
	private frame: Frame
	
	componentDidMount() {
		if (this.element != null) {

			const canvas = document.createElement('canvas')
			canvas.width = 1000
			canvas.height = 600
			this.element.appendChild(canvas)
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
			const context = new Context(ctx, canvas.width, canvas.height)
			this.world = new World(context)
			this.frame = new Frame(this.world)
			new Vehicle(this.world)
		}
	}

  public render(): JSX.Element {
		const style: React.CSSProperties = {
			overflow: 'hidden'
		}

    return (
			<>
				<div ref={r => (r) && (this.element = r)} style={style}></div>
				<Controls frame={() => this.frame} />
			</>
    )
  }
}

export default Game
