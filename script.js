// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let backgroundColor, playerSnake, currentApple, score

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  fill(0);
  text("Score: " + score, 20, 20);
  
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width/2;
    this.y = height - 10;
    this.direction = 'N';
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.tail.pop();
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    
    for(let i = 0; i < this.tail.length; i++){
      this.tail[i].showSelf();
    }
  }
// check if snake has tocuhed current apple
  checkApples() {
    let hit = collideRectRect(this.x, this.y, this.size, this.size, 
                              currentApple.x, currentApple.y, currentApple.size, currentApple.size );
    if(hit){
      score++;
    }
    
    if(hit){
      currentApple = new Apple();
      this.extendTail()
    }
  }

  checkCollisions() {
    
    if (this.x > width + this.size || this.x < -10) {
      
      gameOver();
    }
    
    if (this.y > height + this.size|| this.y < -10) {
      
      gameOver();
    }
    
  }

  extendTail() {
   
    let lastTailSegment = this.tail[this.tail.length - 1]
    this.tail.push(new TailSegment(lastTailSegment.x,lastTailSegment.y))
    
  }
}

class Apple {
  constructor() {
    this.size = 10;
    this.x = round(2 + random(width - this.size));
    this.y = round(2 + random(height - this.size));
    
  }

  showSelf() {
    
    fill(0, 80, 80);
    rect(this.x, this.y, 10, 10);
    
  }
}


//tail segment class
class TailSegment {
  
  constructor (x,y) {
    this.size = 10;
    this.x = x
    this.y = y
  }
  
  showSelf() {
    fill(0);
    rect(this.x, this.y, this.size, this.size)
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

function restartGame() {}

function gameOver() {
  
  text("GAME OVER\nSCORE: " + score, 150, 100);
}