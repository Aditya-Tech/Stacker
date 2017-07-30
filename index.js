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
        stacks[level] = [];
        for (var i = 0; i < levelsToBlocks[level]; i++) {
          var temp = stacks[level];
          temp.push(x + (i * 70));
          stacks[level] = temp;
        }
        console.log(level)
        if (level > 1) {
          var prevLevel = stacks[level - 1];
          var curLevel = stacks[level];
          if (((curLevel[0] < prevLevel[0]) && (curLevel[curLevel.length - 1] <= prevLevel[prevLevel.length - 1])) || ((curLevel[0] >= prevLevel[0]) && (curLevel[curLevel.length - 1] > prevLevel[prevLevel.length - 1]))) {
            console.log("curLevel[0]: " + curLevel[0])
            console.log("prevLevel[0]: " + prevLevel[0])

            if (curLevel[0] < prevLevel[0]) {
              var toRemove = [];
              for (var i = 0; i < curLevel.length; i++) {
                console.log("curLevel[i]: " + curLevel[i])
                console.log("prevLevel[0]: " + prevLevel[0])
                if (curLevel[i] < prevLevel[0]) {
                  console.log("remove")
                  context.clearRect(curLevel[i], y, 70, 70);
                  toRemove.push(curLevel[i])
                }
              }

              for (var i = 0; i < toRemove.length; i++) {
                var index = curLevel.indexOf(toRemove[i])
                curLevel.splice(index, 1)
              }
              stacks[level] = curLevel;
              console.log("new prevLevel: " + stacks[level]);
            } else if (curLevel[curLevel.length - 1] > prevLevel[prevLevel.length - 1]) {
              for (var i = 0; i < curLevel.length; i++) {
                if (curLevel[i] < prevLevel[0]) {
                  context.clearRect(curLevel[i], y, 70, 70);
                }
              }
            }
          }
        }

        time = 10;
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
