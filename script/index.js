var start_game = document.getElementById("start");
var frame = document.getElementById("frame");

var game_update_rate = 50;

var score = {
  scoreObj: document.getElementById("score"),
  score: 0,
  add: function () {
    this.score++;
    this.scoreObj.innerHTML = "score : " + this.score;
  },
  reset: function () {
    this.score = 0;
    this.scoreObj.innerHTML = "score : 0";
  }
}

var player = {
  playerObj: document.getElementById("player"),
  start: function () {
    this.playerObj.style.backgroundImage = "url('images/player_horse_animated.gif')"
  },
  stop: function () {
    this.playerObj.style.backgroundImage = "url('images/player_horse_static.png')"
  },
  jump: function () {
    if (!this.playerObj.classList.contains("player_jump")) {
      this.playerObj.classList.add("player_jump");
      setTimeout(() => {
        this.playerObj.classList.remove("player_jump")
      }, 1000);
    }
  }
}

var enermy = {
  enermyObj: document.createElement("div"),
  spawn: function () {
    this.enermyObj.setAttribute("id", "enermy");
    this.enermyObj.classList.add("enermy")
    this.enermyObj.classList.add("enermy_move")
    this.enermyObj.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
    frame.appendChild(this.enermyObj)
  },
  stop: function () {
    this.enermyObj.style.right = getComputedStyle(this.enermyObj).right
    this.enermyObj.classList.remove("enermy_move")
  },
  destory: function () {
    this.enermyObj.remove()
  }
}

var background = {
  cloudObj: document.getElementById("cloud"),
  mountainsObj: document.getElementById("mountains"),
  grassObj: document.getElementById("grass"),
  start: function () {
    this.cloudObj.style.right = -this.cloudObj.clientWidth + "px"
    this.cloudObj.classList.add('cloud_move')
    this.grassObj.style.right = -this.grassObj.clientWidth + "px"
    this.grassObj.classList.add('grass_move')
    this.mountainsObj.style.left = "0";
    this.mountainsObj.classList.add('mountains_move')
  },
  stop: function () {
    this.cloudObj.style.right = getComputedStyle(this.cloudObj).right;
    this.cloudObj.classList.remove('cloud_move')
    this.grassObj.style.right = getComputedStyle(this.grassObj).right;
    this.grassObj.classList.remove('grass_move')
    this.mountainsObj.style.left = getComputedStyle(this.mountainsObj).left;
    this.mountainsObj.classList.remove('mountains_move')
  }
}

function isCollided(object1, object2) {
  var object_1 = object1.getBoundingClientRect();
  var object_2 = object2.getBoundingClientRect();

  return (object_1.left < object_2.left + object_2.width && object_1.left + object_1.width > object_2.left &&
    object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top)
}

function playerJump(){
  player.jump();
}

function game_over() {
  start_game.style.display = "block";
  frame.removeEventListener("click", playerJump, true);
  player.stop()
  enermy.stop()
  background.stop()
}

function game_start() {
  score.reset()
  enermy.spawn()
  player.start()
  background.start()

  start_game.style.display = 'none'
  frame.addEventListener('click', playerJump, true)

  game_update_interval = setInterval(() => {

    if (isCollided(player.playerObj, enermy.enermyObj)) {
      game_over()
    }

    if (enermy.enermyObj.offsetLeft < 0) {
      enermy.destory()
      enermy.spawn()
      score.add()
    }
  }, game_update_rate)
}

start_game.addEventListener("click", game_start);
