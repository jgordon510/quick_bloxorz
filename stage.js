class Stage {
  constructor(settings) {
    Object.assign(this, settings)
    this.endTimeout = 10
  }
  update() {
    
    scale(this.scale)
    if(this.game.win ) {
      if(this.endTimeout) {
        this.endTimeout--
        background('green')
      } else {
        if(this.game.levelN<33) setup(this.game.levelN+1)
        else if(!this.game.menuOpen) this.game.winScreen()
      }
      
    }
    else if(this.game.dead) {
      if(this.endTimeout) {
        this.endTimeout--
        background('red')
      } else {
        setup(this.game.levelN)
      }
      }
    else background(200)
    rotateX(this.cameraOrientation.x)
    rotateY(this.cameraOrientation.y)
    rotateZ(this.cameraOrientation.z)
    let position = this.game.blockor.position
    translate(-position.x*50, 0, -position.z*50)
    
  }
}