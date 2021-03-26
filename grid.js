class Grid {
  constructor(settings) {
    Object.assign(this, settings)
    this.activated = {}
    this.tiles = {}
    mapData[this.game.levelN].layers.forEach(function(layer, index) {
      if(index===0) return
      layer.objects.forEach(function(tile) {
        tile.color = layer.color
        tile.type = layer.name
        tile.game = this.game
        tile.grid = this
        this.tiles[tile.id] = new Tile(tile)
      }, this)
    }, this)
  }
  update() {
    for(let id in this.tiles) {
      let tile = this.tiles[id]
      tile.update()
    }
  }
}