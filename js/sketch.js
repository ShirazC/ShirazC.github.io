

var img;
var bg;

var canvas = $('container');

function preload(){
	img = loadImage("/images/earthmap.jpg");
	//bg = loadImage("/images/stars.jpg");
}
function setup() { 
  createCanvas(canvas.width(), canvas.height(), WEBGL);
} 

function draw() { 
  background(0);
  texture(img);
  rotateY(frameCount * 0.01);
  sphere(250);
  


}