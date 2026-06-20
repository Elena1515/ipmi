// link: https://youtu.be/_92CsJfcLag

PImage img;

float velocidad = 0.05;
float cambio = 0;
int inicio = 0;

void setup() {

  size(800, 400);

  img = loadImage("fototp3.jpeg");

  stroke(0);
  noFill();
}

void draw() {

  background(255);

  image(img, 0, 0, 400, 400);

  float movimiento = obtenerMovimiento();

  float d = dist(mouseX, mouseY, width/2, height/2);

  if (mousePressed) {
    strokeWeight(map(d, 0, 450, 2, 6));
  } else {
    strokeWeight(3);
  }

  pushMatrix();

  translate(600, 200);

  rotate(radians(map(mouseX, 0, width, -2, 2)));

  translate(-600, -200);

  for (int columna = 0; columna < 6; columna++) {

    for (int fila = 0; fila < 6; fila++) {

      dibujo(
        400 + columna * 66,
        fila * 66,
        movimiento
      );
    }
  }

  popMatrix();
}

float obtenerMovimiento() {

  return map(
    sin((frameCount - inicio) * velocidad + cambio),
    -1,
    1,
    0,
    8
  );
}

void dibujo(int x, int y, float m) {

  rect(x, y, 62, 62);

  rect(x, y, 52 + m, 52 + m);

  rect(x, y, 42 + m, 42 + m);

  rect(x, y, 32 + m, 32 + m);

  rect(x, y, 22 + m, 22 + m);
}

void keyPressed() {

  if (key == 'r' || key == 'R') {
    resetear();
  }

  if (key == ' ') {
    cambio = random(100);
  }
}

void resetear() {

  velocidad = 0.05;
  cambio = 0;
  inicio = frameCount;

}
