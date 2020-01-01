$(document).ready(function () {
  const hero = new character("Hero", 100, 50, 5, 5, 5);
  const text = new textBox();
  const grid = new mapGrid();
  const mFactory = new monsterFactory();
  let currentX = 2;
  let currentY = 4;
  let roomsEncountered = [currentX, currentY];
  let inCombat = false;
  let monster = null;

  init();

  console.log(inCombat);
  if(inCombat){
    $("#swingSword").on("click", function(){
      hero.takeDamage(10);
      text.appendText("You take 5 damage");
    })

  }else{
    $("#surveilAreaButton").on("click", () => text.appendText("X:" + currentX + " Y:" + currentY + "- " + grid.getRoomDescription(currentX, currentY)))

    $(".moveButton").on("click", function(event){
      let direction = event.currentTarget.attributes["dir"].value;
      if(grid.checkRoomForPortal(currentX, currentY, direction)){
        moveAndUpdatePostion(direction);
        checkRoomEncounter();
        checkRoomForMonster();
      }else{
          text.appendText("There is no portal in that direction");
      }
    })
  }

  const moveAndUpdatePostion = (d) => {
    var result = updateCoordinates(currentX, currentY, d);
    currentX = result.newX;
    currentY = result.newY;

    let roomMessage = "X:" + currentX + " Y:" + currentY + "- You move ";
    roomMessage += ( d === "n" ? "North. " : d === "e" ? "East. " : d === "s" ? "South. " : "West. ");
    roomMessage += checkRoomEncounter() || "";
    text.appendText(roomMessage);
    grid.renderGrid(currentX, currentY);
  }
  const checkRoomForMonster = () => {
    monster = grid.getRoomMonster(currentX, currentY);
    console.log(monster);
    inCombat = monster ? true : false;
    return inCombat;
  }
  const checkRoomEncounter = () => {
    if(!roomsEncountered.some(r => r === currentX + " " + currentY)){
      updateRoomsEncountered();
      return grid.getRoomEncounter(currentX, currentY);
    }
  }
  const updateRoomsEncountered = () => {
    let coords = currentX + " " + currentY;
    if(roomsEncountered.some(r => r === coords)) return;
    roomsEncountered.push(coords);
  }
  function updateCoordinates(currentX, currentY, direction){
    switch(direction){
      case "n":
        currentY -= 1;
        break;
      case "e":
        currentX += 1;
        break;
      case "s":
        currentY += 1;
        break;
      case "w":
        currentX -= 1;
        break;
    }
    return { newX: currentX, newY: currentY }
  }
  function updateStatus(hero) {
    let { name, healthPoints, manaPoints, attackPoints, magicPoints, armorPoints } = hero;
    $("#heroName").text(name);
    $("#hpBar").text("HP: " + healthPoints);
    $("#mpBar").text("MP: " + manaPoints);
    $("#armor").text("Armor: " + armorPoints);
    $("#attackPower").text("Attack Power: " + attackPoints);
    $("#magicPower").text("Magic Power: " + magicPoints);
  }
  function init(){
    updateStatus(hero);
    grid.renderGrid(currentX, currentY);
    let roomInfo = grid.getRoomInfo(currentX, currentY);
    text.appendText("X:" + currentX + " Y:" + currentY + "- " + roomInfo.description);
    text.appendText(roomInfo.encounterMessage);
  }
});

//not used?
const checkIfBeenToRoom = (currentX, currentY, roomsEncountered) => roomsEncountered.any(room => room.x === currentX && room.y === currentY);
