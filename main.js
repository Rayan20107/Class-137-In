var objects=[];

var percentage="";

var video="";

var status="";

var colourr="";

var colourg="";

var colourb="";

function draw()
{
    image(video, 0, 0, 480, 360);
    if (status!="") 
    {
        objectdetector.detect(video, gotResults);
        for (let index = 0; index < objects.length; index++) 
        {
        colourr=floor(Math.random()*255);
        colourg=floor(Math.random()*255);
        colourb=floor(Math.random()*255);
        document.getElementById("status").innerHTML="Objects Detected!";
        document.getElementById("noofobjects").innerHTML=objects.length+" "+"Objects have been detected";
        percentage=floor(objects[index].confidence*100);
        fill(colourr, colourg, colourb);
        text(objects[index].label+" "+percentage+"%", objects[index].x+15, objects[index].y+15);
        noFill();
        stroke(colourr, colourg, colourb);
        rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
        }
    }
}

function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas=createCanvas(480, 360);
    canvas.center();
}

function start()
{
    objectdetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    video.loop();
    video.speed(1);
    video.volume(0);
    status=true;
}

function gotResults(error, results)
{
    if (error) 
    {
        console.log(error);
    }
    if (results)
    {
        console.log(results);
        objects=results;
    }
}