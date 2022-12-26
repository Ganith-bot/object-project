status = "";
object = [];

function preload(){
  dog_img = loadImage("dog_cat.jpg");
}

function setup(){
  canvas = createCanvas(500, 350);
  canvas.center();
  objectDetection = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status1").innerHTML = "Detecting....";
}

function modelLoaded(){
  console.log("Model Loaded!");
  status = true;
  objectDetection.detect( dog_img, gotResults);
}

function gotResults(error, results){
  if(error){
    console.log("an error has occured");
    console.log(error);
  }
  else{
    console.log(results);
    /*
    dog_height = results[1].height;
    console.log(dog_height);
    dog_width = results[1].width;
    console.log(dog_width);
    dog_x = results[1].x;
    console.log(dog_x);
    dog_y = results[1].y;
    console.log(dog_y);
    document.getElementById("status1").innerHTML = "Objects Detected";
    cat_height = results[0].height;
    console.log(cat_height);
    cat_width = results[0].width;
    console.log(cat_width);
    cat_x = results[0].x;
    console.log(cat_x);
    cat_y = results[0].y;
    console.log(cat_y);
    */
    object = results;
  }
}

function draw(){
  image(dog_img, 0, 0, 500, 350);
  if( status != ""){
    for(i=0; i<object.length; i++){
      document.getElementById("status1").innerHTML = "Objects Detected";
      percentage = floor(object[i].confidence*100);
      stroke("red");
      fill("red");
      noFill();
      text(object[i].label + " " + percentage + "%", object[i].x+5, object[i].y+13);
      rect(object[i].x-35, object[i].y, object[i].width, object[i].height);
    }
  }
  /*
  stroke("red");
  fill("red");
  noFill();
  rect(results[1].width, results[1].height, results[1].x, results[1].y);
  rect(cat_width, cat_height, cat_x, cat_y);
  stroke("red");
  fill("red");
  noFill();
  rect(50, 30, 200, 300);
  stroke("black");
  text("Dog", 205,300);
  stroke("red");
  rect(230, 20, 210, 300);
  stroke("black");
  text("cat", 260,300);
  */
}