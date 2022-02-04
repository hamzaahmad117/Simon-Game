var started = false;
var answerArr = [];
var level;
var currentIndex;

$(document).keydown(function() {

  if (!started) {
    level = 0;
    currentIndex = 0;
    answerArr.push(nextLevel(level + 1));
    started = true;
  }

});


$(".btn").click(function(e) {

  var answer = e.target.classList[1];
  console.log("Button clicked is: " + answer);
  makeSoundAndAnimate(answer);
  var correct = compareAnswer(answer, currentIndex);
  console.log(correct);
  if (!correct) {
    console.log("Game Over");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over! Press any Button to Start Again!");
    }, 200);
    startOver();
  } else {
    currentIndex++;
  }


  if (currentIndex == (answerArr.length) && correct) {
    currentIndex = 0;
    setTimeout(function() {
      level++;
      answerArr.push(nextLevel(level + 1));
    }, 1000);

  }

});

function startOver() {
  started = false;
  answerArr = [];
  level = 0;
  currentIndex = 0;
}

function compareAnswer(answer, index) {
  if (answer == answerArr[index]) {
    return true;
  } else {
    console.log(index + ": " + answerArr[index]);
    console.log(answer);
    console.log("wrong");
    return false;
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

  $("." + button).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + button + ".mp3");
  audio.play();
  return button;
}


function makeSoundAndAnimate(button) {
  $("." + button).addClass("pressed");

  setTimeout(function() {
    $("." + button).removeClass("pressed");
  }, 100);

  var audio = new Audio("sounds/" + button + ".mp3");
  audio.play();
}
