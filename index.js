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
    if (r && !pause) {
      move(levelsToBlocks[level], y, 'left');
    } else if (l && !pause) {
      move(levelsToBlocks[level], y, 'right');
    }

    if (x <= 0) {
      l = true;
      r = false;
    } else if (x >= canvas.width - (70 * 4)) {
      r = true;
      l = false;
    }
  }, time)

  document.body.onkeyup = function(e){
    if (e.keyCode == 32) {

        var b = levelsToBlocks[level];
        pause = true;
        level++;
        y -= 70;
        for (var i = 0; i < b; i++) {
          context.drawImage(img, 70 * i, y, 70, 70);
          console.log("Drawn")
        }
        var r = false;
        var l = true;

      pause = false;
    }
  }


  function move(b, h, dir) {
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



});
