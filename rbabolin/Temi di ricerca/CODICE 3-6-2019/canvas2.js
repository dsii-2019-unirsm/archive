const canvas2 = document.createElement('canvas');
canvas2.id = "canvas1";
canvas2.width = 280;
canvas2.height = 380;
//canvas1.style.background = "black";
canvas2.style.zIndex = 10;
canvas2.style.position = "absolute";
//canvas2.style.border = "1px solid red";
canvas2.style.top = "450px";
canvas2.style.left = "50px";  

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas2);  

// const canvas = document.getElementById('canvas');
const ctxLegenda = canvas2.getContext('2d');

let color_s_micro= 'rgb(255, 255, 255)';
let color_l_micro= 'rgb(139, 139, 139)';
let color_meso= 'rgb(69, 111, 177)';
let color_macro= 'rgb(30, 48, 86)';


let legends =[
{color: color_s_micro, caption:'Piccole microplastiche'},
{color: color_l_micro, caption:'Larghe microplastiche'},
{color: color_meso, caption:'Mesoplastiche'},
{color: color_macro, caption:'Macroplastiche'}
];

