import './js/libs/weapp-adapter'
import './js/libs/symbol'
import './js/libs/stub'

// import the states
import * as phases from './js/game/phases'

// Initialize the Game object
window.PIXI = require('./js/libs/pixi.min')
window.p2 = require('./js/libs/p2')
window.Phaser = require('./js/libs/phaser-split.min')

var aspect = window.innerWidth / window.innerHeight
var gameWidth = 640
var gameHeight = gameWidth / aspect

var game = new Phaser.Game({
  width: gameWidth,
  height: gameHeight,
  renderer: Phaser.CANVAS,
  canvas: canvas,
  state: {
    preload: phases.preload.bind(this),
    create: phases.create.bind(this),
    update: phases.update.bind(this),
    render: phases.render.bind(this),
    shutdown: phases.shutdown.bind(this),
  }
})
