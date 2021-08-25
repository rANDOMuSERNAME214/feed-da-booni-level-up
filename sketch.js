const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button
var bunny;


var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;    
var canW;
var canH;

function preload(){
  bg_img = loadImage('./assets/background.png');
  food = loadImage('./assets/melon.png');
  rabbit = loadImage('./assets/Rabbit-01.png');
  bubble = loadImage('./assets/bubble.png')
  
  cut_sound = loadSound('./assets/rope_cut.mp3');
  eating_sound = loadSound('./assets/eating_sound.mp3');
  

 
  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png" , "./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png","./assets/sad_3.png");



  blink.playing = true;
  eat.playing = true;                
  sad.playing = true;
  sad.looping= false; 
  eat.looping = false; 
}

function setup() 
{
  
  createCanvas(windowWidth,windowHeight);
  
  frameRate(80);

  

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(windowWidth/2-300,50);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(30,300);
  button2.size(50,50);
  button2.mouseClicked(drop2);
   
  
  rope = new Rope(8,{x:windowWidth/2-280,y:50});
  rope2 = new Rope(4,{x:50,y:300});
  

  blink.frameDelay = 20;
  eat.frameDelay = 20;


  bunny = createSprite(windowWidth/2-100,50,100,100);
  bunny.scale=0.3
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
 

  bubble=createSprite(windowWidth/2-100,windowHeight/2,100,100)
  bubble.addImage('bubble')

  
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  
ground=new Ground(windowWidth/2-90,153,80,10)
  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bg_img);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,100,100);
  }
  pop();

  rope.show();
  rope2.show();
  ground.show()
 
  if(collide(fruit,bunny,100)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if((fruit!=null && fruit.position.y>=windowHeight)||((fruit!=null && fruit.position.y<=0)))
  {
    bunny.changeAnimation('crying');
    //sad_sound.play();
    fruit=null;
   }

  if(collide2(fruit,bubble,100)==true)
  {
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.001})
    bubble.velocityY=-4

  }

  

  Engine.update(engine);
 

  drawSprites();

}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}


function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}



function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function collide2(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=100)
            {
              Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.001})
              bubble.velocityY=-4
               return true; 
            }
            else{
              return false;
            }
         }
}



