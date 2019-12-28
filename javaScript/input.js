$(document).ready(function () {
  var hero = new character(100, 50, 5, 5, 5);

  $("#takeDamageButton").on("click", () => {
    hero.takeDamage(5);
    console.log(hero.healthPoints)
    updateStatus(hero.healthPoints);
  })


  updateStatus(hero.healthPoints);

});

function updateStatus(hp) {
  $("#hpBar").value(hp)
}

class character(){
  constructor(healthPoints, manaPoints, attackPoints, magicPoints, armorPoints) {
    this.name = 'Hero';
    this.healthPoints = healthPoints;
    this.manaPoints = manaPoints;
    this.attackPoints = attackPoints;
    this.magicPoints = magicPoints;
    this.armorPoints = armorPoints;

    this.takeDamage = this.takeDamage.bind(this);
  }

  takeDamage(dmg){
    if(typeof dmg === "number"){
      this.hp = this.hp - dmg > this.armorPoints ? dmg - this.armorPoints : 0;
    }
  }

}
