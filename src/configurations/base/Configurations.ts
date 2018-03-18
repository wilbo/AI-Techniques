import World from '../../game/World'
import Vehicle from '../../entity/Vehicle'

import albert from '../albert'
import bob from '../bob'
import eddie from '../eddie'

type Configuration = (world: World) => any

class Configurations {
	private _configurations: { [name: string]: Configuration } = {}

	constructor(private _world: World) {
		this.add('albert', albert)
		this.add('bob', bob)
		this.add('eddie', eddie)
	}

	/**
	 * fire a configuration
	 * @param name the name of the configuration
	 */
	public create(name: string): void {
		this._configurations[name](this._world)
	}

	/**
	 * return an array of configuration names
	 */
	public get names(): string[] {
		const output: string[] = []
		for (const name in this._configurations) {
			if (this._configurations.hasOwnProperty(name)) {
				output.push(name)
			}
		}
		return output
	}

	private add(name: string, conf: Configuration): void {
		this._configurations[name] = conf
	}
}

export default Configurations
