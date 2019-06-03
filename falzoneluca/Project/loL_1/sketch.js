var cameraX = 800;
var cameraY = 640;

function setup() {
  createCanvas(cameraX, cameraY + 200);
  capture = createCapture(VIDEO);
  capture.size(cameraX, cameraY);
  capture.hide();
}

function draw() {
  background(50);
  image(capture, 0, 0, cameraX, cameraY);
}
