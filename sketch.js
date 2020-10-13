
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground,bananagroup,obstaclegroup
var score,score=0,survivaltime=0;

function preload(){
  
  
 
   bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(550, 500);
  
  ground=createSprite(150,440,600,20);
  ground.velocityX=-5
    ground.x = ground.width /2;
  
obstaclegroup = new Group;
  bananagroup=new Group;
  
  monkey=createSprite(60,380,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.16;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
}


function draw() {
  
  background(180);
drawSprites();

   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  spawnObstacles();
  spawnBananas();
  monkey.collide(ground);
 
  
  if(keyDown("space")&& monkey.y >= 380) {
        monkey.velocityY = -20;
    }
     monkey.velocityY = monkey.velocityY +0.8;
  
  if(monkey.isTouching(bananagroup)){
    bananagroup.destroyEach();
    score=score+1;
                  
  }
  
  if(monkey.isTouching(obstaclegroup)){
     ground.velocityX = 0;
    monkey.velocityY = 0;                           obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
     obstaclegroup.setVelocityXEach(0);
     bananagroup.setVelocityXEach(0);  
  }
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,400,50)
  
  stroke("black");
  textSize(20);
  fill("black");
   survivaltime = survivaltime+Math.round(getFrameRate()/60);
  text("Survival Time:"+Math.round(survivaltime),50,50);
 
}

function spawnObstacles(){
   if (frameCount % 300 === 0) {
  var obstacle = createSprite(600,390,40,10);
  
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.collide(ground);
    
    obstacle.lifetime = 200;
    
    obstaclegroup.add(obstacle);
   }
 
}

function spawnBananas(){
   if (frameCount % 200 === 0) {
  var banana = createSprite(600,200,40,10);
  
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.y = Math.round(random(120,200));
    
    banana.lifetime = 200;
  bananagroup.add(banana);
    
   }
 
}





