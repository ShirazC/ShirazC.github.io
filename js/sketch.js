

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
  rotateY(frameCount * 0.01);
  sphere(100);
  


}