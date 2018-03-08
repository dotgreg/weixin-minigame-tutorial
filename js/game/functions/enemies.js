import {throttle, random} from '../../libs/lodash'

import objects from '../objects'
import state from '../state'
import Enemy from '../objects/Enemy/Enemy'

import {getCurrentTime} from './time'

const generateEnemy = (game) => {

  let enemy = new Enemy({game:game, position:{x:random(0, 500),y:0}, speed:random(2 + state.difficulty, 5  + state.difficulty)})
  enemy.create()

  objects.enemies.push(enemy)
}

export const throttleGenerateEnemies = throttle(generateEnemy, random(500 , 1000))
