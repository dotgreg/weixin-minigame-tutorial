import state from '../../state'

class Floor  {
  constructor(game) {
    this.game = game
    this.object = {}
  }

  static preload(game) {
    game.load.image('floor', 'images/floor.png')
  }

  create() {
    this.object = this.game.add.tileSprite(0, this.game.world.height - 248, this.game.world.width, 248, 'floor')
  }

  update() {
    this.object.tilePosition.x -= state.speed
  }
}

export default Floor
