String testo="inizio";

String [] c= {"affittare",
"campione",
"cane",
"chimica",
"distorto",
"epidermide",
"medico",
"usb",
"mobile",
"occhiali",
"asso",
"vacanza",
"esame",
"contributo",
"ingegnere",
"esorcista",
"esporre",
"estivo",
"nuvola",
"neurone",
"operaio",
"paracadutismo",
"corvo",
"scurrile",
"amianto",
"amaranto",
"rosso",
"giallo",
"blu",
"cinque",
"undici",
"cento",
"centrino",
"macchina",
"automobile",
"operaio",
"gennaio",
"agosto",
"tavolino",
"contanti",
"ghiro",
"volpe",
"tonno",
"salmone",
"browser",
"variabile",
"sole",
"pioggia",
"fulmine",
"calamita"

};

float x=width/2;
float y=height/2;

boolean x_avanti = true;
boolean y_avanti = true;

float inc_x=random(4)+1;
float inc_y=random(4)+1;

int sat=0;

void setup(){
size(640, 640);
colorMode(HSB);
background(245);
}



void draw(){
background(60);

// bordo DX
if (x >= (640-textWidth(testo)) && x_avanti==true){
x_avanti = false;
inc_x=random(4)+1;
testo = c[int(random(23))];
}
// bordo SX
if (x <= 0  && x_avanti==false){
x_avanti = true;
inc_x=random(4)+1;
testo = c[int(random(23))];
}
// bordo BASSO
if (y >= 640  && y_avanti==true){
y_avanti = false;
inc_y=random(4)+1;
testo = c[int(random(c.length))];
}
// bordo ALTO
if (y <=  textAscent()  && y_avanti==false){
y_avanti = true;
inc_y=random(4)+1;
testo = c[int(random(23))];
}


if (x_avanti == true){
x=x+inc_x;
}
else {
x=x-inc_x;
}

if (y_avanti == true){
y=y+inc_y;
}
else {
y=y-inc_y;
}

sat=sat+1;



stroke(0);
strokeWeight(1);
fill(sat, 255, 255);
textSize(64);  
text(testo, x, y);

if (sat == 255){
sat = 0;
}

}
