class Stage {
  constructor(settings) {
    Object.assign(this, settings)
    this.endTimeout = 10
  }
  update() {
    if(timer){
       document.getElementById("gameTime").innerText = "Game: " + this.game.getTimeString(gameStart)
       document.getElementById("stageTime").innerText = "Stage: " + this.game.getTimeString(stageStart)
       
       }
    scale(this.scale)
    if(this.game.win ) {
      if(this.endTimeout) {
        this.endTimeout--
        background('#32a852')
      } else {
        if(this.game.levelN<33) {
          stageStart = null
          setup(this.game.levelN+1)
          }
        else if(!this.game.menuOpen) this.game.winScreen()
      }
      
    }
    else if(this.game.dead) {
      if(this.endTimeout) {
        this.endTimeout--
        background('#ed4747')
      } else {
        setup(this.game.levelN)
      }
      }
    else if(!darkMode) background(200)
    else background(0)
    rotateX(this.cameraOrientation.x)
    rotateY(this.cameraOrientation.y)
    rotateZ(this.cameraOrientation.z)
    if(fixedCamera) {
      rotateX(-20)
      rotateY(-25)
      rotateZ(-10)
    }
    let position = this.game.blockor.position
    if(!fixedCamera) translate(-position.x*50, 0, -position.z*50)
    else translate(-this.game.grid.center.x, 0, -this.game.grid.center.y-200)
    
  }
}