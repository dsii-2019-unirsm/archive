// oggetto classificatore
let mobilenet;
// larghezza dell'immagine
let larghezza = 640;
// altezza dell'immagine
let altezza = 480;
// oggetto di cattura video
let camera;
// pose generate da posenet
let poses = [];
// classificatore non allenato
let classificatore;
// ultima parola sentita dal riconoscimento vocale
var ultimaParola;
// flag per la modalità di ascolto
var modalitaAscolto = false;
// parola chiave in modalità di ascolto
var parolaChiave;
// ultima etichetta di oggetti da imparare per il classificatore
var nuovaEtichetta;
// flag per indicare se il classificatore è allenato
var allenato = false;
// timer per l'aquisizione delle immagini
var timer;
// flag per la modalità di aquisizione immagini
var acquisizioneImmagini = false;
// array per contenere gli oggetti item da far riconoscere al classificatore
var oggetti = [];
// centro dello zoom
var centroX = 0;
var centroY = 0;
// flag per indicare se ci sono pose da identificare
var posePronto = false;
// oggetto zoom per indicare il tipo di zoom
var zoom = {tipo: "none"};
// flag per indicare se fare o no zoom
var attivaZoom = false;
// contatore per rallentare il classificatore
var counter = 0;

// funzione di callback, viene eseguita ad ogni step dell'allenamento
function whileTraining(loss) {
    console.log(loss);
}

// funzione di callback, viene eseguita quando il classificatore è pronto
function modelReady() {
    console.log('Model is ready');
}

// funzione di callback, viene eseguita quando posenet è pronto
function poseReady() {
    console.log("Pose is ready");
}

// funzione di callback, viene eseguita quando il classificatore classifica un immagine
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        // riconoscimento di oggetti (espandibile)
        if ((results[0].label == "mascara" || results[0].label == "lenti" || results[0].label == "pinze") &&
            (results[0].confidence >= 0.7))  {
            zoom.tipo = "occhi";
        }
        else if ((results[0].label == "rossetto" || results[0].label == "lucidalabbra" || results[0].label == "lametta" || results[0].label == "rasoio" || results[0].label == "spazzolino") &&
                 (results[0].confidence >= 0.7)) {
            zoom.tipo = "bocca";
        }
        else {
            zoom.tipo = "none";
        }
    }
}

// oggetto di riconoscimento vocale p5.speech
var myRec = new p5.SpeechRec();
// esegue riconoscimento continuo
myRec.continuous = true;

// prima funzione ad eseguire
function setup() {
    // crea l'area per disegnare di p5
    createCanvas(larghezza, altezza);
    // imposta lo sfondo a nero
    background(0);

    // crea l'oggetto di cattura video
    camera = createCapture(VIDEO);
    camera.size(larghezza, altezza);
    camera.hide();

    // l'oggetto di riconoscimento audio esegue la funzione analizzaAudio quando identifica una parola
    myRec.onResult = analizzaAudio;
    // in caso di errore o terminazione dell'oggetto di riconoscimento audio, viene chiamata la funzione restart
    myRec.onError = restart;
    myRec.onEnd = restart;
    // inizializza l'oggetto di riconoscimento audio
    myRec.start();

    // inizializza posenet (riconoscimento facciale)
    poseNet = ml5.poseNet(camera, poseReady);

    // quando pose net riconosce una posa
    poseNet.on('pose', function (results) {
        // passa l'oggetto che rappresenta le pose alla variabile poses
        poses = results;
        // e imposta il flag di pose riconosciute a true
        posePronto = true;
    });

    // viene caricato il modello di classificazione mobilenet e ne vengono estratte le caratteristiche
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    mobilenet.numClasses = 4;
    mobilenet.numLabels = 4;
    // viene creato un oggetto classificatore con le caratteristiche del modello mobilenet
    classificatore = mobilenet.classification(camera);
}

