

var img;

function preload(){
	img = loadImage("/images/earthmap.jpg");
}
function setup() { 
  createCanvas(1000, 1000, WEBGL);
} 

function draw() { 
  background(220);
  texture(img);
  sphere(100);
  rotateY(radians(90));


}