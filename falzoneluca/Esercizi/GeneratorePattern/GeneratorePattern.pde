// -
// GeneratorePattern.pde 0.2 by FalzoneLuca [pattern, generate, random]
// 2019 © FalzoneLuca, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —


int num [] = {3, 4};
int i;
int n=0;


void setup() {
  fullScreen();
  frameRate(60);
  background (#bafee5);
};

void draw(){
for (int arr=0; arr<2; arr++) {
  
    //println(num[arr]);
    int c = num[arr];
    
    //int op=c%3
    int op= c%3; 
    
    //stampa modulo ricorrente, sempre 0,1
    println(op);
    
    if (n<=width) {
      for (i=0; i<=width; i+=10) { 
        
        //genera pattern
        noFill();  
        if (op==0) {
          stroke(random(100));
          
          //tipologie di pattern da scegliere
          
          //#1
          
         //line(n,i,n+10,i+10);
         // triangle(n, i, n+10, i+10, n+10, i+10);
         //rect(n, i, n+10, n+10);
         rect(n, i, n+10, n+10, 7);
         // arc(i, n, 10, 10, 0, PI+QUARTER_PI, CHORD);
         //ellipse(i,n,10,10);
         
         
        } else {
        
          //#2
          
            stroke(random(100));
           //rect(n,i,i+30,n+30);
                line(n+10,i,n,i+10);
           //rect(n, i, 20, 20, 7);

           //arc(i, n, 10, 10, 0, PI+QUARTER_PI, CHORD);

           //ellipse(n,i,30,30);
        }
      }
    }
  }  
n+=10;

};
