// -
// Reliable Drum Machine - Prototipo_1 0.1 by Daniele Cappai [ML, Audio]
// 2018 © Dani-CA, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to:
// @naotokui (twitter.com/nome) for https://https://codepen.io/naotokui/pen/rrGGNJ

// Copyright (c) 2019 by nao tokui (https://codepen.io/naotokui/pen/rrGGNJ)
// Fork of an original work by nao tokui (https://codepen.io/naotokui/pen/NBvbBY)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var modelpath = "https://s3-ap-northeast-1.amazonaws.com/codepen-dev/models/drum_classification_128/model.json";

// classes in drumset
var audio_classes = ['kick', 'snare', 'closed hihat', 'open hihat', 'low tom', 'mid tom', 'high tom', 'clap','rim'];
var serial;
var portName = '/dev/cu.usbmodem14201';
let classId;
let isRecording;

// waveform viewer / wavesurfer.js
var wavesurfer = WaveSurfer.create({
   container: '#ws-waveform',
   waveColor: '#00a0b5',
   progressColor: 'white',
   scrollParent: true,
});

// Global Varibals / Constants
var soundFile; // p5-sound.js
var model;     // tensorflow.js model

var SR_model = 16000;
var NB_mel = 128;     // Num of MelFilterBank bins
var MIN_DB = -80;     // minimum dB of power spectrogram
var mic, recorder, soundFile;


function setup(){
   // add buttons
   var button = createButton('REC');
   button.mousePressed(startRecording);
   select(".buttons").child(button);
   var button2 = createButton('play');
   button2.mousePressed(playSound);
   select(".buttons").child(button2);

   serial = new p5.SerialPort();
   serial.list();
   serial.open(portName);
   serial.on('list', gotList);
   serial.on('data', gotData);

   mic = new p5.AudioIn();
   mic.start();
   recorder = new p5.SoundRecorder();
   recorder.setInput(mic);
   soundFile = new p5.SoundFile();
}

function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {}
}

function gotData() {
  var currentString = serial.readLine();
}



function startRecording(){
  if (mic.enabled === false) {
    select("#ws-waveform-text").html('Allow mic input please!');
    return;
  }
  if (!isRecording){
    recorder.record(soundFile, 2.0, onRecStop);
  }
}

function onRecStop(){
  isRecording = false;
  onLoaded();
}

function playSound(){
   soundFile.play();
}

function onLoaded(){
   // show waveform on wavesurfer component
   wavesurfer.loadDecodedBuffer(soundFile.buffer);

   // classify using the tensorflow model
   classify();
}

function classify(){
   if (soundFile.isLoaded()){
      classifyAudio(soundFile.buffer);

      // Resample and classify
      var buffer = soundFile.buffer;
      resampleBuffer(buffer, buffer.length, buffer.sampleRate, SR_model, classifyAudio);
   }
}

function classifyAudio(buffer){
   // Get spectrogram matrix
   let db_spectrogram = createSpectrogram(buffer, false);

   // The input
   const melCount = NB_mel;

   // Create tf.tensor2d
   const tfbuffer = tf.buffer([melCount, melCount]);
   let lng = melCount;
   if (db_spectrogram.length < melCount) lng = db_spectrogram.length;

   // Initialize the tfbuffer.
   for (var i = 0; i < melCount ; i++) {
      for (var j = 0; j < melCount; j++) {
         tfbuffer.set(MIN_DB, i, j);
      }
   }

   // Fill the tfbuffer with spectrogram data in dB
   for (var i = 0; i < lng ; i++) {
      for (var j = 0; j < melCount; j++) {
         tfbuffer.set(db_spectrogram[i][j], j, i); // cantion: needs to transpose the matrix
      }
   }

   // Reshape for prediction
   input_tensor = tfbuffer.toTensor();
   input_tensor = tf.reshape(input_tensor, [1, input_tensor.shape[0], input_tensor.shape[1], 1]);

   // TO DO: fix this loading process
   async function predict()
   {
      try {
         model = await tf.loadModel(modelpath);
         predictions = model.predict(input_tensor);

         classId = tf.argMax(tf.squeeze(predictions)).asScalar().get();
         select('#result').html(audio_classes[classId]);
         invia_segnale();
      } catch( err ) {
         console.error( err );
      }
   }
   predict();
}

