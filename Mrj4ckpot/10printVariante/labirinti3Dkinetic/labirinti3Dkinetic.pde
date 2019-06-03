// -
// 10PRINT - labirinti3DKinetic 0.1 by Luigi Marchionni
// 2018 © Luigi Marchionni, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to: 
// Daniele Tabellini
// Paolo Petrangolini
// —


int cella=int(random(30, 70));
int altezza=cella/int(random(1, 4));

int L = 1600;
int A = 800;

int  colonne=(L/cella)+10;
int  righe=(A/cella);

float [][] mappa = new float[colonne][righe];

float c;

float spostamento = 0;

void setup() {

  size(1600, 800, P3D);
  colorMode(HSB);

  c = random(255);
  //frameRate(1);

  for (int x=0; x<colonne; x++) {

    for (int y=0; y<righe; y++) {

      mappa[x][y] = random(2);
      println(x);
    }
  }
}

void draw() {
  //c += 0.1;

  background (c, 160, 254);


  rotateX(PI/3);
  translate ((-width/3)-(3*cella), -width/4, -height/2); 
  scale(1.5); 




  directionalLight((c+100), 160, 254, width/2, height/2, -1000);
  directionalLight(c, 160, 254, -width/2, -height/2, -2000);
  directionalLight(c, 220, 254, width, 0, -500);

  translate(spostamento, 0, 0);

  for (int x=0; x<colonne; x++) {

    for (int y=0; y<righe; y++) {

      // SCEGLIE UNO DI DUE CARATTERI DEL 10 PRINT
      // CARATTERE DX
      if ( mappa[x][y] >= 0 && mappa[x][y] <= 1 ) {
        carattereDX(x, y, cella);
      }
      // CARATTERE SX
      else if ( mappa[x][y] > 1 && mappa[x][y] <=2) {
        carattereSX(x, y, cella);
      } else {
        spazio(x, y, cella);
      }
    }
  }

  spostamento++;
  if (spostamento==(cella)) {

    for (int x=(colonne-1); x>0; x--) {
      for (int y=(righe-1); y>=0; y--) {

        int X = x-1;
        int Y = y;
        //println(X+"   "+Y);
        mappa[x][y] = mappa[X][Y];
      }
    }


    for (int y=0; y<righe; y++) {
      mappa[0][y]=random(2);
    }



    spostamento = 0;
  }

  //noLoop();
}


void carattereDX(int x, int y, int cella) {


  noStroke();
  // BASE
  fill(100);
  beginShape();
  vertex(x*cella, y*cella, 0);
  vertex((x+1)*cella, y*cella, 0);
  vertex((x+1)*cella, (y+1)*cella, 0);
  vertex(x*cella, (y+1)*cella, 0);
  endShape();


  // stroke(100);
  // CIMA
  fill(100+(y*6));
  beginShape();
  vertex(x*cella+(cella*5/6), y*cella, altezza);
  vertex((x+1)*cella, y*cella, altezza);
  vertex((x+1)*cella, y*cella+(cella/6), altezza);
  vertex(x*cella+(cella/6), (y+1)*cella, altezza);
  vertex(x*cella, (y+1)*cella, altezza);
  vertex(x*cella, y*cella+(cella*5/6), altezza);
  endShape(); 

  // FACCIA 1
  fill(254);
  beginShape();
  vertex(x*cella, y*cella+(cella*5/6), altezza);
  vertex(x*cella+(cella*5/6), y*cella, altezza);
  vertex(x*cella+(cella*5/6), y*cella, 0);
  vertex(x*cella, y*cella+(cella*5/6), 0);
  endShape(); 

  // FACCIA 6
  fill(254);
  beginShape();
  vertex(x*cella+(cella/6), (y+1)*cella, altezza);
  vertex((x+1)*cella, y*cella+(cella/6), altezza);
  vertex((x+1)*cella, y*cella+(cella/6), 0);
  vertex(x*cella+(cella/6), (y+1)*cella, 0);
  endShape(); 

  // FACCIA 2
  fill(254);
  beginShape();
  vertex(x*cella+(cella*5/6), y*cella, altezza);
  vertex((x+1)*cella, y*cella, altezza);
  vertex((x+1)*cella, y*cella, 0);
  vertex(x*cella+(cella*5/6), y*cella, 0);
  endShape(); 


  // FACCIA 5
  fill(254);
  beginShape();
  vertex((x+1)*cella, y*cella+(cella/6), altezza);
  vertex((x+1)*cella, y*cella, altezza);
  vertex((x+1)*cella, y*cella, 0);
  vertex((x+1)*cella, y*cella+(cella/6), 0);
  endShape(); 


  // FACCIA 5
  fill(254);
  beginShape();
  vertex(x*cella, (y+1)*cella, altezza);
  vertex(x*cella+(cella/6), (y+1)*cella, altezza);
  vertex(x*cella+(cella/6), (y+1)*cella, 0);
  vertex(x*cella, (y+1)*cella, 0);
  endShape(); 


  // FACCIA 6
  fill(254);
  beginShape();
  vertex(x*cella, (y+1)*cella, altezza);
  vertex(x*cella, y*cella+(cella*5/6), altezza);
  vertex(x*cella, y*cella+(cella*5/6), 0);
  vertex(x*cella, (y+1)*cella, 0);
  endShape();
}



