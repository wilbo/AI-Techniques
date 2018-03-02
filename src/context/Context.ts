import Vector2D from "../utils/Vector2D";
import VehicleType from "../utils/VehicleType";

interface Context {
	height: number;
	width: number;

	clear(): void
	drawEntity(position: Vector2D, size: number, color?: string): void
	drawVehicle(position: Vector2D, angle: number, vehicleType: VehicleType): void
	drawText(text: string, position?: Vector2D): void

}

export default Context
