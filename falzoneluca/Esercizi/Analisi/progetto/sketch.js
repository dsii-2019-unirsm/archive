// -
// Sketch.js 0.1 by FalzoneLuca [weddings, divorces, graphicrappresentation,analysis]
// 2019 © FalzoneLuca, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —



// variabile per il collegamento al file contenente i dati da rappresentare
var url = "https://spreadsheets.google.com/feeds/list/1As4nqg4mydMpgcujvVsUqUsEv1K3tzvNcJwYVdPxEgk/od6/public/values?alt=json";
// array per contenere i dati
var dati = [];
// dimensione cerchio interno (in Px)
var dimensione_cerchio_interno = 70;
// dimensione testo titolo (in Px)
var dimensione_titolo = 40;
// dimensione testo sottotitolo (in Px)
var dimensione_sottotitolo = 25;
// dimensione testo legenda (in Px)
var dimensione_legenda = 28;
// larghezza barre del grafico (in Px)
var larghezza_barre = 6;
// luminosità sfondo (scala di grigi [0, 255])
var luminosita_sfondo = 51;
// numero massimo di matrimoni
var massimo_matrimoni = 0;
// numero massimo di divorzi
var massimo_divorzi = 0;

// larghezza canvas
var larghezza = 1920;
// altezza canvas
var altezza = 1080;


function setup() {
    // crea un ambiente di lavoro grosso come le dimensioni della finestra
    createCanvas(larghezza, altezza);
    // carica il file json ottenuto dall'url e chiama la funzione carica_dati
    loadJSON(url, carica_dati);
    // cambia il tipo di misura degli angoli da radianti a gradi
    angleMode(DEGREES);
    // imposta il font a Titillium Web
    textFont('Titillium Web');

    
}

function draw() {
    // cerca il massimo dei valori di matrimoni e divorzi finchè i dati non sono caricati (ovvero finchè non trova
    // valori di massimo diversi da 0)
    if (massimo_matrimoni == 0 && massimo_divorzi == 0) {
        trova_massimo();
    }
   
    var dimensione_massima_cerchio_esterno = altezza / 2 - dimensione_cerchio_interno;

    // cambia il tipo di misura del colore in RGB
    colorMode(RGB);
    // colora lo sfondo in scala di grigi
    background(luminosita_sfondo);
    // cambia il tipo di misura del colore in HSB con valore massimo 255
    colorMode(HSB, 255);

    // imposta il colore di riempimento
    fill(255); // bianco
    // imposta la dimensione del testo in funzione delle dimensioni della finestra
    textSize(dimensione_titolo);
    // disegna il titolo sullo schermo
    text('Divorzi e matrimoni in Italia', 50, 50);

    // imposta la dimensione del testo in funzione delle dimensioni della finestra
    textSize(dimensione_sottotitolo);
    // disegna il sottotitolo sullo schermo, la posizione cambia rispetto alle dimensioni della finestra
    text('divorzi e matrimoni delle regioni italiane da nord a sud', 50, 85);

    // imposta la dimensione del testo in funzione delle dimensioni della finestra
    textSize(dimensione_legenda);
    // imposta il colore di riempimento
    fill(0, 190, 255); // rosso chiaro
    // disegna la legenda dei divorzi sullo schermo
    text('Divorzi', larghezza / 4, altezza/ 2);
    // imposta il colore di riempimento
    fill(160, 190, 255); // blu chiaro
    // disegna la legenda dei matrimoni sullo schermo
    text('Matrimoni', larghezza / 4 * 3 - 20, altezza / 2);

    // trasla il punto di origine dall'angolo in alto a sinistra della finestra al centro della finestra
    translate(larghezza / 2, altezza / 2);

    // scorre 2 volte l'array dei dati
    for (var i = 0; i < dati.length * 2; i++) {
        // coordinate cartesiane per il punto di ancoraggio delle barre
        var x;
        var y;

        // coordinate polari per il punto di ancoraggio delle barre
        var angolo = 0;

        // calcolo dell'angolo che divide il cerchio in dati.length * 2 parti
        angolo = 360 / (dati.length * 2) * i + 360 / (dati.length * 2) / 2;
        
        // conversione da coordinate polari a coordinate cartesiane
        x = dimensione_cerchio_interno * sin(angolo);
        y = dimensione_cerchio_interno * cos(angolo);
        
        // sposta l'origine sul punto di ancoraggio calcolato
        translate(x, y);
        // ruota la scena di -angolo°
        rotate(-angolo);
        // rimuove il bordo esterno dei rettangoli
        noStroke();
        // se si supera la 20sima iterazione, si accede all'array dei dati in senso decrescente
        if (i >= 20) {
            // imposta il colore di riempimento in funzione del numero di divorzi
            fill(0, map(dati[39 - i].divorzi, 0, massimo_divorzi, 180, 255), 255);
            // disegna un rettangolo nel punto di ancoraggio, con larghezza = larghezza_barre, e altezza che dipende dal valore dei divorzi
            rect(-larghezza_barre / 2, 0, larghezza_barre, map(dati[39 - i].divorzi, 0, max(massimo_matrimoni, massimo_divorzi), 0, dimensione_massima_cerchio_esterno));
        }
        // se non si è ancora superata la 20sima iterazione, si accede all'array dei dati in senso crescente
        else {
            // imposta il colore di riempimento in funzione del numero di matrimoni
            fill(160, map(dati[i].matrimoni, 0, 26447, 180, 255), 255);
            // disegna un rettangolo nel punto di ancoraggio, con larghezza = larghezza_barre, e altezza che dipende dal valore dei matrimoni
            rect(-larghezza_barre / 2, 0, larghezza_barre, map(dati[i].matrimoni, 0, max(massimo_matrimoni, massimo_divorzi), 0, dimensione_massima_cerchio_esterno));
        }
        // si annulla la rotazione
        rotate(angolo);
        // si annulla la traslazione
        translate(-x, -y);
    }
    
}

function carica_dati(file) {
    for (var i = file.feed.entry.length - 1; i >= 0; i--) {
        var regione = {
            "matrimoni": file.feed.entry[i].gsx$matrimoni.$t,
            "divorzi": file.feed.entry[i].gsx$divorzi.$t,
        }
        dati.push(regione);
    }
}

function trova_massimo() {
    for (var i = 0; i < dati.length; i++) {
        massimo_divorzi = max(massimo_divorzi, dati[i].divorzi);
        massimo_matrimoni = max(massimo_matrimoni, dati[i].matrimoni);
    }
}
