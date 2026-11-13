///// link al video https://youtu.be/yXb2yskGt0c
let juego;
let recursos;

function preload() {
  recursos = cargar_recursos();
}

function setup() {
  createCanvas(800, 400);
  frameRate(30);
  noSmooth();
  juego = new Juego(recursos);
}

function draw() {
  juego.dibujar();
}

function mousePressed() {
  juego.clic(mouseX, mouseY);
}

function keyPressed() {
  return juego.tecla(key, keyCode);
}


class Juego {
  constructor(recursos) {
    this.historia = new Historia(recursos);
    this.minijuego = new DesafioBunker(
      recursos.fondos[2], recursos.scottQuieto, recursos.scottCamina
    );
    this.sonido_fondo = recursos.sonido_fondo;
    this.sonido_iniciado = false;
    this.escala_relato = 400 / 450;
  }

  dibujar() {
    if (this.minijuego.estado !== "cerrado") {
      this.minijuego.actualizar();
      this.minijuego.dibujar();
    } else {
      push();
      scale(1, this.escala_relato);
      this.historia.dibujar();
      pop();
    }
  }

  clic(x, y) {
    if (!this.sonido_iniciado) {
      userStartAudio();
      this.sonido_fondo.loop();
      this.sonido_iniciado = true;
    }

    if (this.minijuego.estado === "cerrado") {
      if (this.historia.clic(x, y / this.escala_relato)) {
        this.minijuego.abrir_instrucciones();
      }
    } else {
      let resultado = this.minijuego.clic(x, y);
      if (resultado === "continuar") this.historia.continuar();
      if (resultado === "inicio") this.historia.reiniciar();
    }
  }

  tecla(letra, codigo) {
    if (this.minijuego.estado !== "cerrado") {
      if ((letra === "r" || letra === "R") && this.minijuego.estado === "jugando") {
        this.minijuego.reiniciar();
      }
      if (codigo >= LEFT_ARROW && codigo <= DOWN_ARROW) return false;
    }
  }
}
