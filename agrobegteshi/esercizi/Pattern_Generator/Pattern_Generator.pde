// Prima prova 10 print 0.1 by Agron Begteshi
// 2019 © Agron Begteshi, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino


int num [] = {3, 4};
int i;
int n=0;


void setup() {
  fullScreen();
  frameRate(30);
  background (#fffacd);
  
};

void draw(){
for (int arr=0; arr<2; arr++) {
    println(num[arr]);
    int c = num[arr];
    int op= c%3; //int op=c%3
    println(op);//ok stampa modulo, sempre 0,1
    
    if (n<=width) {
      for (i=0; i<=width; i+=10) { 
        noFill();  
        if (op==0) {
          stroke(random(80));
          line(n,i,n+10,i+10);
        
        } else {
            stroke(random(100));
            rect(n,i,i+30,n+30);
                line(n+10,i,n,i+10);

           
        }
      }
    }
  }    
n+=10;

};
