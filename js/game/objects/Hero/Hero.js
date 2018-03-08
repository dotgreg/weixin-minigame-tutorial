import state from '../../state'

import Bullet from '../Bullet/Bullet'
import {each, throttle} from '../../../libs/lodash'

class Hero  {
  constructor(game) {
    this.game = game
    this.object = null
    this.bullets = []
  }

  static preload(game) {
    game.load.image('hero', 'js/game/objects/Hero/hero.png')
  }

  create() {
    this.object = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'hero')
    this.object.anchor.setTo(0.5)
    this.object.inputEnabled = true
    this.object.input.enableDrag()

    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    this.object.body.collideWorldBounds = true
    this.object.body.allowGravity = false

    this.object.events.onInputDown.add(this.fire.bind(this))
  }

  fire () {
    if (state.lifes < 1) return false
    let bullet = new Bullet({game: this.game, position: this.object.position})
    bullet.create()
    this.bullets.push(bullet)
    let index = this.bullets.length

    setTimeout(() => {
      this.bullets.splice(1, 1)
      bullet.object.kill()
    }, state.hero.bulletLifeSpan)
  }

  throttleFire = throttle(this.fire, state.hero.shootingSpeed)

  update() {
    if (this.game.input.activePointer.isDown) this.throttleFire()
    if (this.bullets.length > 0) each(this.bullets, bullet => bullet.update())
  }
}

export default Hero
