//Riconosce e scrive sogno. 

///////////////////////////////////////////////

var miaRegistrazione;
var miaRegistrazioneText;
var livelloConfidence;
var miaVoceSynth;
 
let lang= navigator.language;

function setup() {
	createCanvas(1500, 900);

	livelloConfidence = 0;
	miaRegistrazioneText="";
	inizializza(); //inizializza
	// sintetizzatore voce
	miaVoceSynth = new p5.Speech();
	miaVoceSynth.setVoice(0);
}
 
//=========================================
function inizializza(){
	//creo nuova registrazione
	miaRegistrazione = new p5.SpeechRec(lang); 
	miaRegistrazione.continuous = true; // ricognizione continua con
	miaRegistrazione.interimResults = true; // risultati parziali (meno precisione)
	miaRegistrazione.onResult = parseResult; // ritorna il risultato
	console.log(miaRegistrazione);
}
 
function draw() {
	background(0);
	fill(0);
	rect(width/2,0,500,height);
 
	fill(255);
	textFont("Georgia");
	textSize(18);
	textAlign(LEFT);
	text("Cosa hai sognato oggi?", 100, 150);
	text(miaRegistrazioneText, 100, 190);
}

function keyPressed(){
	if (key === ' '){
		//ricarica
		inizializza();
	}
}

function parseResult() {
	livelloConfidence = miaRegistrazione.resultConfidence;
	if (livelloConfidence > 0.5){ // il livello di confidence (float) oscilla tra 0 e 1 del synth vocale
		console.log (miaRegistrazione.resultString);
 		miaRegistrazioneText = miaRegistrazione.resultString;
	}
}

