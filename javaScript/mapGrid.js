class MapGrid {
  constructor(){
    this.grid = [];

    this.renderGrid = this.renderGrid.bind(this);
    this.getRoomInfo = this.getRoomInfo.bind(this);
    this.getRoomEncounter = this.getRoomEncounter.bind(this);
    this.getRoomDescription = this.getRoomDescription.bind(this);
    this.getRoomMonster = this.getRoomMonster.bind(this);
  }

  async init(){
    this.grid = await read_json();
  }
  getRoomDescription(xCoord,yCoord){
    let cell = this.grid.filter(c => c.xCoord === xCoord && c.yCoord === yCoord );
    return !cell ? "ERROR: NO CELL FOUND"  : cell[0].description;
  }
  getRoomInfo(xCoord,yCoord){
    let cell = this.grid.filter(c => c.xCoord === xCoord && c.yCoord === yCoord );
    if(!cell) return;
    return { description: cell[0].description , encounterMessage: cell[0].encounterMessage }
  }
  getRoomEncounter(xCoord,yCoord){
    let cell = this.grid.filter(c => c.xCoord === xCoord && c.yCoord === yCoord );
    return !cell ? "ERROR: NO CELL FOUND" : cell[0].encounterMessage;
  }
  getRoomMonster(xCoord,yCoord){
    let cell = this.grid.filter(c => c.xCoord === xCoord && c.yCoord === yCoord );
    return !cell ? "ERROR: NO CELL FOUND" : cell[0].monster;
  }
  renderGrid(currentX, currentY){
    $(".gridCell").remove();
    this.grid.forEach(cell => {
      let style = "style='";
      style += "grid-row:" + cell.yCoord + ";";
      style += "grid-column:" + cell.xCoord + ";";
      style += "'";
      let id = "id='gridCall" + cell.xCoord + cell.yCoord + "'";
      let occupied = false;
      if(currentX === cell.xCoord && currentY === cell.yCoord){
        occupied = true;
      }
      $("#mapGrid").append("<div class='gridCell' occupied='" + occupied +"'" + id + style + ">" + cell.xCoord +"," + cell.yCoord  + "</div>")
    })
  }
  checkRoomForPortal(xCoord, yCoord, direction){
      var cell = this.grid.filter(c => c.xCoord === xCoord && c.yCoord === yCoord )
      return cell.length > 0 ? cell[0].portals.some(d => d === direction) : false;
  }
}

async function read_json () {
  var json = await $.getJSON("./assets/mapSeed.json", data => data)
  .done(data => data )
  .catch((e)=>{
    console.log("Hit error")
    console.log(e)
    return e
  });
  return json.cells;
}

export default MapGrid
