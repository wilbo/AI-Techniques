import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'

import bob from '../configurations/bob'
import eddie from '../configurations/eddie'
import albert from '../configurations/albert'
import Configuration from '../configurations/base/Configuration'

interface IControlsProps {
	world: World
}

class LoadConfigurations extends React.Component<IControlsProps> {
	constructor(props: IControlsProps) {
		super(props)
	}

	public onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		switch (evt.target.value) {
			case Configuration.Albert:
				albert(this.props.world)
				break
			case Configuration.Bob:
				bob(this.props.world)
				break
			case Configuration.Eddie:
				eddie(this.props.world)
				break
			default:
				break
		}

		evt.target.selectedIndex = 0
	}

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			marginTop: 10,
		}

		return (
			<div style={style}>
				<span>add entity: </span>
				<select onChange={this.onSelectChange}>
					<option />
					<option value={Configuration.Albert}>add {Configuration.Albert}</option>
					<option value={Configuration.Bob}>add {Configuration.Bob}</option>
					<option value={Configuration.Eddie}>add {Configuration.Eddie}</option>
				</select>
				<button style={{ marginLeft: 10 }} onClick={() => this.props.world.entities.removeVehicles()}>remove entities</button>
			</div>
		)

	}
}

export default LoadConfigurations
