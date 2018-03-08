import {each} from '../libs/lodash'

// A single namespace for all the objects we are gonna create
import objects from './objects'
import state from './state'

// objects to create
import Hero from './objects/Hero/Hero'
import Background from './objects/Background/Background'
import Bullet from './objects/Bullet/Bullet'
import Enemy from './objects/Enemy/Enemy'

// functions
import {throttleGenerateEnemies} from './functions/enemies'
import {collisionWithPlane, collisionWithBullet} from './functions/collisions'
import {updateDifficulty} from './functions/difficulty'

//
// PHASES LOOP
//

export var preload = function (game) {
  console.log('========= PRELOAD PHASE =============')

  Background.preload(game)
  Hero.preload(game)
  Bullet.preload(game)
  Enemy.preload(game)

}

export var create = function (game) {
  console.log('========= CREATE PHASE =============')

  // important to get drag drop working
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  game.scale.pageAlignHorizontally = true
  game.scale.pageAlignVertically = true

  // important to get collision system working
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.physics.arcade.gravity.y = 200

  objects.bg = new Background(game)
  objects.bg.create()

  objects.hero = new Hero(game)
  objects.hero.create()

  objects.text.score = game.add.text(16, 16, `score: ${state.score}`, { fontSize: '32px', fill: '#FFF' });
  objects.text.lifes = game.add.text(16, 50, `lifes: ${state.lifes}`, { fontSize: '32px', fill: '#FFF' });
}

export var update = function (game) {
  // console.log('========= UPDATE PHASE =============')
  objects.hero.update()
  objects.bg.update()
  updateDifficulty()

  throttleGenerateEnemies(game)
  each(objects.enemies, enemy => {
    enemy.update()
    game.physics.arcade.collide(objects.hero.object, enemy.object, collisionWithPlane, null, this);
    each(objects.hero.bullets, bullet => {
      // console.log(objects.hero.bullets.length)
      game.physics.arcade.collide(enemy.object, bullet.object, collisionWithBullet, null, this)
    })
  })
}

export var render = function (game) {
  // console.log('========= RENDER PHASE =============')
  game.debug.body(objects.hero.object);
  each(objects.enemies, enemy => game.debug.body(enemy.object))
}
