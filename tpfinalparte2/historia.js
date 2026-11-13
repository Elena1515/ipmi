function cargar_frames(rutas) {
  let frames = [];
  for (let i = 0; i < rutas.length; i++) {
    frames.push(loadImage(rutas[i]));
  }
  return frames;
}

function cargar_recursos() {
  let rutas_fondos = [
    "data/alfombra.jpeg",
    "data/arribadeltren.jpeg",
    "data/bunker.jpeg",
    "data/calle.jpeg",
    "data/carrito.jpeg",
    "data/escaleras.jpeg",
    "data/esquina.jpeg",
    "data/tren.jpeg",
    "data/trenendojo.jpeg"
  ];
  let fondos = [];
  for (let i = 0; i < rutas_fondos.length; i++) {
    fondos.push(loadImage(rutas_fondos[i]));
  }

  let scottQuieto = cargar_frames([
    "data/scottquieto1.png",
    "data/scottquieto2.png",
    "data/scottquieto3.png",
    "data/scottquieto4.png"
  ]);

  let scottCamina = cargar_frames([
    "data/scottcamina1.png",
    "data/scottcamina2.png",
    "data/scottcamina3.png",
    "data/scottcamina4.png"
  ]);

  let scottInvestiga = cargar_frames([
    "data/scottinv1.png",
    "data/scottinv2.png",
    "data/scottinv3.png"
  ]);

  let gideonQuieto = cargar_frames([
    "data/gideonquieto1.png",
    "data/gideonquieto2.png",
    "data/gideonquieto3.png",
    "data/gideonquieto4.png"
  ]);

  let gideonCamina = cargar_frames([
    "data/gideoncamina1.png",
    "data/gideoncamina2.png",
    "data/gideoncamina3.png",
    "data/gideoncamina4.png"
  ]);

  let gideonAccion = cargar_frames([
    "data/gideonaccion1.png",
    "data/gideonaccion2.png",
    "data/gideonaccion3.png",
    "data/gideonaccion4.png"
  ]);

  let neilQuieto = cargar_frames([
    "data/neilquieto1.png",
    "data/neilquieto2.png",
    "data/neilquieto3.png",
    "data/neilquieto4.png"
  ]);

  let neilHablando = cargar_frames([
    "data/neilhablando1.png",
    "data/neilhablando2.png",
    "data/neilhablando3.png"
  ]);

  let ramonaQuieta = cargar_frames([
    "data/ramonaquieta1.png",
    "data/ramonaquieta2.png",
    "data/ramonaquieta3.png"
  ]);

  let ramonaCamina = cargar_frames([
    "data/ramonacamina1.png",
    "data/ramonacamina2.png",
    "data/ramonacamina3.png",
    "data/ramonacamina4.png",
    "data/ramonacamina5.png",
    "data/ramonacamina6.png"
  ]);

 
  let animaciones_por_pantalla = [
    [],
    scottQuieto,
    scottInvestiga,
    scottCamina,
    scottInvestiga,
    scottQuieto,
    scottInvestiga,
    scottInvestiga,
    neilQuieto,
    neilHablando,
    neilHablando,
    scottInvestiga,
    gideonCamina,
    scottInvestiga,
    gideonQuieto,
    scottQuieto,
    ramonaQuieta,
    ramonaCamina,
    gideonAccion,
    []
  ];

  let fuente = loadFont("data/Dusty.ttf");

  let sonido_fondo = loadSound("data/fondo.mp3.mpeg");

  return {
    fondos, fuente, sonido_fondo, animaciones_por_pantalla,
    scottQuieto, scottCamina, gideonQuieto, gideonCamina, neilHablando, ramonaCamina
  };
}

function dibujar_personaje(frames, x, y, alto, velocidad) {
  let indice = floor(frameCount / velocidad) % frames.length;
  let imagen_actual = frames[indice];
  let ancho = alto * imagen_actual.width / imagen_actual.height;
  imageMode(CENTER);
  image(imagen_actual, x, y, ancho, alto);
}

