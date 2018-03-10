import state from '../../state'

class Background2  {
  constructor(game) {
    this.game = game
    this.object = {}
  }

  static preload(game) {
    game.load.image('bg', 'images/background.png')
  }

  create() {
    this.object = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg')
    // this.object = this.game.add.sprite(0, 0, 'bg')
  }

  update() {
    this.object.tilePosition.x -= state.speed
    // this.object.position.x += state.speed
  }
}

export default Background2
