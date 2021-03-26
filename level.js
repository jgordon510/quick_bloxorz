class Level{
  constructor(settings) {
    Object.assign(this, settings)
    this.gridSize = 50
    
    if(this.levelN===1) {
      this.xSize= 12
      this.zSize= 8  
      this.startPosition = createVector(2, -1, 2)
      this.map = [
        "000000000000",
        "0xxx00000000",
        "0xxxxxx00000",
        "0xxxxxxxxx00",
        "00xxxxxxxxx0",
        "000000xx*xx0",
        "0000000xxx00",
        "000000000000"
      ]
    }
    if(this.levelN===2) {
      this.xSize= 17
      this.zSize= 8  
      this.startPosition = createVector(2, -1, 5)
      this.map = [
        "00000000000000000",
        "0000000xxxx00xxx0",
        "0xxxx00xxhx00x*x0",
        "0xxax00xxxx00xxx0",
        "0xxxx00xxxx00xxx0",
        "0xxxxAAxxxxHHxxx0",
        "0xxxx00xxxx000000",
        "00000000000000000",
        
      ]
    }
    if(this.levelN===3) {
      this.xSize= 17
      this.zSize= 8  
      this.startPosition = createVector(2, -1, 4)
      this.map = [
        "00000000000000000",
        "0000000xxxxxxx000",
        "0xxxx00xxx00xx000",
        "0xxxxxxxxx00xxxx0",
        "0xxxx0000000xx*x0",
        "0xxxx0000000xxxx0",
        "0000000000000xxx0",
        "00000000000000000",
        
      ]
    }
    if(this.levelN===4) {
      this.xSize= 16
      this.zSize= 10  
      this.startPosition = createVector(2, -1, 6)
      this.map = [
      "0000000000000000",
      "0000%%%%%%%00000",
      "0000%%%%%%%00000",
      "0xxxx00000xxx000",
      "0xxx0000000xx000",
      "0xxx0000000xx000",
      "0xxx00xxxx%%%%%0",
      "0xxx00xxxx%%%%%0",
      "000000x*x00%%x%0",
      "000000xxx00%%%%0",
      "0000000000000000",
      ]
    }
    if(this.levelN===5) {
      this.xSize= 17
      this.zSize= 12  
      this.startPosition = createVector(14, -1, 2)
      this.startActivated = ['a','o','p']
      this.onSwitches=new Set(['4:4'])
      this.offSwitches=new Set(['7:6'])
      this.map = [
        "00000000000000000",
        "000000000000xxxx0",
        "00xxxxOOxoxxxxxx0",
        "00xxxx0000000xxx0",
        "00xxpx00000000000",
        "00xxxx00000000000",
        "0000xxxpxAAxxx000",
        "00000000000xxxxp0",
        "0xxx0000000xxxxx0",
        "0x*xxxPPxxxxxx000",
        "0xxxx000000000000",
        "00000000000000000"        
      ]
    }
  }
}