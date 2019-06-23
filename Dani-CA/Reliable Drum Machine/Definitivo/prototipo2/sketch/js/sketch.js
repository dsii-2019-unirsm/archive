// -
// Reliable Drum Machine - Prototipo_2 0.1 by Daniele Cappai [DrumMachine, Audio]
// 2018 © Dani-CA, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to:
// @Charlie Roberts for http://charlie-roberts.com/


var nomi = ["x", "o", "*", "-"];
var tabla = [];
let x = 'x';
let o = 'o';
let ast = '*';
let tr = '-';
var drums = "";
var contatore = -1;
var carattere;
let tempo = 0;
var suona = "";
let battiti;
var serial;
var portName = '/dev/cu.usbmodem14201';
var outMessage = "";
let numero_caratteri = -1;
let prima_pos = 0;
let tasto_stop = 1;
let bpm;
let acapo = 0;
let ytesto;
let pos_testo;
let elementi_tab;
let gui = new UIL.Gui({ // interfaccia
  css: 'right:0; top:0; text-align: center;',
  bg: 'rgb(30,30,30)',
  w: 400,
  center: true,
});
var play_live = function(v) {
  tabla = "";
  if (v == 'x') {
    serial.write('x');
  } else if (v == 'o') {
    serial.write('o');
  } else if (v == '-') {
    serial.write('-');
  } else if (v == '*') {
    serial.write('*');
  }
  console.log(v);
}

var ins_elemento = function(v) {
  if (v == 'x') {
    tabla += (x);
    fill(0);
    textSize(20);
    text(tabla, 10, 100);
    console.log(tabla.length);
  } else if (v == 'o') {
    tabla += (o);
    fill(0);
    textSize(20);
    text(tabla, 10, 100);
    console.log(tabla.length);
  } else if (v == '-') {
    tabla += (tr);
    fill(0);
    textSize(20);
    text(tabla, 10, 100);
    console.log(tabla.length);
  } else if (v == '*') {
    tabla += (ast);
    fill(0);
    textSize(20);
    text(tabla, 10, 100);
    console.log(tabla.length);
  }
}

// function preload() {
//   font1 = loadFont('BluePrinted.otf');
// }

function getMeChar() {
  if (contatore < tabla.length) {
    carattere = tabla[contatore];
  } else {
    contatore = 0;
  }
  contatore++;
  return (carattere);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // textFont(font1);
  serial = new p5.SerialPort();
  serial.list();
  serial.open(portName);
  serial.on('list', gotList);
  serial.on('data', gotData);
  setupGui();
}

function setupGui() {

  gui.add('button', {
    name: 'Play',
    fontColor: '#ffe271',
    h: 30,
    radius: 10
  }).onChange(function(v) {
    play_riproduzione();
  });
  gui.add('button', {
    name: 'Stop',
    fontColor: '#ffe271',
    h: 30,
    radius: 10
  }).onChange(function(v) {
    stop_riproduzione();
  });
  gui.add('button', {
    name: 'Clear',
    fontColor: '#ffe271',
    h: 30,
    radius: 10
  }).onChange(function(v) {
    ripulisci();
  });



  // pulsante
  gui_gr2 = gui.add('group', {
    name: 'Stringa automatica',
    fontColor: '#72a8ff'
  });
  gui_gr2.add('knob', {
    name: 'bpm',
    w: 150,
    min: 60,
    max: 120,
    precision: 0,
    value: 60,
    fontColor: '#ffe271',
    callback: battiti_x_min
  });
  gui_gr2.add('knob', {
    name: 'lunghezza partitura',
    w: 150,
    min: 4,
    max: 32,
    step: 4,
    precision: 0,
    value: 4,
    fontColor: '#ffe271',
    callback: lung_partitura
  });
  gui_gr2.add('button', {
    name: 'Genera',
    fontColor: '#ffffff',
    h: 20,
    radius: 10
  }).onChange(function(v) {
    genera_pattern(),
      display_pattern();
  });

  gui_gr3 = gui.add('group', {
    name: 'Stringa manuale',
    fontColor: '#72a8ff'
  });
  gui_gr3.add('knob', {
    name: 'bpm',
    w: 150,
    min: 60,
    max: 120,
    precision: 0,
    value: 60,
    fontColor: '#ffe271',
    callback: battiti_x_min
  });
  gui_gr3.add('knob', {
    name: 'lunghezza partitura',
    w: 150,
    min: 4,
    max: 32,
    step: 4,
    precision: 0,
    value: 4,
    fontColor: '#ffe271',
    callback: lung_partitura
  });
  gui_gr3.add('button', {
    h: 50,
    radius: 10,
    value: ['x', 'o', '*', '-'],
    fontColor: '#ffe271'
  }).onChange(ins_elemento);;
  gui_gr3.add('button', {
    name: 'Inserisci',
    fontColor: '#ffffff',
    h: 20,
    radius: 10
  }).onChange(function(v) {
    genera_pattern_man();
  });

  gui_gr4 = gui.add('group', {
    name: 'Live - Keyboard A-S-D-F',
    fontColor: '#ffe271'
  });
  gui_gr4.add('button', {
    h: 50,
    radius: 10,
    value: ['x', 'o', '*', '-'],
    fontColor: '#ffe271'
  }).onChange(play_live);;
}

