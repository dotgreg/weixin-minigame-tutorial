//
// PHASES LOOP
//
import objects from './objects'

import Background from './objects/Background/Background'

// Phases Call order and frequency
// Preload (once)-> Create (once)-> Update (every frame) -> Render (every frame) -> Shutdown (once)


export const preload = function (game) {
  console.log('========= PRELOAD PHASE =============')
  // Background.preload(game)
}

export const create = function (game) {
  console.log('========= CREATE PHASE =============')
  // objects.bg = new Background(game)
  // objects.bg.create()
}

export const update = function (game) {
  // objects.bg.update()
}

export const render = function (game) {
}

export const shutdown = function (game) {
  console.log('========= SHUTDOWN PHASE =============')
}
