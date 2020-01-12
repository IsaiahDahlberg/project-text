import Controller from "./controller.js"
import MapGrid from "./mapGrid.js";
import Character from "./character.js";
import TextBox from "./textBox.js";
import MonsterFactory from "./monsterFactory.js";

$(document).ready(function () {
  var c = new Character("Xeraeth", 100, 50, 5, 5, 5);
  var t = new TextBox();
  var g = new MapGrid();
  var f = new MonsterFactory();
  var controller = new Controller(c,t,g,f);

  controller.init();

  $("#swingSword").on("click", function(){ controller.swingSwordButton(event) })
  $("#surveilAreaButton").on("click", () => { controller.surveilButton(event) })
  $('html').keypress(function(event){ controller.arrowKeys(event) });
  $(".moveButton").on("click", function(event){ controller.moveButton(event)})
});
