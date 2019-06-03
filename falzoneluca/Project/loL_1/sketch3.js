let mobilenet;
let picture;
let width = 640;
let height = 480;
let capture;
let poses = [];
let classifier;
var mostrecentword;
var modalitaAscolto = false;
var keyWord;
var newImage = 0;
var newLabel;
var trained = false;

function whileTraining(loss) {
    console.log(loss);
}

function modelReady() {
    console.log('Model is ready');
    // mobilenet.predict(picture, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        // console.log(results[0].className);
        // console.log(results[1].className);
        // console.log(results[2].className);
        // console.log(results[0].probability);
    }
}

function imageReady() {
    image(picture, 0, 0, width, height);
}

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
// myRec.interimResults = true; // allow partial recognition (faster, less accurate)

function setup() {
    createCanvas(width, height);
    background(0);
    // picture = createImg('images/dog.jpg', imageReady);
    // picture.hide();
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();

    myRec.onResult = analizzaAudio; // recognition callback
    myRec.start(); // start engine

    // poseNet = ml5.poseNet(capture, modelReady);

    // poseNet.on('pose', function (results) {
    //     poses = results;
    // });

    // mobilenet = ml5.imageClassifier('MobileNet', capture, modelReady);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    mobilenet.numClasses = 3
    classifier = mobilenet.classification(capture);
}

function draw() {
    // picture = createImg(capture);
    translate(width, 0);
    scale(-1.0, 1.0);
    image(capture, 0, 0, width, height);
    // mobilenet.predict(gotResults);
    // drawKeypoints();
    if (newImage >= 1) {
        classifier.addImage(newLabel);
        newImage--;
    }

    if (trained) {
        classifier.classify(gotResults);
    }
}

function analizzaAudio() {
    mostrecentword = myRec.resultString.split(' ').pop();

    if (modalitaAscolto) {
        keyword = mostrecentword;
        if (keyword == "allena") {
            classifier.train(whileTraining);
            trained = true;
        } else if (keyword == "prevedi") {
            classifier.classify(gotResults);
        }
        else {
            // classifier.addImage(keyword);
            newImage = 10;
            newLabel = keyword;
        }
        modalitaAscolto = false;
    }

    if (mostrecentword == "lol" || mostrecentword == "LOL") {
        console.log("modalità ascolto");
        modalitaAscolto = true;
    }

    console.log(mostrecentword);

    

}

function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = poses[i].pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}
