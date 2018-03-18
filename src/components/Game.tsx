import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Vehicle from '../entity/Vehicle'
import Controls from './Controls'
import Context from '../context/Context'
import Vector2D from '../utils/Vector2D'
import ObstacleRound from '../entity/ObstacleRound'
import Matrix2D from '../utils/Matrix2D'
import Utils from '../utils/Utils'
import albert from '../configurations/albert'

interface IControlsState {
	mounted: boolean
}

class Game extends React.Component<{}, IControlsState> {
	private _initialState: IControlsState = { mounted: false }
	private element: HTMLElement
	private world: World
	private frame: Frame

	constructor(props: {}) {
		super(props)
		this.state = this._initialState
	}

	public componentDidMount() {
		if (this.element != null) {
			this.world = new World(this.element)
			this.frame = new Frame(this.world)

			albert(this.world)

			this.setState({ mounted: true })
		}
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
