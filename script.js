const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');
const newGameButton = document.getElementById("newGame");
const scoreDisplay = document.getElementById("score");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Player characteristics
const paddle_thickness = 10;
const paddle_width = 100;
let XpaddlePosition = canvas.width / 2;
const YpaddlePosition = canvas.height * (9.5/10);
const paddle_speed = 10;

// Déplacement
let rightChanged = false;
let leftChanged = false;

// Ball dimension and position
let x = canvas.width / 2;
let y = YpaddlePosition - 30;
let dx;
let dy;
const rayonBall = 10;

// Animation Game
let animationGame;

// Score
let compteur = 0;
let timeScore = 0;

function draw() {
    // Draw Ball
    ctx.beginPath();

    ctx.arc(x, y, rayonBall, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();

    // Draw Bar 
    ctx.fillRect(XpaddlePosition - paddle_width / 2, YpaddlePosition, paddle_width, paddle_thickness);
}

function update() {
    // Changed bar coordonate
    if(rightChanged == true && (XpaddlePosition + paddle_width / 2) < canvas.width) XpaddlePosition += paddle_speed;
    if(leftChanged == true && (XpaddlePosition - paddle_width / 2) > 0) XpaddlePosition -= paddle_speed;

    // Changed Ball
    x += dx;
    y += dy;

    // Touch canvas border
    if(x + dx + rayonBall > canvas.width || x + dx - rayonBall < 0) {
        dx = -dx;
        dx > 0 ? dx+=0.1 : dx-=0.1;
    }
    else if (y + dy - rayonBall < 0) {
        dy = -dy;
        dy > 0 ? dy+=0.1 : dy-=0.1;
    }
    // Finish Game
    else if (y + dy + rayonBall > canvas.height){
        resetGame();
    }

    // Changed Touch Bar
    if(y >= YpaddlePosition && y <= YpaddlePosition + paddle_thickness) {
        if(x >= XpaddlePosition - paddle_width / 2 && x <= XpaddlePosition + paddle_width / 2){
            dy = -dy;
        }
    }
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

    XpaddlePosition = canvas.width / 2;

    compteur = 0;
    timeScore = 0;

    cancelAnimationFrame(animationGame);
}


function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();

    animationGame = requestAnimationFrame(game);
}

newGameButton.addEventListener("click", () => {
    scoreDisplay.textContent = "Score : " + 0 + " s";
    resetGame();
    game();
})

/* ####### Move controls ####### */

// Computer touch
leftButton.addEventListener("mousedown", () => leftChanged = true);
rightButton.addEventListener("mousedown", () => rightChanged = true);

leftButton.addEventListener("mouseup", () => leftChanged = false);
rightButton.addEventListener("mouseup", () => rightChanged = false);
leftButton.addEventListener("mouseleave", () => leftChanged = false);
rightButton.addEventListener("mouseleave", () => rightChanged = false);

// Mobile touch
leftButton.addEventListener("touchstart", () => leftChanged = true);
rightButton.addEventListener("touchstart", () => rightChanged = true);

leftButton.addEventListener("touchend", () => leftChanged = false);
rightButton.addEventListener("touchend", () => rightChanged = false);

// Arrow Touch
document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        leftChanged = true;
        break;
      case 39:
        rightChanged = true;
        break;
    }
  };

  document.onkeyup = function(e) {
    switch (e.keyCode) {
      case 37:
        leftChanged = false;
        break;
      case 39:
        rightChanged = false;
        break;
    }
  };


// Affichage de base
resetGame();
draw();