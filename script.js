const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');
const newGameButton = document.getElementById("newGame");
const scoreDisplay = document.getElementById("score");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
let storage = localStorage;
storage.setItem("best", 0);

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
let XBallSpeed;
const YBallSpeed = 5;

// Animation Game
let animationGame;

// Score
let start;
let score;

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
    // Update Score
    score = Math.floor((Date.now() - start)/1000);
    scoreDisplay.textContent = "Score : " + score + " s";

    // Changed bar coordonate
    if(rightChanged == true && (XpaddlePosition + paddle_width / 2) < canvas.width) XpaddlePosition += paddle_speed;
    if(leftChanged == true && (XpaddlePosition - paddle_width / 2) > 0) XpaddlePosition -= paddle_speed;

    // Changed Ball
    x += dx;
    y += dy;

    // Checking that the ball does not stay vertical
    while(XBallSpeed > -0.5 && XBallSpeed < 0.5) {
        XBallSpeed = Math.random() * (4 - 2) + 2;
    }

    // Touch canvas border
    if(x + dx + rayonBall > canvas.width || x + dx - rayonBall < 0) {
        dx = -dx;
        if(dx**2 < XBallSpeed**2*5) {
            dx = dx*1.05;
        }
    }
    else if (y + dy - rayonBall < 0) {
        dy = -dy;
        if(dy**2 < YBallSpeed**2*5) {
            dy = dy*1.05;
        }
    }
    // Finish Game
    else if (y + rayonBall > canvas.height){
        resetGame();
        score = Math.floor((Date.now() - start)/1000);
        scoreDisplay.textContent = "Perdu votre score est de : " + score + " s";
        if(storage.getItem("best") < score) {
            storage.setItem("best", score);
            console.log("Best score : ", storage.getItem("best"));
        }
    }

    // Changed Touch Bar
    if(y + rayonBall >= YpaddlePosition && y <= YpaddlePosition + paddle_thickness && x + rayonBall >= XpaddlePosition - paddle_width / 2 && x <= XpaddlePosition + paddle_width / 2) {
        dy = -dy;
        if(dy**2 < YBallSpeed**2*5) {
            dy = 1.1*dy;
        }
    }
}

function resetGame() {
    x = canvas.width / 2;
    y = YpaddlePosition - 30;

    XBallSpeed = 0;
    while(XBallSpeed > -0.5 && XBallSpeed < 0.5) {
        XBallSpeed = Math.random() * (4 - 2) + 2;
    }

    if(Math.floor(Math.random() * 2) == 1) {
        dx = XBallSpeed;
    }
    else {
        dx = -XBallSpeed;
    }
    dy= -YBallSpeed;

    XpaddlePosition = canvas.width / 2;

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
    scoreDisplay.textContent = "Score : " + 0 + " s";
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