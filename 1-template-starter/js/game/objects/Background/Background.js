import state from '../../state'

// We create a class for each object
// Each class object have methods that get called inside each game phase (but those still need to be called manually on phases.js)
class Background2  {
  constructor(game) {
    this.game = game
    this.object = {}
  }

  static preload(game) {
    // preloading the image
    game.load.image('bg', 'images/background.png')
  }

  create() {
    // creating the phaser object and storing it inside this.object
    this.object = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg')
  }

  update() {
    this.object.tilePosition.x -= state.speed
  }
}

export default Background2
