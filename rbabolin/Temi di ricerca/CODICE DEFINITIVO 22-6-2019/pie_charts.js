let angles = [30, 10, 45, 35, 60, 38, 75, 67];

function setup() {
  createCanvas(720, 400);
  noStroke();
  noLoop(); // Run once and stop
}

function draw() {
  background(100);
  pieChart(200, angles);
}

function pieChart(diameter, data) {
  let lastAngle = 0;
  for (let i = 0; i < data.length; i++) {
    let gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(
      width / 2,
      height / 2,
      diameter,
      diameter,
      lastAngle,
      lastAngle + radians(angles[i])
    );
    lastAngle += radians(angles[i]);
  }
}



        let raggio = circle.radius;
        let diametro = circle.radius * 2;
                                                      
     //console.log(circle.chart);
                  
     //Object.keys(obj).forEach(e => console.log(`key=${e}  value=${obj[e]}`));
                  
                  
                  
     for( let obj in circle.chart) {
                    
                     //console.log(circle.chart[obj].toString());
                    
                     let inner = circle.chart[obj];
                    
                     
                     
                     console.log(inner['percent']);
                     console.log(inner['color']);
                    
                     
                    
     }
                  
                  
   