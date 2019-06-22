// let color_s_micro= 'rgb(255, 255, 255)';
// let color_l_micro= 'rgb(139, 139, 139)';
// let color_meso= 'rgb(69, 111, 177)';
// let color_macro= 'rgb(30, 48, 86)';

const circles = [{
  id: '1',
  x: 150,
  y: 50,
  radius: 127*.05,
  color: 'rgb(255,255,255)',
  eti: "South Atlantic 12780 TON",
  //increment: 0.72,
  qty: 12780 + " Ton ",
   chart: {
          s_micro: { percent: 0.1, color: color_s_micro },
          l_micro: { percent: 0.04, color: color_l_micro },     
          meso: { percent: 0.1, color: color_meso },              
          macro: { percent: 0.76, color: color_macro }
  }
}, {
  id: '2',
  x: 150,
  y: 120,
  radius: 210*.05,
  color: 'rgb(255,255,255)',
  eti: "South Pacific 21000 TON",
  //increment: 1.08,
  qty: 21000 + " Ton " ,
    chart: {
          s_micro: { percent: 0.06, color: color_s_micro },
          l_micro: { percent: 0.07, color: color_l_micro },     
          meso: { percent: 0.1, color: color_meso },              
          macro: { percent: 0.77, color: color_macro }
  }   
}, {
  id: '3',
  x: 150,
  y: 200,
  radius: 231*.05,
  color: 'rgb(255,255,255)',
  eti: "Mediterranean Sea 23150 TON",
  //increment: 1.24,
  qty: 23150 + " Ton ",
    chart: {
          s_micro: { percent: 0.07, color: color_s_micro },
          l_micro: { percent: 0.16, color: color_l_micro },     
          meso: { percent: 0.23, color: color_meso },              
          macro: { percent: 0.54, color: color_macro}
  }  
}, {
  id: '4',
  x: 150,
  y: 320,
  radius: 564*.05,
  color: 'rgb(255,255,255)',
  eti: "North Atlantic 56470 TON",
  //increment: 2.9,
  qty: 56470 + " Ton ",
  chart: {
          s_micro: { percent: 0.03, color: color_s_micro },
          l_micro: { percent: 0.08, color: color_l_micro },     
          meso: { percent: 0.07, color: color_meso },              
          macro: { percent: 0.82, color: color_macro }
  }
}, {
  id: '5',
  x: 150,
  y: 440,
  radius: 591*.05,
  color: 'rgb(255,255,255)',
  eti: "Indian Ocean 59130 TON",
  //increment: 3.09,
  qty: 59130 + " Ton ",
  chart: {
          s_micro: { percent: 0.04, color: color_s_micro },
          l_micro: { percent: 0.06, color: color_l_micro },     
          meso: { percent: 0.13, color: color_meso },              
          macro: { percent: 0.77, color: color_macro }
  }
},{
  id: '6',
  x: 150,
  y: 600,
  radius: 964*.05,
  color: 'rgb(255,255,255)',
  eti: "Pacific Ocean 96400 TON",
  //increment: 4.98,
  qty: 96400 + " Ton ",
  chart: {
          s_micro: { percent: 0.04, color: color_s_micro },
          l_micro: { percent: 0.1, color: color_l_micro },     
          meso: { percent: 0.11, color: color_meso },              
          macro: { percent: 0.76, color: color_macro }
  } 
}, {
  id: '7',
  x: 150,
  y: 800,
  radius: 1910*.05,
  color: 'rgb(255,255,255)',
  eti: "World 268950 TON",
  //increment: 3.09,
  qty: 268950 + " Ton ",
  chart: {
          s_micro: { percent: 0.04, color: color_s_micro },
          l_micro: { percent: 0.1, color: color_l_micro },     
          meso: { percent: 0.11, color: color_meso },              
          macro: { percent: 0.75, color: color_macro }
  }
}];


const canvas1 = document.createElement('canvas');
canvas1.id = "canvas1";
canvas1.width = 470;
canvas1.height = 1000;
//canvas1.style.background = "black";
canvas1.style.zIndex = 10;
canvas1.style.position = "absolute";
//canvas1.style.border = "1px solid red";
canvas1.style.top = 400;
canvas1.style.right = 0;  

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas1);  

// const canvas = document.getElementById('canvas');
const ctx = canvas1.getContext('2d');
