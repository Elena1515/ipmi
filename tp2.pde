PImage img; 
PImage img2;
PFont fuente;
PImage img3;


int pantalla = 0;
int miVariable = 0;
int xPacman = 600;
int posYTexto = -80;

 boolean prender = true;

int posXPacman2 = 0;
int posYPacman2 = 70;




void setup(){ 
size(640,480);
background(255);
img= loadImage("pacman1.jpeg");

fuente = createFont("georgia", 40);
textFont(fuente);
    
    img2 = loadImage("pacman4.jpeg");

  
    img3 = loadImage("foto3.jpg");
    
}

void draw(){
    if (pantalla == 0) {
    
  
image(img, 0, 0, 640, 480); 
 fill(255);
    textSize(30);
    text("HOY VAMOS A HABLAR SOBRE", miVariable, posYTexto,300,200);

 if (posYTexto < 45) {

  posYTexto = posYTexto + 1;

}
  
}
    

 if (pantalla == 1) {
    
    background(0);
    
    fill(255);
    textSize(20);
    text("Pacman es un videojuego arcade creado por el diseñador de videojuegos Toru Iwatani de la empresa Namco",  miVariable, 200, 300, 200);
   
 
 
 fill(255, 255, 0);
circle(xPacman, 350, 100);

fill(0);
triangle(xPacman, 350, xPacman - 50, 310, xPacman - 50, 390);

fill(0);
circle(xPacman + 10, 320, 10);

xPacman = xPacman - 2;
 
 
 if (frameCount % 10 == 0) {
  miVariable = miVariable + 2;

 }  
 
 
 
 
 if (frameCount % 30 == 0) {

  prender = !prender;

}

if (prender == true) {

  fill(255, 200, 150);

} else {

  fill(50);

}

circle(100, 100, 10);
circle(150, 100, 10);
circle(200, 100, 10);
circle(250, 100, 10);
circle(300, 100, 10);




 }
  
   if (pantalla == 2) {
    
    background(0);
    
    fill(255);
    textSize(20);
    text(" PacMan fue lanzado el 22 de mayo de 1980, fue un éxit y se convirtió en un fenómeno mundial en la industria de los videojuegos, llegó a tener el récord Guiness del videojuego de arcade más exitoso de todos los tiempos",  miVariable, 200, 500, 200);
   
   if (frameCount % 10 == 0) {

  miVariable = miVariable + 2;

}
   if (frameCount % 30 == 0) {

  prender = !prender;

}

if (prender == true) {

  fill(255, 200, 150);

} else {

  fill(50);

}


circle(300, 400, 10);
circle(350, 400, 10);
circle(400, 400, 10);
circle(450, 400, 10);
circle(500, 400, 10);
   
   fill(255, 255, 0);
circle(posXPacman2, posYPacman2, 80);

fill(0);
triangle(posXPacman2, posYPacman2, 
         posXPacman2 + 40, posYPacman2 - 30, 
         posXPacman2 + 40, posYPacman2 + 30);

circle(posXPacman2 - 10, posYPacman2 - 20, 10);

posXPacman2 = posXPacman2 + 2;

if (posXPacman2 > width) {

  posXPacman2 = 0;

}
}

if (pantalla == 3) {

  background(0);

 image(img2, 100, 150, 400, 300);


    
    fill(255);
    textSize(20);
    text("El objetivo del personaje es comer todos los puntos de la pantalla, momento en el que se pasa al siguiente nivel o pantalla. Sin embargo, cuatro fantasmas, recorren el laberinto para intentar capturar a Pac-Man",  miVariable, 50, 500, 100);

if (frameCount % 10 == 0) {

  miVariable = miVariable + 2;

}


fill(127, 5);
 noStroke();

  rect(0, 0, width, height);



  fill(255, 255, 0);

  arc(300,300,
      frameCount/5, frameCount/5, 
      radians(30), radians(330));


  println(mouseX + mouseY);
  


}



if (pantalla == 4) {

background(0);
image(img3,400,80,200,200);

  fill(255);
  textSize(40);
  text("Gracias por ver!", 170, 420);


fill(255,255,0);

circle(300, 220, 100);


fill(0);

textSize(28);

text("Inicio", 270, 227);




}

  




















}




 




























 



void keyPressed(){

  if (pantalla == 0) {

    pantalla = 1;

  }

  else if (pantalla == 1) {

    pantalla = 2;

  }
  
  else if (pantalla == 2) {

  pantalla = 3;

}

else if (pantalla == 3) {
  
  pantalla = 4;


}
}



void mousePressed() {

  if (pantalla == 4) {

  if (mouseX > 250 && mouseX < 350 &&
    mouseY > 170 && mouseY < 270) {

  pantalla = 0;

}

  }

}
