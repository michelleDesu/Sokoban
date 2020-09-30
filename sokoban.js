var player;
var container
var posX;
var posY;
var key;

function startGame(){
   // gameArea.gameStart();
    //player = new gameComponent(50,50,"charcterSprite.png", 0, 0, "image");
    init();
    renderMap();
}

function init(){
    container = document.createElement("div");
    container.className = "grid-container";
    document.body.insertBefore(container, document.body.childNodes[0])
    for(var i = 0; i < window.tileMap01.mapGrid.length; i++){
        for(var j = 0; j < window.tileMap01.mapGrid[i].length; j++){
        
            if(window.tileMap01.mapGrid[i][j] == 'P'){
                posX = j;
                posY = i;
            }
            
        }
       
    }

     //checks if a key is pressed
     window.addEventListener('keydown',function(e){
        key = e.keyCode;
        e.preventDefault();
    })
   //checks if a key is released
    window.addEventListener('keyup',function(e){
        updatePlayer();
        key = false;
       
    })
 
}

function renderMap(){

    clear();

     //redo this as a loop
    container.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto " ;
    for(var i = 0; i < window.tileMap01.mapGrid.length; i++){
        for(var j = 0; j < window.tileMap01.mapGrid[i].length; j++){
            var item = document.createElement("div");
            item.className = "grid-item";
            item.textContent = window.tileMap01.mapGrid[i][j];

    
            container.appendChild(item);
            
        }
       
    }

   
   
}

function clear(){
    container.innerHTML = '';
}

function updatePlayer(){
    var newPosX = posX;
    var newPosY = posY;

    
    //left arrow
    if(key && key == 37  ){
        newPosX = posX-1;
    }
    //right arrow
    if(key && key == 39 ){
       
        newPosX = posX+ 1;
    }
    //up arrow
    if(key && key == 38 ){
        newPosY = posY-1;
    }
    //down arrow
    if(key && key == 40){
        newPosY = posY+ 1;
    }

    
    if( window.tileMap01.mapGrid[newPosY][newPosX] == 'W'){
        window.tileMap01.mapGrid[posY][posX] = 'P';
    }else{
        window.tileMap01.mapGrid[posY][posX] = '';
        window.tileMap01.mapGrid[newPosY][newPosX] = 'P';
        posX = newPosX;
        posY = newPosY;
    }

   
  renderMap();
}


//move box, 
