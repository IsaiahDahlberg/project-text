class mapGrid {
  constructor(){
    var unmarshallMapSeed = this.unmarshallMapSeed;
    this.grid = unmarshallMapSeed(temp());

    this.renderGrid = this.renderGrid.bind(this);
  }

  renderGrid(){
    $("#mapBlock").append("<div id='mapGrid' style='display: grid;'></div>");
    this.grid.forEach(cell => {
      let style = "style='";
      style += "grid-row:" + cell.yCoord + ";";
      style += "grid-column:" + cell.xCoord + ";";
      style += "'";
      $("#mapGrid").append("<div class='gridCell'" + style + ">" + cell.xCoord +"," + cell.yCoord  + "</div>")
    })
  }

  checkRoomForPortal(xCoord,yCoord,direction){
      var cell = this.grid.filter(c => c.xCoord === xCoord && c.yCoord === yCoord )
      return cell.length > 0 ? cell[0].portals.some(d => d === direction) : false;
  }

  unmarshallMapSeed(mapSeed){
    return mapSeed.cells.map(seed => {
      let { yCoord, xCoord, portals } = seed;
      return new gridCell(yCoord, xCoord, portals);
    })
  }
}

class gridCell {
  constructor(yCoord,xCoord,portals){
    this.yCoord = yCoord;
    this.xCoord = xCoord;
    this.portals = portals;
  }
}

//var read_json = () => $.getJSON("./assets/mapSeed.json", data => data );
function read_json () {
  var call = $.getJSON("./assets/mapSeed.json", function(data) {
    return data;
  }).then(function( data ) {
    return data;
  });
  return call;
}

function temp() {
  return JSON.parse('{"cells": [ { "xCoord": 1, "yCoord": 1, "portals": ["e","s"] },{ "xCoord": 2, "yCoord": 1, "portals": ["e","s","w"] }, { "xCoord": 3, "yCoord": 1, "portals": ["s","w"] }, { "xCoord": 1, "yCoord": 2, "portals": ["n","e","s"] }, { "xCoord": 2, "yCoord": 2, "portals": ["n","e","s","w"] },{ "xCoord": 3, "yCoord": 2, "portals": ["n","s","w"] },{ "xCoord": 1, "yCoord": 3, "portals": ["n","e"] }, { "xCoord": 2, "yCoord": 3, "portals": ["n","e","w"] },{ "xCoord": 3, "yCoord": 3, "portals": ["n","w"] }]}');
}
