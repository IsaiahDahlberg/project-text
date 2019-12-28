class character {
  constructor(name, healthPoints, manaPoints, attackPoints, magicPoints, armorPoints) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.manaPoints = manaPoints;
    this.attackPoints = attackPoints;
    this.magicPoints = magicPoints;
    this.armorPoints = armorPoints;

    this.takeDamage = this.takeDamage.bind(this);
  }

  takeDamage(dmg){
    if(typeof dmg === "number"){
      this.healthPoints = this.healthPoints - ( dmg > this.armorPoints ? dmg - this.armorPoints : 0 );
  }}
}