function createSpectrogram(buffer, returnsImage){

   const fftSize = 1024;               // fft window size
   const hopSize = 256;                // overlap size
   const channelOne = buffer.getChannelData(0);  // use only the first channel
   const bufferLength = buffer.length;
   const sampleRate = buffer.sampleRate;
   const spectrogram = [];
   const db_spectrogram = [];
   const melCount = NB_mel;

   // Create a fft object. Here we use default "Hanning" window function
   const fft = new FFT(fftSize, sampleRate);

   // Mel Filterbanks
   var melFilterbanks = constructMelFilterBank(fftSize/2, melCount,
                                               lowF=0, highF=sampleRate/2, sr=sampleRate);

   // Segment
   let currentOffset = 0;
   let maxValue = 0.0;

   var maxdb = -100;
   while (currentOffset + fftSize < channelOne.length) {
      const segment = channelOne.slice(currentOffset, currentOffset + fftSize);
      fft.forward(segment);  // generate spectrum for this segment
      let spectrum = fft.spectrum.map(x => x * x); // should be power spectrum!

      const melspec = applyFilterbank(spectrum, melFilterbanks);

      for (let j = 0; j < melCount; j++) {
         melspec[j] += 0.000000001; // avoid minus infinity
      }

      const decibels = new Float32Array(melCount);
      for (let j = 0; j < melCount; j++) {
         db = 10 * Math.log10(melspec[j]);
         decibels[j] = db;
         if (db > maxdb) maxdb  = db;
      }
      db_spectrogram.push(decibels);
      currentOffset += hopSize;
   }
   for (let i=0; i < db_spectrogram.length; i++){
      for (let j = 0; j < melCount; j++){
         db_spectrogram[i][j]  -= maxdb;
      }
   }

   // Create P5 Image and return for showing  the waveform
   if (returnsImage){
      var specW = melCount;
      var specH = melCount;
      var img = createImage(specW, specH);
      img.loadPixels();
      for (var i = 0; i < img.width; i++) {
         for (var j = 0; j < img.height; j++) {
            var c = MIN_DB; // minimum dB value
            if (i < db_spectrogram.length) c = db_spectrogram[i][img.height - j - 1]; // Y-axis should be flipped.
            c = map(c, MIN_DB, 0, 0, 255);
            img.set(i, j, color(c));
         }
      }
      img.updatePixels();
      return img;
   }

   return db_spectrogram;
}




function sum(array) {
   return array.reduce(function(a, b) { return a + b; });
}

function applyFilterbank(spectrum, filterbank) {
   if (spectrum.length != filterbank[0].length) {
      console.error(`Each entry in filterbank should have dimensions matching
FFT. |FFT| = ${spectrum.length}, |filterbank[0]| = ${filterbank[0].length}.`);
      return;
   }

   // Apply each filter to the whole FFT signal to get one value.
   let out = new Float32Array(filterbank.length);
   for (let i = 0; i < filterbank.length; i++) {
      const win = applyWindow(spectrum, filterbank[i]);
      out[i] = sum(win);
   }
   return out;
}

function  applyWindow(buffer, win) {
   let out = new Float32Array(buffer.length);
   for (let i = 0; i < buffer.length; i++) {
      out[i] = win[i] * buffer[i];
   }
   return out;
}


// This implementation of MelFilterBank is based on:
// https://github.com/vail-systems/node-mfcc/blob/master/src/mfcc.js
function melsToHz(mels) {
   return 700 * (Math.exp(mels / 1127) - 1);
}

function hzToMels(hertz) {
   return 1127 * Math.log(1 + hertz/700);
}

function constructMelFilterBank(fftSize, nFilters, lowF, highF, sr) {
   var bins = [],
       fq = [],
       filters = [];

   var lowM = hzToMels(lowF),
       highM = hzToMels(highF),
       deltaM = (highM - lowM) / (nFilters+1);

   // Construct equidistant Mel values between lowM and highM.
   for (var i = 0; i < nFilters; i++) {
      // Get the Mel value and convert back to frequency.
      // e.g. 200 hz <=> 401.25 Mel
      fq[i] = melsToHz(lowM + (i * deltaM));

      // Round the frequency we derived from the Mel-scale to the nearest actual FFT bin that we have.
      // For example, in a 64 sample FFT for 8khz audio we have 32 bins from 0-8khz evenly spaced.
      bins[i] = Math.floor((fftSize+1) * fq[i] / (sr/2));
   }

   // Construct one cone filter per bin.
   // Filters end up looking similar to [... 0, 0, 0.33, 0.66, 1.0, 0.66, 0.33, 0, 0...]
   for (var i = 0; i < bins.length; i++)
   {
      filters[i] = [];
      var filterRange = (i != bins.length-1) ? bins[i+1] - bins[i] : bins[i] - bins[i-1];
      filters[i].filterRange = filterRange;
      for (var f = 0; f < fftSize; f++) {
         // Right, outside of cone
         if (f > bins[i] + filterRange) filters[i][f] = 0.0;
         // Right edge of cone
         else if (f > bins[i]) filters[i][f] = 1.0 - ((f - bins[i]) / filterRange);
         // Peak of cone
         else if (f == bins[i]) filters[i][f] = 1.0;
         // Left edge of cone
         else if (f >= bins[i] - filterRange) filters[i][f] = 1.0 - (bins[i] - f) / filterRange;
         // Left, outside of cone
         else filters[i][f] = 0.0;
      }
   }

   // Store for debugging.
   filters.bins = bins;

   // Here we actually apply the filters one by one. Then we add up the results of each applied filter
   // to get the estimated power contained within that Mel-scale bin.
   //
   // First argument is expected to be the result of the frequencies passed to the powerSpectrum
   // method.
   return filters;
}

function invia_segnale() {

  if ((audio_classes[classId]) == 'open hihat'){
    serial.write('x');
    console.log('x');
  }else if ((audio_classes[classId]) == 'close hihat'){
    serial.write('x');
    console.log('x');
  }else if ((audio_classes[classId]) == 'low tom'){
    serial.write('-');
    console.log('-');
  }else if ((audio_classes[classId]) == 'mid tom'){
    serial.write('-');
    console.log('-');
  }else if ((audio_classes[classId]) == 'kick'){
    serial.write('o');
    console.log('o');
  }else if ((audio_classes[classId]) == 'snare'){
    serial.write('o');
    console.log('o');
  }else if ((audio_classes[classId]) == 'clap'){
    serial.write('*');
    console.log('*');
  }else if ((audio_classes[classId]) == 'rim'){
    serial.write('*');
    console.log('*');
  }

}
