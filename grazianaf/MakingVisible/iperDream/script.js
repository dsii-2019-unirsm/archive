  /*
  Testing p5.js-speech + ml5/CharRNN algorithm for speech generation
  Speech CharRNN model trained on Antonio Gramsci 1st 'quaderno dal carcere' full text
  Copyright © 2019 @fupete Daniele Tabellini MIT license
  */
  

  ///////////////////////
  //ml5 predict
  let charRNN;
  let textInput;
  let startBtn;
  let resetBtn;
  let singleBtn;
  let generating = false;
  ////////////////////////////
  //registrazione
  var miaRegistrazione;
  var miaRegistrazioneText="";
  var livelloConfidence;
  var miaVoceSynth;
  let lingua= navigator.language;


  //variabili sentimental analysis
  let token = 'db7f18bb566a4a498dd59f81cd627b8d';
  let testoDaAnalizzare = " ";
  let analisiCompletata = false;
  let sentiment = 0;
  let sentimentColor;
  let sentimentType = 'neutral';
  let lang = 'it';


  // carico il modello 
  charRNN = ml5.charRNN('./models/libri/', modelReady)


  function setup (){
    //createCanvas(windowWidth,windowHeight);
   
    inizializza();
    stoprec();


    livelloConfidence = 0;
    miaVoceSynth = new p5.Speech(); // sintetizzatore voce
    miaVoceSynth.setVoice(0);

  //affido un nome per selezionare elemento di html 
    textInput=select("#registrazione");
    startBtn = select('#start')
    resetBtn = select('#reset')
    singleBtn = select('#single')

  //funzioni sugli elementi (bottoni)
    startBtn.mousePressed(generate)
    resetBtn.mousePressed(resetModel)
    singleBtn.mousePressed(predict)

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
                     }
               sentimental_analysis();
          });

    //////////////////
    //SENTIMENTAL
    function sentimental_analysis(){
    let url = 'https://api.dandelion.eu/datatxt/sent/v1/?lang=' + lang + '&text=' + testoDaAnalizzare + '&token=' + token;
    loadJSON(url, showResponse);
  }
   // let ent= "https://api.dandelion.eu/datatxt/nex/v1/?lang=" + lang + '&text=' + contenuto + '&token=' + token;
   //    loadJSON(ent, mostraImmagini);
    colorMode(HSB, 360, 100, 100);
  }
    


  function inizializza(){

  $("#on").on("click",function(){

    //creo nuova registrazione
    console.log("inizializzato");
    miaRegistrazione = new p5.SpeechRec(lingua); 
    miaRegistrazione.continuous = true; // ricognizione continua con
    miaRegistrazione.interimResults = true; // risultati parziali (meno precisione)
   
      miaRegistrazione.start();
       miaRegistrazione.onResult = parseResult; // ritorna il risultato
      });
  }
  function stoprec(){
    $("#off").on("click",function(){
      //manca elemento dalla reference che stoppi la rec
    console.log("stop");
  });
  }
  //scrive model loaded quando il modello è pronto nell'id status
  //resetta il modello 
  async function modelReady() {
    console.log('Model Loaded')
    resetModel()
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

  //predice il risultato sulla base del modello sul quale la macchina è allenata e lo mostra 
  // div result
  async function predict() {
    let par = select('#result');
    let next = await charRNN.predict(1);
    await charRNN.feed(next.sample);
    par.html(par.html() + next.sample);
  }



  //mostra i risultati della registrazione
  function parseResult() {
    livelloConfidence = miaRegistrazione.resultConfidence;

    if (livelloConfidence > 0.5){ // il livello di confidence (float) oscilla tra 0 e 1 del synth vocale
         miaRegistrazioneText += miaRegistrazione.resultString;
         miaRegistrazioneText += " ";
         $("#registrazione").html("");
         $("#registrazione").append(miaRegistrazione.resultString);
      }
  }

  function showResponse(r_) {
    analisiCompletata = true;
    console.log(r_);
    sentiment = r_.sentiment.score;
    sentimentType = r_.sentiment.type;
    if (analisiCompletata==true){
   cambia_sfondo();  }
   
  }
    
     


  // function mostraImmagini(e_){
  //    entita= true;
  //    console.log(e_);
  //    mostraEtichetta=e_.label;
  //    mostraTipo= e_.types;
  //    mostraImage= e_image;

  // }

  function cambia_sfondo(){
      sentimentColor = map(sentiment, -1, 1, 0, 180);
      console.log(sentimentColor);
      
      
  $('#container').css({'background-color':"hsl("+sentimentColor+","+100+"%,"+50+"%)"});
      //background(sentimentColor,100,100);
  }
