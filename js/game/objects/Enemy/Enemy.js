import Bullet from '../Bullet/Bullet'
import {each} from '../../../libs/lodash'

class Enemy  {
  constructor(props) {
    this.position = props.position || {x:0,y:0}
    this.game = props.game
    this.speed = props.speed || 10
    this.object = null
    this.bullets = []
  }

  static preload(game) {
    game.load.image('enemy', './js/game/objects/Enemy/enemy.png')
  }

  create() {
    this.object = this.game.add.sprite(this.position.x, this.position.y, 'enemy')

    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    // this.object.body.enable = true
    // this.object.body.immovable = false
    // this.object.body.collideWorldBounds = true
    // this.object.body.bounce.setTo(1, 1)
    // this.object.body.bounce.y = 1
    // this.object.body.bounce.x = 0.5
    this.object.body.allowGravity = false

    // this.game.physics.arcade.enable([this.object]);

    // this.object.body.collideWorldBounds = true

    // console.log(this.object)
  }

  fire () {
    console.log('FIRING!')

    var bullet = new Bullet({game: this.game, position:[this.object.position], direction: 'inverted'})
    bullet.create()
    this.bullets.push(bullet)
  }

  update() {
    this.object.body.position.y += this.speed

    if (this.bullets.length > 0) each(this.bullets, bullet => bullet.update())
  }
}

export default Enemy
