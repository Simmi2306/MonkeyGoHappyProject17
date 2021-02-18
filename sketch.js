var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running
var banana ,bananaImage;
var obstacle,obstacleImage
var foodGroup, obstacleGroup

var score=0;
var survivalTime =0;

var invisibleGround;
var forest,forest_image;
var gameOver,reset;
var gameOverImg,resetImg;
var jumpSound,endSound,eatSound;


function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forest_image=loadImage("ground image 4.jpg")
  gameOverImg=loadImage("game over.png");
  resetImg=loadImage("reset1.jpg");
  jumpSound=loadSound("salamisound-8739576-sfx-jump-1-game-computer.mp3");
  endSound=loadSound("End_Fx-Mike_Devils-724852498.mp3");
  eatSound=loadSound("End_Fx-Mike_Devils-724852498.mp3");
  
}

function setup() {
  createCanvas(600,400);
  
  forest=createSprite(0,0,600,400);
  forest.addImage("fullForest",forest_image);
  forest.x=forest.width/2;
  forest.scale=1.5;
  
  monkey=createSprite(50,330,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  invisibleGround=createSprite(300,370,600,20);
  invisibleGround.visible=false;
  
  gameOver=createSprite(300,180);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.2;
  
  reset=createSprite(300,310);
  reset.addImage(resetImg);
  reset.scale=0.2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score=0;
  survivalTime=0;

  edges = createEdgeSprites();
}

function draw() {
  background("lightGreen");
  
  forest.velocityX = -(4+3*score/100);
  if (forest.x < 0) {
      forest.x = forest.width/2;
}
  
  textSize(20);
  fill("purple");
  textFont("Arial black");
  
  
  if(gameState===PLAY){
    
    gameOver.visible=false;
    reset.visible=false;
    
    if(keyDown("space")){
    monkey.velocityY=-10;
    jumpSound.play();
    
    }
    monkey.velocityY=monkey.velocityY+0.5;
    
    bananas();
    obstacles();
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    if(foodGroup.isTouching(monkey)){
      score=score+1;
      eatSound.play();
    }
    
    
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      endSound.play();
    }
    
  }
  else if(gameState===END){
    
    gameOver.visible=true;
    reset.visible=true;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);    
    
    
    forest.velocityX=0;
    monkey.velocityY=0;
  }
  
  if(mousePressedOver(reset)){
    restart();
  }
  
  monkey.collide(invisibleGround);
  
  
  
  drawSprites();
  text("Energy Receved per Banana: "+score,250,60);
  text("Survival Time: "+survivalTime,250,90);
  text("Monkey Runner Game",80,30);
  
}

function bananas(){
  
  if(frameCount%100===0){
    var banana=createSprite(600,300,40,100);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(50,200));
    banana.velocityX=-3;
    banana.lifetime=250;
    banana.scale=0.1;
    banana.setCollider("rectangle",0,0,100,50);
    banana.debug = false;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    foodGroup.add(banana);
    
  }
}

function obstacles() {
  
  if (frameCount % 150 === 0) {
    obstacle = createSprite(600,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.y=Math.round(random(310,340));
    obstacle.velocityX = -3;
    obstacle.lifetime =250;
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle",0,0,500,500);
    obstacle.debug = false;
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    obstacleGroup.add(obstacle);
    
  }
}

function restart(){
  
  gameState=PLAY; 
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score=0;
  survivalTime=0;
}

// #Monkey Runner Game by Me 

