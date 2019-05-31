// -
// 10Print 0.1 by Graziana Florio [10print, SolLeWitt]
// 2019 © Graziana Florio @grazianaf, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
void setup() { 
  size(800, 600); 
  stroke(255); 
  //background(0); 
  frameRate(2); 
} 
 
int res = 50;   // dimensioni delle celle della griglia
int arcres = 48; //dimensioni degli archi
 
void draw(){ 
  background(#F6F7EB);
  //creo una griglia, scelgo un numero random tra 0 e 4
  for(int i=0; i<height; i+=res) { 
    for(int j=0; j<width; j+=res) { 
      int r = int(random(4)); 
      //se il numero random estratto è 0 chiamo la funzione arco01,02, 03, 04 divisi in base alle direzioni
      if(r == 0) { 
        arco_0(j, i); 
      } else if (r == 1) { 
        arco_1(j, i);        
      } else if (r == 2) { 
        arco_2(j, i);      
      } else if (r == 3) { 
        arco_3(j, i);        
      } 
    } 
  } 
} 
