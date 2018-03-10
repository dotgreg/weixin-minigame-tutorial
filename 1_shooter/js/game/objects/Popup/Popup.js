class Popup  {
  constructor(game) {
    this.game = game
    this.object = null
    this.bullets = []
  }

  static preload(game) {
    game.load.image('hero', 'js/game/objects/Hero/hero.png')
  }

  create() {
  }

  update() {
  }
}

export default Popup
