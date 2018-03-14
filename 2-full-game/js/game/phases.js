import {each, isObject} from '../libs/lodash'

// A single namespace for all the objects we are gonna create
import objects from './objects'
import state from './state'

// import Classes of objects to create
import Background from './objects/Background/Background'
import Floor from './objects/Floor/Floor'
import Bird from './objects/Bird/Bird'
import Pipe from './objects/Pipe/Pipe'
import GameButton from './objects/Button/Button'

// import some functions
import {PipesGenerator} from './managers/generators'
import {endGame} from './managers/events'

//
// PHASES LOOP
//

// Phases Call order and frequency
// Preload (once)-> Create (once)-> Update (every frame) -> Render (every frame) -> Shutdown (once)

export const preload = function (game) {
  console.log('========= PRELOAD PHASE =============')

  // preload all images and assets
  Floor.preload(game)
  Bird.preload(game)
  Pipe.preload(game)
  Background.preload(game)
  GameButton.preload('restart', game)
  GameButton.preload('leaderboard', game)
}

var startUpdate = false
export const create = function (game) {
  console.log('========= CREATE PHASE =============')

  // small hack as some assets were not displayed on real devices
  startUpdate = false
  setTimeout(() => {
    startUpdate = true

    // initialize scaling parameters
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    // Start the physic engine
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = state.gravity

    // initialize some objects
    objects.bg = new Background(game)
    objects.bg.create()

    objects.floor = new Floor(game)
    objects.floor.create()

    objects.bird = new Bird(game)
    objects.bird.create()

    // add a score text on top right
    objects.textScore = game.add.text(16, 16, `score: ${state.score}`, { fontSize: '32px', fill: '#FFF' });
  }, 100)
}

export const update = function (game) {
  if (!startUpdate) return false
  // console.log('========= UPDATE PHASE =============')

  // update the animation of the following objects at each frame
  objects.bg.update()
  objects.floor.update()
  objects.bird.update()

  // generate pipes every X seconds
  PipesGenerator(game)
  // for each pipe generated, run its update() method at every frame
  each(objects.pipes, pipe => pipe.update())

  // if we detect the gamestate has ended, trigger the function endgame that displays the menu buttons and pause game
  if (state.gameState === 'ended') endGame(game)
}

// useful for debugging helper for collision
export const render = function (game) {
  // console.log('========= RENDER PHASE =============')
  // game.debug.body(objects.bird.object);
  // each(objects.pipes, pipe => {
  //   game.debug.body(pipe.top)
  //   game.debug.body(pipe.bottom)
  // })
}

// useful to clean things (setInterval functions etc...)
export const shutdown = function (game) {
  console.log('========= SHUTDOWN PHASE =============')
}
