// Rellena aqui las preguntas pilaricha
const preguntas = [
    { titulo: "Primera pregunta", opciones: ["Azul", "Verde", "Rojo", "Amarillo"], correcta: 0 },
    { titulo: "Segunda pregunta", opciones: ["Azul", "Verde", "Rojo", "Amarillo"], correcta: 1 },
    { titulo: "Tercera pregunta", opciones: ["Azul", "Verde", "Rojo", "Amarillo"], correcta: 1 },
    { titulo: "Cuarta pregunta", opciones: ["Azul", "Verde", "Rojo", "Amarillo"], correcta: 1 },
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
        // --- LÓGICA DE VICTORIA ---
        indiceActual++;
        
        if (indiceActual < preguntas.length) {
            alert("¡Cable correcto! Sigamos...");
            cargarPregunta();
        } else {
            // ¡ESTO ES LO QUE BUSCABAS!
            alert("¡SISTEMA DESACTIVADO! Misión cumplida.");
            window.location.href = "/Bomba/desactivada"; // Cambia esto por el nombre de tu página de éxito
        }
        
    } else {
        // --- LÓGICA DE FALLO (TEMBLOR) ---
        document.body.classList.add('shake-error');
        
        // Quitamos la clase del temblor corto para que pueda repetirse
        setTimeout(() => {
            document.body.classList.remove('shake-error');
        }, 2000);

        vidas--;
        document.getElementById('contador-vidas').innerText = vidas;
        
        if (vidas <= 0) {
            // --- LÓGICA DE EXPLOSIÓN ---
            explosionDiv.style.backgroundImage = "url('images/gif/explosion.gif?a=" + Math.random() + "')";
            explosionDiv.style.display = "block";
            
            if(modelo3D) modelo3D.style.visibility = "hidden";

            // Temblor infinito mientras explota
            document.body.style.animation = "shake-animation 0.2s infinite";

            setTimeout(() => {
                alert("¡BOOOOMBA!");
                window.location.href = "/";
            }, 2000);

        } else {
            alert("¡ERROR! La bomba se vuelve inestable... te quedan " + vidas + " vidas.");
            
            // // Pasamos a la siguiente aunque falle para no estancarse
            // indiceActual++;
            // if (indiceActual < preguntas.length) {
            //     cargarPregunta();
            // } else {
            //     // Si falla la última y le quedan vidas, también explota o redirige a "derrota"
            //     alert("Demasiados fallos al final...");
            //     location.reload();
            // }
        }
    }
}

// Iniciar el juego al cargar la página
cargarPregunta();