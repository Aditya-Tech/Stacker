
$( document ).ready(function() {
  var img = document.createElement('img');
  img.src='block.png';

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var x = 0;
  var y = canvas.height - 35;
  context.drawImage(img, x, y, 35, 35);
  context.drawImage(img, x + 35, y, 35, 35);
  context.drawImage(img, x + 70, y, 35, 35);
  context.drawImage(img, x + 105, y, 35, 35);


  context.fillRect(x, y, 35, 35);
  var time = 100;

  var r = false;
  var l = true;

  setInterval(function() {
    if (r) {
      moveLeft();
    } else if (l) {
      moveRight();
    }

    if (x <= 0) {
      console.log("move right")
      l = true;
      r = false;
    } else if (x >= canvas.width - (35 * 4)) {
      console.log("move left")
      r = true;
      l = false;
    }
  }, time)

  function moveRight() {
    context.clearRect(x, y, 35, 35);
    context.clearRect(x + 35, y, 35, 35);
    context.clearRect(x + 70, y, 35, 35);
    context.clearRect(x + 105, y, 35, 35);

    x += 35;
    context.drawImage(img, x, y, 35, 35);
    context.drawImage(img, x + 35, y, 35, 35);
    context.drawImage(img, x + 70, y, 35, 35);
    context.drawImage(img, x + 105, y, 35, 35);
  }

  function moveLeft() {
    context.clearRect(x, y, 35, 35);
    context.clearRect(x + 35, y, 35, 35);
    context.clearRect(x + 70, y, 35, 35);
    context.clearRect(x + 105, y, 35, 35);
    x -= 35;
    context.drawImage(img, x, y, 35, 35);
    context.drawImage(img, x + 35, y, 35, 35);
    context.drawImage(img, x + 70, y, 35, 35);
    context.drawImage(img, x + 105, y, 35, 35);
  }


});
