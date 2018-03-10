import {each} from '../libs/lodash'

// A single namespace for all the objects we are gonna create
import objects from './objects'
import state from './state'

// objects to create
import Background from './objects/Background/Background'
import Floor from './objects/Floor/Floor'
import Bird from './objects/Bird/Bird'
import Pipe from './objects/Pipe/Pipe'
import GameButton from './objects/Button/Button'

// managers
import {PipesGenerator} from './managers/generators'
import {endGame} from './managers/events'

//
// PHASES LOOP
//
export const preload = function (game) {
  console.log('========= PRELOAD PHASE =============')

  Floor.preload(game)
  Bird.preload(game)
  Background.preload(game)
  Pipe.preload(game)
  GameButton.preload('restart', game)
  GameButton.preload('leaderboard', game)
}


export const create = function (game) {
  console.log('========= CREATE PHASE =============')


  // important to get drag drop working
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  game.scale.pageAlignHorizontally = true
  game.scale.pageAlignVertically = true

  // important to get collision system working
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.physics.arcade.gravity.y = state.gravity

  objects.bg = new Background(game)
  objects.bg.create()

  objects.floor = new Floor(game)
  objects.floor.create()

  objects.bird = new Bird(game)
  objects.bird.create()

  objects.textScore = game.add.text(16, 16, `score: ${state.score}`, { fontSize: '32px', fill: '#FFF' });
}

export const update = function (game) {
  // console.log('========= UPDATE PHASE =============')

  objects.bg.update()
  objects.floor.update()
  objects.bird.update()

  PipesGenerator(game)
  each(objects.pipes, pipe => pipe.update())

  if (state.gameState === 'ended') endGame(game)
}

export const render = function (game) {
  // console.log('========= RENDER PHASE =============')
  // game.debug.body(objects.bird.object);
  // each(objects.pipes, pipe => {
  //   game.debug.body(pipe.top)
  //   game.debug.body(pipe.bottom)
  // })
}

export const shutdown = function (game) {
  console.log('========= SHUTDOWN PHASE =============')
}
