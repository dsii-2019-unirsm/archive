var nomi = ["x", "o", "*", "-"];
var tabla;
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
let elementi_tab;
let gui = new UIL.Gui({ // interfaccia
  css:'right:0; top:0; text-align: center;',
  bg:'rgb(30,30,30)',
  w:400,
  center:true,
});
var play_live = function( v ){
if (v=='x'){
  serial.write('x');
} else if (v=='o'){
  serial.write('o');
} else if (v=='-'){
  serial.write('-');
} else if (v=='*'){
  serial.write('*');
}
console.log(v);
 }
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

  serial = new p5.SerialPort();
  serial.list();
  serial.open(portName);
  serial.on('list', gotList);
  serial.on('data', gotData);
  setupGui();
}
function setupGui() {

  gui.add('button', {name:'Play', fontColor:'#ffe271', h:30, radius:10}).onChange(function(v){
    play_riproduzione();});
   gui.add('button', { name:'Stop', fontColor:'#ffe271', h:30, radius:10}).onChange(function(v){
    stop_riproduzione();});



  // pulsante
  gui_gr2 = gui.add('group', { name:'Stringa automatica',fontColor:'#72a8ff'});
  gui_gr2.add('knob', { name:'bpm',w:150, min:60, max:120, precision:0, value:60,fontColor:'#ffe271',  callback:battiti_x_min });
  gui_gr2.add('knob', { name:'lunghezza partitura',w:150, min:4, max:32,step:4, precision:0, value:4,fontColor:'#ffe271',  callback:lung_partitura });
  gui_gr2 .add('button', { name:'Genera', fontColor:'#ffffff', h:20, radius:10}).onChange(function(v){
    genera_pattern(),
    display_pattern();});

  // gui_gr3 = gui.add('group', { name:'Stringa manuale',fontColor:'#72a8ff'});
  // gui_gr3.add('knob', { name:'lunghezza stringa',w:75, min:4, max:32, precision:0, step:4, value:4,fontColor:'#ffe271',  callback:cambiaYTesto });
  // gui_gr3 .add('button', { name:'KICK', fontColor:'#ffffff', h:50, radius:10, value:['x','o','-','*']}).onChange(function(v){
  //   coloreSfondo = color(random(255), random(255), random(255));});

  gui_gr4 = gui.add('group', { name:'Live',fontColor:'#ffe271'});
    gui_gr4 .add('button', { h:50, radius:10, value:['x','o','*','-'],fontColor:'#ffe271'}).onChange(play_live);;
}

var battiti_x_min = function(valore) {
  battiti = valore;
}

var lung_partitura = function(valore) {
  elementi_tab = valore;
}
function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {}
}

function gotData() {
  var currentString = serial.readLine();
}



function scegli_parole(nomi) {
  let a = parseInt(random(nomi.length));
}

function genera_pattern() {
  fill(0);
  tabla = "";
  //let elementi_tab = parseInt(random(1, 5)) * 4;
  //battiti = 120.0;
  bpm = map(battiti, 60, 240, 0.5, 2.0);
  console.log(elementi_tab);
  console.log(battiti);
  Clock.rate = bpm;
  Clock.timeSignature = elementi_tab + "/" + elementi_tab;
  for (i = 0; i < elementi_tab; i++) {
    let a = parseInt(random(nomi.length));
    tabla += nomi[a];
  }
  return tabla;
}

function keyTyped(){
  if (key==='a'){
    serial.write('x');
  } else if (key==='s'){
    serial.write('o');
  } else if (key==='d'){
    serial.write('*');
  } else if (key==='f'){
    serial.write('-');
  }
}

function display_pattern() {

  textSize(20);
  translate(50*tasto_stop,0);
  noStroke();
  text(tabla, 10, 100);
}

function stop_riproduzione() {
  if (suona != "") clearTimeout(suona);
  if (drums != "") {
    drums.kill();
    drums = "";
    tasto_stop=tasto_stop+1;
    translate(-50*(tasto_stop),0);
    prima_pos=0;
    numero_caratteri=0;
  }
}

function play_riproduzione() {
  drums = EDrums(tabla);
  console.log(tabla);
  invia_segnale();
  if (suona != "") clearTimeout(suona);
  let tempo_segnale = (60/battiti)*1000;
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

function disegna(){
  colorMode(HSB);
  //fill(random(255),255,255);
  stroke(random(130,190),255,255,100)
  noFill();
  strokeWeight(1);
  textSize(200);
  prima_pos =(numero_caratteri*5);
  text(carattere, prima_pos, 300);
  let spostamento=-((tabla.length)*3.5);

  if (numero_caratteri>tabla.length*(10)){
    translate(spostamento,50);
    numero_caratteri=0;
    //console.log(spostamento);
  }
}
