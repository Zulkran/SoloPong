const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');
const newGameButton = document.getElementById("newGame");
const scoreDisplay = document.getElementById("score");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Player characteristics
const paddle_thickness = 10;
const paddle_width = 90;
let XpaddlePosition = canvas.width / 2;
const YpaddlePosition = canvas.height * (9.70/10);
const paddle_speed = 8;
const radius = paddle_thickness / 2;

// Déplacement
let rightChanged = false;
let leftChanged = false;

// Ball dimension and position
let x = canvas.width / 2;
let y = YpaddlePosition - 30;
let dx;
let dy;
const rayonBall = 10;
const ballSpeed = canvas.width / 100;

// Animation Game
let animationGame;

// Score
let start;

function draw() {
    // Draw Ball
    ctx.beginPath();

    ctx.arc(x, y, rayonBall, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgb(192, 42, 252)";

    // Draw Bar 
    ctx.roundRect(XpaddlePosition - paddle_width / 2, YpaddlePosition, paddle_width, paddle_thickness, [radius]);
    ctx.fill();

    ctx.stroke();
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
        dx > 0 && (dx <= ballSpeed*5 || -dx <= ballSpeed*5) ? dx+=0.5 : dx-=0.5;
    }
    else if (y + dy - rayonBall < 0) {
        dy = -dy;
        dy > 0 && (dy <= ballSpeed*5 || -dy <= ballSpeed*5) ? dy+=0.5 : dy-=0.5;
    }
    // Finish Game
    else if (y + rayonBall > canvas.height){
        resetGame();
    }

    // Changed Touch Bar
    if(y + rayonBall >= YpaddlePosition && y <= YpaddlePosition + paddle_thickness && x + rayonBall >= XpaddlePosition - paddle_width / 2 && x <= XpaddlePosition + paddle_width / 2) {
        if(dy < 0) {
            ;
        }
        else {
            dy = -dy;
            dx -= dx/4;
        }
    }

    if(dx == 0){
        dx += 1;
    }

    // Update Score
    scoreDisplay.textContent = "Score : " + Math.floor((Date.now() - start)/1000) + " s";
}

function resetGame() {
    x = canvas.width / 2;
    y = YpaddlePosition - 30;
    if(Math.floor(Math.random() * 2) == 1) {
        dx = ballSpeed/2;
    }
    else {
        dx = -ballSpeed/2;
    }
    dy= -ballSpeed;

    XpaddlePosition = canvas.width / 2;

    scoreDisplay.textContent = "Score : " + 0 + " s";

    cancelAnimationFrame(animationGame);
}


function game() {
    animationGame = requestAnimationFrame(game);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
}

// Lancement du jeu
newGameButton.addEventListener("click", () => {
    resetGame();
    start = Date.now();
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