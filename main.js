status1='';
objects=[];

function preload(){
    img=loadImage('dog_cat.jpg')
}

function setup(){
    canvas=createCanvas(700, 500);
    canvas.center();
    ObjectDetection=ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById('status').innerHTML='Status: Detecting Object';
    ObjectDetection.detect(img, gotResult);
}

function draw(){
    image(img, 0, 0, canvas.width, canvas.height)


    if(status1!=""){
        for( var i=0; i<objects.length; i++){
        document.getElementById('status').innerHTML='Status : Objects Detected!';
        fill('red');
        percent=floor(objects[i].confidence * 100);
        stroke('red');
        text(objects[i].label + ' ' + percent + ' %', objects[i].x + 15, objects[i].y + 15);
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log('The model has been loaded');
    status1=true;
    document.getElementById('status').innerHTML='Status: Detected Object';
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}