var randomcolor=["green","red","yellow","blue"];

var gamepattern =[];

var userclickedpattern=[];

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextsequence();
      started = true;
    }
  });

function nextsequence()
{
    userclickedpattern=[];
    level++;

    $("#level-title").text("Level " + level);
    var randomno=Math.floor(Math.random()*4);
    var randomchosencolor=randomcolor[randomno];
    gamepattern.push(randomchosencolor);

    $("#" + randomchosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomchosencolor);
   
}

$(".btn").click(function()//saare btn ko click kar liya;
{
    var userchosencolor=$(this).attr("id");//this se pata chala konse line ka btn hai...attr se us line ki id ki value nikli..
    userclickedpattern.push(userchosencolor);

    playsound(userchosencolor);
    animatePress(userchosencolor);
    checkAnswer( userclickedpattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamepattern[currentLevel] === userclickedpattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userclickedpattern.length === gamepattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextsequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      

      playsound("wrong");

     
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


      

      startOver();
    }

   

}

function playsound(name)
{
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function ()
    {
        $("#" + currentColor).removeClass("pressed");
    });
}

function startOver() {


    level = 0;
    gamepattern = [];
    started = false;
  }
  
