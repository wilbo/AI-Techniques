import * as React from 'react'
import Frame from '../game/Frame'
import World from '../game/World'
import Utils from '../utils/Utils'
import ConfigurationList from '../configurations/base/ConfigurationList'

// the configurations displayed in the dropdown
import albert from '../configurations/vehicles/albert'
import bob from '../configurations/vehicles/bob'
import eddie from '../configurations/vehicles/eddie'

interface IControlsProps {
	world: World
}

class LoadConfigurations extends React.Component<IControlsProps> {
	private configurations: ConfigurationList

	constructor(props: IControlsProps) {
		super(props)
		this.configurations = new ConfigurationList(props.world)

		// the configurations displayed in the dropdown
		this.configurations.add('albert', albert)
		this.configurations.add('bob', bob)
		this.configurations.add('eddie', eddie)
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
