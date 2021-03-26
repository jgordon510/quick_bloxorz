class Game {
  constructor(settings) {
    Object.assign(this, settings)
    this.grid = new Grid({
      game: this
    })
    this.stage = new Stage({
      cameraOrientation: createVector(-20, 25, 0),
      game: this,
      scale: min(height, width) / 600
    })


    this.blockor = new Blockor({
      keys: { right: 39, left: 37, up: 38, down: 40, swap: 32 },
      game: this,
    })
    document.getElementById("level").innerText = "Stage: " + this.levelN
    document.getElementById("passcodeDisplay").innerText = "Passcode: " + this.getCode(this.levelN)
  }
  update() {
    this.stage.update()
    this.grid.update()
    this.blockor.update()
  }
  openMenu() {
    this.menuOpen = true
    document.getElementById("menu").style.display = 'block'
    document.getElementById("menuButton").style.display = 'none'
    document.getElementById("loadMenu").style.display = 'none'
    document.getElementById("winScreen").style.display = 'none'
    document.getElementById("aboutScreen").style.display = 'none'
    document.getElementById("optionsMenu").style.display = 'none'
    this.win = false

  }
  closeMenu() {
    this.menuOpen = false
    document.getElementById("menu").style.display = 'none'
    document.getElementById("menuButton").style.display = 'block'

  }
  optionsMenu() {
    console.log("here")
    document.getElementById("menu").style.display = 'none'
    document.getElementById("optionsMenu").style.display = 'block'
  }
  aboutScreen() {
    document.getElementById("menu").style.display = 'none'
    document.getElementById("aboutScreen").style.display = 'block'
  }
  winScreen() {
    this.menuOpen = true
    document.getElementById("winScreen").style.display = 'block'
    document.getElementById("menuButton").style.display = 'none'
  }
  startNew() {
    gameStart = null
    stageStart = null
    loaded = false
    setup(1)
    this.closeMenu()
  }
  restart() {
    setup(this.levelN)
    this.closeMenu()
  }
  load() {
    document.getElementById("menu").style.display = 'none'
    document.getElementById("loadMenu").style.display = 'block'
    document.getElementById("passcode").focus()
  }
  codeInput() {
    let input = document.getElementById("passcode")
    let max = parseInt(input.getAttribute("maxLength"))
    let current = input.value.length
    if (current === max) {
      this.loadCode(input.value)
      input.value = ''
    }
  }
  loadCode(code) {
    console.log(code)

    let found = false
    for (let index in mapData.codes) {
      let obj = mapData.codes[index]
      if (parseInt(code) === obj.code) found = obj.level
    }

    if (!found) {
      console.log("not found")
      this.openMenu()
      return
    }
    else {
      loaded = true
      setup(found)
      this.openMenu()
      this.closeMenu()
    }

  }
  getCode(level) {
    for (let index in mapData.codes) {
      let obj = mapData.codes[index]
      if (level === obj.level) return obj.code
    }
  }
  getTimeString(start) {
    if(loaded) return '__:__:__.___'
    let now = Date.now()
    let duration = now - start
    var milliseconds = parseInt((duration % 1000) ),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds + 1000).toString().slice(1,6)
    let ts = hours + ":" + minutes + ":" + seconds + "." + milliseconds
    return ts
  }

}

