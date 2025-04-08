const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let obstacles = [];
let collectibles = [];
let score = 0;


class GameObject {
  constructor(x, y, size = 30) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(color) {
    ctx.fillStyle = color;
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


fetch('obstacles.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(obj => obstacles.push(new GameObject(obj.x, obj.y)));
    return fetch('collectibles.json');
  })
  .then(res => res.json())
  .then(data => {
    data.forEach(obj => collectibles.push(new GameObject(obj.x, obj.y)));
    initGame();
  });


const player = new GameObject(50, 50);
const speed = 5;


const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function movePlayer() {
  let temp = { x: player.x, y: player.y };

  if (keys['w']) temp.y -= speed;
  if (keys['s']) temp.y += speed;
  if (keys['a']) temp.x -= speed;
  if (keys['d']) temp.x += speed;

  
  const newPlayer = new GameObject(temp.x, temp.y, player.size);
  if (!obstacles.some(ob => newPlayer.collidesWith(ob))) {
    player.x = temp.x;
    player.y = temp.y;
  }
  
}

function checkCollectibles() {
  collectibles = collectibles.filter(c => {
    if (player.collidesWith(c)) {
      score++;
      scoreDisplay.textContent = score;
      return false;
    }
    return true;
  });
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  obstacles.forEach(ob => ob.draw('red'));
  collectibles.forEach(c => c.draw('green'));
  player.draw('blue');
}

function gameLoop() {
  movePlayer();
  checkCollectibles();
  drawAll();
  requestAnimationFrame(gameLoop);
}

function initGame() {
  gameLoop();
}
