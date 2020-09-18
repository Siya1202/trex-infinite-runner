var PLAY = 1;
var END =0;
var gameState = PLAY;

var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var cloudsGroup,cloudImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score = 0;
var restart , restartImg;
var gameOver, gameOverImg;

var x=50;
var y;

function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(400,400);
  trex=createSprite(50,350,15,15);
  trex.addAnimation("running",trex_running);
  trex.scale=0.7;

  trex.addAnimation("collided",trex_collided);
  ground=createSprite(200,375,400,10);

  ground.addImage("ground",groundImage);
  ground.velocityX=-2
  ground.x=ground.width/2;
  
  
  invisibleGround=createSprite(200,390,800,20);
  invisibleGround.visible = true;
  invisibleGround.velocityX=-2;
  invisibleGround.x=invisibleGround.width/2;

  cloudsGroup = new Group();

  obstaclesGroup = new Group();

  gameOver = createSprite(300,100,15,15);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart= createSprite(displayWidth/2-40,displayHeight-80);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

}

function draw() {
  background(255);
  text("score: "+score,displayWidth/2-70,displayHeight/4);
  trex.collide(ground);
  
  if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60);
  
  if(keyDown("space")){
    trex.velocityY=-8;
  }

  trex.velocityY=trex.velocityY+0.4;
  trex.velocityX=8;

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(invisibleGround.x<150){
    invisibleGround.x=invisibleGround.width/2
  }

  spawnClouds();

  spawnObstacles();

  if (obstaclesGroup.isTouching(trex)){
    gameState=END;
  }
  }
  else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX=0;

    trex.velocityX=0;

    trex.velocityY=0;

    obstaclesGroup.setVelocityXEach(0);

    cloudsGroup.setVelocityXEach(0);

    trex.changeAnimation ("collided",trex_collided);

    obstaclesGroup.setLifetimeEach(-1);

    cloudsGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      reset();
    }
  }
  
    
  drawSprites();
 // camera.position.y=displayWidth/2;
          camera.position.x=trex.x;
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,180,10,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}

function reset () {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running) ;
  score=0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break ;
      case 2: obstacle.addImage(obstacle2);
      break ;
      case 3: obstacle.addImage(obstacle3);
      break ;
      case 4: obstacle.addImage(obstacle4);
      break ;
      case 5: obstacle.addImage(obstacle5);
      break ;
      case 6: obstacle.addImage(obstacle6);
      break ;
      default : break ;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
  }
}