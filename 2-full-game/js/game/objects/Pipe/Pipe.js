import state from '../../state'
import objects from '../../objects'
// import {once} from '../../../libs/lodash'

import {collisionWithPipe} from '../../managers/collisions'

class Pipe  {
  constructor(props) {
    this.position = props.position
    this.game = props.game
    this.bottom = {}
    this.top = {}
    this.reachedMiddle = false
    this.reachedEnd = false
  }

  static preload(game) {
    game.load.image('pipeTop', 'images/pipe-top.png')
    game.load.image('pipeBottom', 'images/pipe-bottom.png')
  }

  create() {
    this.top = this.game.add.sprite(this.game.world.width + 200, -450 - this.position, 'pipeTop')

    this.bottom = this.game.add.sprite(this.game.world.width + 200,  (this.game.world.height / 2) - this.position, 'pipeBottom')

    this.game.physics.enable(this.top, Phaser.Physics.ARCADE)
    this.top.body.allowGravity = false
    this.top.body.immovable = true

    this.game.physics.enable(this.bottom, Phaser.Physics.ARCADE)
    this.bottom.body.allowGravity = false
    this.bottom.body.immovable = true
  }

  increaseScoreOnce() {
    if (this.reachedMiddle) return false
    state.score ++
    objects.textScore.text = `score: ${state.score}`
  }

  // if reach middle of screen, increase score counter + 1, only once
  ifReachedMiddle = () => {
    if (this.top.body.position.x > (this.game.world.width / 2)) return false

    this.increaseScoreOnce()
    this.reachedMiddle = true
  }

  ifOutsideScreen = () => {
    if (this.reachedEnd) return false
    if (this.top.body.position.x > -200) return false

    // kill the pipe!
    this.kill()
    this.reachedEnd = true
  }

  kill() {
    this.top.kill()
    this.bottom.kill()
  }

  update() {
    this.top.body.position.x -= state.speed
    this.bottom.body.position.x -= state.speed

    this.ifReachedMiddle()

    this.ifOutsideScreen()

    this.game.physics.arcade.collide(objects.bird.object, this.top, collisionWithPipe, null, this);
    this.game.physics.arcade.collide(objects.bird.object, this.bottom, collisionWithPipe, null, this);
  }
}

export default Pipe
