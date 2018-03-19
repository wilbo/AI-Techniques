import * as React from 'react'
import Frame from '../game/Frame'
import StartPauseButton from './StartPauseButton'
import World from '../game/World'
import DevButton from './DevButton'

interface IControlsProps {
	frame: Frame,
	world: World,
}

interface IControlsState {
	framesRunning: boolean,
	devMode: boolean
}

class Controls extends React.Component<IControlsProps, IControlsState> {
	private _initialState: IControlsState = {
		framesRunning: false,
		devMode: false,
	}

	constructor(props: IControlsProps) {
		super(props)
		this.state = this._initialState
	}

	public updateRunning = (): void => {
		this.setState({ framesRunning: this.props.frame.isRunning })
	}

	public updateDevMode = (): void => {
		this.setState({ devMode: this.props.world.devMode })
	}

	public render(): JSX.Element {
	 return (
			<div>
				<StartPauseButton frame={this.props.frame} updateRunning={this.updateRunning} />
	 			<DevButton world={this.props.world} framesRunning={this.props.frame.isRunning} updateDevMode={this.updateDevMode} />
			</div>
		)
	}
}

export default Controls
