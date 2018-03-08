import {each} from '../libs/lodash'

// A single namespace for all the objects we are gonna create
import objects from './objects'

// objects to create
import Hero from './objects/Hero/Hero'
import Background from './objects/Background/Background'
import Bullet from './objects/Bullet/Bullet'
import Enemy from './objects/Enemy/Enemy'

// functions
import {throttleGenerateEnemy} from './functions/enemies.js'
import {collisionWithPlane} from './functions/collisions.js'

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

  objects.enemy = new Enemy({game:game, position:{x:300,y:0}, speed:3})
  objects.enemy.create()


  // game.physics.startSystem(Phaser.Physics.ARCADE)
  // game.physics.arcade.gravity.y = 200
  // game.physics.arcade.enable([objects.hero, objects.enemy]);
  // console.log(objects.enemy)
  // objects.enemy.object.body.bounce.y = 0.95
  // objects.enemy.object.body.collideWorldBounds = true
  //
  // objects.hero.object.body.bounce.y = 0.95
  // objects.hero.object.body.collideWorldBounds = true
  // objects.hero.object.anchor.setTo(0.8)
  // console.log(game.physics.arcade)
}

export var update = function (game) {
  // console.log('========= UPDATE PHASE =============')

  objects.hero.update()
  objects.bg.update()

  objects.enemy.update()
  // throttleGenerateEnemy(game)
  game.physics.arcade.collide(objects.hero.object, objects.enemy.object, collisionWithPlane, null, this);

  if (objects.enemies.length > 0) each(objects.enemies, enemy => {
    enemy.update()
    game.physics.arcade.collide(objects.hero, enemy);
  })
}

export var render = function (game) {
  // console.log('========= RENDER PHASE =============')
  game.debug.body(objects.hero.object);
  game.debug.body(objects.enemy.object);
}
