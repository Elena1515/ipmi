
PImage miImagen; 

void setup(){ 
size(800,400);
background(255);
miImagen= loadImage("miImagen.jpg");
}

void draw(){
image(miImagen, 0, 0, 400, 400); 

 fill(100,100, 255);
rect(400,0, 800,600 ); 

fill(255);
rect(450,230,300,400);

stroke(0); 
strokeWeight(1); 
line(450, 300, 750, 300);

strokeWeight(5);
line(450, 320, 750, 320);

strokeWeight(0);

fill(0);
line(500, 300, 500, 330);

fill(0);
line(600, 300, 600, 330);

fill(0);
line(550, 300, 550, 330);

fill(0);
line(700, 300, 700, 330);

fill(0);
line(730, 300, 730, 330);

fill(0);
line(650, 300, 650, 330);

fill(0);
line(530, 300, 530, 330);

fill(0);
line(740, 300, 740, 330);

fill(0);
line(470, 300, 470, 330);

fill(0);
line(520, 300, 520, 330);

fill(0);
line(580, 300, 580, 330);

fill(0);
line(570, 300, 570, 330);

fill(0);
line(490, 300, 490, 330);

fill(0);
line(625, 300, 625, 330);

fill(0);
line(670, 300, 670, 330);

fill(0);
line(690, 300, 690, 330);

fill(0);
line(710, 300, 710, 330);

fill(0);
line(640, 300, 640, 330);

fill(0);
line(610, 300, 610, 330);

fill(0);
line(455, 300, 455, 330);

fill(255);
rect(525,200, 150,30);





for (int i = 0; i < 5; i++) {
  int x = 460 + i * 60;
  int y = 350;
  int w = 35;
  int h = 55;

  rect(x, y, w, h);
  arc(x + w/2, y, w, w, radians(180), radians(360));


}
for (int i = 0; i < 5; i++) {
  int x = 460 + i * 60;
  int y = 250;
  int w = 30;
  int h = 50;

rect(x, y, w,h);
  arc(x + w/2, y, w, w, radians(180), radians(360));
  
}
rect(575,100, 50,100);


rect(575, 80, 50, 100);
arc(600, 80, 20, 40, radians(180), radians(360)); 
arc(600, 80, 70, 60, radians(180), radians(360));
line(600, 50, 600, 30);
line(590, 40, 610, 40);


arc(600, 203, 50, 80,radians(180), radians(360)); 

fill(0);
arc(600,140, 20, 70, radians(180), radians(360));
}
