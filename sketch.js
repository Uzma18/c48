
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var score =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var thor1, villan5, strombreaker,gameover, background, powerUp;
var thor1Img,villan5Img, villan4Img, gameoverImg, backgroundImg, powerUpImg;
var villan5Group, villan4Group;
var score = 0;

var life =20;
var score=0;
var gameState=1

var v;
var p =1100

life = 20
score = 0

function preload(){
	thor1Img = loadImage("image/thor.png")
	gameoverImg = loadImage("image/gameOver.png")
	villan4Img = loadImage("image/v3.png")
	villan5Img = loadImage("image/villan4.png")
	backgroundImg= loadImage("image/gtaGraphic.png")
	hammerImg = loadImage("image/hammer.png")
	//powerUpImg= loadImage("image/powerUp2.png")
}

function setup() {
	createCanvas(1600, 900);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	//bg= createSprite(50, width/2, 100,height);
	//bg.addImage(backgroundImg)
	//bg.scale = 50
	
	thor1= createSprite(100, height/2, 50,50);
	thor1.addImage(thor1Img)
	thor1.scale=1

	thorCheck = createSprite(100,height/2,10,100);
	thorCheck.shapeColor= "red"

	//powerUp= createSprite(100, height/2, 100,50);
	//powerUp.addImage(powerUpImg)
	//powerUp.scale=0.2

	//creating sprite for villain
	v = createSprite(1200, thor1.y, 20,20);
	v.visible = false
	vCheck = createSprite(1200, thor1.y, 10, 100)
	vCheck.shapeColor="red"
	 
	villan5Group = createGroup();   
	villan4Group = createGroup(); 

	angleMode(DEGREES)

	var options = {
		isStatic: true
	}
	hammer = Bodies.rectangle(thor1.x+150, thor1.y-0, 20,20,options);
	World.add(world, hammer)

	hammerCheck = createSprite(thor1.x+120, thor1.y-30, 8,20)
	hammerCheck.shapeColor="red"

	hammer1 = Bodies.rectangle(1200, thor1.y, 20,20,options);
	World.add(world, hammer1)

	hammer1Check = createSprite(1153, thor1.y-85, 8,20)
    hammer1Check.shapeColor="red"


  Visiblity = 0



	Engine.run(engine);
	thor1.debug = true
	
  
}

function draw() {
	background(backgroundImg);

	imageMode(CENTER);
	image(backgroundImg,800,450,width*20,900)
     
	fill("white")
	textSize(35)
	text("Score: "+score, camera.position.x-300, 100)
	text("Life: "+life, camera.position.x-300, 150)
  
	count =1
	  
  
       camera.position.x = thor1.x 
	  //camera.position.y = thor1.y

      // console.log(thor1.x)

	  thorCheck.x = thor1.x+50;
	  thorCheck.y = thor1.y

	   

	   if(keyDown("d")){
		   thor1.x += 20;
		 }
		 if(keyDown("a")){
			thor1.x -= 20;
		}
		if(keyDown("w") ){
			thor1.y -= 20;
		}
	    if(keyDown("s")){
			thor1.y += 20;
		}
		if(keyDown("space") && thor1.y >= 159) {
			thor1.velocityY = -12;
		  }
      if(thor1.x===p+600){
		  p = p +1000
	  }
     
      if(thor1.x===p){
		  v.x = p+150
		  vCheck.x = v.x
		  v.addImage(villan4Img)
		  v.scale = 0.3;
		  v.debug = true
		  v.visible = true
		  //console.log(v.x)
           
		  
		  
		  hammer1.position.x = p+200
		  Visiblity = 255
		 
                
		           
	  }

	 

     

			//console.log(hammer.position.x);
			//	console.log(v.x)

	  drawSprites();

     			 // moving hammer of thor
				push()
				translate(hammer.position.x+15, hammer.position.y-15);
				rotate(hammer.angle);
				imageMode(CENTER);
				image(hammerImg, 0,0,100,100)
				pop();

				hammer.position.x = thor1.x+100
				hammer.position.y = thor1.y

				hammerCheck.x = hammer.position.x+20
				//hammerCheck.y = hammer.position.y-30


				//Matter.Body.setStatic(hammer1, true)
                
	  			//moving hammer of villain
				push()
				translate(hammer1.position.x-100, hammer1.position.y-60);
				rotate(hammer1.angle);
				imageMode(CENTER);
				tint(255, Visiblity)
				image(hammerImg, 0,0,100,100)
				pop();
				
                 hammer1Check.x = hammer1.position.x-140
				 //hammer1Check.y = hammer1.y-85

				

				//console.log(hammer1)

				fight()

	   
  }


  function spawnVillan(){
	  if(frameCount % 200 === 0) {
		var villan4 = createSprite(600,120,40,10);
        villan4.y = thor1.y;
		villan4.addImage(villan4Img);
		villan4.scale = 0.3;
		villan4.valocityX = -4;
		villan4Group.add(villan4)
	  }
  }

  function getVillain(){

  }

  function fight(){
           
	     //moving thor's hammer
			if(keyDown(RIGHT_ARROW) && hammer.angle<=80){
				hammer.angle += 5
				hammer.position.y +=3

				hammerCheck.rotation = hammer.angle + 6
				hammerCheck.y +=2
				hammerCheck.x += 9
			
					
			}

			if(keyDown(LEFT_ARROW) && hammer.angle>=0){
			hammer.angle -= 5
			hammer.position.y -=2

			hammerCheck.rotation = hammer.angle - 5
				hammerCheck.y -=2
				hammerCheck.x -= 2
		}

         //moving villain's hammer
		if(keyDown(RIGHT_ARROW) && hammer1.angle>=-185){
			hammer1.angle -=5
			//hammer1.position.x -=0.5
			//console.log(hammer1.angle)

			hammer1Check.rotation = hammer.angle - 6
			hammer1Check.y +=1
			//hammer1Check.x += 9


		}


		if(keyDown(LEFT_ARROW) && hammer1.angle<=-45){
			hammer1.angle += 5
			//console.log(hammer1.angle)
			hammer1Check.rotation = hammer.angle + 6
			hammer1Check.y -=1
				
		}

		//destroying villain
		if(hammerCheck.isTouching(vCheck) && v.visible === true){
		//console.log(hammer.position.x);
		//console.log(v.x)
		v.visible = false

		Visiblity = 0
		console.log(Visiblity)
		score = score + 1

		}

		//destroying thor
		if(hammer1Check.isTouching(thorCheck) && v.visible === true && Visiblity ===255 ){



		life = life-1
		thor1.x = thor1.x +200
		v.visible = false
		Visiblity = 0

		}



	
  }