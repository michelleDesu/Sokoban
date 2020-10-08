var player;
var container
var posX;
var posY;
var boxPosX;
var boxPosY;
var key;
var goalPosArray;
var goalConditionMetArray;
var alertIsComplete;
var stepsTaken;

function startGame(){
    
    init();
    renderMap();
}

function init(){
    goalPosArray = [];
    goalConditionMetArray = [];
    alertIsComplete = false;
    stepsTaken = 0;
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
        stepsTaken += 1;
    })
   //checks if a key is released
    window.addEventListener('keyup',function(e){
        updatePlayer();
        key = false;
       
    })

    //Add button for reloading the game
    var btn = document.getElementById("btnRestart");
    btn.innerHTML = "Restart";

    btn.addEventListener("click",reloadPage );
 
}

function renderMap(){

    clear();

    //fetches the size of the screen to be used to render out the map properly
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    
    //concatenates a string of auto to use for the gridTemplateColumns
     var numOfAuto = "";
    for(var i = 0; i < tileMap01.width; i++){
        numOfAuto += "auto ";
        
    }
    container.style.gridTemplateColumns = numOfAuto ;

    for(var i = 0; i < window.tileMap01.mapGrid.length; i++){
        for(var j = 0; j < window.tileMap01.mapGrid[i].length; j++){
            var item = document.createElement("div");
            item.className = "grid-item";

            //sets the height and width of the grid based on the size of the window
            item.style.height = innerHeight/16;
            item.style.width = innerWidth/19;
            
            if( window.tileMap01.mapGrid[i][j] == 'P'){
                item.className = "grid-item entity-player";
            }else if(isGoalPos(j, i) && window.tileMap01.mapGrid[i][j] == 'B'){
                item.className = "grid-item entity-block-goal";
                
            } else if(window.tileMap01.mapGrid[i][j] == 'B'){
                item.className = "grid-item entity-block";
            }else if(window.tileMap01.mapGrid[i][j] == 'W'){
                item.className = "grid-item tile-wall";
            }else if(window.tileMap01.mapGrid[i][j] == 'G'){
                item.className = "grid-item tile-goal";
            }else{
                item.className = "grid-Item tile-space";
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
            if(isGoalPos(posX,posY)){
                window.tileMap01.mapGrid[posY][posX] = 'G';
            }
            window.tileMap01.mapGrid[newPosY][newPosX] = 'P';
            posX = newPosX;
            posY = newPosY;
        } else{
            window.tileMap01.mapGrid[posY][posX] = 'P';
        }

        
    }else{
        window.tileMap01.mapGrid[posY][posX] = '';
        if(isGoalPos(posX,posY)){
            window.tileMap01.mapGrid[posY][posX] = 'G';
        }
        window.tileMap01.mapGrid[newPosY][newPosX] = 'P';
        posX = newPosX;
        posY = newPosY;
    }

    renderMap();

   if(checkGoalCondition() && alertIsComplete == false){
       alert("You Won!");
       alertIsComplete = true;
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



function reloadPage(){
    window.location.reload();
}