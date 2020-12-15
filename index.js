var start_game = document.getElementById("start");
var frame = document.getElementById("frame");
var player = document.getElementById("player");
var enermy = document.getElementById("enermy");

var enermy_move_speed = 1;

function player_jump() {
  // Add player_jump class if it doesn't exist
  if (!player.classList.contains("player_jump")) {
    player.classList.add("player_jump");
    setTimeout(function () {
      player.classList.remove("player_jump");
    }, 1000);
  }
}

function collision_detection() {
  // add some buffer to make the solid collide
  var buffer_size = 5
  var enermy_right = parseInt(enermy.getBoundingClientRect().right);
  var enermy_left = parseInt(enermy.getBoundingClientRect().left);
  var enermy_top = parseInt(enermy.getBoundingClientRect().top);
  var player_right = parseInt(player.getBoundingClientRect().right);
  var player_left = parseInt(player.getBoundingClientRect().left);
  var player_bottom = parseInt(player.getBoundingClientRect().bottom);
  return (
    player_bottom >= enermy_top &&
    enermy_left <= player_right - buffer_size &&
    enermy_right >= player_left + buffer_size
  );
}

function reset_enermy() {
  enermy.style.right = "0px";
}

function game_start() {
  reset_enermy();
  start_game.style.display = "none";
  frame.addEventListener("click", player_jump, true);

  // move enermy
  var pos = 0;
  var enermy_move_interval = setInterval(enermy_move, enermy_move_speed);

  // function to move enermy
  function enermy_move() {
    if (collision_detection()) {
      // game over
      game_over();
      clearInterval(enermy_move_interval);
    } else {
      pos++;
      enermy.style.right = pos + "px";
      // if enermy out of frame then reset
      if (
        parseInt(enermy.getBoundingClientRect().left) <=
        parseInt(frame.getBoundingClientRect().left)
      ) {
        reset_enermy();
        pos = 0;
      }
    }
  }
}

function game_over() {
  start_game.style.display = "block";
  frame.removeEventListener("click", player_jump, true);
}

start_game.addEventListener("click", game_start);
