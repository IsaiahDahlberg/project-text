class Controller{
  constructor(character, textBox, mapGrid, monsterFactory){
    console.log("Hit line")
    this.hero = character;
    this.textBox = textBox;
    this.mapGrid = mapGrid;
    this.mFactory = monsterFactory;

    this.currentX = 2;
    this.currentY = 4;
    this.roomsEncountered = [this.currentX, this.currentY];
    this.inCombat = false;
    this.monster = null;

    this.updateStatus = this.updateStatus.bind(this);
    this.init = this.init.bind(this);
  }

  swingSwordButton(event){
    let heroAttackDmg = this.hero.attack();
    let monsterDied = this.monster.takeDamage(heroAttackDmg);
    if(monsterDied){
      this.textBox.appendText(this.hero.name + " swings at " + this.monster.name + " dealing " + heroAttackDmg +" damage. " + this.monster.name + " falls down dead");
      this.inCombat = false;
      this.monster = null;
    }else{
      this.textBox.appendText(this.hero.name + " swings at " + this.monster.name + " dealing " + heroAttackDmg +" damage.");

      let monsterAttackDmg = this.monster.attack();
      let heroDied =  this.hero.takeDamage(monsterAttackDmg);
      this.textBox.appendText(this.monster.name + " swings at " + this.hero.name + " dealing " + monsterAttackDmg +" damage.");
      if(heroDied){
        this.textBox.appendText(this.monster.name + " swings at " + this.hero.name + " dealing " + monsterAttackDmg +" damage. " + this.hero.name + " falls down dead");
      }else{
        this.textBox.appendText(this.hero.name + " swings at " + this.monster.name + " dealing " + heroAttackDmg +" damage.");
      }
    }
    this.updateStatus();
  }
  surveilButton(event){
    if(this.inCombat) return;
    this.textBox.appendText("X:" + this.currentX + " Y:" + this.currentY + "- " + this.mapGrid.getRoomDescription(this.currentX, this.currentY))
  }
  arrowKeys(event){
    if(this.inCombat) return;
    let dir = null;
    switch(event.which){
      case 119:
        dir = "n";
        break;
      case 100:
        dir = "e";
        break;
      case 115:
        dir = "s";
        break;
      case 97:
        dir = "w";
        break;
    }
    if(!dir) return;
    this.checkForMove(dir);
  }
  moveButton(event){
    if(this.inCombat) return;
    let direction = event.currentTarget.attributes["dir"].value;
    this.checkForMove(direction);
  }

  checkRoomForMonster(){
    let monsterKey = this.mapGrid.getRoomMonster(this.currentX, this.currentY);
    this.inCombat = monsterKey ? true : false;
    if(this.inCombat){
      this.monster = this.mFactory.getMonster(monsterKey, "Billy", 50, 5, 3, 6);
      this.textBox.appendText("You enter combat with a " + monsterKey);
      this.updateMonsterStatus();
    }
  }
  checkRoomEncounter(){
    if(!this.roomsEncountered.some(r => r === this.currentX + " " + this.currentY)){
      this.updateRoomsEncountered();
      this.checkRoomForMonster();
      return this.mapGrid.getRoomEncounter(this.currentX, this.currentY);
    }
  }
  checkForMove(direction){
    if(this.mapGrid.checkRoomForPortal(this.currentX, this.currentY, direction)){
      this.moveAndUpdatePostion(direction);
      this.checkRoomEncounter();
    }else{
      this.textBox.appendText("There is no portal in that direction");
    }
  }
  moveAndUpdatePostion(d){
    this.updateCoordinates(this.currentX, this.currentY, d);

    let roomMessage = "X:" + this.currentX + " Y:" + this.currentY + "- You move ";
    roomMessage += ( d === "n" ? "North. " : d === "e" ? "East. " : d === "s" ? "South. " : "West. ");
    roomMessage += this.checkRoomEncounter() || "";
    this.textBox.appendText(roomMessage);
    this.mapGrid.renderGrid(this.currentX, this.currentY);
  }
  updateRoomsEncountered(){
    let coords = this.currentX + " " + this.currentY;
    if(this.roomsEncountered.some(r => r === coords)) return;
    this.roomsEncountered.push(coords);
  }
  updateCoordinates(x, y, direction){
    switch(direction){
      case "n":
        y -= 1;
        break;
      case "e":
        x += 1;
        break;
      case "s":
        y += 1;
        break;
      case "w":
        x -= 1;
        break;
    }

    this.currentX = x;
    this.currentY = y;
  }
  updateStatus() {
    this.updateHeroStatus();
    this.updateMonsterStatus();
  }
  updateHeroStatus(){
    let { name, healthPoints, manaPoints, attackPoints, magicPoints, armorPoints } = this.hero;
    $("#heroName").text(name);
    $("#hpBar").text("HP: " + healthPoints);
    $("#mpBar").text("MP: " + manaPoints);
    $("#armor").text("Armor: " + armorPoints);
    $("#attackPower").text("Att: " + attackPoints);
    $("#magicPower").text("Magic: " + magicPoints);
  }
  updateMonsterStatus(){
    if(!this.monster) {
      $("#monsterStatus").hide();
      return;
    }
    $("#monsterStatus").show();
    let { name, healthPoints, attackPoints, armor} = this.monster;
    $("#monsterName").text(name);
    $("#monsterHpBar").text("HP: " + healthPoints);
    $("#monsterAttackPower").text("Att: " + attackPoints);
    $("#monsterArmor").text("Armor: " + armor);
  }
  init(){
    this.updateStatus(this.hero);
    this.mapGrid.renderGrid(this.currentX, this.currentY);
    let roomInfo = this.mapGrid.getRoomInfo(this.currentX, this.currentY);
    this.textBox.appendText("X:" + this.currentX + " Y:" + this.currentY + "- " + roomInfo.description);
    this.textBox.appendText(roomInfo.encounterMessage);
  }
}

export default Controller;
