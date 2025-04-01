class GameObject {
    constructor(x, y, size, color, speedX = 0, speedY = 0) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkBounds(canvas) {
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
            this.speedX *= -1;
        }
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
            this.speedY *= -1;
        }
    }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("bgMusic");

let player = new GameObject(300, 200, 20, "blue");
let enemy = new GameObject(100, 100, 20, "red", 2, 2);

let keys = {};

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function movePlayer() {
    if (keys["w"]) player.y -= 4;
    if (keys["s"]) player.y += 4;
    if (keys["a"]) player.x -= 4;
    if (keys["d"]) player.x += 4;

    // Prevent the player from going out of bounds
    if (player.x - player.size < 0) player.x = player.size;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
    if (player.y - player.size < 0) player.y = player.size;
    if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;
}

function checkCollision() {
    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.size + enemy.size) {
        canvas.style.backgroundColor = "purple"; 
        player.size += 1; 
        enemy.size += 1; 
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    enemy.move();
    enemy.checkBounds(canvas);
    checkCollision();

    player.draw(ctx);
    enemy.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();

function startMusic() {
    music.play().catch(error => console.log("Music play failed:", error));
    
    // Remove the event listener after the first interaction
    document.removeEventListener("click", startMusic);
}

// Listen for the first user click to enable music
document.addEventListener("click", startMusic);