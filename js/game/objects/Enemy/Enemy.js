import Bullet from '../Bullet/Bullet'
import {each} from '../../../libs/lodash'

class Enemy  {
  constructor(props) {
    this.game = props.game
    this.position = props.position || {x:0,y:0}
    this.speed = props.speed || 10
    this.object = null
  }

  static preload(game) {
    game.load.image('enemy', './js/game/objects/Enemy/enemy.png')
  }

  create() {
    this.object = this.game.add.sprite(this.position.x, this.position.y, 'enemy')

    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    this.object.body.allowGravity = false
  }

  update() {
    this.object.body.position.y += this.speed
  }
}

export default Enemy
