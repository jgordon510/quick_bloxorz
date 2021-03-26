class Grid {
  constructor(settings) {
    Object.assign(this, settings)
    this.activated = {}
    this.tiles = {}
    let minX = Infinity
    let maxX = 0
    let minY = Infinity
    let maxY = 0
    mapData[this.game.levelN].layers.forEach(function(layer, index) {
      if(index===0) return
      layer.objects.forEach(function(tile) {
        if(tile.x < minX) minX=tile.x
        if(tile.x > maxX) maxX=tile.x
        if(tile.y < minY) minY=tile.y
        if(tile.y > maxY) maxY=tile.y
        tile.color = layer.color
        tile.type = layer.name
        tile.game = this.game
        tile.grid = this
        this.tiles[tile.id] = new Tile(tile)
      }, this)
    }, this)
    this.center = createVector((minX+maxX)/2, (minY+maxY)/2)
  }
  update() {
    for(let id in this.tiles) {
      let tile = this.tiles[id]
      tile.update()
    }
  }
}