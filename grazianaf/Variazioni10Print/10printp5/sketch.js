function setup(){

  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(0);
  strokeWeight(3);
  fill(255);
  colorMode(HSB);
}

var boxWidth = 50;
var xPos = 0;
var yPos = 0;

function draw(){

  //numero tra 0 e 1 a caso
  var forma = random();
  print(forma);
  var h = random(255);
  stroke(h, 30, 100);
  fill(h, 30, 100);
  
  //se la probabilità è minore di x numero disegna forme (linee o triangoli in posizioni differenti
  if(forma < 0.4){
    line(xPos, yPos, xPos + boxWidth, yPos + boxWidth);
  }else if(forma < 0.5){
    triangle(xPos, yPos, xPos, yPos + boxWidth, xPos + boxWidth, yPos + boxWidth);
  }else if(forma < 0.6){
    triangle(xPos, yPos, xPos + boxWidth, yPos, xPos + boxWidth, yPos + boxWidth);
  }else{
    line(xPos, yPos + boxWidth, xPos + boxWidth, yPos);
  }

  // sposta la x della dimensione della cella per disegnare la cella successiva
  xPos += boxWidth;
  
  //inizia una nuova riga
  if(xPos > width){
    xPos = 0;
    yPos += boxWidth;
  }

  //se y è maggiore dell'altezza interrompe il loop
  if(yPos > height){
    noLoop();
  }
}

function mousePressed(){
  //resetta e riprende 
  background(255);
  xPos = 0;
  yPos = 0;
  loop();
}

