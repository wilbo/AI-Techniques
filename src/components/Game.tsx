import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Vehicle from '../entity/Vehicle'
import CanvasContext from '../context/CanvasContext'
import Controls from './Controls'

class Game extends React.Component {
	private element: HTMLElement
	private world: World
	private frame: Frame
	
	componentDidMount() {
		if (this.element != null) {
			this.world = new World(new CanvasContext(this.element))
			this.frame = new Frame(this.world)
			const h = new Vehicle(this.world)
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
