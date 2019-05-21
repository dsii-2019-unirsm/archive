var x = 0;
var y = 0;
//cella
var move = 20;
//probabilità fissa
var prob = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background (188,216,193);
}
 function draw() {
   stroke(50,83,61);
   if (random(1) < prob) {
     fill(50,83,61);
     triangle(x, y, x, y + move, x + move, y + move);
  } else {
    triangle(x, y, x + move, y + move, x + move, y);
  }
   //disegna cella successiva
   x = x + move;
   //scorri riga
   if (x > width){
     x = 0;
     y = y + move;
   }
   // se la y è maggiore dell'altezza sceglie un numero random per la dimensione della cella 
   //tra 10 e 100 e rincomincia impostando la probabilità randomicamente 
   if (y > (height - move)) {
     background(0);
     x = 0;
     y = 0;
     move = random(10, 100);
     background(188,216,193);
     prob = random(1);
   }
 }
