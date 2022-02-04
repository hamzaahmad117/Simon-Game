

var answerArray = [];
var i;
started = false;
var gameOver;

$(document).keydown(function () {

    if(!started) {
      started = true;
      startGame();
    }

});


function startGame() {

  console.log('new game');

  var answer;
  answerArray = [];
  i = 0;
  answerArray.push(nextLevel(i + 1));

  console.log("answerarraay" + answerArray);

  // Making the buttons clickable
  $(".btn").click(function (e) {
  makeSoundAndAnimate(e.target.classList[1]);
  answer = e.target.classList[1];
  gameOver = checkAnswer(i, answer);
  console.log(gameOver);

  if ((i == answerArray.length - 1) && !gameOver) {
    setTimeout(function() {answerArray.push(nextLevel(i + 1)); i = 0;},1000);
    console.log(answerArray);
  } if (gameOver){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");}, 100);
    $("#level-title").text("Game Over! Press any key to Restart.");

    startOver();
  } else {
      i++;
  }

  console.log(gameOver ? "Game is Over" : "Game not over");
  console.log(answerArray);
  console.log(answer);
});
  return;
}

function checkAnswer(c, answer) {
  console.log(answerArray[c] + " " + answer);
  console.log(c);
  if (answer === answerArray[c]) {
    return false;
  } else {
    return true;
  }
}

function nextLevel(level) {
  $("#level-title").text("Level " + level);

  var button;
  var rand = Math.floor((Math.random() * 4) + 1);

  switch (rand) {
    case 1:
      button = "green";
      break;
    case 2:
      button = "red";
      break;
    case 3:
      button = "yellow";
      break;
    case 4:
      button = "blue";
      break;
    default:
      console.log("Unexpected.");
  }

  makeSoundAndAnimate(button);

  return button;
}


function makeSoundAndAnimate(button) {
  $("." + button).addClass("pressed");

  setTimeout(function() {
    $("." + button).removeClass("pressed");
  }, 100);

  var audio;
  switch (button) {
    case "red":
      audio = new Audio("sounds/red.mp3");
      break;
    case "blue":
      audio = new Audio("sounds/blue.mp3");
      break;
    case "yellow":
      audio = new Audio("sounds/yellow.mp3");
      break;
    case "green":
      audio = new Audio("sounds/green.mp3");
      break;
    default:
      console.log("Unexpected Error Occurred.");
  }
  audio.play();
}



function startOver() {

  console.log("start over called");
  started = false;
  gameOver = false;
  answerArray = [];
  i = 0;
}
