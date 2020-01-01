class monsterFactory{
  constructor(){
    this.monsterIndex = [
      ["goblin", this.getGoblin]
    ];

    this.getGoblin = this.getGoblin.bind(this);
  }

  getGoblin(name, hp, att, armor){
    console.log("Goblin " + name + hp + att + armor);
  }
}

class monster{
  constructor(name, healthPoints, attackPoints, armorPoints){
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPoints = attackPoints;
    this.armorPoints = armorPoints;

    this.attack = this.attack.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
  }

  attack(){
    return this.attackPoints;
  }
  takeDamage(dmg, magic){
    if(!magic){
      this.healthPoints -= dmg;
      console.log("Monster took " + dmg +"dmg hp is now" + this.healthPoints);
    }
  }
}
