$(document).ready(function () {
  var hero = new character("Xeraeth", 100, 50, 5, 5, 5);
  var text = new textBox();
  var grid = new mapGrid();
  var currentX = 1;
  var currentY = 1;

  grid.renderGrid();

  $("#takeDamageButton").on("click", function(){
    hero.takeDamage(10);
    text.appendText("You take 5 damage");
    updateStatus(hero);
  })

  $(".moveButton").on("click", function(event){
    let dir = event.currentTarget.attributes[1].value;
    var check = grid.checkRoomForPortal(currentX, currentY, dir)
    console.log(check);
    console.log(dir);
    if(check){
      switch(dir){
        case "n":
          currentY -= 1;
          text.appendText("X:" + currentX + " Y:" + currentY + "- You move into a room north of where you were");
          break;
        case "e":
          currentX += 1;
          text.appendText("X:" + currentX + " Y:" + currentY + "- You move into a room east of where you were");
          break;
        case "s":
          currentY += 1;
          text.appendText("X:" + currentX + " Y:" + currentY + "- You move into a room south of where you were");
          break;
        case "w":
          currentX -= 1;
          text.appendText("X:" + currentX + " Y:" + currentY + "- You move into a room west of where you were");
          break;
      }
    }else{
      text.appendText("There is no portal in that direction");
    }
  })

  updateStatus(hero);
});

function updateStatus(hero) {
  let { name, healthPoints, manaPoints, attackPoints, magicPoints, armorPoints } = hero;
  $("#heroName").text(name);
  $("#hpBar").text("HP: " + healthPoints);
  $("#mpBar").text("MP: " + manaPoints);
  $("#armor").text("Armor: " + armorPoints);
  $("#attackPower").text("Attack Power: " + attackPoints);
  $("#magicPower").text("Magic Power: " + magicPoints);
}
