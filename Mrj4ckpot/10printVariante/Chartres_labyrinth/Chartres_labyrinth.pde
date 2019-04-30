
int numLivelli=0;

float angoloFiore=0;
int livCerchio=60;
int dimCorona=0;
float angoloRif=0;

// parte dal fondo
float x1Lab=0;
float y1Lab=0;

boolean Trigger = true;
int dir = 0;

float contaPartenza=0;
float angoloPartenza= 0;
float incremento=0.5;

int ORARIO = 1;

boolean GIRASx = false;
boolean GIRADx = false;
boolean SALE = false;
boolean SCENDE = false;

int spicchio=0;
int livello=0;

boolean[][] labirinto;


void setup() {

  background(0);
  size(800, 800);

  x1Lab=width/2;
  y1Lab=height/2+48*sin(3*TWO_PI/8);

  if (random(0, 2)>1) {
    ORARIO = ORARIO*(-1);
  } 

  // sceglie dimensioni labirinto
  for (int i=0; i<height-2*livCerchio; i+=livCerchio) {
    dimCorona += livCerchio;
  }

  // quadrante di riferimento
  for (int i=3*livCerchio; i<=dimCorona; i += livCerchio) {   
    fill(0, 0, 0, 0);
    strokeWeight(2);
    stroke(80);
    circle (width/2, height/2, i);
    numLivelli++;
  }

  for (int i=0; i<8; i++){
    angoloRif += i*PI/4;
    
   // stroke(80);
   // line(width/2, height/2, width/2+dimCorona/2*cos(angoloRif), height/2+dimCorona/2*sin(angoloRif));
    
    stroke(150, 0, 0);
    line(width/2+livCerchio/4*cos(angoloRif-PI/2), height/2+livCerchio/4*sin(angoloRif-PI/2), width/2+dimCorona*cos(angoloRif)+livCerchio/4*cos(angoloRif-PI/2), height/2+dimCorona*sin(angoloRif)+livCerchio/4*sin(angoloRif-PI/2));
    
    stroke(0, 50, 150);
    line(width/2-livCerchio/4*cos(angoloRif-PI/2), height/2-livCerchio/4*sin(angoloRif-PI/2), width/2+dimCorona*cos(angoloRif)-livCerchio/4*cos(angoloRif-PI/2), height/2+dimCorona*sin(angoloRif)-livCerchio/4*sin(angoloRif-PI/2));
    }
    
  // crea la matrice dei punti di intersezione
  labirinto = new boolean[numLivelli][24];
  
  for (int i=0; i<labirinto.length; i++ ){
    for (int j=0; j<labirinto[i].length; j++){
        labirinto[i][j] = true;
        println(labirinto[i][j]);
    } 
  }
  
  labirinto[0][0]=false;
  labirinto[0][1]=false;


  fill(255);
  strokeWeight(0);
  stroke(255);
  // centro del fiore
  circle(width/2, height/2, 60);

  // petali bianchi
  for (int i=0; i<8; i++) {
    angoloFiore=i*(TWO_PI/8);
    circle(width/2+30*cos(angoloFiore), height/2+30*sin(angoloFiore), 20);
  }

  // petali neri
  angoloFiore=0;
  fill(0);
  stroke(0);
  for (int i=0; i<8; i++) {
    angoloFiore=TWO_PI/16+i*(TWO_PI/8);
    circle(width/2+28*cos(angoloFiore), height/2+28*sin(angoloFiore), 7);
  }

  // disegna la corona 
  fill(0, 0, 0, 0);
  strokeWeight(20);
  stroke(255);
  circle (width/2, height/2, dimCorona);

  angoloFiore=0;
  fill(0);
  strokeWeight(0);
  stroke(0);

  for (int i=0; i<width/8; i++) {
    angoloFiore=i*(TWO_PI/100);
    circle(width/2+(dimCorona+20)/2*cos(angoloFiore), height/2+(dimCorona+20)/2*sin(angoloFiore), height/35); 
  }
}

void draw() {

  strokeWeight(0);
  stroke(0);
  fill(255);


  // stampa una linea verticale che scende prima di iniziare a stampare il labirinto
  if (y1Lab <= height/2+3*livCerchio/2) {

    stroke(255);
    fill(255);  

    y1Lab += incremento;
    contaPartenza += (incremento);
    circle(x1Lab, y1Lab, 20); 

    if (y1Lab == height/2+3/2*livCerchio) {
      Trigger = true;
      dir = int(random(1,3));
    }
  }

  // quando riceve il segnale di ruotare, cambia la direzione e cambia le coordinate del centro di rotazione
  // se lo spazio scelto a caso è libero, ci va
  // se lo spazio è occupato, ne sceglie un altro
  else if (Trigger == true) {    
      
    if (dir==0 && livello>0 && labirinto[livello][spicchio]==true){
    }
    
    dir = int(random(0,3));
  } 
  
  else {
  }
}
