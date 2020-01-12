import Controller from "./controller.js"
import MapGrid from "./mapGrid.js";
import Character from "./character.js";
import TextBox from "./textBox.js";
import MonsterFactory from "./monsterFactory.js";

$(document).ready(function () {
  var controller = new Controller(
    new Character("Xeraeth", 100, 50, 5, 5, 5),
    new TextBox(),
    new MapGrid(),
    new MonsterFactory());

  controller.init();

  $("#swingSword").on("click", function(){ controller.swingSwordButton(event) });
  $("#surveilAreaButton").on("click", () => { controller.surveilButton(event) });
  $('html').keypress(function(event){ controller.arrowKeys(event) });
  $(".moveButton").on("click", function(event){ controller.moveButton(event) });
});
