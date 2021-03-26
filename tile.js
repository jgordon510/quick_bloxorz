class Tile {
  constructor(settings) {
    Object.assign(this, settings)
    if (this.type === 'bridge') {
      this.key = this.properties.id
      if (this.properties.startActivated) {
        console.log("starting activated")
        this.grid.activated[this.key] = true
      }
    }
    if (this.type === 'button') {
      if (this.properties.hard) this.color = "#b042f5"
      this.activating = this.properties.activating.split(",")
    }
    this.justActivated = false
  }
  update() {
    let gridSize = 50
    let x = this.x
    let z = this.y
    push()
    translate(x, gridSize + 5, z)
    let type = this.type
    let position = this.game.blockor.position
    let underX = false
    let underZ = false
    if (x / gridSize === position.x) underX = true
    if (this.game.blockor.oddRotZ() && x / gridSize === position.x + 1) underX = true
    if (z / gridSize === position.z) underZ = true
    if (this.game.blockor.oddRotX() && z / gridSize === position.z + 1) underZ = true
    let under = underX && underZ
    let standing = this.game.blockor.isStanding()
    if (under && type === 'border') this.game.dead = true
    if (type === 'weak') {
      if (under && standing) this.game.dead = true
    }
    if (type === 'goal') {
      if (under && standing && !this.game.blockor.half) this.game.win = true
    }
    if (type === 'button' && under && !this.game.blockor.justSwapped) {
      if (!this.properties.hard || this.game.blockor.isStanding())
        if (!this.justActivated) {
          this.justActivated = true
          if (this.properties.type === 'toggle') {
            this.activating.forEach(function (id) {
              if (this.grid.activated[id]) this.grid.activated[id] = false
              else this.grid.activated[id] = true
              console.log(this.grid.activated)
            }, this)
          }
          if (this.properties.type === 'on') {
            this.activating.forEach(function (id) {
              this.grid.activated[id] = true
            }, this)
          }
          if (this.properties.type === 'off') {
            this.activating.forEach(function (id) {
              this.grid.activated[id] = false
            }, this)
          }
        }
    }
    if (type === 'splitter' && under && this.game.blockor.isStanding()) {
      let tile1 = this.grid.tiles[this.properties.split1]
      let tile2 = this.grid.tiles[this.properties.split2]
      let otherBlockor = new HalfBlockor({
        keys: this.game.blockor.keys,
        position: createVector(tile2.x/gridSize, 0, tile2.y/gridSize),
        game: this.game
      })
      this.game.blockor = new HalfBlockor({
        keys: this.game.blockor.keys,
        game: this.game,
        position: createVector(tile1.x/gridSize, 0, tile1.y/gridSize),
        otherBlockor: otherBlockor
      })
      keyPressed = game.blockor.keyCheck.bind(this.game.blockor)
      keyReleased = game.blockor.keyClear.bind(this.game.blockor)
      document.getElementById("level").innerHTML+="<br>Press space to switch between the blocks."
    }
    if (!under) this.justActivated = false
    let active = true
    if (this.type === "bridge") {
      active = this.grid.activated[this.key]
      if(under && !active) this.game.dead = true
    }
    if (type !== 'border' && active) {
      fill(this.color)
      box(gridSize, gridSize / 5, gridSize)
    }
    pop()
  }
}

