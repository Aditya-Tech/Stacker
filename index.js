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

var stacks = {};

$( document ).ready(function() {
  var img = document.createElement('img');
  img.src='block.png';

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var x = 0;
  var y = canvas.height - 70;
  context.drawImage(img, x, y, 70, 70);
  context.drawImage(img, x + 70, y, 70, 70);
  context.drawImage(img, x + 140, y, 70, 70);
  context.drawImage(img, x + 210, y, 70, 70);

  var level = 1;
  var time = 150;

  var r = false;
  var l = true;
  var pause = false;


  setInterval(function() {
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
  }, time)

  document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        console.log(level)

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

          for (var i = 0; i < curLevel.length; i++) {
            var j = level;
            if (curLevel[i] === 1) {
              var stop = j - 1;
              while (j > 1) {
                console.log(stacks[j - 1][i])
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

        var b = levelsToBlocks[level];
        pause = true;
        level++;
        y -= 70;
        var r = false;
        var l = true;
        pause = false;
    }
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
});
