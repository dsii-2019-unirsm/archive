// GeneratoreParole.pde 0.1 by FalzoneLuca [words, randomwords, randompoetry]
// 2019 © FalzoneLuca, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —



//dichiaro variabili
float x=0; 
float y=0;

int a = 0;
int b = 0;

//array parole computer
String [] e = {"Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisici", "elit", "sed", "eiusmod", "tempor", "incidunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquid", "ex", "ea", "commodi", "consequat", "Quis"
};

void setup() {
  //size (500, 500);
  fullScreen();
  //set the frame Rate
  frameRate(5);
};

void draw() {  
  for (x=0; x<10; x++) {
    while (x<width) {
      background(#f6ed55); 
      fill(#44b1f6);
      textSize(100); 
      textAlign(CENTER, height/2);
      
      //estrae parole a caso da array e
      text((e[a])+" ", width/2, height/2); 
      x=x+500;
    }
  };
  //numero a caso tra 0 e 34
  a = int(random(0,34));
};
