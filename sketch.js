var bananaimage,obstacleimage,obstaclegroup,bananaGroup,monkey_running,
    background,invisibleGround;

var PLAY=1;
var END =0;
var GameState=PLAY;

var score=0;

function preload(){
    bananaimage=loadImage("banana.png");
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
backimage=loadImage("jungle.jpg");
  obstacleimage=loadImage("obstacle.png");
}


function setup() {
  createCanvas(600,300);
  ground = createSprite(200,280,400,400);
 ground.addImage(backimage);
  ground.scale=2;
  ground.x = ground.width /2;
  
  monkey = createSprite(50,250,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.10;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  bananaGroup = new Group();
  obstaclegroup = new Group();
  
   invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
 
}

function draw(){
 
  stroke("white");
  textSize(20);
  fill("red");
  if(GameState===PLAY){
  //score = score + Math.round(getFrameRate()/60);
    if(bananaGroup.isTouching(monkey)){
      score=score+2;
      bananaGroup.destroyEach();
    }
   ground.velocityX=-3;
  if(keyDown("space")&& (monkey.y>=219)) {
    monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    switch(score){
      case 10: monkey.scale=0.12;
        break;
        case 20:monkey.scale=0.14;
        break;
        case 30:monkey.scale=0.16;
        break;
        case 40:monkey.scale=0.20;
        break;
        default:
        break
    }
      
  
  monkey.collide(invisibleGround);
  spawnBanana();
  spawnObstacles();
    
    if (obstaclegroup.isTouching(monkey)){
    GameState=END;
    text("GAME OVER",300,150);
    text("PRESS SPACE TO RESTART",300,200);
  }
 
  }else if (GameState===END){
  
   
    monkey.velocityY=0;
    monkey.scale=0.1;
    obstaclegroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
 ground.velocityX=0;
    obstaclegroup.destroyEach();
    bananaGroup.destroyEach();
    if(keyDown("space")){
      reset();
    }
  } 
  
  
  drawSprites();
 text("Score: "+ score, 500,50);
  stroke("white");
  textSize(20);
  fill("red");
  if(GameState===END){
 text("GAME OVER",200,150);
  text("PRESS SPACE TO RESTART",150,200);
  }
}
function reset(){
  GameState= PLAY ;
  
  
  monkey.changeAnimation("running",monkey_running);
  score=0;
}
function spawnBanana() {

  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(150,210));
    banana.addImage(bananaimage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,270,10,40);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleimage);
              
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}
