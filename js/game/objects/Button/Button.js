import state from '../../state'
import objects from '../../objects'

class GameButton  {
  constructor(props) {
    this.name = props.name
    this.onClick = props.onClick
    this.game = props.game
    this.position = props.position || {x:0, y:0}
    this.object = {}
  }

  static preload(name, game) {
    game.load.image(name, `images/${name}.png`)
  }

  create() {
    this.object = this.game.add.button(this.game.world.width / 2 + this.position.x, this.game.world.height / 2 + this.position.y, this.name, this.onClick, this, 1000, 1, 0)
    this.object.anchor.setTo(0.5, 0.5);
  }

}

export default GameButton
