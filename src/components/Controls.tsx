import * as React from 'react'
import Frame from '../game/Frame'

interface ControlsProps {
	frame: () => Frame
}

interface ControlsState {
	text: string
}

class Controls extends React.Component<ControlsProps, ControlsState> {
	initialState: ControlsState = { text: 'Start' }
	element: HTMLElement
	
	constructor(props: ControlsProps) {
		super(props)
		this.state = this.initialState
	}

	private handleOnClick = () => {
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
			marginTop: 10
		}

    return (
      <div>
				<button style={style} onClick={this.handleOnClick}>{this.state.text}</button>
			</div>
    )
  }
}

export default Controls
