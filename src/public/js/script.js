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
    const explosionDiv = document.getElementById('explosion-animacion');
    const modelo3D = document.getElementById('bomba-3d');

    if (seleccion === preguntas[indiceActual].correcta) {
        alert("¡Cable correcto!");
        indiceActual++;
        if (indiceActual < preguntas.length) {
            cargarPregunta();
        } else {
            alert("¡BOMBA DESACTIVADA!");
        }
    } else {
        vidas--;
        document.getElementById('contador-vidas').innerText = vidas;
        
        if (vidas <= 0) {
            // --- LÓGICA DE EXPLOSIÓN ---
            
            // 1. Mostrar la animación y poner el GIF (añade un timestamp para que el GIF empiece de cero)
            explosionDiv.style.backgroundImage = "url('images/gif/explosion.gif?a=" + Math.random() + "')";
            explosionDiv.style.display = "block";
            
            // qUitamos la bomba porq ha explotado
            if(modelo3D) modelo3D.style.visibility = "hidden";
            

            document.body.classList.add('shake');

            
            setTimeout(() => {
                alert("¡BOOOOMBA!");
                alert("Volver a empezar")
                location.reload(); 
            }, 2000); // 2 segundos de margen para ver la explosión

        } else {
            alert("Uy uy uy... Cable incorrecto.");
            
            if (indiceActual < preguntas.length) {
                cargarPregunta();
            }
        }
    }
}

// Iniciar el juego al cargar la página
cargarPregunta();