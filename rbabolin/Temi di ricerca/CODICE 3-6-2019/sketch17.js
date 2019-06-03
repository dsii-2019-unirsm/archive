var img;
var theta = 0;
var r = 400;
let zcamera = 0;
let font;
let fontsize = 24;

let tElab;

let table;
let timer = 5;
let easycam; // telecamera peasycam
let div_message, div_counter;
let button;

let viewMode = 1;



function preload() {
	
	table = loadTable("csv/gyres.csv", 'csv', 'header');
	
	img = loadImage('images/1world-map.jpg');
	
	font = loadFont('assets/SourceSansPro-Regular.ttf');
}

let interval;
let years = 1950;
let x_offset = 0;
let x_array = new Array();
let txtArc = false;
	
function countyears() {

	myTimer();
	interval = setInterval(myTimer, 100);

}


function myTimer() {

	
	if (years == 2016) {
      clearInterval(interval);
    } else {
		div_counter = document.getElementById('counter');
		div_counter.innerHTML = 'Anno ' + years.toString();
		years++;
		x_offset += 10;
		x_array.push(x_offset);


		circles.forEach(circle => {
		  ctx.beginPath();
		  let gap = x_offset * circle.increment;
		  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);//False is default, and indicates clockwise
		  ctx.fillStyle = circle.color;
		  ctx.fill();
		  if (!txtArc){
			  ctx.font = "20px Arial";
			  ctx.fillText(circle.eti, circle.x + 100, circle.y +5);
		  
			  ctx.fillText(circle.qty, circle.x + 100, circle.y + 38);
			  
			 
			}
		});

		txtArc = true;
		
    }
}


function setup() {

	
	button = createButton('START');
  	button.position(5, 120);
  	button.mousePressed(countyears);

	
	div_message = document.getElementById('message');
	
	
	createCanvas(windowWidth, windowHeight, WEBGL);


	
	tElab = createGraphics(img.width, img.height);
	

//======CREAZIONE CAMERA
	
    Dw.EasyCam.prototype.apply = function(n) {
      var o = this.cam;
      n = n || o.renderer,
      n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
    };
	//https://github.com/diwi/p5.EasyCam/issues/5

	
	easycam = new Dw.EasyCam(_renderer, {
		distance: 400,
		center: [0,0,0]
	});	
	
	easycam.setViewport([0, 0, windowWidth, windowHeight]);

  	easycam.setDistance(1000, 3500);	


	
	let xr = -PI / 45; //aumentando 4.5 diminuisce la rotazione sulle x
	let yr = -PI / 1.0;


	//========ROTAZIONE CAMERA
	
	easycam.setRotation(Dw.Rotation.create({
    	angles_xyz: [xr, yr, 0]
  	}), 5000);

	
	//=============FINE CREAZIONE CAMERA E RELATIVI MOVIMENTI

	
	rectMode(CENTER);
  	ellipseMode(CENTER);

	
}

function elaboraTexture() {
	
	tElab.background(0);
	tElab.image(img, 0, 0);
 	tElab.stroke(255);
 	tElab.strokeWeight(2);
 	tElab.noFill();
	
	
	for (let riga = 0; riga < table.getRowCount(); riga++) {

		let latitude = 0;
		let longitude = 0;
		let dimension_x = 0;
		let dimension_y = 0;		
		
		
		for (let colonna = 0; colonna < table.getColumnCount(); colonna++) {
			
		  //console.log(table.getString(riga, colonna));

			switch(colonna) {
					
				case 2:
					
					latitude = parseInt(table.getString(riga, colonna));
					
					//console.log(latitude);
					
					break;
					
				case 3:
					
					longitude = parseInt(table.getString(riga, colonna));
					
					break;
					
				case 4:
					
					dimension_x = parseInt(table.getString(riga, colonna))/16;
					
					break;
					
				case 5:
					
					dimension_y = parseInt(table.getString(riga, colonna))/16;
					
					break;
			}
    	}


		x_array.forEach(function(x) {
			
			dimension_x += x/50;
			dimension_y += (0.4*x)/60;
			// let dim_x= map(timer, 1950, 2018, 0, dimension_x);
			// let dim_y= map(timer, 1950, 2018, 0, dimension_y);

			tElab.ellipse(latitude, longitude, dimension_x, dimension_y);

		});
		

		// tElab.push();
		// tElab.fill('red');
		// tElab.noStroke();
		// tElab.rect(3500, tElab.height*.5, 200, 200);
		// tElab.pop();
		//console.log();
	}
}

    
function keyPressed() {
	if (key === 'a' || key === 'A') {
		if (viewMode == 0) {
			viewMode = 1;
		} else {
			viewMode = 0;
		}
	}
}	



function draw() {
	
	//noLoop();
	//return;
	
	//div_message.innerHTML = frameCount;
	
	elaboraTexture();
	
	
	background(0);

	/*let value = 100;

				let diameter = map(value, 0, x, 0, dimension_x)
				fill(255);
				ellipse(200, 600, diameter, diameter);   */
	
	
	/*
	if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    	timer--;
		console.log('timer: ' + timer);
  	}

  	if (timer == 0) {
    	//text("GAME OVER", width/2, height * 0.7);
		console.log('GAME OVER');
		//noLoop();
		
  	}
	*/
	
	
	
	
	
	// ruota la sfera
	//theta += 0.01;
	//rotateY(theta);
	

	
	//texture(img);
	texture(tElab);
	
	
	noStroke();
	
	if(viewMode == 1) {
	//sphere(r, 24, 16);
	sphere(r, 48, 32);
	} else if (viewMode == 0) {

    plane(1000,500);

 //    let xr = -PI / 45; //aumentando 4.5 diminuisce la rotazione sulle x

	// let yr = -PI*2 / 1.0;

	// easycam.setRotation(Dw.Rotation.create({
 //    	angles_xyz: [xr, yr, 0]
 //  	}), 5000);

	}



	//---------------------CREAZIONE DEL PUNTO COORDINATE 0,0

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