// Plastic garbage by Romano Babolin 
// 2019 © Romano Babolin, Daniele @Fupete and the course DSII2019 at //DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to: 
// @fupete (twitter.com/Daniele Tabellini) for https://www.tellerk.com
// @paolopetrangolini (github.com/paolo petrangolini)
// 
//
// Help:
// [presskey "a" or "A"] view flat map 
// [mouse left button] pan on the spheric map
// [mouse scroll wheel] zoom on the spheric-flat map

var img;
var theta = 0;
var r = 400;
//let zcamera = 0;
let font;
let fontsize = 24;

let tElab;

let table;
//let timer = 5;
let easycam; // telecamera peasycam
let div_message, div_counter;
let button;
let totalannirange = 2015-1950;

let viewMode = 1;
let angleBor = 0;
let angleAus = 0;





function preload() {
	
	table = loadTable("csv/gyres.csv", 'csv', 'header');
	
	img = loadImage('images/5world-map.jpg');
	
	font = loadFont('assets/SourceSansPro-Regular.ttf');
}

let interval;
let years = 2015;
let x_offset = 0;
let x_array = new Array();
let txtArc = false;
	
function countyears() {

	myTimer();
	

}


function myTimer() {
    

	//=====INIZIO CREAZIONE DEI GRAFICI A TORTA	
    
    //=====DEFINIZIONE ARROW FUNCTION
    
		circles.forEach(circle => {

			let raggio = circle.radius;
			let diametro = circle.radius * 2;

			

		
			let angles = new Array();
			let colors = new Array();
			let valori = new Array();
			let caption = new Array();

			for( let prop in circle.chart) {


				if (circle.chart.hasOwnProperty(prop)) {

					let micro = circle.chart[prop];
					
					let angle = micro.percent * 360;

					angles.push(parseInt(angle));
					
					colors.push(micro['color']);
					
					valori.push(micro.percent);
					
					caption.push(prop);

		 		}
		  	}
			


		  let lastAngle = 0;
			
		  for (let i = 0; i < angles.length; i++) {
			  
	
			  ctx.fillStyle = colors[i];
		  	  ctx.beginPath();
			  ctx.moveTo(circle.x, circle.y);

			  let start_angle = lastAngle;
			  let slice_angle = radians(angles[i]);

			  ctx.arc(
				  circle.x,
				  circle.y,
      			  raggio,
      			  lastAngle,
      			  lastAngle + radians(angles[i])

			  );

			  
			  lastAngle += radians(angles[i]);

			  
			  ctx.closePath();
			  ctx.fill();
			  
			  
			  
//			  let pieRadius = Math.min(canvas1.width/2, canvas1.height/2);

			  let space= 50;
			  let labelX = 270 + space*i;
			  let labelY = circle.y - 20;
			  
			  
			  let labelText = Math.round(100 * valori[i]).toString() + '% ';
			  ctx.fillStyle = "white";
			  ctx.font = "bold 16px Arial";
			  ctx.fillText(labelText, labelX, labelY);
			  
			// DEFINIZIONE DEI RETTANGOLI

			  let lato = 20;
			  
			  ctx.beginPath();
			  ctx.lineWidth = "4";
			  ctx.strokeStyle = colors[i];
			  ctx.fillStyle = colors[i];
			  ctx.fillRect(labelX, labelY + 10, lato, lato);
			  ctx.stroke();
		  }
			
			//POSIZIONE ETICHETTA NOMI DEGLI OCEANI-MARI
            
			let l_text = circle.eti.length;
			let px_text = l_text * 8;
			let labelCircleX = circle.x - px_text/2;

		  	let labelCircleY = circle.y - circle.radius - 20;
		  	let labelCircleText= circle.eti;
			ctx.fillStyle = "white";
		  	ctx.font = "bold 16px Arial";
		  	ctx.fillText(labelCircleText, labelCircleX, labelCircleY);
	
		});
		

		legenda();
}
//=================FINE CALCOLO GRAFICI