// funzione di loop di p5
function draw() {
    // imposta la dimensione del testo
    textSize(20);
    // salva le impostazioni di trasformazione (traslazione / rotazione / scala) correnti
    push();

    // specchia l'immagine
    translate(larghezza, 0);
    scale(-1.0, 1.0);
    // zoomma e trasla l'immagine in corrispondenza
    if (attivaZoom == true && zoom.tipo != "none") {
        translate(-larghezza / 3 - ((-larghezza / 3) + centroX * 3), -altezza / 3 - ((-altezza / 3) + centroY * 3));
        scale(4, 4);
    }

    // mostra l'immagine catturata dalla webcam
    image(camera, 0, 0, larghezza, altezza);

    // se le pose sono pronte
    if (posePronto) {
        // se viene riconosciuta almeno una posa
        if (poses.length > 0) {
            // calcola il centro del volto (centro tra gli occhi)
            centroX = (poses[0].pose.keypoints[1].position.x + poses[0].pose.keypoints[2].position.x) / 2;
            centroY = (poses[0].pose.keypoints[1].position.y + poses[0].pose.keypoints[2].position.y) / 2;
            // se lo zoom è di tipo bocca
            if (zoom.tipo == "bocca") {
                // sposta il centro più in basso
                centroY += 100;
            }
            // se il centro esce dai parametri limite di zoom, riportalo nei parametri sicuri
            if (centroX >= (larghezza - (larghezza / 4))) {
                centroX = larghezza - (larghezza / 4);
            }
            else if (centroX <= (0 + larghezza / 4)) {
                centroX = larghezza / 4;
            }

            if (centroY >= (altezza - (altezza / 4))) {
                centroY = altezza - altezza / 4;
            }
            else if (centroY <= (0 + altezza / 4)) {
                centroY = altezza / 4;
            }
            // disegna il centro
            fill(255, 0, 0);
            noStroke();
            ellipse(centroX, centroY, 10, 10);
        }
        // se non viene trovata nessuna posa, metti il centro in (0, 0)
        else {
            centroX = 0;
            centroY = 0;
        }
    }
    // reimposta le impostazioni precedenti alla trasformazione (zoom)
    pop();
    // imposta il colore di riempimento a bianco
    fill(255);
    // imposta il colore di contorno a nero
    stroke(0);
    // imposta lo spessore di contorno a 4px
    strokeWeight(4);
    // allinea il testo al centro
    textAlign(CENTER);
    // mostra a schermo l'ultima parola captata dal riconoscimento vocale
    text(ultimaParola, larghezza / 2, 440);

    // se il classificatore ha degli oggetti da classificare e non è ancora stato allenato
    if (oggetti.length > 0 && allenato == false) {
        // scorre tutti gli elementi da classificare
        for (var i = 0; i < oggetti.length; i++) {
            // rimuove il contorno
            noStroke();
            // allinea il testo a destra
            textAlign(RIGHT);
            // mostra l'oggetto identificato
            fill(255);
            text(oggetti[i].nome, larghezza - 50 * 3 - 40, 30 * (i + 1) + 16);

            // disegna la barra di caricamento
            if (oggetti[i].numero != 0) {
                fill(255, 0, 0);
                rect(larghezza - 50 * 3 - 20, 30 * (i + 1), (50 - oggetti[i].numero) * 3, 20);
            }
            // disegna la barra caricata
            else {
                fill(0, 255, 0);
                rect(larghezza - 50 * 3 - 20, 30 * (i + 1), 50 * 3, 20);
            }
        }
    }

    // se il classificatore è in fase di aquisizione di immagini
    if (acquisizioneImmagini) {
        // imposta un timer di 200ms. alla fine di 200ms chiama la funzione aggiungi
        timer = setTimeout(aggiungi, 200);
        // termina l'aquisizione di immagini
        acquisizioneImmagini = false;
    }

    // se il classificatore è allenato (la classificazione viene eseguita ogni 100 frame)
    if (allenato && counter % 100 == 0) {
        // classifica il frame corrente
        classificatore.classify(gotResults);
    }
    counter++;
}

// funzione chiamata dal timer in fase di aquisizione immagini
function aggiungi() {
    // aggiungi il frame corrente al classificatore
    classificatore.addImage(nuovaEtichetta);
    // riduci il contatore di frame da caricare per quell'oggetto
    oggetti[oggetti.length - 1].numero -= 1;
    // continua l'aquisizione di immagini finchè il counter non termina (50 immagini)
    if (oggetti[oggetti.length - 1].numero >= 1) {
        acquisizioneImmagini = true;
    }
}

// funzione chiamata dal riconoscimento vocale in caso di riconoscimento di una nuova parola
function analizzaAudio() {
    // aquisizione della nuova parola
    ultimaParola = myRec.resultString.split(' ').pop();
    console.log(ultimaParola);

    // se il classificatore è in fase di ascolto
    if (modalitaAscolto) {
        // l'ultima parola sentita diventa una parola chiave
        parolaChiave = ultimaParola;
        // se la parola è "allena"
        if (parolaChiave == "riconosci") {
            // allena il classificatore
            classificatore.train(whileTraining);
            allenato = true;
            attivaZoom = true;
        }
        // se la parola chiave è stop / ferma / fermati
        else if (parolaChiave == "stop" || parolaChiave == "ferma" || parolaChiave == "fermati" || parolaChiave == "sto") {
            // disattiva lo zoom
            attivaZoom = false;
        }
        // se la parola chiave è start / inizia / parti
        else if (parolaChiave == "start" || parolaChiave == "inizia" || parolaChiave == "parti") {
            // attiva lo zoom
            attivaZoom = true;
        }
        // altrimenti viene aggiunto un elemento al classificatore
        else if (allenato == false && (parolaChiave != "lol" && parolaChiave != "Lol" && parolaChiave != "LOL")) {
            // la nuova etichetta diventa la parola chiave
            nuovaEtichetta = parolaChiave;
            // entra in modalità di aquisizione di immagini
            acquisizioneImmagini = true;
            // aggiunge all'array oggetti l'oggetto corrispondente
            oggetti.push({"numero" : 50, "nome" : parolaChiave});
        }
        // esce dalla modalità ascolto
        modalitaAscolto = false;
    }
    // se viene riconosciuta la parola lol
    if (ultimaParola == "lol" || ultimaParola == "Lol" || ultimaParola == "LOL") {
    // if (ultimaParola == "abba" || ultimaParola == "Abba" || ultimaParola == "ABBA") {
        // si entra in modalità ascolto
        console.log("modalità ascolto");
        modalitaAscolto = true;
    }
}

// funzione chiamata dall'oggetto di riconoscimento vocale in caso di errore o terminazione
function restart() {
    // inizializza l'oggetto di riconoscimento vocale
    myRec.start();
}
