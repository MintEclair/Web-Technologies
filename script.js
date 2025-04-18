const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let obstacles = [];
let collectibles = [];
let spikes = [];
let score = 0;
let level = 1;
let gravity = 0.5;

// Classes
class GameObject {
  constructor(x, y, size = 30, color = 'gray', value = 0) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.value = value;
    this.dy = 0; // Only needed for gravity objects (player, collectibles)
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

// Player
const player = new GameObject(50, 300, 30, 'blue');
player.dy = 0;
player.jumpPower = -20;
player.onGround = false;

const speed = 10;

// Input
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Gravity & jumping (player only)
function applyPlayerPhysics() {
  player.dy += gravity;
  player.y += player.dy;

  // Ground collision
  if (player.y + player.size > canvas.height) {
    player.y = canvas.height - player.size;
    player.dy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}

// Movement with obstacle + border collision
function movePlayer() {
  let tempX = player.x;

  if (keys['a']) tempX -= speed;
  if (keys['d']) tempX += speed;

  // Jump with spacebar
  if (keys[' '] && player.onGround) {
    player.dy = player.jumpPower;
  }

  // Border collision
  if (tempX >= 0 && tempX + player.size <= canvas.width) {
    // Allow movement unless already overlapping with an obstacle at the *new* X position
    const testPlayer = new GameObject(tempX, player.y, player.size);
    testPlayer.y = player.y; // keep Y the same for horizontal test
    if (!obstacles.some(ob => testPlayer.collidesWith(ob))) {
      player.x = tempX;
    }
  }
}

// Gravity for collectibles only


// Collect stars
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

// Check spike collision
function checkSpikes() {
  if (spikes.some(sp => player.collidesWith(sp))) {
    alert("You hit a spike! Game restarting...");
    resetGame();
  }
}

// Drawing everything
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

// Game loop
function gameLoop() {
  movePlayer();
  applyPlayerPhysics();
  checkCollectibles();
  checkSpikes();
  drawAll();

  // Level up if all stars collected
  if (collectibles.length === 0) {
    nextLevel();
  }

  requestAnimationFrame(gameLoop);
}

// Reset everything
function resetGame() {
  score = 0;
  level = 1;
  player.x = 50;
  player.y = 300;
  player.dy = 0;
  loadLevel(level);
}

// Go to next level
function nextLevel() {
  level++;
  player.x = 50;
  player.y = 300;
  player.dy = 0;
  loadLevel(level);
}

// Generate level content
function loadLevel(lvl) {
  // Platforms (no gravity)
  obstacles = [
    new GameObject(200, 350, 100, 'darkgray'),
    new GameObject(100, 250, 80, 'darkgray'),
    new GameObject(320, 300, 80, 'darkgray')
  ];

  // Collectibles (with gravity + random value + color)
  collectibles = [];
  for (let i = 0; i < 3 + lvl; i++) {
    const value = Math.floor(Math.random() * 5 + 1) * 10;
    const color = value >= 40 ? 'purple' : value >= 30 ? 'green' : 'gold';
    const c = new GameObject(Math.random() * 450, Math.random() * 100, 20, color, value);
    c.dy = 0; // So gravity applies
    collectibles.push(c);
  }

  // Spikes (static)
  spikes = [];
  for (let i = 0; i < 2 + lvl; i++) {
    spikes.push(new GameObject(Math.random() * 450, 370, 30, 'red'));
  }

  scoreDisplay.textContent = score;
}

loadLevel(level);
gameLoop();
