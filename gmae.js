var userClickedPattern=[]
var gamePattern=[]
var color_array=["red", "blue", "green", "yellow"];
var level = 0
var started=false;

$(document).keypress(function(){
    if (!started){
        nextSquence();
        $("#level-title").text("LEVEL "+ level)
        started = true;
        
}})
    

function nextSquence(){
    userClickedPattern = [];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour =color_array[randomNumber];
    level++;
    $("#level-title").text("Level " + level);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
   
    
    
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSquence();
          }, 1000);
        }
      } 
        else{
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

$(".btn").click(function(event){ 
    var userChosenColour  =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){$("#" + currentColour).removeClass("pressed");},100);
    
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }