import ILevel from './ILevel'
import Wall from '../../entity/Wall'
import * as Background from '../../assets/world.png'
import World from '../World'
import Vector2D from '../../utils/Vector2D'
import Utils from '../../utils/Utils'
import Matrix2D from '../../utils/Matrix2D'

class Level1 implements ILevel {
	public readonly imagePath: string = Background

	public readonly walls: Vector2D[] = [
		// from vector, to vector
		new Vector2D(8, 1), new Vector2D(2, 1),
		new Vector2D(9, 3), new Vector2D(9, 2),
		new Vector2D(11, 3), new Vector2D(9, 3),
		new Vector2D(11, 1.5), new Vector2D(11, 3),
		new Vector2D(18.5, 1), new Vector2D(11.5, 1),
		new Vector2D(19, 3), new Vector2D(19, 1.5),
		new Vector2D(20, 3), new Vector2D(19, 3),
		new Vector2D(2, 13), new Vector2D(20, 13),
		new Vector2D(21, 12), new Vector2D(21, 4),
		new Vector2D(1, 2), new Vector2D(1, 12),
		new Vector2D(3, 3), new Vector2D(7, 3),
		new Vector2D(7, 3), new Vector2D(7, 5),
		new Vector2D(7, 5), new Vector2D(3, 5),
		new Vector2D(3, 5), new Vector2D(3, 3),
		new Vector2D(3, 7), new Vector2D(7, 7),
		new Vector2D(7, 7), new Vector2D(7, 9),
		new Vector2D(8, 10), new Vector2D(13, 10),
		new Vector2D(13, 10), new Vector2D(13, 11),
		new Vector2D(13, 11), new Vector2D(3, 11),
		new Vector2D(3, 11), new Vector2D(3, 7),
		new Vector2D(9, 5), new Vector2D(19, 5),
		new Vector2D(19, 5), new Vector2D(19, 11),
		new Vector2D(19, 11), new Vector2D(15, 11),
		new Vector2D(15, 11), new Vector2D(15, 9),
		new Vector2D(14, 8), new Vector2D(9, 8),
		new Vector2D(9, 8), new Vector2D(9, 5),
		new Vector2D(12, 2), new Vector2D(18, 2),
		new Vector2D(18, 2), new Vector2D(18, 3),
		new Vector2D(18, 3), new Vector2D(12, 3),
		new Vector2D(12, 3), new Vector2D(12, 2),
		// corners
		new Vector2D(2, 1), new Vector2D(1, 2),
		new Vector2D(1, 12), new Vector2D(2, 13),
		new Vector2D(20, 13), new Vector2D(21, 12),
		new Vector2D(21, 4), new Vector2D(20, 3),
		new Vector2D(9, 2), new Vector2D(8, 1),
		new Vector2D(7, 9), new Vector2D(8, 10),
		new Vector2D(14, 8), new Vector2D(15, 9),
		new Vector2D(12 - 0.5, 1), new Vector2D(11, 2 - 0.5),
		new Vector2D(19, 1 + 0.5), new Vector2D(18 + 0.5, 1),
	]

	public readonly grid: number[][] = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]

	constructor(private _world: World) {
		this.createWalls()
	}

	private createWalls(): void {
		const vectors = this.walls
			.map((vector) => Vector2D.multiply(vector, this._world.cellSize)) // transfrom to pixels
			// // .map((vector) => Vector2D.subtract(vector, new Vector2D(-3, -3))) // add some offset ?
			.map((vector) => Matrix2D.vector2DToView(vector, this._world.viewMatrix)) // transform to view matrix

		for (let i = 0; i < vectors.length; i = i + 2) {
			new Wall(this._world, vectors[i], vectors[i + 1])
		}
	}
}

export default Level1