//=================DEFINIZIONE LEGENDA E POSIZIONE NEL CANVAS2

function legenda(){
	const lato = 40;
	const x = 0;
	let y = 0;
	const labelX = 50;


	legends.forEach(legenda => {

			  ctxLegenda.beginPath();
			  ctxLegenda.lineWidth = "6";
			  ctxLegenda.strokeStyle = legenda.color;
			  ctxLegenda.fillStyle = legenda.color;



			  ctxLegenda.fillRect(x, y , lato, lato);
			  ctxLegenda.stroke();

			  
			  let labelY = y + 22;
			  let labelText= legenda.caption;
			  ctxLegenda.fillStyle = "white";
		  	  ctxLegenda.font = "bold 16px Arial";
		  	  ctxLegenda.fillText(labelText, labelX, labelY);



			  y += 60;

	});

    
}
 

function setup() {

	// CREAZIONE BOTTONE
	button = createButton("GRAFICI QUANTITA' ANNO 2015");
  	button.position(50, 250);
  	button.style.width= "100px";
    button.style.height= "45px";
    button.style.borderRadius= "15px";
    // FUNZIONE countyears SU BOTTONE
  	button.mousePressed(countyears);
    
    //CREAZIONE SLIDER
    YEARSlider = createSlider(1950, 2015, 1950,1);
    YEARSlider.position(50,155);
    YEARSlider.fillStyle = "white";
    YEARSlider.strokeStyle = "white";
    YEARSlider.style('width', '275px');
    div_counter= document.getElementById('counter');
    
   
	
	div_message = document.getElementById('message');
	
	
	createCanvas(windowWidth, windowHeight, WEBGL);

//======CREAZIONE DELLA MAPPA (IMMAGINE SELEZIONATA)

	tElab = createGraphics(img.width, img.height);
	

//======CREAZIONE CAMERA
	
    Dw.EasyCam.prototype.apply = function(n) {
      var o = this.cam;
      n = n || o.renderer,
      n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
    };
	

	
	easycam = new Dw.EasyCam(_renderer, {
		distance: 400,
		center: [0,0,0]
	});	
	
	easycam.setViewport([0, 0, windowWidth, windowHeight]);

  	easycam.setDistance(1000, 3500);	


	
	
	let xr = 0;
	let yr = PI;

	//========ROTAZIONE CAMERA
	
	easycam.setRotation(Dw.Rotation.create({
    	angles_xyz: [xr, yr, 0]
  	}), 5000);

	
	//=============FINE CREAZIONE CAMERA E RELATIVI MOVIMENTI

	
	rectMode(CENTER);
  	ellipseMode(CENTER);

	
}

