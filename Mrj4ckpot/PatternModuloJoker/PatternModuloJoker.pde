float lat=0;
float d=1;
float t=0;

void setup(){
size (1920,640);
colorMode(HSB);
}

void draw(){
background(100,255,255);

stroke(0,0,0,0);
fill(200, 255,255);

beginShape();

vertex(width+300, height);
vertex(0, height);

for(float i=0; i<(width+300); i+=10){
  
lat= lat - noise(i+1 % random(1 , 130))*d;
vertex(i, (height+lat));

if (height+lat <= height/8){
  lat=0;}

}

translate(-300, 0);
endShape(CLOSE);



//noLoop();
lat=0;
d=noise(t)*100;
t=t+0.004;
}