void carattereSX(int x, int y, int cella) {

  noStroke();
  // BASE
  fill(100);
  beginShape();
  vertex(x*cella, y*cella, 0);
  vertex((x+1)*cella, y*cella, 0);
  vertex((x+1)*cella, (y+1)*cella, 0);
  vertex(x*cella, (y+1)*cella, 0);
  endShape();

  // stroke(100);
  // CIMA
  fill(100+(y*6));
  beginShape();
  vertex(x*cella, y*cella, altezza);
  vertex(x*cella+(cella/6), y*cella, altezza);
  vertex((x+1)*cella, y*cella+(cella*5/6), altezza);
  vertex((x+1)*cella, (y+1)*cella, altezza);
  vertex(x*cella+(cella*5/6), (y+1)*cella, altezza);
  vertex(x*cella, y*cella+(cella/6), altezza);
  endShape(); 

  // FACCIA 1
  fill(254);
  beginShape();
  vertex(x*cella+(cella*5/6), (y+1)*cella, altezza);
  vertex(x*cella, y*cella+(cella/6), altezza);
  vertex(x*cella, y*cella+(cella/6), 0);
  vertex(x*cella+(cella*5/6), (y+1)*cella, 0);
  endShape(); 

  // FACCIA 4
  fill(254);
  beginShape();
  vertex(x*cella+(cella/6), y*cella, altezza);
  vertex((x+1)*cella, y*cella+(cella*5/6), altezza);
  vertex((x+1)*cella, y*cella+(cella*5/6), 0);
  vertex(x*cella+(cella/6), y*cella, 0);
  endShape(); 

  // FACCIA 2
  fill(254);
  beginShape();
  vertex(x*cella, y*cella, altezza);
  vertex(x*cella, y*cella+(cella/6), altezza);
  vertex(x*cella, y*cella+(cella/6), 0);
  vertex(x*cella, y*cella, 0);
  endShape(); 

  // FACCIA 3
  fill(254);
  beginShape();
  vertex(x*cella, y*cella, altezza);
  vertex(x*cella+(cella/6), y*cella, altezza);
  vertex(x*cella+(cella/6), y*cella, 0);
  vertex(x*cella, y*cella, 0);
  endShape(); 


  // FACCIA 5
  fill(254);
  beginShape();
  vertex((x+1)*cella, y*cella+(cella*5/6), altezza);
  vertex((x+1)*cella, (y+1)*cella, altezza);
  vertex((x+1)*cella, (y+1)*cella, 0);
  vertex((x+1)*cella, y*cella+(cella*5/6), 0);
  endShape(); 


  // FACCIA 6
  fill(254);
  beginShape();
  vertex((x+1)*cella, (y+1)*cella, altezza);
  vertex(x*cella+(cella*5/6), (y+1)*cella, altezza);
  vertex(x*cella+(cella*5/6), (y+1)*cella, 0);
  vertex((x+1)*cella, (y+1)*cella, 0);
  endShape();
}

void spazio(int x, int y, int cella) {

  noStroke();
  // BASE
  fill(140);
  beginShape();
  vertex(x*cella, y*cella, 0);
  vertex((x+1)*cella, y*cella, 0);
  vertex((x+1)*cella, (y+1)*cella, 0);
  vertex(x*cella, (y+1)*cella, 0);
  endShape();
}