var battiti_x_min = function(valore) {
  battiti = valore;
}

var lung_partitura = function(valore) {
  elementi_tab = valore;
  console.log(elementi_tab);
}

function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {}
}

function gotData() {
  var currentString = serial.readLine();
}

function ripulisci(){
  background(255);
}

function scegli_parole(nomi) {
  let a = parseInt(random(nomi.length));
}

function genera_pattern() {
  fill(0);
  tabla = "";

  bpm = map(battiti, 60, 120, 0.5, 1.0);
  console.log(elementi_tab);
  console.log(battiti);
  Clock.rate = bpm;
  Clock.timeSignature = elementi_tab + "/" + elementi_tab;
  for (i = 0; i < elementi_tab; i++) {
    let a = parseInt(random(nomi.length));
    tabla += nomi[a];
  }
  console.log(tabla);
  return tabla;
}

function genera_pattern_man() {

  bpm = map(battiti, 60, 120, 0.5, 1.0);

  Clock.rate = bpm;

  Clock.timeSignature = elementi_tab + "/" + elementi_tab;
  return tabla;
}

function keyTyped() {
  if (key === 'a') {
    serial.write('x');
  } else if (key === 's') {
    serial.write('o');
  } else if (key === 'd') {
    serial.write('*');
  } else if (key === 'f') {
    serial.write('-');
  }
}

function display_pattern() {

  textSize(20);
  noStroke();
  text(tabla, 10, 100);

}

function stop_riproduzione() {
  if (suona != "") clearTimeout(suona);
  if (drums != "") {
    push();
    drums.kill();

    drums = "";
    tasto_stop = tasto_stop + 1;
    translate(-50 * (tasto_stop), 0);
    prima_pos = 0;
    numero_caratteri = 0;
    pop();
  }
}

function play_riproduzione() {
  drums = EDrums(tabla);
  console.log(tabla);
  invia_segnale();
  if (suona != "") clearTimeout(suona);
  let tempo_segnale = (60 / battiti) * 1000;
  suona = setInterval(invia_segnale, tempo_segnale);

}

function invia_segnale() {
  contatore++;
  let lung_tab = tabla.length;
  carattere = tabla[contatore % lung_tab];
  serial.write(carattere);
  disegna();
  numero_caratteri++;
}

function disegna() {
  colorMode(HSB);
  stroke(random(100, 200), 255, 255, 100)
  noFill();
  strokeWeight(2);
  textSize(200);
  prima_pos = (numero_caratteri * 5);
  ytesto = 300;
  text(carattere, prima_pos, ytesto);

  if (numero_caratteri != 0 && numero_caratteri % 180 == 0) {
    push();
    translate(0, 80);
    numero_caratteri = -2;
    acapo += (1);
  }
  if (acapo == 5){
  cancella_disegno();
  pop();


  }
}

function cancella_disegno(){
    push();
    translate(0,120);
    background(255);
    pop();
    acapo == 0;
}
