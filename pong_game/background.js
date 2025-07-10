
const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");

let stars = [];
const numStars = 200;

function resizeCanvas() {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
}

function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * backgroundCanvas.width,
            y: Math.random() * backgroundCanvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.2 + 0.1
        });
    }
}

function drawStars() {
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundCtx.fillStyle = "#000";
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

    for (const star of stars) {
        backgroundCtx.beginPath();
        backgroundCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        backgroundCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        backgroundCtx.fill();
    }
}

function updateStars() {
    for (const star of stars) {
        star.y += star.speed;
        if (star.y > backgroundCanvas.height) {
            star.y = 0;
            star.x = Math.random() * backgroundCanvas.width;
        }
    }
}

function animateBackground() {
    updateStars();
    drawStars();
    requestAnimationFrame(animateBackground);
}

window.addEventListener("resize", () => {
    resizeCanvas();
    stars = [];
    initStars();
});

resizeCanvas();
initStars();
animateBackground();
