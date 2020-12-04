//creating global variables 
var monkey, monkeyanimation
var banana, bananaImage, rock, obstacleImage
//creating groups
var foodGroup, obstacleGroup
//creating score
var score=0;
var survivalTime = 0;
var gameState = "play"
//loading images and animations
function preload() {
  monkeyanimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaimage = loadImage("banana.png");
  jungleimage = loadImage("jungle.jpg");
  rockimage = loadImage("stone.png");
  gameover=loadImage("download.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // jungle = createSprite(0, 0);
  // jungle.addImage(jungleimage);
  // jungle.scale = 1;
  // jungle.x = jungle.width / 2;

  monkey = createSprite(50, 50);
  monkey.scale = 0.15;
  monkey.addAnimation("running", monkeyanimation);
  monkey.velocityX=4;
  
  invisibleground = createSprite(400,windowHeight/2+200,windowWidth, 10);
  // invisibleground.visible = false;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  // monkey.debug=true;
}

function draw() {
  background("lightgreen")
  // jungle.y=camera.y;
  monkey.collide(invisibleground);
  invisibleground.x=camera.x
  camera.x=monkey.x;
  camera.y=200;
  if (gameState=="play"){
  // if (jungle.x<camera.position.x) {
  // jungle.x = jungle.width / 2
  // }
  if (keyDown("space") && monkey.y>windowHeight/2) {
    monkey.velocityY = -12;
  }
  monkey.velocityY += 0.8;
  food();
  obstacle();
  // jungle.velocityX =-(4 + 3 * survivalTime / 100)
  if (monkey.isTouching(FoodGroup)&&monkey.scale<0.5) {
    FoodGroup.destroyEach();
    score += 1
    monkey.scale += 0.02;
  }
  if (monkey.isTouching(obstacleGroup)&&monkey .scale>0.005) {
    monkey.scale = monkey.scale - 0.01;
  }
  if (monkey.scale<0.005) {
    gameState = "end";
  }
    survivalTime = Math.ceil(frameCount / frameRate())
    stroke("white");
  textSize(20);
  fill("blue")
  text("SurvivalTime:" + survivalTime,camera.x,windowHeight/2-400)
  stroke("red");
  textSize(20);
  fill("blue")
  text("Score:" + score,camera.x,windowHeight/2-350)
  stroke("red");
  textSize(20);
  fill("blue")
  text("if you see the banana is just goes off when the monkey touches it due you went out of limit of monkey growth",windowWidth/2-100,windowHeight/2-100)
  }
  if (gameState=="end"){
    monkey.velocity=0
    // jungle.velocity=0
    // FoodGroup.setLifetimeEach(-1);
    // obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    survivalTime=0;
    score=0
    monkey.destroy();
    background(gameover);
    keyPressed();
  }
  drawSprites();
  // console.log(monkey.scale);
}

function food() {
  if (frameCount % 100 == 0) {
    //creating banana sprite and adding image to it
    banana = createSprite(camera.x+displayWidth/2,windowHeight/2+(Math.round(random(-10,10))));
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -(4 + 3 * survivalTime / 100);
    banana.lifetime = 300;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth += 1;
  }
}
//creating my own function of obstracles
function obstacle() {
  if (frameCount % 150 === 0) {
    //creating obstracle sprite and adding image to it
    rock = createSprite(camera.x+displayWidth/2,windowHeight/2+160);
    rock.addImage(rockimage);
    rock.scale = 0.2;
    rock.velocityX = -(4 + 3 * survivalTime / 100);
    rock.lifetime = 300;
    obstacleGroup.add(rock);
  }
}
function keyPressed(){
  if(keyCode==32){
    gameState="play";
  }
}