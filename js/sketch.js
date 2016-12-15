

var img;
var bg;

var body = $('body');

function preload(){
	img = loadImage("/images/earthmap.jpg");
	//bg = loadImage("/images/stars.jpg");
}
function setup() { 
  createCanvas(screen.width, screen.height, WEBGL);
} 

function draw() { 
  background(0);
  texture(img);
  rotateY(frameCount * 0.01);
  sphere(250);
  


}