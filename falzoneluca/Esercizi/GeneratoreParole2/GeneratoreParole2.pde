//New Dada 4.0

//dichiaro variabili
float x=0; 
float y=0;

int a = 0;
int b = 0;

//array parole computer
String [] e = {"Prendete", "un giornale.",
"Prendete", "un paio di", "forbici.",
"Scegliete", "nel giornale", "un articolo" , "che abbia", "lunghezza",
"che voi dare", "alla vostra", "poesia.",
"Ritagliate", "l’articolo.",
"Tagliate", "ancora", "con cura ogni", "parola", "che forma", "tale", "articolo",
"E", "mettete", "tutte le parole", "in un sacchetto.",
"Agitate dolcemente.",
"Tirate fuori", "le parole", "una dopo l’altra", "disponendole", "nell’ordine", 
"con cui", "le estrarrete.",
"Copiatele", "coscienziosamente.",
"La poesia", "vi rassomiglierà.",
"Ed eccovi diventato", "uno scrittore", "infinitamente originale", "e fornito di", 
"una sensibilità incantevole,", "benché,", "s’intende,", "incompresa", 
"dalla gente", "volgare."};
//da "Tagliate ancora con cura ogni parola..." per fare una poesia Dadaista di Tristan Tzara.
void setup() {
  //size (500, 500);
  fullScreen();
  //set the frame Rate
  frameRate(1);
};

void draw() {  
  for (x=0; x<10; x++) {
    while (x<width) {
      background(#000000); 
      fill(#44b1f6);
      textSize(100); 
      textAlign(CENTER, height/2);
      
      //estrae parole a caso da array e
      text((e[a])+" ", width/2, height/2); 
      x=x+500;
    }
  };
  //numero a caso tra 0 e 48
  a = int(random(0,48));
};
