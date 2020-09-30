var player;

function startGame(){
    gameArea.gameStart();
    player = new gameComponent(50,50,"charcterSprite.png", 0, 0, "image");
}


var gameArea = {
    canvas: document.createElement("canvas"),
    gameStart: function(){
        this.canvas.width = 1024;
        this.canvas.height = 1024;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);

        //checks if a key is pressed
        window.addEventListener('keydown',function(e){
            gameArea.key = e.keyCode;
            e.preventDefault();
        })
       //checks if a key is released
        window.addEventListener('keyup',function(e){
            gameArea.key = false;
           
        })
    
    },
    clear: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

function gameComponent( width, height, color, x, y, type){
    if(type == "image"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function(){
        ctx = gameArea.context;
        if(type == "image"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

   //update the players new position
   this.newPos = function(){
       this.x += this.speedX;
       this.y += this.speedY;
   }
    
}

function updateGameArea(){
    gameArea.clear();

    player.speedX = 0;
    player.speedY = 0;

    //left arrow
    if(gameArea.key && gameArea.key == 37){
        player.speedX = -1;
    }
    //right arrow
    if(gameArea.key && gameArea.key == 39){
        player.speedX = 1;
    }
    //up arrow
    if(gameArea.key && gameArea.key == 38){
        player.speedY = -1;
    }
    //down arrow
    if(gameArea.key && gameArea.key == 40){
        player.speedY = 1;
    }

    player.newPos();
    player.update();
}