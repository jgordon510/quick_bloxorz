let game
let mapData
let fixedCamera = false
let timer = false
let darkMode = false
let stageStart, gameStart
let loaded = false
function preload() {
  mapData = {}
  for (let i = 1; i <= 33; i++) {
    mapData[i] = loadJSON('maps/bloxorz' + i + '.json')
  }
  mapData.codes = loadJSON('maps/codes.json')
}
function setup(levelN) {
  if(!gameStart) gameStart = Date.now()
  if(!stageStart) stageStart = Date.now()
  createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
  game = new Game({
    levelN: levelN || 1
  })
  draw = game.update.bind(game)
  keyPressed = game.blockor.keyCheck.bind(game.blockor)
  keyReleased = game.blockor.keyClear.bind(game.blockor)
  document.getElementById("menuButton").onclick = game.openMenu.bind(game)
  document.getElementById("loadMenuExit").onclick = game.openMenu.bind(game)
  document.getElementById("winScreenExit").onclick = game.openMenu.bind(game)
  document.getElementById("aboutScreenExit").onclick = game.openMenu.bind(game)
  document.getElementById("settingsMenuExit").onclick = game.openMenu.bind(game)

  document.getElementById("restart").onclick = game.restart.bind(game)
  document.getElementById("start").onclick = game.startNew.bind(game)
  document.getElementById("load").onclick = game.load.bind(game)
  document.getElementById("resume").onclick = game.closeMenu.bind(game)
  document.getElementById("options").onclick = game.optionsMenu.bind(game)
  document.getElementById("about").onclick = game.aboutScreen.bind(game)
  document.getElementById("passcode").onkeyup = game.codeInput.bind(game)

  document.getElementById("fixedCamera").addEventListener('change', function (e) {
    e.preventDefault();
    fixedCamera = this.checked
  }, false);

  document.getElementById("timer").addEventListener('change', function (e) {
    e.preventDefault();
    timer = this.checked
    let display = document.getElementById("runTimer")
    if(this.checked) display.style.display = 'block'
    else display.style.display = 'none'
  }, false);

  document.getElementById("darkMode").addEventListener('change', function (e) {
    e.preventDefault();
    darkMode = this.checked
    let divs = ["level",
"runTimer",
"menu",
"optionsMenu",
"winScreen",
"aboutScreen"]
let buttons = document.getElementsByTagName("button")
    if(this.checked) {
      document.body.style.background = "black"
      divs.forEach(function(div) {
        document.getElementById(div).style.color = '#ccc'
      })
      for (var i in buttons) {
        if (buttons.hasOwnProperty(i)) {
          buttons[i].style.color = '#ccc'
        }
      }
      }
    else {
      document.body.style.background = "rgb(200,200,200)"
      divs.forEach(function(div) {
        document.getElementById(div).style.color = 'black'
      })
      for (var i in buttons) {
        if (buttons.hasOwnProperty(i)) {
          buttons[i].style.color = 'black'
        }
      }
      }
  }, false);
}


