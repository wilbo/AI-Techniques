import Vector2D from "../utils/Vector2D";

interface Context {
	height: number;
	width: number;

	clear(): void
	drawEntity(position: Vector2D, size: number, color?: string): void
	drawVehicle(position: Vector2D, size: number, angle: number): void
	drawText(text: string, position?: Vector2D): void

}

export default Context
