class Blockor {
  constructor(settings) {
    Object.assign(this, settings)
    this.rotation = 0
    if (!this.position) this.position = createVector(0, 0, 0)
    this.lastPosition = createVector(-1, -1, -1)
    if (!this.orientation) this.orientation = createVector()
    this.pressing = new Set()
  }
  update() {
    push()
    let position = this.position
    let orientation = this.orientation
    let drawX = position.x * 50
    let drawY = position.y * 50
    let drawZ = position.z * 50
    if (this.oddRotZ()) {
      drawX = (position.x + 0.5) * 50
      drawY = (position.y + 0.5) * 50
    }
    else {
      if (this.oddRotX()) {
        drawZ = (position.z + 0.5) * 50
        drawY = (position.y + 0.5) * 50
      }
      else {
        drawX = (position.x) * 50
        drawY = (position.y) * 50
      }
    }
    translate(drawX, drawY, drawZ)
    rotateX(orientation.x)
    rotateY(orientation.y)
    rotateZ(orientation.z)
    fill("red")
    box(50, 100, 50)
    pop()
  }
  oddRotZ() {
    return (this.orientation.z / 90) % 2
  }
  oddRotX() {
    return (this.orientation.x / 90) % 2
  }
  isStanding(orientation) {
    return this.oddRotX() === this.oddRotZ()
  }
  keyCheck() {
    if(this.game.menuOpen) return
    if (this.game.win || this.game.dead) return
    let orientation = this.orientation
    let position = this.position
    let pressing = false
    if(this.lastKeyFrame === frameCount){
       setTimeout(this.keyCheck.bind(this), 1000/frameRate())
       return
       }
    this.lastKeyFrame = frameCount
    if (keyIsDown(this.keys.right)&&!this.pressing.has(this.keys.right)) {
      this.pressing.add(this.keys.right)
      this.moveTo('right')
    }
    if (keyIsDown(this.keys.left)&&!this.pressing.has(this.keys.left)) {
      this.pressing.add(this.keys.left)
      this.moveTo('left')
    }
    if (keyIsDown(this.keys.up)&&!this.pressing.has(this.keys.up)) {
      this.pressing.add(this.keys.up)
      this.moveTo('up')
    }
    if (keyIsDown(this.keys.down)&&!this.pressing.has(this.keys.down)) {
      this.pressing.add(this.keys.down)
      this.moveTo('down')
    }
    if (this.half && keyIsDown(this.keys.swap)&&!this.pressing.has(this.keys.swap) ) {
      this.pressing.add(this.keys.swap)
      this.game.blockor = this.otherBlockor
      this.game.blockor.justSwapped = true
      this.game.blockor.otherBlockor = this
      this.otherBlockor = null
      keyPressed = game.blockor.keyCheck.bind(this.game.blockor)
      keyReleased = game.blockor.keyClear.bind(this.game.blockor)
    } 
  }
  keyClear() {
    this.pressing.delete(keyCode)
    if(keyCode === this.keys.swap) this.justSwapped = false
  }
  moveTo(direction) {
    
    let orientation = this.orientation
    let position = this.position
    if (direction === 'right') {
      if (this.oddRotX()) {
        position.x += 1
      } else {
        orientation.z -= 90
        if (this.oddRotZ()) position.x += 1
        else position.x += 2
      }
    }
    if (direction === 'left') {
      if (this.oddRotX()) {
        position.x -= 1
      } else {
        orientation.z += 90
        if (this.oddRotZ()) position.x -= 2
        else position.x -= 1
      }
    }
    if (direction === 'up') {
      if (this.oddRotZ()) {
        position.z -= 1
      } else {
        orientation.x -= 90
        if (this.oddRotX()) position.z -= 2
        else position.z -= 1
      }
    }
    if (direction === 'down') {
      if (this.oddRotZ()) {
        position.z += 1
      } else {
        orientation.x += 90
        if (this.oddRotX()) position.z += 1
        else position.z += 2
      }
    }
  }
}

class HalfBlockor extends Blockor {
  constructor(settings) {
    super(settings)
    this.half = true
  }
  update() {
    push()
    let position = this.position
    let orientation = this.orientation
    let drawX = position.x * 50
    let drawY = position.y * 50 + 25
    let drawZ = position.z * 50
    translate(drawX, drawY, drawZ)
    rotateX(orientation.x)
    rotateY(orientation.y)
    rotateZ(orientation.z)
    if (this.otherBlockor) fill("red")
    else fill("#c96363")
    box(50, 50, 50)
    pop()
    if (this.otherBlockor) {
      this.otherBlockor.update()
      let sameX = this.position.x === this.otherBlockor.position.x
      let nextX = abs(this.position.x - this.otherBlockor.position.x) === 1
      let sameZ = this.position.z === this.otherBlockor.position.z
      let nextZ = abs(this.position.z - this.otherBlockor.position.z) === 1
      let adjacent = (sameX && nextZ) || (sameZ && nextX)
      if (adjacent) this.merge()
    }
  }
  merge() {
    document.getElementById("level").innerText = "Stage: " + this.game.levelN
    let orientation = createVector(90, 0, 0)
    if (this.position.x < this.otherBlockor.position.x) {
      orientation = createVector(0, 0, 90)
    }
    if (this.position.x > this.otherBlockor.position.x) {
      orientation = createVector(0, 0, -90)
      this.position.x -= 1
    }
    if (this.position.z < this.otherBlockor.position.z) {
      orientation = createVector(90, 0, 0)
    }
    if (this.position.z > this.otherBlockor.position.z) {
      orientation = createVector(-90, 0, 0)
      this.position.z -= 1
    }
    this.game.blockor = new Blockor({
      keys: { right: 39, left: 37, up: 38, down: 40, swap: 32 },
      game: this,
      position: createVector(this.position.x, this.position.y, this.position.z),
      orientation: orientation
    })
    keyPressed = game.blockor.keyCheck.bind(this.game.blockor)
    keyReleased = game.blockor.keyClear.bind(this.game.blockor)
  }
  moveTo(direction) {
    let orientation = this.orientation
    let position = this.position
    if (direction === 'right') {
      position.x += 1
    }
    if (direction === 'left') {
      position.x -= 1
    }
    if (direction === 'up') {
      position.z -= 1
    }
    if (direction === 'down') {
      position.z += 1
    }
  }
  isStanding(orientation) {
    return false
  }
}