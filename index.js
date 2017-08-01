var levelsToBlocks = {
  1: 4,
  2: 4,
  3: 4,
  4: 3,
  5: 3,
  6: 3,
  7: 2,
  8: 1,
  9: 1,
  10: 1
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
var winPossible;
var won;

var stacks = {};

$( document ).ready(function() {

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  setGame();

  var game = setInterval(gameplay, time)

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

  document.body.onkeyup = function(e) {
    if (e.keyCode == 32 && winPossible && !won) {

        stacks[level] = [0, 0, 0, 0, 0, 0, 0, 0];
        var temp = stacks[level];
        for (var i = 0; i < levelsToBlocks[level]; i++) {
          var ix = (x + (i * 70)) / 70;
          temp[ix] = 1;
        }
        stacks[level] = temp;
        console.log(stacks)
        if (level > 1) {
          prevLevel = stacks[level - 1];
          curLevel = stacks[level];

          var pos = function() {
            for (var i = 0; i < curLevel.length; i++) {
              if (curLevel[i] === 1 && prevLevel[i] === 1) {
                return true;
              }
            }
            return false;
          }
          winPossible = pos() ? true : false;
          console.log(winPossible)

          for (var i = 0; i < curLevel.length; i++) {
            var j = level;
            if (curLevel[i] === 1) {
              var stop = j - 1;
              while (j > 1) {
                var below = j - 1;
                if (stacks[below][i] === 0) {
                  stacks[j][i] = 0;
                  context.clearRect(i * 70, (10 - j) * 70, 70, 70);
                  context.drawImage(img, i * 70, (11 - j) * 70, 70, 70);
                  stop = below;
                }
                j--;
              }
              stacks[stop][i] = 1;
            }
          }
        }

        if (winPossible) {
          var b = levelsToBlocks[level];
          pause = true;
          level++;
          console.log(level)
          if (level > 10) {
            clearInterval(game);
            alert("You've Won!");
            context.clearRect(0, 0, canvas.width, canvas.height);
            gameEndScreen();
          }
          clearInterval(game);
          time -= 1;
          game = setInterval(gameplay, time)

          y -= 70;
          var r = false;
          var l = true;
          pause = false;
        } else {
          clearInterval(game);
          alert("You've Lost!");
          context.clearRect(0, 0, canvas.width, canvas.height);
          gameEndScreen();

        }

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

  function gameEndScreen() {
    var i = 0;
    var j = 0;
    var clear = false;

    var animateEnd = setInterval(function() {
      if (i <= 7 && !clear) {
        context.drawImage(img, i * 70, j * 70, 70, 70);
        j++;
      }
      if (j == 10 && !clear) {
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
        if (j == 10 ) {
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
    context.clearRect(0, 0, canvas.width, canvas.height);

  }
});
