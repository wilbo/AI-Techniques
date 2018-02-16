import * as SVG from 'svg.js'
import Frame from './game/Frame'
import World from './game/World'
import Vehicle from './entity/Vehicle'
import Vector2D from './utils/Vector2D'

const element = document.getElementById('main')

const context = SVG(element)
const world = new World(element.clientHeight, element.clientWidth, context)
const frame = new Frame(world)

const v = new Vehicle(world, new Vector2D(world.width / 2, world.height / 2))

frame.start()
