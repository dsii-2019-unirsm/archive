//in base al movimento del mouse il pattern cambia colore e saturazione
void setup() {
  size(600, 600);
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
      } else if (mouseY<=200) {  
        fill(0, int(random(100, 255)), int(random(100, 255)), 200); //random color
      } else { 
        fill( int(random(200, 255)), int(random(100, 255)), int(random(100, 255)), 155); //random color
      }
      ellipse(x, y, frameCount%50, frameCount%50);
    }
  }
}
