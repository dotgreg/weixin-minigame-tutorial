class Bullet  {
  constructor(props) {
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
    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    this.object.body.collideWorldBounds = false
    this.object.body.allowGravity = false
  }

  update() {
    (this.direction === 'inverted') ? this.object.body.position.y += 10 : this.object.body.position.y -= 10
  }

  destroy() {

  }
}

export default Bullet
