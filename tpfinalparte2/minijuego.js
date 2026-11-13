
class Scott {
  constructor(x, y, quieto, camina) {
    this.x = x;
    this.y = y;
    this.quieto = quieto;
    this.camina = camina;
    this.moviendo = false;
  }

  mover() {
    let dx = 0;
    let dy = 0;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) dx--;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) dx++;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) dy--;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) dy++;
    this.moviendo = dx !== 0 || dy !== 0;
    let paso = dx !== 0 && dy !== 0 ? 3.2 : 4.5;
    this.x = constrain(this.x + dx * paso, 48, 752);
    this.y = constrain(this.y + dy * paso, 106, 354);
  }

  dibujar() {
    let cuadros = this.moviendo ? this.camina : this.quieto;
    dibujar_personaje(cuadros, this.x, this.y - 8, 48, 4);
  }
}

class Alarma {
  constructor(x, y, izquierda, derecha, velocidad) {
    this.x = x;
    this.y = y;
    this.izquierda = izquierda;
    this.derecha = derecha;
    this.velocidad = velocidad;
  }

  mover() {
    this.x += this.velocidad;
    if (this.x <= this.izquierda || this.x >= this.derecha) {
      this.x = constrain(this.x, this.izquierda, this.derecha);
      this.velocidad = -this.velocidad;
    }
  }

  toca(scott) {
    return dist(this.x, this.y, scott.x, scott.y) < 27;
  }

  dibujar() {
    noStroke();
    fill(250, 64, 114, 75);
    ellipse(this.x, this.y, 49, 49);
    fill(249, 80, 126);
    ellipse(this.x, this.y, 30, 30);
    fill(37, 15, 32);
    textAlign(CENTER, CENTER);
    textSize(19);
    text("!", this.x, this.y + 1);
  }
}

class Fusible {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.recogido = false;
  }

  recoger(scott) {
    if (!this.recogido && dist(this.x, this.y, scott.x, scott.y) < 25) {
      this.recogido = true;
      return true;
    }
    return false;
  }

  dibujar() {
    if (this.recogido) return;
    noStroke();
    fill(255, 219, 104, 70);
    ellipse(this.x, this.y, 44, 44);
    fill(255, 222, 108);
    rect(this.x - 5, this.y - 13, 10, 26, 3);
    fill(255);
    rect(this.x - 6, this.y - 12, 12, 5, 2);
    rect(this.x - 6, this.y + 7, 12, 5, 2);
  }
}


class DesafioBunker {
  constructor(fondo, quieto, camina) {
    this.fondo = fondo;
    this.quieto = quieto;
    this.camina = camina;
    this.estado = "cerrado";
  }

  abrir_instrucciones() {
    this.estado = "instrucciones";
  }

  reiniciar() {
    this.scott = new Scott(69, 343, this.quieto, this.camina);
    this.fusibles = [new Fusible(142, 135), new Fusible(382, 240), new Fusible(659, 314)];
    this.alarmas = [
      new Alarma(273, 174, 79, 558, 3.1),
      new Alarma(629, 277, 230, 721, -3.8),
      new Alarma(603, 122, 481, 733, 2.7)
    ];
    this.recogidos = 0;
    this.vidas = 3;
    this.segundos = 30;
    this.inicio = millis();
    this.ultimo_golpe = -Infinity;
    this.estado = "jugando";
  }

  actualizar() {
    if (this.estado !== "jugando") return;

    let ahora = millis();
    this.segundos = max(0, ceil(30 - (ahora - this.inicio) / 1000));
    if (this.segundos === 0) {
      this.estado = "perdio";
      return;
    }

    this.scott.mover();
    for (let i = 0; i < this.alarmas.length; i++) {
      this.alarmas[i].mover();
      if (ahora - this.ultimo_golpe >= 1000 && this.alarmas[i].toca(this.scott)) {
        this.vidas--;
        this.ultimo_golpe = ahora;
        if (this.vidas === 0) {
          this.estado = "perdio";
          return;
        }
      }
    }
    for (let i = 0; i < this.fusibles.length; i++) {
      if (this.fusibles[i].recoger(this.scott)) this.recogidos++;
    }
    if (this.recogidos === this.fusibles.length && dist(this.scott.x, this.scott.y, 730, 104) < 28) {
      this.estado = "gano";
    }
  }

  dibujar() {
    push();
    imageMode(CORNER);
    rectMode(CORNER);
    image(this.fondo, 0, 0, 800, 400);
    noStroke();
    fill(8, 11, 24, 220);
    rect(0, 0, 800, 400);
    textFont("sans-serif");
    textAlign(LEFT, CENTER);
    if (this.estado === "jugando") {
      this.dibujar_partida();
    } else {
      this.dibujar_panel();
    }
    pop();
  }

