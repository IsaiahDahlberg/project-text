class Character {
  constructor(name, healthPoints, manaPoints, attackPoints, magicPoints, armorPoints) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.manaPoints = manaPoints;
    this.attackPoints = attackPoints;
    this.magicPoints = magicPoints;
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
      if(this.healthPoints <= 0)
       return true;

      return false;
  }}
}

export default Character;
