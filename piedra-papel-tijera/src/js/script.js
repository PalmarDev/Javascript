let jugador1Conteo = 0;
let jugador2Conteo = 0;

function jugar(eleccionJugador1) {
  const eleccionJugador2 = Math.floor(Math.random() * 3); // Elección aleatoria de la computadora (0, 1 o 2)

  const opciones = ["Piedra", "Papel", "Tijera"];
  const resultado = determinarResultado(eleccionJugador1, eleccionJugador2);

  const resultadoHTML = `
    Jugador eligió ${opciones[eleccionJugador1]}.<br>
    Computadora eligió ${opciones[eleccionJugador2]}.<br>
    ${resultado}
  `;

  document.getElementById("resultado").innerHTML = resultadoHTML;

  actualizarConteo(resultado);
}

function determinarResultado(eleccionJugador1, eleccionJugador2) {
  if (eleccionJugador1 === eleccionJugador2) {
    return "Empate";
  } else if (
    (eleccionJugador1 === 0 && eleccionJugador2 === 2) ||
    (eleccionJugador1 === 1 && eleccionJugador2 === 0) ||
    (eleccionJugador1 === 2 && eleccionJugador2 === 1)
  ) {
    return "Jugador gana";
  } else {
    return "Computadora gana";
  }
}

function actualizarConteo(resultado) {
  if (resultado === "Jugador gana") {
    jugador1Conteo++;
  } else if (resultado === "Computadora gana") {
    jugador2Conteo++;
  }

  document.getElementById("jugador1Conteo").textContent = jugador1Conteo;
  document.getElementById("jugador2Conteo").textContent = jugador2Conteo;
}
