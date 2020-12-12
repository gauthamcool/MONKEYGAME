var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime = 0;
var score = 0;
var monkey , monkey_running, monkeyCollideImage;
var bananaImage, obstacleImage, ground, groundImage, invisibleGround;
var foodGroup, obstacleGroup;
var score;

function preload(){
  groundImage = loadImage("ground.png");
  
  monkey_running =            loadAnimation("sprite0.png","sprite1.png","sprite2.png","sprite3.png","sprite4.png","sprite5.png","sprite6.png","sprite7.png","sprite8.png");
  
  monkeyCollideImage = loadAnimation("sprite2.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 400);
 
  ground = createSprite(250, 360, 500, 50);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(250, 380, 500, 50);
  invisibleGround.visible = false;
  
  monkey = createSprite(40, 320, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collide",monkeyCollideImage);
  monkey.scale = 0.1;
  monkey.velocityY = 3;
  

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  monkey.collide(invisibleGround);
  
  if (gameState === PLAY){
   stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survivalTime: " + survivalTime, 100, 50);
    
  if (keyDown("space") && monkey.y >=  310){
    monkey.velocityY = -12;
  }
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
  }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      
      monkey.changeAnimation("collide",monkeyCollideImage);
    }
  } else if (gameState === END){
  
    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    
  
  }
  monkey.velocityY = monkey.velocityY +0.5;
  
  if (ground.x < 250){
    ground.x = ground.width/2;
  }
  
  banana();
  obstacles();
  drawSprites();
}

function banana(){
  if (frameCount % 80 === 0){
    var banana = createSprite(500, 150, 10, 10);
    banana.y = Math.round(random(150 , 220));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 130;
     
    foodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(500, 320, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacle.setCollider("circle", 0, 0, 150);
    obstacleGroup.add(obstacle);
  }
}