import World from '../../game/World'
import Vector2D from '../../utils/Vector2D'
import ObstacleRound from '../../entity/ObstacleRound'
import Matrix2D from '../../utils/Matrix2D'
import Configuration from '../base/Configuration'
import * as imagePath from '../../assets/racing-pack/objects/tree_large.png'

const largeTree: Configuration = (world: World, position: Vector2D): ObstacleRound => {
	position = Vector2D.multiply(position, world.cellSize)
	position = Matrix2D.vector2DToView(position, world.viewMatrix)

	return new ObstacleRound(world, position, world.cellSize, imagePath)
}

export default largeTree
