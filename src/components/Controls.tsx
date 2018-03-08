import * as React from 'react'
import Frame from '../game/Frame'

interface IControlsProps {
	frame: () => Frame
}

interface IControlsState {
	text: string
}

class Controls extends React.Component<IControlsProps, IControlsState> {
	private _initialState: IControlsState = { text: 'Start' }
	private _element: HTMLElement

	constructor(props: IControlsProps) {
		super(props)
		this.state = this._initialState
	}

	public handleOnClick = () => {
		if (this.state.text === 'Start') {
			this.props.frame().start()
			this.setState({ text: 'Pause' })
		} else {
			this.props.frame().stop()
			this.setState({ text: 'Start' })
		}
	}

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			marginTop: 10,
		}

	 return (
			<div>
				<button style={style} onClick={this.handleOnClick}>{this.state.text}</button>
			</div>
		)
	}
}

export default Controls
