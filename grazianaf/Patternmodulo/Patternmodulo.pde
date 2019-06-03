// -
// Pattern Modulo 0.1 by GrazianaFlorio @grazianaf [modulo, circles]
// 2019 © Graziana Florio, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

//
// Help:
// [mouseX] da sinistra a destra decrementa saturazione
// [mouseY] dal basso verso l'alto cambia colore
//
// —
//in base al movimento del mouse il pattern cambia colore e saturazione
void setup() {
  size(800, 800);
  background(0);
  smooth();
  noStroke();
  rectMode(CENTER);
}

void draw() {
  //imposto il framerate a 10 altrimenti sarebbe poco percepibile la variazione
  frameRate(10);
  //disegno una griglia di cerchi la cui dimensione aumenta progressivamente(partendo dal centro) attraverso l'uso del modulo di 50
  for (int x = 0; x<=width; x+=50) {
    for (int y=0; y<=height; y+=50) { 
    //se il mouse si sposta nella canvas i cerchi assumono colori e sfumature diverse
      if (mouseX<=400) {
        fill( int(random(200, 255)), int(random(255)), int(random(250)), 155); //random color
      } else if (mouseY<=400) {  
        fill(0, int(random(100, 255)), int(random(100, 255)), 200); //random color
      } else { 
        fill( int(random(200, 255)), int(random(100, 255)), int(random(100, 255)), 155); //random color
      }
      ellipse(x, y, frameCount%50, frameCount%50);
    }
  }
}
