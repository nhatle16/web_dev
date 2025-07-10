const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Game constants
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 18;
const PADDLE_MARGIN = 10;
const PLAYER_COLOR = "#3ecf8e";
const AI_COLOR = "#f54242";
const BALL_COLOR = "#fff";
const NET_COLOR = "#fff";
const FPS = 60;

// Game state
let playerY = (canvas.height - PADDLE_HEIGHT) / 2;
let aiY = (canvas.height - PADDLE_HEIGHT) / 2;
let ballX = canvas.width / 2 - BALL_SIZE / 2;
let ballY = canvas.height / 2 - BALL_SIZE / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerScore = 0;
let aiScore = 0;

// Mouse control for the player paddle
canvas.addEventListener("mousemove", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    playerY = mouseY - PADDLE_HEIGHT / 2;
    if (playerY < 0) playerY = 0;
    if (playerY > canvas.height - PADDLE_HEIGHT) playerY = canvas.height - PADDLE_HEIGHT;
});

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collision with top and bottom walls
    if (ballY <= 0 || ballY + BALL_SIZE >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision with player paddle
    if (
        ballX <= PADDLE_MARGIN + PADDLE_WIDTH &&
        ballY + BALL_SIZE >= playerY &&
        ballY <= playerY + PADDLE_HEIGHT
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Collision with AI paddle
    if (
        ballX + BALL_SIZE >= canvas.width - PADDLE_MARGIN - PADDLE_WIDTH &&
        ballY + BALL_SIZE >= aiY &&
        ballY <= aiY + PADDLE_HEIGHT
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Reset ball if it goes off left or right side
    if (ballX < 0) {
        aiScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Simple AI to follow the ball
    const aiCenter = aiY + PADDLE_HEIGHT / 2;
    if (aiCenter < ballY) {
        aiY += 4;
    } else {
        aiY -= 4;
    }
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw net
    for (let y = 0; y < canvas.height; y += 30) {
        ctx.fillStyle = NET_COLOR;
        ctx.fillRect(canvas.width / 2 - 2, y, 4, 18);
    }

    // Draw player paddle
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(PADDLE_MARGIN, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw AI paddle
    ctx.fillStyle = AI_COLOR;
    ctx.fillRect(canvas.width - PADDLE_MARGIN - PADDLE_WIDTH, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = BALL_COLOR;
    ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

    // Update score display
    scoreElement.textContent = `${playerScore} - ${aiScore}`;
}

function resetBall() {
    ballX = canvas.width / 2 - BALL_SIZE / 2;
    ballY = canvas.height / 2 - BALL_SIZE / 2;
    ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

// Start the game loop
gameLoop();