import {throttle, random} from '../../libs/lodash'

import objects from '../objects'
import Enemy from '../objects/Enemy/Enemy'

import {getCurrentTime} from './time'

let difficulty = 0

const generateEnemy = (game) => {
  difficulty = getCurrentTime() / 100

  let enemy = new Enemy({game:game, position:{x:random(0, 500),y:0}, speed:random(2 + difficulty, 5  + difficulty)})
  enemy.create()

  objects.enemies.push(enemy)
}

export const throttleGenerateEnemies = throttle(generateEnemy, random(500 , 1000))
 
