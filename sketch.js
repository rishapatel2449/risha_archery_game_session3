var splashScreen
var playbutton
var gameState="wait"
var bg
var player
var player_img
var board
var board_img
var arrow, arrow_img, arrowGroup;
var numberOfArrows=10;
var score=0;

function preload(){
splashScreen=loadImage("assets/splash.gif")
bg=loadImage("assets/archery_bg.jpeg")
player_img=loadImage("assets/archer.png")
board_img=loadImage("assets/board_2_img.png")
arrow_img = loadImage("assets/arrow.png")
}

function setup(){
createCanvas(windowWidth,windowHeight)

playbutton = createImg("assets/play_button.png");
    playbutton.position(650, 300);
    playbutton.size(350, 350);
    playbutton.hide();

   aboutbutton = createImg("assets/About_button.png");
   aboutbutton.position(450, 300);
   aboutbutton.size(350, 350);
   aboutbutton.hide();

   player = createSprite(400, 500);
   player.addImage("main", player_img);
   player.scale=0.7;
   player.visible = false;

   board = createSprite(1300, 500);
   board.addImage("board", board_img);
   board.scale=0.7;
   board.visible = false;

   arrowGroup = new Group();
}

function draw(){
    if (gameState=="wait"){
        background(splashScreen);
        playbutton.show();
        aboutbutton.show();

        aboutbutton.mousePressed(() => {
            playbutton.hide();
            aboutbutton.hide();
            gameState = "about";
    
        })
    }

        if (gameState == "about") {
            aboutgame();
        }
        playbutton.mousePressed(() => {
            aboutbutton.hide();
            playbutton.hide();
            gameState = "play";
    
        })

        if (gameState=="play"){
            background(bg);
            player.visible = true;
            board.visible = true;

        }
    

drawSprites();

if (gameState == "play") {
    fill(255);
    textSize(25);
    text("SCORE: " + score, 50, 50);

    fill("#FFFF");
    textAlign("center");
    textSize(30);
    text("Remaining Arrows : " + numberOfArrows, 200, 100);



}
}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Play an archery game.Click spacebar to release the arrow",
        textAlign: "center",
        imageUrl: "assets/splash.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Play",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }

    )


}

function spawnArrows() {

    arrow = createSprite(player.x + 10,440, 20, 20);
    arrow.addImage(arrow_img);
    arrow.scale = 0.2;
    arrow.velocityX = 10;

    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    arrowGroup.add(arrow);


}

function keyReleased() {
    if (keyCode === 32) {
        if (numberOfArrows > 0) {
            spawnArrows();
            numberOfArrows -= 1;
        }
    }
}