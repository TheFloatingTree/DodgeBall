//MOUSE GAME THING
//~260 lines of code
//Jacob Perry

//Global Variables
var globs = [];

//get HTML element
const elem = document.getElementById('content');

//setup and start Two.js
const params = { width: canvas.w, height: canvas.h };
const two = new Two(params).appendTo(elem);

//create body background
let background = two.makeRectangle( canvas.w / 2, canvas.h / 2, canvas.w, canvas.h );
background.fill = 'white';
background.noStroke();

//LAYERS

var layerThree = two.makeGroup();
var layerTwo = two.makeGroup();
var layerOne = two.makeGroup();

//OBJECTS

var cursor = new Cursor();
var scoreText = two.makeText("Score", canvas.x, canvas.y);
scoreText.size = 50;
scoreText.fill = "grey";

layerThree.add(scoreText);

//GAME

startGame();

//Update
two.bind('update', function(frameCount) {
    //UPDATES
    cursor.update();
    for (let i = 0; i < globs.length; i++) {
        globs[i].update();
    }

    scoreText.value = cursor.score;

    if(two.frameCount % 35 === 0) {
        globs.push(new Glob());
    }

    if(two.frameCount % 200 === 0) {
        globs.push(new Glob(random(5, 10)));
    }
    
}).play();