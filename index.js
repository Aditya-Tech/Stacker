var levelsToBlocks = {
  1: 4,
  2: 4,
  3: 4,
  4: 3,
  5: 3,
  6: 3,
  7: 2,
  8: 1,
  9: 1
};

var img = document.createElement('img');
img.src='block.png';

var x;
var y;

var level;
var time;

var r;
var l;
var pause;
var stop;
var winPossible = true;
var won;

var curTime;
var diff;
var stacks = {};

var canvas;
var context;

var game;

var gameStarted = false;

var animateEnd;

function gameplay() {
  if (r) {
    move(levelsToBlocks[level], y, 'left');
  } else if (l) {
    move(levelsToBlocks[level], y, 'right');
  }

  if (x <= 0) {
    l = true;
    r = false;
  } else if (x >= canvas.width - (70 * levelsToBlocks[level])) {
    r = true;
    l = false;
  }
}

var setGame = function() {
  gameStarted = true;
  clearInterval(animateEnd);

  context.clearRect(0, 0, canvas.width, canvas.height);
  clearInterval(game)

  x = 0;
  y = canvas.height - 70;
  context.drawImage(img, x, y, 70, 70);
  context.drawImage(img, x + 70, y, 70, 70);
  context.drawImage(img, x + 140, y, 70, 70);
  context.drawImage(img, x + 210, y, 70, 70);

  level = 1;
  time = 150;

  r = false;
  l = true;
  pause = false;
  stop = false;
  winPossible = true;
  won = false;
  curTime = +new Date();
  game = setInterval(gameplay, time)
}

function move(b, h, dir) {
  if (!pause) {
    for (var i = 0; i < b; i++) {
      context.clearRect(x + (70 * i), h, 70, 70);
    }

    if (dir == 'left') {
      x -= 70;
    } else {
      x += 70;
    }

    for (var i = 0; i < b; i++) {
      context.drawImage(img, x + (70 * i), y, 70, 70);
    }
  }
}

  $( document ).ready(function() {
    $(".btn").mouseup(function(){
      $(this).blur();
  })
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  setGame();


  canvas.addEventListener("touchstart", function() {
    diff = +new Date() - curTime;
    if (winPossible && diff >= 150 && gameStarted) {
      nextMove();
    }
  }, false);

  document.body.onkeydown = function(e) {
    diff = +new Date() - curTime;
    if (e.keyCode == 32 && winPossible && diff >= 150 && gameStarted) {
        nextMove();
    }
  }

  function setGame() {
    x = 0;
    y = canvas.height - 70;
    context.drawImage(img, x, y, 70, 70);
    context.drawImage(img, x + 70, y, 70, 70);
    context.drawImage(img, x + 140, y, 70, 70);
    context.drawImage(img, x + 210, y, 70, 70);

    level = 1;
    time = 150;

    r = false;
    l = true;
    pause = false;
    stop = false;
    winPossible = true;
    won = false;
    curTime = +new Date();
  }

  function nextMove() {
    var wait = setTimeout(function() { }, 250);
    var time =
    stacks[level] = [0, 0, 0, 0, 0, 0, 0, 0];
    var temp = stacks[level];
    for (var i = 0; i < levelsToBlocks[level]; i++) {
      var ix = (x + (i * 70)) / 70;
      temp[ix] = 1;
    }
    stacks[level] = temp;
    console.log(stacks);
    if (level > 1) {
      var prevLevel = stacks[level - 1];
      var curLevel = stacks[level];

      var pos = function() {
        for (var i = 0; i < curLevel.length; i++) {
          if (curLevel[i] === 1 && prevLevel[i] === 1) {
            return true;
          }
        }
        return false;
      }
      winPossible = pos() ? true : false;
      console.log(level + ": " + winPossible)

      if (winPossible) {
        for (var i = 0; i < curLevel.length; i++) {
          var j = level;
          if (curLevel[i] === 1) {
            var stop = j - 1;
            while (j > 1) {
              console.log(stacks[j - 1][i])
              var below = j - 1;
              if (stacks[below][i] === 0) {
                stacks[j][i] = 0;
                context.clearRect(i * 70, (9 - j) * 70, 70, 70);
                context.drawImage(img, i * 70, (10 - j) * 70, 70, 70);
                stop = below;
              }
              j--;
            }
            stacks[stop][i] = 1;
          }
        }
      } else {
        alert("You lose!")
        clearInterval(game)
        gameEndScreen();
      }

    }

    if (winPossible) {
      var b = levelsToBlocks[level];
      pause = true;
      level++;
      if (level > 9) {
        clearInterval(game);
        alert("You've Won!");
        context.clearRect(0, 0, canvas.width, canvas.height);
        gameEndScreen();
      }
      clearInterval(game);
      time = 150 - (level * 10);
      game = setInterval(gameplay, time)
      console.log(time)
      y -= 70;
      var r = false;
      var l = true;
      pause = false;
      curTime = +new Date();

    }
  }

  function gameEndScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var i = 0;
    var j = 0;
    var clear = false;

    animateEnd = setInterval(function() {
      if (i <= 7 && !clear) {
        context.drawImage(img, i * 70, j * 70, 70, 70);
        j++;
      }
      if (j == 9 && !clear) {
        i++;
        j = 0;
      }

      if (i === 8) {
        clear = true;
        i = 0;
        j = 0;
      }

      if (clear) {
        console.log("Clearing")
        if (i <= 7) {
          context.clearRect(i * 70, j * 70, 70, 70);
          j++;
        }
        if (j == 9 ) {
          i++;
          j = 0;
        }

        if (i === 8) {
          clearInterval(animateEnd)
          playAgainScreen();
        }
      }

    }, 20)

  }

  function playAgainScreen() {
    document.getElementById("resetButton").disabled = false;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context = canvas.getContext("2d");
    context.font = "30px Comic Sans MS";
    context.fillStyle = "blue";
    context.textAlign = "center";
    context.fillText("Click New Game below to play again!", canvas.width/2, canvas.height/2);
  }

});