class Historia {
  constructor(recursos) {
    this.recursos = recursos;
    this.reiniciar();

  

    this.titulos = [
      "el ultimo tren de las 3:16",
      "recibe y revisa el mensaje",
      "investigar el mensaje",
      "investigar el lugar",
      "primera pista",
      "decide que pista seguir",
      "el rastro de la fibra",
      "el rastro de las huellas",
      "aparece una pista falsa",
      "interrogatorio",
      "confiar",
      "desconfiar",
      "pista verdadera",
      "decide que hacer con la evidencia",
      "la celda del bunker",
      "decision final",
      "final 1: caso cerrado",
      "final 2: rescate",
      "final 3: pista falsa"
    ];

    this.relatos = [
      "una investigacion de scott pilgrim",
      "ramona dejo un mensaje de voz antes de desaparecer. al final se oye: «el tren se detuvo a las 3:16... alguien abrio la puerta desde arriba».",
      "en el vagon 2426, scott encuentra un boleto roto con la hora 3:16. una fibra violeta quedo enganchada en la tapa de mantenimiento.",
      "en la esquina nevada hay huellas que salen de la estacion. junto a ellas, una marca de rueda termina cerca del carrito de comida.",
      "el boleto roto y las huellas coinciden con el horario del tren. dos rastros se alejan del vagon: una fibra violeta y barro fresco.",
      "la fibra apunta al antiguo cine. las huellas bajan por las escaleras del parque. scott debe elegir que rastro seguir primero.",
      "la fibra termina junto a la alfombra del cine. alli hay una credencial rota de neil, el encargado del carrito. la pista parece clara, demasiado clara.",
      "las huellas llegan hasta las escaleras. en el barro aparece una ficha del dojo con las iniciales de neil, el encargado del carrito.",
      "un recibo marca una entrega de neil a las 3:16. la credencial y la ficha tambien parecen senalarlo. pero el recibo tiene una mancha de aceite sobre la hora.",
      "neil espera en el dojo. dice que solo vendio cafe esa noche y que vio a alguien con una caja metalica subir al techo del tren.",
      "neil muestra su registro de ventas: el recibo se imprimio antes de la desaparicion. recuerda un broche con el emblema de gideon en la caja metalica.",
      "scott compara el reloj del dojo con el recibo. el reloj se habia detenido antes de las 3:16. en el reflejo de una camara se ve a alguien subir al techo.",
      "sobre el tren, scott encuentra la tapa forzada y una marca del broche de gideon. la caja paso por alli: neil decia la verdad.",
      "la camara del cine capto la caja y el broche. scott puede entregar todas las pruebas ahora o guardarlas para seguir la senal.",
      "la senal lleva a scott hasta el bunker. gideon esta alli con ramona y los registros robados. es el responsable de la desaparicion.",
      "scott tiene poco tiempo. puede presentar las pruebas, rescatar a ramona o insistir en la pista falsa contra neil.",
      "scott entrega la evidencia completa. la policia detiene a gideon y ramona queda a salvo. el ultimo tren llega a destino.",
      "scott saca a ramona del bunker antes de que llegue la policia. escapan juntos, pero gideon desaparece con parte de la evidencia.",
      "scott denuncia a neil por el recibo manipulado. scott abandona el bunker. gideon vuelve a llevarse a ramona y el caso queda mal cerrado."
    ];

    this.indices_fondos = [
      3,
      6,
      7,
      3,
      7,
      6,
      0,
      5,
      4,
      8,
      8,
      8,
      1,
      0,
      2,
      2,
      2,
      3,
      4,
      0
    ];

    this.pistas = [
      "",
      "mensaje",
      "boleto",
      "huellas",
      "boleto",
      "fibra",
      "gafete",
      "huellas",
      "recibo",
      "recibo",
      "recibo",
      "camara",
      "llave",
      "camara",
      "pantallas",
      "pruebas",
      "pruebas",
      "llave",
      "recibo"
    ];


    this.textos_opciones = [
      ["comenzar investigacion", "creditos"],
      ["investigar mensaje", "investigar lugar"],
      ["anotar la pista"],
      ["seguir el rastro"],
      ["comparar las pistas"],
      ["seguir la fibra roja", "seguir las huellas"],
      ["seguir la credencial"],
      ["seguir la ficha"],
      ["interrogar a neil"],
      ["confiar", "desconfiar", "volver al inicio"],
      ["comprobar el techo del tren"],
      ["comprobar el techo del tren"],
      ["reunir la evidencia"],
      ["publicar la evidencia", "guardarla y seguir la senal"],
      ["destrabar la celda"],
      ["presentar las pruebas", "rescatar a ramona", "acusar a neil"],
      ["reiniciar", "creditos"],
      ["reiniciar", "creditos"],
      ["reiniciar", "creditos"],
      ["volver al menu"]
    ];

    this.destinos_opciones = [
      [1, 19],
      [2, 3],
      [4],
      [4],
      [5],
      [6, 7],
      [8],
      [8],
      [9],
      [10, 11, 0],
      [12],
      [12],
      [13],
      [14, 14],
      [15],
      [16, 17, 18],
      [0, 19],
      [0, 19],
      [0, 19],
      [0]
    ];

    this.efectos_opciones = [
      ["", ""],
      ["", ""],
      [""],
      [""],
      [""],
      ["seguir_fibra", "seguir_huellas"],
      [""],
      [""],
      [""],
      ["confiar", "desconfiar", ""],
      [""],
      [""],
      [""],
      ["publicar", "guardar"],
      [""],
      ["", "", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      [""]
    ];
  }

  dibujar() {
    imageMode(CENTER);
    textFont(this.recursos.fuente);
    textAlign(LEFT, TOP);

    let opciones = this.textos_opciones[this.pantalla];

    if (this.pantalla === 0) {
      image(this.recursos.fondos[this.indices_fondos[this.pantalla]], 400, 225, 800, 450);
      noStroke();
      fill(7, 8, 27, 205);
      rect(0, 0, 800, 450);

      fill(255, 47, 132);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("expediente policial · 03:16", 400, 66);

      fill(255);
      textSize(38);
      text("el ultimo tren", 400, 112);

      fill(73, 226, 237);
      textSize(28);
      text("de las 3:16", 400, 151);

      dibujar_personaje(this.recursos.scottQuieto, 250, 286, 132, 7);
      dibujar_personaje(this.recursos.gideonQuieto, 550, 286, 132, 8);

      fill(255);
      textSize(15);
      text("haz clic en una opcion para comenzar", 400, 353);
    } else if (this.pantalla === 19) {
      image(this.recursos.fondos[this.indices_fondos[this.pantalla]], 400, 225, 800, 450);
      noStroke();
      fill(8, 8, 25, 220);
      rect(0, 0, 800, 450);

      fill(255, 47, 132);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("creditos", 400, 54);

      dibujar_personaje(this.recursos.scottCamina, 190, 177, 98, 7);
      dibujar_personaje(this.recursos.ramonaCamina, 330, 177, 98, 8);
      dibujar_personaje(this.recursos.gideonCamina, 470, 177, 98, 8);
      dibujar_personaje(this.recursos.neilHablando, 610, 177, 98, 9);

      fill(255);
      textSize(19);
      text("florencia gomez orieta · elena pucheta", 400, 264);
      textSize(17);
      text("comision 2 · aventura y desafio del bunker", 400, 294);

      fill(73, 226, 237);
      textSize(15);
      text("basado en scott pilgrim, creado por bryan lee o'malley", 400, 327);

    } else {
      let pista = this.pistas[this.pantalla];
      image(this.recursos.fondos[this.indices_fondos[this.pantalla]], 400, 225, 800, 450);

      if (this.recursos.animaciones_por_pantalla[this.pantalla].length > 0) {
        let x_personaje = 116;
        let y_personaje = 230;
        let alto_personaje = 124;

        if (this.pantalla === 8 || this.pantalla === 9 || this.pantalla === 10) {
          x_personaje = 126;
          y_personaje = 226;
        }

        if (this.pantalla === 14 || this.pantalla === 18) {
          x_personaje = 650;
          y_personaje = 224;
          alto_personaje = 140;
        }

        dibujar_personaje(
          this.recursos.animaciones_por_pantalla[this.pantalla],
          x_personaje,
          y_personaje,
          alto_personaje,
          7
        );
      }

      if (pista) {
        let x = 684;
        let y = 166;
        push();
        rectMode(CORNER);
        noStroke();
        fill(12, 13, 29, 235);
        rect(x, y, 94, 92, 7);
        fill(255, 218, 92);
        stroke(255, 218, 92);
        strokeWeight(3);

        if (pista === "mensaje") {
          noFill();
          rect(x + 28, y + 10, 38, 49, 4);
          line(x + 36, y + 45, x + 58, y + 45);
          ellipse(x + 47, y + 53, 4, 4);
        } else if (pista === "boleto") {
          noFill();
          rect(x + 15, y + 18, 64, 32, 3);
          line(x + 20, y + 27, x + 46, y + 27);
          line(x + 20, y + 36, x + 39, y + 36);
          fill(255, 218, 92);
          noStroke();
          textAlign(CENTER, CENTER);
          textSize(12);
          text("3:16", x + 62, y + 36);
        } else if (pista === "huellas") {
          noStroke();
          ellipse(x + 34, y + 28, 14, 22);
          ellipse(x + 53, y + 43, 14, 22);
          ellipse(x + 30, y + 54, 14, 22);
          ellipse(x + 58, y + 20, 14, 22);
        } else if (pista === "fibra") {
          noFill();
          stroke(255, 52, 141);
          strokeWeight(5);
          bezier(x + 18, y + 52, x + 36, y + 10, x + 56, y + 76, x + 76, y + 29);
        } else if (pista === "recibo") {
          noFill();
          stroke(255, 218, 92);
          strokeWeight(3);
          rect(x + 25, y + 11, 46, 53);
          line(x + 32, y + 25, x + 64, y + 25);
          line(x + 32, y + 35, x + 62, y + 35);
          line(x + 32, y + 45, x + 55, y + 45);
        } else if (pista === "gafete") {
          noFill();
          rect(x + 29, y + 17, 38, 42, 4);
          ellipse(x + 48, y + 32, 13, 13);
          line(x + 38, y + 48, x + 58, y + 48);
        } else if (pista === "llave") {
          noFill();
          ellipse(x + 34, y + 34, 24, 24);
          line(x + 46, y + 42, x + 69, y + 58);
          line(x + 61, y + 52, x + 67, y + 46);
          line(x + 67, y + 58, x + 73, y + 52);
        } else if (pista === "camara") {
          noFill();
          rect(x + 19, y + 21, 56, 36, 5);
          ellipse(x + 48, y + 39, 19, 19);
          line(x + 31, y + 17, x + 41, y + 17);
        } else if (pista === "pantallas") {
          noFill();
          rect(x + 15, y + 18, 28, 25, 3);
          rect(x + 50, y + 18, 28, 25, 3);
          rect(x + 32, y + 48, 30, 20, 3);
          line(x + 28, y + 45, x + 28, y + 50);
          line(x + 63, y + 45, x + 63, y + 50);
        } else if (pista === "pruebas") {
          noFill();
          rect(x + 23, y + 12, 49, 55, 3);
          line(x + 33, y + 27, x + 61, y + 27);
          line(x + 33, y + 38, x + 61, y + 38);
          line(x + 33, y + 49, x + 55, y + 49);
        }

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(11);
        text(pista, x + 47, y + 79);
        pop();
      }

      noStroke();
      fill(8, 9, 24, 228);
      rect(20, 276, 760, 160, 7);

      fill(255, 47, 132);
      textAlign(LEFT, TOP);
      textSize(21);
      text(this.titulos[this.pantalla], 42, 293, 700, 30);

      let narrativa = this.relatos[this.pantalla];

      if (this.pantalla === 8 && this.pista_seguida === "fibra") {
        narrativa = "la fibra roja termina junto al carrito. neil tiene una prenda parecida y un recibo marca las 3:16. la pista parece incriminarlo, pero la hora esta manchada.";
      }

      if (this.pantalla === 8 && this.pista_seguida === "huellas") {
        narrativa = "las huellas terminan junto al carrito. neil estaba alli a las 3:16 y su ficha quedo en el barro. la pista parece incriminarlo, pero el recibo tiene aceite sobre la hora.";
      }

      if (this.pantalla === 12 && this.confia_neil) {
        narrativa = "neil cumplio su palabra. sobre el tren, scott encuentra la tapa forzada y una marca del broche de gideon en la caja metalica.";
      }

      if (this.pantalla === 12 && !this.confia_neil) {
        narrativa = "la camara confirma que neil no pudo llevar la caja. sobre el tren, scott encuentra la tapa forzada y una marca del broche de gideon.";
      }

      if (this.pantalla === 14 && this.evidencia_publica) {
        narrativa = "la evidencia publicada lleva a scott al bunker. gideon encerro a ramona. para abrir la celda, scott debe recuperar tres fusibles y evitar las alarmas.";
      }

      if (this.pantalla === 14 && !this.evidencia_publica) {
        narrativa = "scott sigue la senal hasta el bunker. gideon encerro a ramona. para abrir la celda, scott debe recuperar tres fusibles y evitar las alarmas.";
      }

      fill(255);
      textSize(16);
      textLeading(19);
      text(narrativa, 42, 326, 710, 54);
    }

    for (let i = 0; i < opciones.length; i++) {
      let ancho = (720 - (opciones.length - 1) * 12) / opciones.length;
      let x = 40 + i * (ancho + 12);
      let y = 390;

      noStroke();
      if (i === 0) {
        fill(203, 37, 104);
      } else if (i === 1) {
        fill(24, 145, 177);
      } else {
        fill(87, 65, 143);
      }

      rect(x, y, ancho, 40, 5);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(14);
      text(opciones[i], x + 5, y + 3, ancho - 10, 34);
    }
  }

  clic(x_mouse, y_mouse) {
    let opciones = this.textos_opciones[this.pantalla];

    let ancho = (720 - (opciones.length - 1) * 12) / opciones.length;

    for (let i = 0; i < opciones.length; i++) {
      let x = 40 + i * (ancho + 12);
      let y = 390;

      if (
        x_mouse >= x &&
        x_mouse <= x + ancho &&
        y_mouse >= y &&
        y_mouse <= y + 40
      ) {
        let efecto = this.efectos_opciones[this.pantalla][i];

        if (efecto === "seguir_fibra") {
          this.pista_seguida = "fibra";
        }

        if (efecto === "seguir_huellas") {
          this.pista_seguida = "huellas";
        }

        if (efecto === "confiar") {
          this.confia_neil = true;
        }

        if (efecto === "desconfiar") {
          this.confia_neil = false;
        }

        if (efecto === "publicar") {
          this.evidencia_publica = true;
        }

        if (efecto === "guardar") {
          this.evidencia_publica = false;
        }

        if (this.pantalla === 14) {
          return true;
        } else {
          this.pantalla = this.destinos_opciones[this.pantalla][i];
          if (this.pantalla === 0) this.reiniciar();
        }

        return false;
      }
    }
  }

  reiniciar() {
    this.pantalla = 0;
    this.pista_seguida = "";
    this.confia_neil = false;
    this.evidencia_publica = false;
  }

  continuar() {
    this.pantalla = this.destinos_opciones[this.pantalla][0];
  }
}
