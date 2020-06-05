// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble" ];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName){

    while (playerHealth > 0 && enemyHealth > 0){
      // ask user if they"d liked to fight or run
      var promptFight = window.prompt("Would you like FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
      promptFight = promptFight.toLowerCase();
      // if user picks "skip" confirm and then stop the loop
      if (promptFight === "skip"){
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip){
          window.alert(playerName + " has decided to skip this fight. Goodbye!");
          // subtract money from playerMoney for skipping
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
  
      // check enemy's health
      if (enemyHealth <= 0){
        window.alert(enemyName + " has died!");
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      }
      else{
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
  
      // check player's health
      if (playerHealth <= 0){
        window.alert(playerName + " has died!");
        // leave while() loop if player is dead
        break;
      }
      else{
        window.alert(playerName + " still has " + playerHealth + " health left.");
      }
    }
};

//function containing endgame states and actions
var endGame = function(){
  //if player is still alive, player wins!
  if (playerHealth > 0){
      window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
  var shopOptionPrompt = console.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop?");
  shopOptionPrompt = shopOptionPrompt.toLowerCase();
  switch (shopOptionPrompt){
   
    case "refill":
      if(playerMoney >= 7){
        window.alert("Refilling player's health by 20 for 7 dollars.");

        //increase health and decrease money
        playerHealth += 20;
        playerMoney -= 7;
        
      }
      else{
        window.alert("You don't have enough money!");
      }
      break;

    case "upgrade":
      if(playerMoney >= 7){
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        //increase attack and decrease money
        playerAttack += 6;
        playerMoney -= 7;
      }
      else{
        window.alert("You don't have enough money!");
      }
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

    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0 ;i < enemyNames.length;i++){
        
        if(playerHealth > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);

            //if we're not at the last enemy in the array
            if(playerHealth > 0 && i < enemyNames.length - 1){
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

startGame();


