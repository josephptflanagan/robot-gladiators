// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max){

  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;

};

var fight = function(enemy){

    while (playerInfo.health > 0 && enemy.health > 0){
      // ask user if they"d liked to fight or run
      var promptFight = window.prompt("Would you like FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
      promptFight = promptFight.toLowerCase();
      // if user picks "skip" confirm and then stop the loop
      if (promptFight === "skip"){
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip){
          window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
          // subtract money from playerInfo.money for skipping
          playerInfo.money = Math.max(0, playerInfo.money - 10);
          console.log("playerInfo.money", playerInfo.money)
          break;
        }
      }
  
      // remove enemy's health by subtracting the randomly set amount in the damage variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
  
      // check enemy's health
      if (enemy.health <= 0){
        window.alert(enemy.name + " has died!");
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      }
      else{
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
  
      // remove players's health by subtracting the amount set in the enemy.attack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
  
      // check player's health
      if (playerInfo.health <= 0){
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      }
      else{
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
};

//function containing endgame states and actions
var endGame = function(){
  //if player is still alive, player wins!
  if (playerInfo.health > 0){
      window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else{
      window.alert("You've lost your robot in battle! Game Over!");
  }
  //ask the player if they would like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm){
      //restart the game
      startGame();
  }
  else{
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

var shop = function(){
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop?");
  shopOptionPrompt = shopOptionPrompt.toLowerCase();
  switch (shopOptionPrompt){
   
    case "refill":
      playerInfo.refillHealth();
      break;

    case "upgrade":
      playerInfo.upgradeAttack();    
      break;

    case "leave":
      window.alert("Leaving the store.");

      //do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");
      //call shop again to force the player to pick a valid option
      shop();
      break;
  }

}

//function to start a new game
var startGame = function(){

   playerInfo.reset();

    for (var i = 0 ;i < enemyInfo.length;i++){
        
        if(playerInfo.health > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if(playerInfo.health > 0 && i < enemyInfo.length - 1){
              var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
              
              //if yes, take them to the store() function
              if(storeConfirm){
                shop();
              }
            }
        }
        else{
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();

};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health : 100,
  attack : 10,
  money : 10,
  reset: function(){
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    
    if(this.money >=7){
      window.alert("Refilling player's health by 25 for 7 dollars.");
      //increase health and decrease money
      this.health += 25;
      this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function(){
    if(playerInfo.money >= 7){
      window.alert("Upgrading player's attack by 7 for 7 dollars.");
      //increase attack and decrease money
      this.attack += 7;
      this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  }
};

//You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  } 
];

startGame();


