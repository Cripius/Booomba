// Rellena aqui las preguntas pilaricha
const preguntas = [
    { titulo: "Primera pregunta", opciones: ["Azul", "Verde", "Rojo", "Amarillo"], correcta: 0 },
    { titulo: "Segunda pregunta", opciones: ["Azul", "Verde", "Rojo", "Amarillo"], correcta: 1 },
];

let indiceActual = 0;
let vidas = 3;

// CARGA LAS PREGUNTAS
function cargarPregunta() {
    const contenedorCables = document.getElementById('contenedor-cables');
    const textoPregunta = document.getElementById('texto-pregunta');

  // LIMPIA
    contenedorCables.innerHTML = ""; 

    const pregunta = preguntas[indiceActual];
    textoPregunta.innerText = pregunta.titulo;

  // Creamos los cables (botones) dinámicamente
    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.innerText = opcion;
        boton.onclick = () => verificarRespuesta(index);
        contenedorCables.appendChild(boton);
    });
}

// VALIDACIÓN
function verificarRespuesta(seleccion) {
    if (seleccion === preguntas[indiceActual].correcta) {
        alert("¡Cable correcto! Vamos a la siguiente pregunta");
        indiceActual++;
        if (indiceActual < preguntas.length) {
        cargarPregunta(); // Cambia a la siguiente sin recargar
        } else {
        alert("¡BOMBA DESACTIVADA!");
        }
        } else {
        vidas--;
        document.getElementById('contador-vidas').innerText = vidas;
        if (vidas <= 0) {
        alert("¡BOOOOOOOOMBA");
        location.reload(); // Reinicia el juego
        } else {
        alert("Uy uy uy...");
        }
    }
}

// Iniciar el juego al cargar la página
cargarPregunta();