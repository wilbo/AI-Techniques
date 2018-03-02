import VehicleType from './VehicleType'

class ImageLoader {
	public static vehicle(vehicleType: VehicleType): HTMLImageElement {
		const image = new Image()
		image.src = vehicleType.toString()
		return image
	}
}

export default ImageLoader
