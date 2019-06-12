
// -
// iperDream 0.1 by Graziana Florio [sogno, narrazioni]
// 2018 © GrazianaFlorio @grazianaf, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to: 
// ml5.js Example LSTM Generator for https://github.com/ml5js/ml5-examples
// original license: MIT License 2018 
// 
// p5.speech.js Speech Recognition, Speech synthesis R.Luke DuBois The ABILITY lab New York University for http://ability.nyu.edu/p5.js-speech/, https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
// 
// Sentiment Analysis API & Entity Extraction Dandelion API for https://dandelion.eu/docs/
// original license: 
// 
// —

//////////////////////////////////////////ml5 predict
  let charRNN;
  let textInput;
  let startBtn;
  let resetBtn;
  let singleBtn;
  let generating = false;
//////////////////////////////////////////Registrazione
  var miaRegistrazione;
  var miaRegistrazioneText=" ";
  var livelloConfidence;
  var miaVoceSynth;
  let lingua= navigator.language;  
/////////////////////////////////////////Sentiment Analysis
  let token = 'db7f18bb566a4a498dd59f81cd627b8d';
  let testoDaAnalizzare = " ";
  let analisiCompletata = false;
  let sentiment = 0;
  let sentimentColor;
  let sentimentType = 'neutral';
  let lang = 'it';
/////////////////////////////////////////Entity extraction
  var img="&include=image%2C";
  var righe;
  var colonne;
  let immagini = [];
  let ARRIVATI = false;
  let offsetriga = 0;
  let offsetcolonna = 0;
////////////////////////////////////////carico il modello 
  charRNN = ml5.charRNN('./models/libri/', modelReady);
  
/////////////////////////////////////// carico voce speaker
  var myVoice = new p5.Speech('Google IT Italian Male');
  myVoice.onStart = speechStarted;
  myVoice.onEnd = speechEnded;
  var speakbutton; // User Interface
  var lyrics=" ";
  var testoRacconto;

////////////////////////////////////// SETUP
  function setup (){
    inizializza();
/////////////////////////////////////stoprec();
    livelloConfidence = 0;
    miaVoceSynth = new p5.Speech(); // sintetizzatore voce
    miaVoceSynth.setVoice(0);

/////////////////////////////////////
//affido variabile per selezionare elemento di html 
    textInput=select("#registrazione");
    startBtn = select('#start');
    resetBtn = select('#reset');
    singleBtn = select('#single');


////////////////////////////////////funzioni sugli elementi (bottoni)
    startBtn.mousePressed(generate);
    resetBtn.mousePressed(resetModel);
    singleBtn.mousePressed(predict);

//se clicco su reset inserisce il testo registrato nel div result e svuota il div registrazione 
      $("#reset").on("click",function(){
                console.log("cliccato");
               $("#result").html(" ");
                $("#registrazione").html(" ");
                if (miaRegistrazione.resultString){
                      $("#result").append(miaRegistrazione.resultString);
                      miaRegistrazioneText=" ";
                      testoDaAnalizzare=miaRegistrazione.resultString;
                      console.log(miaRegistrazione.resultString);
                      testoRacconto = testoRacconto + miaRegistrazione.ResultString
                     }
               //avvio analisi sentimento       
               sentimental_analysis();
          });
////////////////////////////SENTIMENTAL Analysis
    function sentimental_analysis(){
    let url = 'https://api.dandelion.eu/datatxt/sent/v1/?lang=' + lang + '&text=' + testoDaAnalizzare + '&token=' + token;
    loadJSON(url, showResponse);
  }
    colorMode(HSB, 360, 100, 100);
    //legge sogno macchina
    racconta();
  }
///////////////////////////////SETUP END
//////////////////////////////REGISTRAZIONE INIZIA
  function inizializza(){
    //se clicco su on avvio registrazione  
    $("#on").on("click",function(){
    //creo nuova registrazione
    console.log("inizializzato");
    miaRegistrazione = new p5.SpeechRec(lingua); 
    miaRegistrazione.continuous = true; // ricognizione continua con
    miaRegistrazione.interimResults = true; // risultati parziali (meno precisione)
    miaRegistrazione.start();
    miaRegistrazione.onResult = parseResult; // ritorna il risultato
      });
  }///////////////////////REGISTRAZIONE FINE

  //scrive model loaded in cosole quando il modello charRNN è pronto 
  async function modelReady() {
    console.log('Model Loaded');
    resetModel();
  }
  function resetModel(){
    charRNN.reset();
    const seed = select("#registrazione").value();
    charRNN.feed(seed);
    select('#result').html(seed);
  }
  //se clicco sul tasto start mi genera il sogno e sostituisce alla parola start la parola pause
  function generate(){
    if (generating) {
      generating = false;
      startBtn.html('Start');
      let par = select("#result"); 
    } else {
      generating = true;
      startBtn.html('Pause');
      loopRNN();
    }
  }
  async function loopRNN() {
    while (generating) {
      await predict();
    }
  }
