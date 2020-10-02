var player;
var container
var posX;
var posY;
var boxPosX;
var boxPosY;
var key;
var goalPosArray = [];
var goalConditionMetArray = [];

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

            if(window.tileMap01.mapGrid[i][j] == 'G'){
                var goalPosItem = {}
                goalPosItem.x = j;
                goalPosItem.y = i;
                goalPosArray.push(goalPosItem);
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

     //redo this as a loop!!!!!!!!!!!!!!!!!!!!!!!!!
    container.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto " ;
    for(var i = 0; i < window.tileMap01.mapGrid.length; i++){
        for(var j = 0; j < window.tileMap01.mapGrid[i].length; j++){
            var item = document.createElement("div");
            item.className = "grid-item";
            

            if( window.tileMap01.mapGrid[i][j] == 'P'){
                item.className = "grid-item entity-player";
            }else if(isGoalPos(j, i) && window.tileMap01.mapGrid[i][j] == 'B'){
                item.className = "grid-item entity-block-goal";
                
            } else if(window.tileMap01.mapGrid[i][j] == 'B'){
                item.className = "grid-item entity-block";
            }else if(window.tileMap01.mapGrid[i][j] == 'W'){
                item.className = "grid-item tile-wall";
            }else{
                item.textContent = window.tileMap01.mapGrid[i][j];
            }
    
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
    var newBoxPosX;
    var newBoxPosY;

    
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
    }else if(window.tileMap01.mapGrid[newPosY][newPosX] == 'B'){
        if(updateBox(newPosX, newPosY) ){
           
            window.tileMap01.mapGrid[posY][posX] = '';
            window.tileMap01.mapGrid[newPosY][newPosX] = 'P';
            posX = newPosX;
            posY = newPosY;
        } else{
            window.tileMap01.mapGrid[posY][posX] = 'P';
        }

        
    }else{
        window.tileMap01.mapGrid[posY][posX] = '';
        window.tileMap01.mapGrid[newPosY][newPosX] = 'P';
        posX = newPosX;
        posY = newPosY;
    }

    renderMap();

   if(checkGoalCondition()){
       alert("You Won!");
   }
 
}


//move box, 
function updateBox( boxPosX, boxPosY){
    var newBoxPosX = boxPosX;
    var newBoxPosY = boxPosY;

     //left arrow
     if(key && key == 37  ){
        newBoxPosX = boxPosX-1;
    }
    //right arrow
    if(key && key == 39 ){
       
        newBoxPosX = boxPosX+ 1;
    }
    //up arrow
    if(key && key == 38 ){
        newBoxPosY = boxPosY-1;
    }
    //down arrow
    if(key && key == 40){
        newBoxPosY = boxPosY+ 1;
    }
    if(window.tileMap01.mapGrid[newBoxPosY][newBoxPosX] == 'W' || window.tileMap01.mapGrid[newBoxPosY][newBoxPosX] == 'B'){
        return false;
    } else{
        window.tileMap01.mapGrid[boxPosY][boxPosX] = '';
        window.tileMap01.mapGrid[newBoxPosY][newBoxPosX] = 'B';
        boxPosX = newBoxPosX;
        boxPosY = newBoxPosY;
        
       return true;
    }
   
}


function checkGoalCondition(){

    goalConditionMetArray = [];

    for(var i = 0; i < goalPosArray.length; i++){
        var goalPosItem = goalPosArray[i];
        if(window.tileMap01.mapGrid[goalPosItem.y][goalPosItem.x] == 'B'){
            goalConditionMetArray.push(true);

            if(goalConditionMetArray.length == goalPosArray.length){
                return true;
            }
        } else{
            return false;
        }
    }
    return false;
}

function isGoalPos(posX, posY){
    for(var i = 0; i <goalPosArray.length; i++){
        if(goalPosArray[i].x == posX && goalPosArray[i].y == posY){
            return true;
        }
    }
    return false;
}