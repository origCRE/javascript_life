var rows = 24;
var cols = 24;
var playing = false;

var grid = new Array(rows);
var nextGrid = new Array(rows);

function initializeGrids() {                 // create two 24x24 grids
	for (var i = 0; i < rows; i++) {
		grid[i] = new Array(cols);
		nextGrid[i] = new Array(cols);
	}
}
function resetGrids(){
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++) {
			grid[i][j] = 0;
			nextGrid[i][j] = 0;
		}
	}
}

//initialize
function initialize() {
	createTable();
	initializeGrids();
	resetGrids();
	setupControlButtons();
}

// lay out the board
function createTable() {
	var gridContainer = document.getElementById("gridContainer");
	if (!gridContainer) {
		// throw error
		console.error("Problem: no div for the grid table!");
	}
	var table = document.createElement("table");

	for (var i = 0; i < rows; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < cols; j++) {
			var cell = document.createElement("td");
			cell.setAttribute("id", i + "_" + j);
			cell.setAttribute("class", "dead");
			cell.onclick = cellClickHandler;         //adding a clickhandler to each cell...
			tr.appendChild(cell);
		}
		table.appendChild(tr);
	}
	gridContainer.appendChild(table);
}
function cellClickHandler() {                     //this function is assigned to each cell upon creation
	var rowCol = this.id.split("_");
	var row = rowCol[0];
	var col = rowCol[1];

	var classes = this.getAttribute("class");     //using "this" tells us the cell is the one currently clicked on
	if (classes.indexOf("live") > -1){           //if indexOf the live or dead class is empty the val will be "-1"
		this.setAttribute("class", "dead");
		grid[row][col] = 0;
    } else {
    	this.setAttribute("class", "live");
    	grid[row][col] = 1;
    }
}

function setupControlButtons() {
	// button to start
	var startButton = document.getElementById("start");
	startButton.onclick = startButtonHandler;

	// button to clear
	var clearButton = document.getElementById("clear");
	clearButton.onclick = clearButtonHandler;
}

// clear the grid
function clearButtonHandler() {
	console.log("Clear the game: stop playing, clear the grid");
	playing = false;
	var startButton = document.getElementById("start");
	startButton.innerHTML = "start";
}

// start/pause/continue the game
function startButtonHandler() {
	if (playing) {
		console.log("Pause the game");
		playing = false;
		this.innerHTML = "continue";
	} else {
		console.log("Continue the game");
		playing = true;
		this.innerHTML = "pause";
		play();
	}
}

// run the life game
function play() {
	console.log("Play the game");
	computeNextGen();
}

function computeNextGen() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			applyRules(i, j);
		}
	}
}

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function applyRules(row, col) {
	var numNeighbors = countNeighbors(row, col);
	if (grid[row][col] == 1) {
		if (numNeighbors < 2) {
			nextGrid[row][col] = 0;
		} else if (numNeighbors == 2 || numNeighbors == 3) {
			nextGrid[row][col] = 1;
		} else if (numNeighbors > 3) {
			nextGrid[row][col] = 0;
		}
		} else if (grid[row][col] == 0) {
			if (numNeighbors == 3) {
				nextGrid[row][col] = 1;
			}
		}
	}

function countNeighbors(row, col) {
	var count = 0;
	if (row-1 >= 0) {
		if (grid[row-1][col] == 1) count++;
    }
    if (row-1 >= 0 && col-1 >= 0) {
       if (grid[row-1][col-1] == 1) count++;
    }
    if (row-1 >= 0 && col+1 < cols) {
       if (grid[row-1][col+1] == 1) count++;
    }
    if (col-1 >= 0) {
       if (grid[row][col-1] == 1) count++;
    }
    if (col+1 < cols) {
       if (grid[row][col+1] == 1) count++;
    }
    if (row+1 < rows) {
       if (grid[row+1][col] == 1) count++;
    }
    if (row+1 < rows && col-1 >= 0) {
       if (grid[row+1][col-1] == 1) count++;
    }
    if (row+1 < rows && col+1 <cols) {
       if (grid[row+1][col+1] == 1) count++;
    }
    return count;
}

// start er up!
window.onload = initialize;