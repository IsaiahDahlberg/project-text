class MonsterFactory{
  constructor(){
    this.monsterIndex = new Map([
      ["goblin", this.getGoblin]
    ]);

    this.getMonster = this.getMonster.bind(this);
    this.getGoblin = this.getGoblin.bind(this);
  }

  getMonster(monsterKey, name, hp, att, armor){
    let func = this.monsterIndex.get(monsterKey);
    return func(name, hp, att, armor);
  }
  getGoblin(name, hp, att, armor){
    return new Monster(name, hp, att, armor);
  }
}

class Monster{
  constructor(name, healthPoints, attackPoints, armor){
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPoints = attackPoints;
    this.armor = armor;

    this.attack = this.attack.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
  }

  attack(){
    return this.attackPoints;
  }
  takeDamage(dmg, magic){
    if(!magic){
      this.healthPoints -= dmg;
      if(this.healthPoints <= 0)
       return true;

      return false;
  }}
}

export default MonsterFactory
