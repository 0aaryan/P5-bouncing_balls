
//Press Up key to Add random velocity to each ball

//const { CANVAS } = require("phaser");

GRAVITY = 0;
EY = 0.6;
EX=0.6;
Eball=1;
WIN_WIDTH = 800;
WIN_HEIGHT = 800;
CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 800;
NUMBER_OF_BALLS = 25;
COLLISION_WITH_BALLS=0;



class Ball {
  constructor(x, y, radius, velx, vely) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velx = velx;
    this.vely = vely;
    this.colour = (255, 0, 0);
  }

  render() {
    fill(this.colour);
    circle(this.x, this.y, 2 * this.radius);
  }
  move() {
    this.vely += GRAVITY;
    this.y += this.vely;
    this.x += this.velx;
  }
  handle_collision() {
    if (this.y + this.radius >= WIN_HEIGHT) {
      this.vely = -EY * this.vely;
      this.y = WIN_HEIGHT - this.radius;
    }
    if (this.y - this.radius <= 0) {
      this.vely = -EY* this.vely;
      this.y = this.radius;
    }
    if (this.x + this.radius >= WIN_WIDTH) {
      this.velx = -EX * this.velx;
      this.x = WIN_WIDTH - this.radius;
    }
    if (this.x - this.radius <= 0) {
      this.velx = -EX * this.velx;
      this.x = this.radius;
    }
  }
  
  handle_ball_collision(ball2){
      let dx=(this.x-ball2.x);
      let dy=(this.y-ball2.y);
      let ball2x=ball2.x;
      let ball2y=ball2.y;
      let ball1x=this.x;
      let ball1y=this.y;
    
      if(Math.sqrt(dx*dx+dy*dy)<(this.radius+ball2.radius)){
        var tempx=this.velx;
        var tempy=this.vely;
        var tempcolor=this.colour;
        this.velx=Eball*ball2.velx;
        this.vely=Eball*ball2.vely;
        ball2.vely=Eball*tempy;
        ball2.velx=Eball*tempx;
        this.colour=ball2.colour;
        ball2.colour=tempcolor;
        
    }
        ball2.x=ball2x;
        ball2.y=ball2y;
        this.x=ball1x;
        this.y=ball1y;
  }
}




let balls = [];

var SLIDERS;

function setup() {
  SLIDERS={
    "GRAVITY":createSlider(-2,2,0,2),
    "EY":createSlider(0,1,0.5,0.1),
    "EX":createSlider(0,1,0.5,0.1),
    "COLLISION_WITH_BALLS":createSlider(0,1,0,1),
    
  }
  
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(60);
  for (let i = 1; i <= NUMBER_OF_BALLS; i++) {
    let temp = new Ball(
      random(WIN_WIDTH),
      random(WIN_HEIGHT),
      random(10, 40),
      random(20),
      random(20)
    );
    temp.colour = color(random(150, 255), random(150, 255), random(150, 255));
    balls[i] = temp;
  }
  fill(0);
  for(let i=0;i<SLIDERS.length;i++){
    slider=SLIDERS[i];
    slider.position(10,10+i*30);
    slider.style('width', '80px');
    //print slider label below slider


  }

}







function draw() {

  GRAVITY=SLIDERS.GRAVITY.value();
  EY=SLIDERS.EY.value();
  EX=SLIDERS.EX.value();
  COLLISION_WITH_BALLS=SLIDERS.COLLISION_WITH_BALLS.value();
  background(255);
  fill(0);
  rect(0, 0, WIN_WIDTH, WIN_HEIGHT);
  noStroke();
  for (let i = 1; i <= NUMBER_OF_BALLS; i++) {
  if(COLLISION_WITH_BALLS)
    handle_balls_collision(i)
  balls[i].handle_collision();
  balls[i].move();
  balls[i].render();
  }
  
}


function handle_balls_collision(i){
    for (let j = i; j <= NUMBER_OF_BALLS; j++) {
      if(i!=j){
      balls[i].handle_ball_collision(balls[j]);
      }
    }
}

// function keyPressed() {
  
//   if (keyCode === UP_ARROW) {
//     for (let i = 1; i <= NUMBER_OF_BALLS; i++) {
//       balls[i].vely+=random(-50,0);
//       balls[i].velx+=random(-15,15);
      
//     }
//   }

// }
function mouseClicked(){
  for (let i = 1; i <= NUMBER_OF_BALLS; i++) {
    if(GRAVITY<0){
      balls[i].vely+=random(-100,0);
      balls[i].velx+=random(-15,15);
    }
    else if(GRAVITY>0){
      balls[i].vely+=random(0,100);
      balls[i].velx+=random(-15,15);
    }
    else{
      balls[i].vely+=random(-50,50);
      balls[i].velx+=random(-15,15);
    }

  }
}
