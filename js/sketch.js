

var img;
var bg;

function preload(){
	img = loadImage("/images/earthmap.jpg");
	bg = loadImage("/images/stars.jpg")
}
function setup() { 
  createCanvas(900, 1600, WEBGL);
} 

function draw() { 
  background(220);
  texture(img);
  rotateY(frameCount * 0.01);
  sphere(300);
  


}