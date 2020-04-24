var cellSize; // Cell is a square and this variable specify size of the square
var cells = []; // The variable stores all cells
var borderColor; // Specify color of border of maze
var visitedColor;
var unvisitedColor;
var checkingBorderColor;
var unvisitedBorderColor;
var cellCountRow;
var cellCountColumn;
var currentWall;
var intervalTime; // This is the interval of update function which we call every interval time
var canvas;
var ctx;
var canvasWidth;
var allNodes = [];
var canvasHeight;
var nodes = [];
var walls = [];
var index;

function setup() {
    document.body.innerHTML = `<canvas id="myCanvas" width="${canvasWidth}" height="${canvasHeight}"></canvas>`;
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    cellCountRow = canvasWidth / cellSize;
    cellCountColumn = canvasHeight / cellSize;

    for (var i = 0; i < cellCountColumn; i++) {
        for (var j = 0; j < cellCountRow; j++) {
            if (i != 0) walls.push(new Wall(new Point(j * cellSize, i * cellSize), new Point(j * cellSize + cellSize, i * cellSize)));
            if (j != 0) walls.push(new Wall(new Point(j * cellSize, i * cellSize), new Point(j * cellSize, i * cellSize + cellSize)));
            cells.push(new Cell(new Point(j * cellSize, i * cellSize)));
        }
    }

    cells.forEach(cell => cell.show());
    walls.forEach(wall => wall.show());

    walls = shuffle(walls);
    setInterval(draw, intervalTime);
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initAllVariableAndSetup() {
    index = 0;
    unvisitedBorderColor = '#543864';
    checkingBorderColor = '#ff6363';
    visitedBorderColor = '#ff6363';
    visitedColor = '#ffbd69';
    unvisitedColor = '#202040';
    cellSize = 50;
    canvasWidth = document.getElementById('map-width').value;
    canvasHeight = document.getElementById('map-height').value;
    intervalTime = document.getElementById('interval-time').value;
    setup();
}
