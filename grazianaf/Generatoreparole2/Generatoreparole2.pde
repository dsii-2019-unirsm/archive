// -
// Parolecasuali 0.1 by Graziana Florio [words, nosense]
// 2019 © Graziana Florio, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
//
// Help:
//
// [mousePressed] new word
//
// —

//creo variabili per determinare la posizione in cui viene creata la poesia
int posX= width/2;
int posY= height/2;
PFont font1;


void setup() {
  size(500, 500);
  // fullScreen();
  background(#FFFFFF);
  fill(0);
   font1 = createFont("Inconsolata-Regular.ttf", 40);
  textFont(font1);
  nuova_parola();
}

void draw() {
}

//scrivo una funzione che crea la parola scegliendo le lettere dagli array
void scegli_lettere(String [] parole) {
  if (posX > 200) {
    posX = posX - 160;
  }
  int a = int(random(parole.length)); 
  text(parole[a], posX, posY);
  
  posX= posX+20; 
 
}

//compone la poesia
void nuova_parola() {
  background(255);
  posY= 50;
  //Array
  String[] vocali = {
    "a", "e", "i", "o", "u"};

  String[] consonanti = {"b", "c", "d", "f", "g", "h", "i", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"};

  scegli_lettere(vocali);
  scegli_lettere(consonanti);
  scegli_lettere(vocali);
  scegli_lettere(consonanti);
  scegli_lettere(consonanti);
  scegli_lettere(vocali);
  scegli_lettere(consonanti);
}

// se clicco compone un'altra parola
void mousePressed() {
  nuova_parola();
}
void keyPressed() {
  int numero_sogno = int(random(100));
  save("sogno"+numero_sogno+".png");
}
