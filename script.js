var runStart = 0;
function keyCheck(event) {
    //Enter Key
    if (event.which == 13) {
        if (runWorkerId == 0) {
            createBlockId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlocks, 100);
            runWorkerId = setInterval(run, 100);
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground, 100);
            ScoreWorkerId = setInterval(updateScore, 100);
        }
    }

    //Space Key
    if (event.which == 32) {
        if(runStart == 1){
           if(jumpWorkerId == 0){
              clearInterval(runWorkerId);
              runSound.pause();

              jumpWorkerId = setInterval(jump, 100);
              jumpSound.play();
            }
        }
    }
}
function startGame() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("background").style.display = "block";
    document.getElementById("score").innerHTML = "0";
    document.getElementById("gameOver").style.visibility = "hidden";

    // Add event listener to document for key check
    document.addEventListener("keyup", keyCheck);
}

//Create Block
var blockMarginLeft = 1000;
var createBlockId = 0;
var blockId = 1;
function createBlock(){
    var block = document.createElement("div");
    block.className = "block";

    block.id = "block"+blockId;
    blockId++;

    var gap = Math.random()*(1000-400)+400;
    blockMarginLeft = blockMarginLeft+gap;

    block.style.marginLeft = blockMarginLeft+"px";

    document.getElementById("background").appendChild(block);
}


//Move Blocks
var moveBlockId = 0;
function moveBlocks(){
    for(var i = 1; i<=blockId;i++){
       var currentBlock = document.getElementById("block"+i);
       var currentMargineLeft = currentBlock.style.marginLeft;
       var newMargineLeft = parseInt(currentMargineLeft)-20;
       currentBlock.style.marginLeft = newMargineLeft +"px";

       if(newMargineLeft<=131){
          if(newMargineLeft>=31){
              if(knightMarginTop<=370){
                 if(kinghtMarginTop>310){
                     clearInterval(runWorkerId);
                     runSound.pause();
                     clearInterval(jumpWorkerId);
                     jumpWorkerId = 1;
                     clearInterval(backgroundWorkerId);
                     clearInterval(scoreWorkerId);
                     clearInterval(createBlockId);
                     clearInterval(moveBlockId);


                    deadWorkerId = setInterval(dead, 100);
                    deadSound.play();

                   }
               }
           }
       }

    }
}

var runSound = new Audio("run.mp3");
runSound.loop = true;
//Run Function
var knight = document.getElementById("knight");
var runImageNumber = 1;
var runWorkerId = 0;
function run() {
    runImageNumber++;
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    knight.src = "image/Run ("+runImageNumber+").png";
}

var jumpSound = new Audio("jump.mp3")
//Jump Function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var knightMarginTop = 500;
function jump(){
    jumpImageNumber++;
    if(jumpImageNumber<=7){
        knightMarginTop = knightMarginTop - 30;
        knight.style.marginTop = knightMarginTop+"px";
    }
    if(jumpImageNumber>=8){
        knightMarginTop = knightMarginTop + 30;
        knight.style.marginTop = knightMarginTop+"px";
    }
    if(jumpImageNumber==13){
        jumpImageNumber=1;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    knight.src = "Jump ("+jumpImageNumber+").png";
}

//Move Background
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){
    backgroundX = backgroundX-20;
    background.style.backgroundPositionX = backgroundX+"px";
}

//Update Score
var score = document.getElementById("score");
var newScore = 0;
var backgroundWorkerId = 0;
function updateScore(){
    newScore++;
    score.innerHTML = newScore;
}  

var deadSound = new Audio("dead.mp3");
//Dead Function
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead(){
    deadImageNumber++;
    if(deadImageNumber == 11){
        deadImageNumber = 0;

        knight.style.marginTop = "600px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }
    knight.src = "image/Dead ("+deadImageNumber+").png";
}

//Restart

function re(){
    location.reload();
}

    

