class MapGrid {
  constructor(){
    this.grid = this.unmarshallMapSeed(temp());

    this.renderGrid = this.renderGrid.bind(this);
    this.getRoomInfo = this.getRoomInfo.bind(this);
    this.getRoomEncounter = this.getRoomEncounter.bind(this);
    this.getRoomDescription = this.getRoomDescription.bind(this);
    this.getRoomMonster = this.getRoomMonster.bind(this);
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
  unmarshallMapSeed(mapSeed){
    return mapSeed.cells.map(seed => {
      let { yCoord, xCoord, portals, description, encounterMessage, monster } = seed;
      return new GridCell(yCoord, xCoord, portals, description, encounterMessage, monster);
    })
  }
}

class GridCell {
  constructor(yCoord,xCoord,portals, description, encounterMessage, monster){
    this.yCoord = yCoord;
    this.xCoord = xCoord;
    this.portals = portals;
    this.description = description;
    this.encounterMessage = encounterMessage;
    this.monster = monster;
  }
}

//var read_json = () => $.getJSON("./assets/mapSeed.json", data => data );
async function read_json () {
  var call = await $.getJSON("./assets/mapSeed.json", function(data){
    return data});
  console.log(call);
}

function temp() {
  let json = '{"cells": [ \
      { "xCoord": 1, "yCoord": 1, "portals": ["e","s"], "description": "A room.", "encounterMessage": null, "monster": null }, \
      { "xCoord": 2, "yCoord": 1, "portals": ["e","s","w"], "description": "A room.", "encounterMessage": null, "monster": null }, \
      { "xCoord": 3, "yCoord": 1, "portals": ["s","w"], "description": "A room.", "encounterMessage": null, "monster": null }, \
      { "xCoord": 1, "yCoord": 2, "portals": ["n","e","s"], "description": "A room.", "encounterMessage": null, "monster": null }, \
      { "xCoord": 2, "yCoord": 2, "portals": ["n","e","s","w"], "description": "A room.", "encounterMessage": null, "monster": "goblin" }, \
      { "xCoord": 3, "yCoord": 2, "portals": ["n","s","w"], "description": "A room.", "encounterMessage": null, "monster": null }, \
      { "xCoord": 1, "yCoord": 3, "portals": ["n","e"], "description": "A room.", "encounterMessage": null, "monster": null }, \
      { "xCoord": 2, "yCoord": 3, "portals": ["e","w"], "description": "There is a door way to the East and West of where you are", "encounterMessage": "You see a sword laying on the ground. You take the sword", "monster": null }, \
      { "xCoord": 3, "yCoord": 3, "portals": ["n","w"], "description": "A room.", "encounterMessage": null, "monster": "goblin" }, \
      { "xCoord": 2, "yCoord": 4, "portals": ["n"], "description": "You wake up in a dark room. You are dazed and unsure of how you got here. You have no previous memories. Upon looking around the room you see only one door way straight ahead.", "encounterMessage": "You also see a map laying on the ground infront of you. You grab it.", "monster": null } \
    ]}';
  return JSON.parse(json);
}

export default MapGrid
