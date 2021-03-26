let game
let mapData
function preload(){
  mapData = {}
  for(let i = 1 ; i <= 33; i++) {
      mapData[i] = loadJSON('maps/bloxorz'+i+'.json')
  }
  mapData.codes = loadJSON('maps/codes.json')
}
function setup(levelN) {
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
  
  document.getElementById("restart").onclick = game.restart.bind(game)
  document.getElementById("start").onclick = game.startNew.bind(game)
  document.getElementById("load").onclick = game.load.bind(game)
  document.getElementById("resume").onclick = game.closeMenu.bind(game)
  document.getElementById("about").onclick = game.aboutScreen.bind(game)
  document.getElementById("passcode").onkeyup = game.codeInput.bind(game)
  
}


