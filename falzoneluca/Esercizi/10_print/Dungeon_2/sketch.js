var cellmap = [];
var nextcellmap = [];
let width = 1000;
let height = 1000;
var index;
var chanceToStartAlive = 0.45;
let birthLimit = 4;
let deathLimit = 3;
let steps = 100;
var drawX = 0;
var drawY = 20;
var done = false;


for (var i = 0; i < width; i++) {
    cellmap[i] = [height - 20];
    nextcellmap[i] = [height - 20];
}

for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
        if (Math.random() < chanceToStartAlive) {
            cellmap[i][j] = true;
        }
        else {
            cellmap[i][j] = false;
        }
    }
}

function setup() {
    createCanvas(width, height);
    pixelDensity(1);
}

function draw() {
    // background(51);
    // noSmooth()
    
    
    loadPixels();

    for (var i = 0; i < width; i++) {
        //cielo
        for (var j = 0; j < 20; j++) {
            index = (i + j * width) * 4;
            pixels[index + 0] = 30;
            pixels[index + 1] = 217;
            pixels[index + 2] = 255;
            pixels[index + 3] = 255;
        //erba
            if (j >= 17) {
                pixels[index + 0] = 3;
                pixels[index + 1] = 204;
                pixels[index + 2] = 0;
                pixels[index + 3] = 255;
            }
        }
    }

    if (done) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                if (Math.random() < chanceToStartAlive) {
                    cellmap[i][j] = true;
                }
                else {
                    cellmap[i][j] = false;
                }
            }
        }

        steps = 100;
        done = false;
    }
    console.log(steps);

    while (steps >= 0) {
        console.log("yay");
        cellmap = doSimulationStep();
        steps--;
    }
    
    for (var i = 0; i < 1000; i++) {
        index = (drawX + drawY * width) * 4;
        //terra
        if (cellmap[drawX][drawY] == true) {
            pixels[index + 0] = 94;
            pixels[index + 1] = 64;
            pixels[index + 2] = 10;
            pixels[index + 3] = 255;
        }
        //roccia
        else {
            pixels[index + 0] = 122;
            pixels[index + 1] = 122;
            pixels[index + 2] = 122;
            pixels[index + 3] = 255;
        }
        drawX++;
    }

    // scorre pixel

    if (drawX >= width) {
        drawX = 0;
        drawY++;
    }
    
    if (drawY >= height) {
        drawY = 20;
        done = true;
    }


    updatePixels();
}

function countAliveNeighbours(x, y) {
    var count = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var neighbour_x = x + i;
            var neighbour_y = y + j;

            if (i == 0 && j == 0) {

            }

            else if (neighbour_x < 0 || neighbour_y < 0 || neighbour_x >= width || neighbour_y >= height) {
                count++;
            }
            
            else if (cellmap[neighbour_x][neighbour_y] == true) {
                count++;
            }
        }
    }
    return(count);
}

function doSimulationStep() {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var nbs = countAliveNeighbours(x, y);
            if (cellmap[x][y] == true) {
                if (nbs < deathLimit) {
                    nextcellmap[x][y] = false;
                }
                else {
                    nextcellmap[x][y] = true;
                }
            }
            else {
                if (nbs > birthLimit) {
                    nextcellmap[x][y] = true;
                }
                else {
                    nextcellmap[x][y] = false;
                }
            }
        }
    }
    return(nextcellmap);
}
