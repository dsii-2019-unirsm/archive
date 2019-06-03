// -
// Pattern con modulo 0.2 by Grazia Pestillo [keyword1, keyword2]
// 2019 © Grazia Pestillo, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

void setup() {
  size(600, 600);
  background(255);
  smooth();
  stroke(3);
  rectMode(CENTER);
}

void draw() {

  frameRate(20);
  //griglia di cerchi e quadrati la cui dimensione aumenta progressivamente con l'uso di due differenti moduli
  for (int c = 0; c<=width; c+=60) {
    for (int r=0; r<=height; r+=50) { 

      if (mouseX>=200) {
        fill( int(random(10, 255)), int(random(100)), int(random(250)), 155); //random color
      } else if (mouseY<=400) {  
        fill(0, int(random(100, 255)), int(random(200, 255)), 20); //random color
      } else { 
        fill( int(random(200, 255)), int(random(100, 255)), int(random(100, 255)), 30); //random color
        //scale (80);
      }
      rect(c, r, frameCount%50, frameCount%50);
      ellipseMode(CORNER);
      ellipse(c, r, frameCount%80, frameCount%80);
    }
  }
}

