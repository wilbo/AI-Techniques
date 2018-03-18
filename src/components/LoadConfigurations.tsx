import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'

import bob from '../configurations/bob'
import eddie from '../configurations/eddie'
import albert from '../configurations/albert'
import Configurations from '../configurations/base/Configurations'
import Utils from '../utils/Utils'

interface IControlsProps {
	world: World
}

class LoadConfigurations extends React.Component<IControlsProps> {
	private configurations: Configurations

	constructor(props: IControlsProps) {
		super(props)
		this.configurations = new Configurations(props.world)
	}

	public onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		this.configurations.create(evt.target.value)
		evt.target.selectedIndex = 0
	}

	public render(): JSX.Element {
		const style: React.CSSProperties = {
			marginTop: 10,
		}

		const options = this.configurations.names.map((key) => <option key={key} value={key}>add {key}</option>)

		return (
			<div style={style}>
				<span>add entity: </span>
				<select onChange={this.onSelectChange}>
					<option>Select to add</option>
					{options}
				</select>
				<button style={{ marginLeft: 10 }} onClick={() => this.props.world.entities.removeVehicles()}>remove entities</button>
			</div>
		)
	}
}

export default LoadConfigurations
