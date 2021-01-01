var start_game = document.getElementById("start");
var frame = document.getElementById("frame");
var player = document.getElementById("player");
var enermy = document.getElementById("enermy");

var score_display = document.getElementById("score")
var cloud = document.getElementById("cloud")
var mountains = document.getElementById("mountains")

var game_update_rate = 100;
var score = 0;

function player_start_animation() {
  player.style.backgroundImage = "url('images/player_horse_animated.gif')"
}

function player_stop_animation() {
  player.style.backgroundImage = "url('images/player_horse_static.png')"
}

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

function enermy_passed_player() {
  return (parseInt(enermy.getBoundingClientRect().right) < parseInt(player.getBoundingClientRect().left));
}

function enermy_move() {
  enermy.classList.add("enermy_move")
}

function enermy_stop() {
  enermy.style.right = getComputedStyle(enermy).right
  enermy.classList.remove("enermy_move")
}

function enermy_reset() {
  enermy.style.right = "0px";
  if (enermy.classList.contains('enermy_move')) {
    enermy.classList.remove('enermy_move')
  }
}

function background_move() {
  cloud.style.right = -cloud.clientWidth + "px"
  cloud.classList.add('cloud_move')
  mountains.style.left = "0%";
  mountains.classList.add('mountains_move')
}

function background_stop() {
  cloud.style.right = getComputedStyle(cloud).right;
  cloud.classList.remove('cloud_move')
  mountains.style.left = getComputedStyle(mountains).left;
  mountains.classList.remove('mountains_move')
}

function add_score() {
  score++;
  score_display.innerHTML = "score : " + score;
}

function reset_score() {
  score = 0;
  score_display.innerHTML = "score : " + score;
}

function game_over() {
  start_game.style.display = "block";
  frame.removeEventListener("click", player_jump, true);
  enermy_stop()
  background_stop()
  player_stop_animation()
}

function game_start() {
  enermy_reset()
  reset_score()
  player_start_animation()
  start_game.style.display = 'none'
  frame.addEventListener('click', player_jump, true)

  enermy_move()
  background_move()

  score_added = false;

  game_update_interval = setInterval(game_update, game_update_rate)
  function game_update() {
    if (collision_detection()) {
      game_over()
      clearInterval(game_update_interval);
    } else {
      if (enermy_passed_player() && !score_added) { add_score(); score_added = true }
      if (!enermy_passed_player() && score_added) { score_added = false }
    }
  }
}

start_game.addEventListener("click", game_start);
