var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,monkey_is_running;
var monkey_collided;

var ground;

var bananaGroup,banana_image;

var obstaclesGroup,obstacle_image;

var score

function preload(){
monkey_is_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
 
banana_image = loadImage("banana.png");

obstacle_image = loadImage("obstacle.png");  
  
monkey_collided = loadAnimation("sprite_0.png");  
}

function setup(){
createCanvas(600,600);
  
    monkey = createSprite(30,318,1,1);
    monkey.addAnimation("isrunning",monkey_is_running);     monkey.scale = 0.1;  

  ground = createSprite(0,350,1100,10);  
  ground.velocityX = -3;
  ground.x = ground.width /2;  
  
      obstaclesGroup = createGroup();
      bananaGroup = createGroup();

score = 0;
} 


function draw(){
background ("white");

text("Survival Time: "+ score, 400,50);  
  
  if(gameState === PLAY){
  
  // for spawning obstacles  
  spawn_obstacle();
    
  //for spawning  bananas 
  spawn_bananas(); 
    
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    } 
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    score = score + Math.round(getFrameRate()/60);
  
  
      if (ground.x < 0){
      ground.x = ground.width/2;
      }
       // to stop monkey from falling down     
        monkey.collide(ground);
    
              if (monkey.isTouching(obstaclesGroup)){
              gameState = END;  
      
              }  
  }
  
      if(gameState === END){
      
    monkey.changeAnimation("sprite",monkey_collided);  
        
      // to stop the ground
      ground.velocityX = 0;  
      
      //to stop the sprites from disappearing  
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);  
      
      //to stop the obstacles and food  
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);    
  
     //reset();
      
      }  
drawSprites();
}

function spawn_obstacle(){
      if(frameCount % 300 === 0){
      var obstacle = createSprite(600,330,1,1);
      obstacle.addImage(obstacle_image);
      obstacle.velocityX = -3;  
      obstacle.scale = 0.1;
      obstacle.lifetime = 200;  
      obstaclesGroup.add(obstacle);
      }  
} 

function spawn_bananas(){
        if(frameCount % 80 === 0){
        var banana = createSprite(600,200,1,1);
        banana.y = Math.round(random(120,200));  
        banana.addImage(banana_image);
        banana.lifetime = 200;
        banana.velocityX = -3; 
        banana.scale = 0.1;
        bananaGroup.add(banana);  
        }    
}

//function reset(){
//gameState = PLAY;
//obstaclesGroup.destroyEach();
//bananaGroup.destroyEach();    
//score = 0;  
//}