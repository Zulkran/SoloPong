const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');
const newGameButton = document.getElementById("newGame");
const scoreDisplay = document.getElementById("score");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Player characteristics
const paddle_thickness = 10;
const paddle_width = 100;
let XpaddlePosition = canvas.width / 2 - paddle_width / 2;
const YpaddlePosition = canvas.height * (9/10);

// Ball dimension and position
let x = canvas.width / 2;
let y = YpaddlePosition - 30;
let dx = 2;
if(Math.floor(Math.random() * 2) == 1) {
    dx = 2;
}
else {
    dx = -2;
}
let dy= -2;
const rayonBall = 10;

// Time intervalle Game
let intervalle;
const intervalTime = 10;

// Score
let compteur = 0;
let timeScore = 0;

function drawBar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    ctx.fillRect(XpaddlePosition, YpaddlePosition, paddle_width, paddle_thickness);
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, rayonBall, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function changedScore() {
    if (compteur == intervalTime*10) {
        timeScore++;
        scoreDisplay.textContent = "Score : " + timeScore + " s";
        compteur = 0;
    };
}

function changedBall() {
    x += dx;
    y += dy;

    // Touch canvas border
    if(x + dx + rayonBall > canvas.width || x + dx - rayonBall < 0) {
        dx = -dx;
    }
    if (y + dy - rayonBall < 0) {
        dy = -dy;
    }
    if (y + dy + rayonBall > canvas.height){
        clearInterval(intervalle);
        resetGame();
        drawBall();
        drawBar();
    }

    // Touch Bar
    if(y >= YpaddlePosition && y <= YpaddlePosition + paddle_thickness) {
        if(x >= XpaddlePosition && x <= XpaddlePosition + paddle_width){
            dy = -dy;
        }
    }
}

function changedBar(right, left) {
    if((XpaddlePosition + paddle_width + right) > canvas.width || (XpaddlePosition - left) < 0) {
        ;
    }
    else {
        XpaddlePosition += right;
        XpaddlePosition -= left;
    }
    drawBar();
}

function resetGame() {
    x = canvas.width / 2;
    y = YpaddlePosition - 30;
    if(Math.floor(Math.random() * 2) == 1) {
        dx = 2;
    }
    else {
        dx = -2;
    }
    dy= -2;

    XpaddlePosition = canvas.width / 2 - paddle_width / 2;

    compteur = 0;
    timeScore = 0;
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();
    changedBall();

    compteur++;
    changedScore();
}

function startGame() {
    clearInterval(intervalle);
    scoreDisplay.textContent = "Score : " + 0 + " s";
    resetGame();
    intervalle = setInterval(game, intervalTime);
}

newGameButton.addEventListener("click", () => {
    startGame();
})
leftButton.addEventListener("click", () => {
    changedBar(0, 20);
})
rightButton.addEventListener("click", () => {
    changedBar(20, 0);
})

let leftInterval;
let rightInteval;
leftButton.addEventListener("mousedown", () => {
    clearInterval(leftInterval);
    leftInterval = setInterval(() => {
        changedBar(0, 5);
    }, 20);
})
rightButton.addEventListener("mousedown", () => {
    clearInterval(rightInteval);
    rightInteval = setInterval(() => {
        changedBar(5, 0);
    }, 20);
})
leftButton.addEventListener("mouseup", () => {
    clearInterval(leftInterval);
})
leftButton.addEventListener("mouseleave", () => {
    clearInterval(leftInterval);
})
rightButton.addEventListener("mouseup", () => {
    clearInterval(rightInteval);
})
rightButton.addEventListener("mouseleave", () => {
    clearInterval(rightInteval);
})

// Event Mobile
leftButton.addEventListener("touchstart", () => {
    clearInterval(leftInterval);
    leftInterval = setInterval(() => {
        changedBar(0, 5);
    }, 20);
})
rightButton.addEventListener("touchstart", () => {
    clearInterval(rightInteval);
    rightInteval = setInterval(() => {
        changedBar(5, 0);
    }, 20);
})

leftButton.addEventListener("touchend", () => {
    clearInterval(leftInterval);
})
rightButton.addEventListener("touchend", () => {
    clearInterval(rightInteval);
})


// Affichage de base
drawBall();
drawBar();