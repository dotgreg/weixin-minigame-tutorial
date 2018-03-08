import Bullet from '../Bullet/Bullet'
import {each} from '../../../libs/lodash'

class Hero  {
  constructor(game) {
    this.game = game
    this.object = null
    this.bullets = []
  }

  static preload(game) {
    game.load.image('hero', './js/game/objects/Hero/hero.png')
  }

  create() {
    this.object = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'hero')
    this.object.anchor.setTo(0.5)
    this.object.inputEnabled = true
    this.object.input.enableDrag()

    // this.game.physics.arcade.enable([this.object]);
    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    // this.object.body.enable = true
    // this.object.body.immovable = false
    this.object.body.collideWorldBounds = true
    // this.object.body.bounce.setTo(1, 1)
    // this.object.body.bounce.y = 1
    this.object.body.allowGravity = false

    // console.log(this.object)
    // this.object.body.collideWorldBounds = true

    this.object.events.onInputDown.add(this.fire.bind(this))
  }

  fire () {
    console.log('FIRING!')

    var bullet = new Bullet({game: this.game, position: this.object.position})
    bullet.create()
    this.bullets.push(bullet)
  }

  update() {
    if (this.bullets.length > 0) each(this.bullets, bullet => bullet.update())
  }
}

export default Hero
