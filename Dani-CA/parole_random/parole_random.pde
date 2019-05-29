// -
// Pescatore biblico 0.1 by Daniele Cappai [processing, words]
// 2018 © Nomestudente, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

PFont font;
String [] words;
int index;


void setup() {
  String [] myWords  = loadStrings("miotesto.txt");
  String entireplay = join(myWords, " ");
  words = split(entireplay, " ");
  size(600, 600);
  colorMode(HSB);
  font= createFont("Nexa Bold", 20, true);
}

void draw() {
  background(0);
  textFont(font);
  int x = (words.length);
  frameRate(1);
  for (int i = 0; i < x; i++) {
    text(words [ int (random(x))], random(width), random(height) );
    textSize(random(20, 50));
    fill(random(255), 100, 255);
  }
}
