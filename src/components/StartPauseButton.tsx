import * as React from 'react'
import Frame from '../game/Frame'

interface IControlsProps {
	frame: Frame,
	updateRunning: () => void,
}

interface IControlsState {
	text: string,
}

enum ButtonText {
	Start = 'Start',
	Pause = 'Pause',
}

class StartPauseButton extends React.Component<IControlsProps, IControlsState> {
	private _initialState: IControlsState = { text: ButtonText.Start }

	constructor(props: IControlsProps) {
		super(props)
		this.state = this._initialState
	}

	public handleOnClick = () => {
		if (this.state.text === ButtonText.Start) {
			this.props.frame.start()
			this.setState({ text: ButtonText.Pause })
		} else {
			this.props.frame.stop()
			this.setState({ text: ButtonText.Start })
		}

		this.props.updateRunning()
	}

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			marginTop: 10,
			marginRight: 10,
		}

	 return <button style={style} onClick={this.handleOnClick}>{this.state.text}</button>
	}
}

export default StartPauseButton
