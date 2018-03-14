import {birdJSON} from '../../../../images/bird'
import state from '../../state'

import {collisionWithBorders} from '../../managers/collisions'

class Bird  {
  constructor(game) {
    this.game = game
    this.object = {}
  }

  static preload(game) {
    let json = JSON.parse(birdJSON)
    // to import and preload a moving sprite, we pass the sprite image and an associated json that describe the animation
    game.load.atlasJSONHash('bird', 'images/bird.png', null, json);
  }

  create() {
    // instanciate the phaser object (here is it a sprite) + place it in the middle of the screen + use the 'bird' cache moving sprite
    this.object = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'bird')
    // the origin of the object is left top by default, put it on middle, middle instead to center the object
    this.object.anchor.setTo(0.5, 0.5);

    // start the animation described inside the JSON, there are 3 frames, we call the animation 'fly'
    this.object.animations.add('fly');
    this.object.animations.play('fly', 3, true);

    // the put the phaser object inside the physic system, enable the gravity to make the bird falling
    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    this.object.body.allowGravity = true

    // when touch the whole screen, make the bird jump!
    this.game.input.onDown.add(this.jump.bind(this))
  }

  jump() {
    // give the object some speed on the Y axis
    this.object.body.velocity.y -= state.gravityJump
  }

  update() {
    // if the bird reach the floor or top ceiling, trigger collisionWithBorders
    if (this.object.body.position.y > this.game.world.height - 300) collisionWithBorders(this.object)
    if (this.object.body.position.y < 0) collisionWithBorders(this.object)
  }
}

export default Bird
