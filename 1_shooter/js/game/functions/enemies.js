import {throttle, random} from '../../libs/lodash'

import objects from '../objects'
import state from '../state'
import Enemy from '../objects/Enemy/Enemy'

import {getCurrentTime} from './time'

const generateEnemy = (game) => {
  let enemy = new Enemy({game:game, position:{x:random(0, 500),y:0}, speed:random(2 + state.difficulty.value, 5  + state.difficulty.value)})
  enemy.create()

  objects.enemies.push(enemy)

  setTimeout(() => {
    objects.enemies.splice(1, 1)
    enemy.object.kill()
  }, 4000)
}

export const throttleGenerateEnemies = throttle(generateEnemy, random(500 , 1000))
