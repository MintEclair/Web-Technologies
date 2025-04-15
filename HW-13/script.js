const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let obstacles = [];
let collectibles = [];
let spikes = [];
let score = 0;
let level = 1;
let gravity = 0.5;


class GameObject {
  constructor(x, y, size = 30, color = 'gray', value = 0) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.value = value;
    this.dy = 0; 
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  collidesWith(other) {
    return (
      this.x < other.x + other.size &&
      this.x + this.size > other.x &&
      this.y < other.y + other.size &&
      this.y + this.size > other.y
    );
  }
}


const player = new GameObject(50, 300, 30, 'blue');
player.dy = 0;
player.jumpPower = -20;
player.onGround = false;

const speed = 10;


const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);


function applyPlayerPhysics() {
  player.dy += gravity;
  player.y += player.dy;


  if (player.y + player.size > canvas.height) {
    player.y = canvas.height - player.size;
    player.dy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}


function movePlayer() {
  let tempX = player.x;
  let tempY = player.y;

  if (keys['a']) tempX -= speed;
  if (keys['d']) tempX += speed;


  if (keys[' '] && player.onGround) {
    player.dy = player.jumpPower;
  }

  if (tempY >= 0 && tempY +player.size <= canvas.height) {
    const testPlayer = new GameObject(tempY, player.x, player.size);
    testPlayer.x = player.x;4
    if (!obstacles.some(ob => testPlayer.collidesWith(ob))){
      player.y= tempY;
    }
  }
  if (tempX >= 0 && tempX + player.size <= canvas.width) {
    const testPlayer = new GameObject(tempX, player.y, player.size);
    testPlayer.y = player.y; 
    if (!obstacles.some(ob => testPlayer.collidesWith(ob))) {
      player.x = tempX;
    }
  }
}


function checkCollectibles() {
  collectibles = collectibles.filter(c => {
    if (player.collidesWith(c)) {
      score += c.value;
      scoreDisplay.textContent = score;
      return false;
    }
    return true;
  });
}


function checkSpikes() {
  if (spikes.some(sp => player.collidesWith(sp))) {
    alert("You hit a spike! Game restarting...");
    resetGame();
  }
}


function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = "16px sans-serif";
  ctx.fillText(`Level: ${level}`, 10, 20);

  obstacles.forEach(ob => ob.draw());
  collectibles.forEach(c => c.draw());
  spikes.forEach(sp => sp.draw());
  player.draw();
}


function gameLoop() {
  movePlayer();
  applyPlayerPhysics();
  checkCollectibles();
  checkSpikes();
  drawAll();

 
  if (collectibles.length === 0) {
    nextLevel();
  }

  requestAnimationFrame(gameLoop);
}


function resetGame() {
  score = 0;
  level = 1;
  player.x = 50;
  player.y = 300;
  player.dy = 0;
  loadLevel(level);
}

function nextLevel() {
  level++;
  player.x = 50;
  player.y = 300;
  player.dy = 0;
  loadLevel(level);
}


function loadLevel(lvl) {
 
  obstacles = [
    new GameObject(200, 350, 100, 'darkgray'),
    new GameObject(100, 250, 80, 'darkgray'),
    new GameObject(320, 300, 80, 'darkgray')
  ];


  collectibles = [];
  for (let i = 0; i < 3 + lvl; i++) {
    const value = Math.floor(Math.random() * 5 + 1) * 10;
    const color = value >= 40 ? 'purple' : value >= 30 ? 'green' : 'gold';
    const c = new GameObject(Math.random() * 450, Math.random() * 100, 20, color, value);
    c.dy = 0; 
    collectibles.push(c);
  }


  spikes = [];
  for (let i = 0; i < 2 + lvl; i++) {
    spikes.push(new GameObject(Math.random() * 450, 370, 30, 'red'));
  }

  scoreDisplay.textContent = score;
}

loadLevel(level);
gameLoop();