function elaboraTexture(valYEAR) {
	
	tElab.background(0);
	tElab.image(img, 0, 0);
 	
 	tElab.strokeWeight(2);
 	//tElab.noFill();
 	//tElab.fill('rgb(204, 255, 0)');
	
//=====DEFINIZIONE DELLE ELLISSI "GYRES" DAL CSV(TABLE)	
	for (let riga = 0; riga < table.getRowCount(); riga++) {

		let latitude = 0;
		let longitude = 0;
		let dimension_x = 0;
		let dimension_y = 0;		
		tElab.stroke('rgb(204, 255, 0)');
		
        //CICLO FOR SUL CSV PER DEFINIRE LE DIMENSIONE DEI GYRES
        
		for (let colonna = 0; colonna < table.getColumnCount(); colonna++) {
			
		 

			switch(colonna) {
					
				case 2:
					
					latitude = parseInt(table.getString(riga, colonna));
					
					
					
					break;
					
				case 3:
					
					longitude = parseInt(table.getString(riga, colonna));
					
					break;
					
				case 4:
					
					dimension_x = parseInt(table.getString(riga, colonna));
                    
                    let percent_x = (1950- valYEAR)/totalannirange;
					

                    dimension_x *= percent_x;
					break;
					
				case 5:
					
					dimension_y = parseInt(table.getString(riga, colonna));
                    
					let percent_y = (1950- valYEAR)/totalannirange;
                    dimension_y *= percent_y;
					break;
			}
    	}
            
   //DEFINIZIONE DEI PALLINI ROTANTI NELLE ELLISSI DEI GYRES
		
			tElab.ellipse(latitude, longitude, dimension_x, dimension_y);
           
            tElab.noStroke();
            tElab.fill('rgb(255, 0, 0)');
            let x = dimension_x/2*cos(angleAus);
            let y = dimension_y/2*sin(angleAus);
        
            let xBor = dimension_x/2*cos(angleBor);
            let yBor = dimension_y/2*sin(angleBor);
        
            const diametro = (valYEAR-1950)/65 *10;
            const newDiam = (diametro * dimension_x)/180;
        
        if (diametro > 0 && longitude + y > 900){
            
            tElab.ellipse(latitude + x, longitude + y, newDiam, newDiam);
        }
        
        angleAus -= 0.05;
        
        if (diametro > 0 && longitude + yBor < 900){
            
            tElab.ellipse(latitude + xBor, longitude + yBor, newDiam, newDiam);
        }
        
        angleBor += 0.05;
        

		//});
        //DEFINIZIONE DEI COLORI DELLE ELLISSI
		tElab.noStroke();
		tElab.fill('rgb(204, 255, 0)');
//        tElab.noFill();
//        tElab.stroke('rgb(0, 255, 4)');
  		tElab.textSize(25);
  		tElab.text('LAT: 0 LON: 0', 1730,880);
		
	}
}

//======FUNZIONE PER LA VISUALIZZAZIONE DELLA MAPPA FLAT    
function keyPressed() {
	if (key === 'a' || key === 'A') {
		if (viewMode == 0) {
			easycam.setRotation(Dw.Rotation.create({
		   	angles_xyz: [0, -PI, 0]
		}), 0);
			viewMode = 1;
		} else {
			easycam.setRotation(Dw.Rotation.create({
		   	angles_xyz: [0, 0, 0]
		}), 0);
			viewMode = 0;
		}
		
	}
}	



function draw() {
	
	let valYEAR = YEARSlider.value();
    
    div_counter.innerHTML = valYEAR.toString();	
    
    // CHIAMATA FUNZIONE elaboraTexture CON PARAMETRO DELLO SLIDER
	
	elaboraTexture(valYEAR);
	
	
	background(0);

    // CHIAMATA FUNZIONE texture CON PARAMETRO variabile tElab
	texture(tElab);
	
	
	noStroke();
	
	if(viewMode == 1) {
	//sphere(r, 24, 16);
	sphere(r, 48, 32);
	} else if (viewMode == 0) {

    plane(1000,500);


	}



	//CREAZIONE DEL PUNTO COORDINATE 0,0

	let latitude = 0;
	let longitude = 0;
	
	let lat = radians(latitude);
	let lon = radians(longitude);

	var x = r * Math.cos(lat) * Math.sin(lon+radians(180));
	var y = r * Math.sin(-lat);
	var z = r * Math.cos(lat) * Math.cos(lon+radians(180));
	
	//Vector pos = new PVector (x, y, z);//processing
	
	let pos = createVector(x, y, z);
	//PVector xaxis = new PVector(1, 0, 0);
	
	//console.log(pos);
	
	let xaxis = createVector(1, 0, 0);

	let anglenew = xaxis.angleBetween(pos);

	let raxis = pos.cross(xaxis);

	push();
	translate(x, y, z);
	fill(255,0,0);
	rotateX(raxis.x);
	box(6, 6, 50);	
	pop();
	

 

	//----------------------------------------------------------

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}