//predice il risultato sulla base del modello sul quale la macchina 
// è allenata e lo mostra div result
  async function predict() {
    let par = select('#result');
    let next = await charRNN.predict(1);
    await charRNN.feed(next.sample);
    par.html(par.html() + next.sample);
    testoRacconto = testoRacconto + next.sample;
  }
////////////////////////REGISTRAZIONE INSERITA
//mostra i risultati della registrazione
  function parseResult() {
    livelloConfidence = miaRegistrazione.resultConfidence;
    if (livelloConfidence > 0.5){ // il livello di confidence (float) oscilla tra 0 e 1 del synth vocale
         miaRegistrazioneText += miaRegistrazione.resultString;
         miaRegistrazioneText += " ";
         $("#registrazione").html("");
         $("#registrazione").append(miaRegistrazione.resultString + "  ");
    }
  }
//////////////////////SENTIMENT ANALYSIS
  function showResponse(r_) {
    analisiCompletata = true;
    console.log(r_);
    sentiment = r_.sentiment.score;
    sentimentType = r_.sentiment.type;
    
    if (analisiCompletata==true){
        cambia_sfondo();  
        }
    }
  function cambia_sfondo(){
      sentimentColor = map(sentiment, -1, 1, 0, 180);
      console.log(sentimentColor);
      $('#container').css({'background-color':"hsl("+sentimentColor+","+100+"%,"+50+"%)"});
  }/////////////////////SENTIMENT END

///////////////////////RACCONTO e ENTITà
 function racconta(){
    //se clicco su reset inserisce il testo registrato 
  //nel div result e svuota il div registrazione 
      $("#speakbutton").on("click",function(){
                console.log("sto raccontando");  
                lyrics = lyrics + testoRacconto;               
                myVoice.speak("Ora ti racconto il mio sogno"+miaRegistrazioneText+ lyrics); 
                entita(); 
      });
}


function entita(){
  createCanvas(windowWidth,windowHeight);
  var api= "https://api.dandelion.eu/datatxt/nex/v1/?lang"+"&text="+testoRacconto + "&top_entities=12"+"&include=image"+img+'&token='+token;
  loadJSON(api,gotData);
}
function gotData(data) {
  // prendiamo la prima immagine... 
for(var i=0; i<data.annotations.length;i++){
  var linkimg = data.annotations[i].image.thumbnail;
  
  // carichiamo l'immagine
 var img= loadImage(
    linkimg, 
    immagineCaricata => {
      
    
    }, 
    loadImgErrFix // < in caso di errore chiamare la funzione loadImgErrFix
  );
  // inserisce l'immagine nell'array
  immagini.push(img);
  }
  
  ARRIVATI = true;
  //mostra le immagini
  draw();
  console.log(immagini); 
}

/* technic for CORS allow based on
 * LoadImageErrorOverride (v2.2.3)
 * by GoToLoop (2015/Jul/09)
 * https://codepen.io/anon/pen/zqbZYV?editors=0010
*/
function loadImgErrFix(errEvt) {
    const pic = errEvt.target;

    if (!pic.crossOrigin)  return print(`Failed to reload ${pic.src}!`);

    print(`Attempting to reload ${pic.src} as a tainted image now...`);
    pic.crossOrigin = null, pic.src = pic.src;
  }

///disegna le immagini 
function draw() {
  if (ARRIVATI == true){   
      hImg = 200;
      wImg = 300; 
      colonne=2;
      righe = immagini.length/2 + (immagini.length % 2);
     for(var i=0; i<immagini.length;i++){
       offsetriga = floor(i/colonne) * (hImg+20)
       offsetcolonna=wImg+20
       if (i % 2 == 0) {offsetcolonna=0}
       // Displays the image at its actual size at point (0,0)
       image(immagini[i], offsetcolonna, offsetriga,wImg,hImg);
     }     
  }
}