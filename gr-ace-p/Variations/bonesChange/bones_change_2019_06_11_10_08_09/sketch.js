var c;

function setup(){

  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(0);
  strokeWeight(random(1, 3.5));
  //strokeWeight(3);
  c=130;
  colorMode(HSB);
}

var boxWidth = 10;
var xPos = 0;
var yPos = 0;



function draw(){
  
    fill(c,100,255);

  var forma = random();
  print(forma);
  strokeWeight(random(1, 4.5));
  stroke(c, 100, 255);
  //fill(c, 160, 255);
  
  if(forma < 0.4){
    fill(c-20, 100, 255);
    ellipse(xPos, yPos, 3,3);
    stroke(c, 100, 255);
    strokeWeight(random(0.5, 4.5));
    
    line(xPos , yPos + boxWidth, xPos + boxWidth, yPos);
 } else{
   strokeWeight(random(0.5, 4.5));
    line(yPos, xPos, yPos + boxWidth, xPos + boxWidth);
   noStroke();
    fill(c-20, 100, 255);
   ellipse(yPos+ boxWidth, xPos+boxWidth, 6,6);
  }

  // sposta la x della dimensione della cella per disegnare la cella successiva
  yPos += boxWidth;
  
  //inizia una nuova riga
  if(yPos > height){
    c++;
    // se uso box++ qui ad ogni riga la dimensione aumenta solo la prima volta, dopo muosepressed diventa più grande tutto, non riga per riga.
    //boxWidth++;
    yPos = 0 + boxWidth;
    xPos += boxWidth;
    
  }

  //se y è maggiore dell'altezza interrompe il loop
  if(yPos > windowHeight && xPos > windowWidth){
    noLoop();
    
  }
}

function mousePressed(){
  //resetta e riparte
  background(0);
  //c++;
  // se uso boxWidth++ qui, ogni volta che ricarico cambia la dimensione aumentando di uno.
  boxWidth++;
  xPos = 0;
  yPos = 0;
  loop();
}
