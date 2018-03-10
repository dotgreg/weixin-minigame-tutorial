import state from '../../state'
import objects from '../../objects'

class GameButton  {
  constructor(props) {
    this.name = props.name
    this.onClick = props.onClick
    this.game = props.game
    this.object = {}
  }

  static preload(name, game) {
    game.load.image(name, `images/${name}.png`)
  }

  create() {
    // this.object = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.name)
    this.object = this.game.add.button(this.game.world.width / 2, this.game.world.height / 2, this.name, this.onClick, this, 1000, 1, 0)
    // this.object.inputEnabled = true
    // this.object.events.onInputDown.add(this.onClick)
    // this.object.position.z = 10000
  }

}

export default GameButton
