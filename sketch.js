var marioImg,bgImage,brickImg,checkPointsound;                                            
var collided,dieSound,gameOverImg,groundImg;                                      
var ground , mario , jump,obstacleGroup,brickGroup;                                                        
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


function preload(){
  bgImg       = loadImage("bg.png");
  brickImg    = loadImage("brick.png");
  groundImg   = loadImage("ground2.png");
  marioImg    = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");        
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  jump        = loadSound("jump.mp3");
  die         = loadSound("die.mp3");
  collided    = loadAnimation("collided.png");
  restartImg  = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");                                                         
}

function setup(){
 canvas = createCanvas(1200,600);
 ground = createSprite(600,520,1200,20);
 ground.addImage("ground",groundImg);
 ground.scale= 2;
 ground.velocityX = -3; 
 mario = createSprite(200,440,20,20);
 mario.addAnimation("mario",marioImg);
 mario.addAnimation("collided",collided);
 mario.scale = 2;
 mario.setCollider("circle",0,0,8);
 mario.debug = true;
 obstacleGroup = new Group();
 brickGroup = new Group();
 restart = createSprite(600,300,20,50);
 restart.addAnimation("restart",restartImg);
 restart.visible = false;
 gameOver= createSprite(600,200,20,50);
 gameOver.addAnimation("gameOver",gameOverImg);
 gameOver.visible = false;
}    
function draw(){
   background(bgImg);
   drawSprites();  
   mario.collide(ground);
   
   if(gameState === PLAY){
       fill("black")
       textSize(30);
       textFont("jokerman")
       text("score"+ score , 1000,100)
   if(ground.x<0){
       ground.x=ground.width/2;                                        
   }                                                                  
   if(keyDown("Space")&&mario.y>400){
       mario.velocityY = -17; 
       jump.play();
       
   }
   
   mario.velocityY = mario.velocityY + 1
   for(var i = 0; i<brickGroup.length;i++){
   if(brickGroup.get(i).isTouching(mario)){
     brickGroup.get(i).remove();
     score =  score + 1 ;
     
   }

   }
   spawnObstacles();
   spawnBricks();
   if(obstacleGroup.isTouching(mario)){
    gameState = END
    die.play();

  }
} 
  else if(gameState === END){
    obstacleGroup.setVelocityXEach= 0;
    brickGroup.setVelocityXEach = 0;
    ground.velocityX = 0;
    mario.velocityY = 0;
    mario.changeAnimation("collided",collided);
    restart.visible = true;
    gameOver.visible = true;
               
  }
  if(mousePressedOver(restart)){
    gameState = PLAY;
    restart.visible = false;
    gameOver.visible = false;
    obstacleGroup.destroyEach();
    brickGroup.destroyEach();
    mario.changeAnimation("mario",marioImg);
    ground.velocityX = -3;
    score = 0;
  }
  
       
          
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(1100,405,10,40);
    obstacle.velocityX = -6;
    obstacle.addAnimation("obstacle",obstacleImg);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
 
  }
}
function spawnBricks() {
  if(World.frameCount % 70 === 0) {
    var brick = createSprite(random(370,430),random(275,305),10,40);
    brick.velocityX = -6;
    brick.addImage("collectigthign",brickImg);
    //assign scale and lifetime to the obstacle           
    brick.scale = 1.5;
    brick.lifetime = 70;
    //add each obstacle to the group
    brickGroup.add(brick);
 
  }
}