  dibujar_partida() {
    fill(20, 24, 44);
    rect(20, 15, 760, 52, 8);
    fill(248);
    textSize(17);
    text("Fusibles " + this.recogidos + "/3", 39, 41);
    text("Vidas " + this.vidas, 182, 41);
    text(this.segundos + " s", 278, 41);
    this.boton("Reiniciar (R)", 620, 23, 143);

    noFill();
    stroke(145, 158, 208, 150);
    rect(27, 78, 746, 290, 12);
    noStroke();
    fill(this.recogidos === 3 ? "#58e3bd" : "#757e9b");
    rect(702, 86, 56, 36, 5);
    fill(16, 20, 36);
    textAlign(CENTER, CENTER);
    textSize(11);
    text("CELDA", 730, 104);
    for (let i = 0; i < this.fusibles.length; i++) this.fusibles[i].dibujar();
    for (let i = 0; i < this.alarmas.length; i++) this.alarmas[i].dibujar();
    if (millis() - this.ultimo_golpe >= 1000 || frameCount % 6 < 3) {
      this.scott.dibujar();
    }
    fill(241);
    textSize(13);
    text("Flechas o WASD para moverte · Juntá los fusibles y llegá a la celda", 400, 383);
  }

  dibujar_panel() {
    fill(18, 23, 43);
    rect(96, 60, 608, 281, 12);
    fill(109, 227, 224);
    textAlign(CENTER, CENTER);
    textSize(29);
    if (this.estado === "instrucciones") {
      text("La celda del búnker", 400, 111);
      fill(248);
      textSize(17);
      text("Mové a Scott con las flechas o WASD.", 400, 156);
      text("Recogé los 3 fusibles y llegá a la celda en 30 segundos.", 400, 188);
      text("Evitá las alarmas rosas: cada golpe te quita una vida.", 400, 220);
      text("Podés reiniciar con R o con el botón Reiniciar.", 400, 249);
      this.boton("Empezar", 190, 277, 190);
      this.boton("Créditos", 420, 277, 190);
    } else if (this.estado === "creditos") {
      text("Créditos", 400, 111);
      fill(248);
      textSize(17);
      text("Florencia Gómez Orieta · Elena Pucheta", 400, 165);
      text("Programación Interactiva · Comisión 2", 400, 198);
      text("Basado en Scott Pilgrim, de Bryan Lee O’Malley.", 400, 230);
      this.boton("Volver a instrucciones", 295, 277, 210);
    } else if (this.estado === "gano") {
      text("Ganaste · Celda abierta", 400, 121);
      fill(248);
      textSize(17);
      text("Scott abrió la celda. Ahora puede decidir cómo sacar a Ramona.", 400, 188);
      this.boton("Continuar el relato", 298, 277, 204);
    } else {
      text("Perdiste · Celda bloqueada", 400, 121);
      fill(248);
      textSize(17);
      text(this.vidas === 0 ? "Las alarmas bloquearon el acceso." : "Se agotó el tiempo.", 400, 180);
      text("Ramona sigue encerrada en el búnker.", 400, 210);
      this.boton("Reintentar", 190, 277, 190);
      this.boton("Volver al inicio", 420, 277, 190);
    }
  }

  boton(texto, x, y, ancho) {
    fill(this.en_boton(mouseX, mouseY, x, y, ancho) ? "#94f0ea" : "#6de3e0");
    rect(x, y, ancho, 36, 6);
    fill(16, 20, 36);
    textAlign(CENTER, CENTER);
    textSize(15);
    text(texto, x + ancho / 2, y + 18);
  }

  en_boton(mx, my, x, y, ancho) {
    return mx >= x && mx <= x + ancho && my >= y && my <= y + 36;
  }

  clic(x, y) {
    if (this.estado === "instrucciones") {
      if (this.en_boton(x, y, 190, 277, 190)) this.reiniciar();
      if (this.en_boton(x, y, 420, 277, 190)) this.estado = "creditos";
    } else if (this.estado === "creditos" && this.en_boton(x, y, 295, 277, 210)) {
      this.abrir_instrucciones();
    } else if (this.estado === "jugando" && this.en_boton(x, y, 620, 23, 143)) {
      this.reiniciar();
    } else if (this.estado === "gano" && this.en_boton(x, y, 298, 277, 204)) {
      this.estado = "cerrado";
      return "continuar";
    } else if (this.estado === "perdio") {
      if (this.en_boton(x, y, 190, 277, 190)) this.reiniciar();
      if (this.en_boton(x, y, 420, 277, 190)) {
        this.estado = "cerrado";
        return "inicio";
      }
    }
  }
}
