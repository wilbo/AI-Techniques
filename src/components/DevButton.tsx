import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'

interface IControlsProps {
	world: World,
	framesRunning: boolean,
	updateDevMode: () => void
}

interface IControlsState {
	text: string
}

enum ButtonText {
	On = 'Devmode on',
	Off = 'Devmode off',
}

class DevButton extends React.Component<IControlsProps, IControlsState> {
	private _initialState: IControlsState = { text: ButtonText.On }

	constructor(props: IControlsProps) {
		super(props)
		this.state = this._initialState
	}

	public handleOnClick = () => {
		if (this.state.text === ButtonText.Off) {
			this.setState({ text: ButtonText.On })
		} else {
			this.setState({ text: ButtonText.Off })
		}

		this.props.world.toggleDevMode()
		this.props.updateDevMode()
	}

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			marginTop: 10,
		}

	 return <button disabled={!this.props.framesRunning} style={style} onClick={this.handleOnClick}>{this.state.text}</button>
	}
}

export default DevButton
