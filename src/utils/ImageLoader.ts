import VehicleType from '../entity/VehicleType'

class ImageLoader {
	public static vehicle(imagePath: VehicleType | string): HTMLImageElement {
		const image = new Image()
		image.src = imagePath.toString()
		return image
	}
}

export default ImageLoader
