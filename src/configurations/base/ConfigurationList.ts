import World from '../../game/World'
import Vehicle from '../../entity/Vehicle'
import Configuration from './Configuration'

class ConfigurationList {
	private _configurations: { [name: string]: Configuration } = {}

	constructor(private _world: World) {}

	/**
	 * fire a configuration into the world!
	 * @param name the name of the configuration
	 */
	public create(name: string): void {
		this._configurations[name](this._world)
	}

	/**
	 * fire all configurations
	 */
	public createAll(): void {
		for (const name in this._configurations) {
			if (this._configurations.hasOwnProperty(name)) {
				this._configurations[name](this._world)
			}
		}
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

	/**
	 * adding a configuration
	 * @param name a unique name for the configuration
	 * @param conf something that this configuration should do
	 */
	public add(name: string, conf: Configuration): void {
		this._configurations[name] = conf
	}
}

export default ConfigurationList
