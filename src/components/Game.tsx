import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Vehicle from '../entity/Vehicle'
import Controls from './Controls'
import Context from '../context/Context';
import Matrix2D from '../utils/Matrix2D';
import Vector2D from '../utils/Vector2D';

class Game extends React.Component {
	private element: HTMLElement
	private world: World
	private frame: Frame
	
	componentDidMount() {
		if (this.element != null) {
			// this.world = new World()
			// this.frame = new Frame(this.world)
			// const h = new Vehicle(this.world)

			const c = new Context(this.element)
			const vectors = [
				new Vector2D(0, 0),
				new Vector2D(2, 0),
				new Vector2D(0, 1)
			]

			c.drawShape(vectors)
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
