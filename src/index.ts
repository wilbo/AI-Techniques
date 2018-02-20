import * as SVG from 'svg.js'
import Frame from './game/Frame'
import World from './game/World'
import Vehicle from './entity/Vehicle'
import Vector2D from './utils/Vector2D'

const element = document.getElementById('main')
const svgInstance = SVG(element)
const context = svgInstance.group()
context.translate(element.clientWidth / 2, element.clientHeight / 2) // center the context origin
const world = new World(element.clientHeight, element.clientWidth, context)
const frame = new Frame(world)
const v = new Vehicle(world)

const button = document.getElementById('start-stop')
let start = true
button.addEventListener('click', toggleFrame)
function toggleFrame(evt: Event) {
	if (start) {
		frame.start()
		evt.srcElement.innerHTML = 'Stop'
	} else {
		frame.stop()
		evt.srcElement.innerHTML = 'Start'
	}

	start = !start
}
