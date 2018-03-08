class Bullet  {
  constructor(props) {
    console.log(props)
    this.game = props.game
    this.position = props.position || {x:0,y:0}
    this.direction = props.direction || 'normal'
    this.object = {}
  }

  static preload(game) {
    game.load.image('bullet', './js/game/objects/Bullet/bullet.png')
  }

  create() {
    this.object = this.game.add.sprite(this.position.x, this.position.y, 'bullet')
    // this.object.body.bounce.y = 0.95
    // this.object.body.collideWorldBounds = true
  }

  update() {
    (this.direction === 'inverted') ? this.object.position.y += 10 : this.object.position.y -= 10
  }

  destroy() {

  }
}

export default Bullet
