import {throttle, random} from '../../libs/lodash'

import objects from '../objects'
import Enemy from '../objects/Enemy/Enemy'

import {getCurrentTime} from './time'

let difficulty = 0

const generateEnemy = (game) => {
  difficulty = getCurrentTime() / 50

  let enemy = new Enemy({game:game, position:{x:random(0, 500),y:0}, speed:random(5 + difficulty, 10  + difficulty)})
  enemy.create()
  objects.enemies.push(enemy)
}

export const throttleGenerateEnemy = throttle(generateEnemy, random(500 , 1000))

// export default test = []
