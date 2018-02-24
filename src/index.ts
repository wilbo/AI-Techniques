import * as SVG from 'svg.js'
import Frame from './game/Frame'
import World from './game/World'
import Vehicle from './entity/Vehicle'
import Vector2D from './utils/Vector2D'
import SvgContext from './context/SvgContext';
import CanvasContext from './context/CanvasContext';

const element = document.getElementById('main')
// const world = new World(new SvgContext(element))
const world = new World(new CanvasContext(element))
const frame = new Frame(world)
new Vehicle(world)

// 
const button = document.getElementById('start-stop')
let start = true
button.addEventListener('click', toggleFrame)
function toggleFrame(evt: Event) {
	if (start) {
		frame.start()
		evt.srcElement.innerHTML = 'Pause'
	} else {
		frame.stop()
		evt.srcElement.innerHTML = 'Start'
	}

	start = !start
}
