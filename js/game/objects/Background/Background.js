class Background  {
  constructor(game) {
    this.game = game
    this.object = {}
  }

  static preload(game) {
    game.load.image('bg', './js/game/objects/Background/bg.jpg')
  }

  create() {
    this.object = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg')
  }

  update() {
    this.object.tilePosition.y += 1
  }
}

export default Background

// game.hero = game.add.sprite(game.world.centerX, game.world.centerY, 'hero')
// game.hero.anchor.setTo(0.5)
// game.hero.inputEnabled = true
// game.hero.input.enableDrag()
