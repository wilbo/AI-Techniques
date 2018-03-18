import World from '../../game/World'
import Vector2D from '../../utils/Vector2D'
import ObstacleRound from '../../entity/ObstacleRound'
import Matrix2D from '../../utils/Matrix2D'
import Configuration from '../base/Configuration'
import * as imagePath from '../../assets/racing-pack/objects/rocks.png'

const rocks: Configuration = (world: World, position: Vector2D): ObstacleRound => {
	if (typeof position === 'undefined') {
		throw new Error('position is undefined')
	}

	position = Vector2D.multiply(position, world.cellSize)
	position = Matrix2D.vector2DToView(position, world.viewMatrix)

	return new ObstacleRound(world, position, world.cellSize * 0.5, imagePath)
}

export default rocks
