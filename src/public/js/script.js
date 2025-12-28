// Rellena aqui las preguntas pilaricha
const preguntas = [
    { titulo: "¿Cuál es el significado de las siglas de la asignatura EDA de tu hija?", 
        opciones: ["Estructura de Datos y Algoritmos", "Encrypted Data Architectures", "Entornos de Desarrollo Avanzado", "En Diciembre Abandonas "], correcta:0},
    {titulo: "Una vez una pareja repelente te preguntó de dónde eran nuestras pulseras masái, y te inventaste algo lo cual yo tuve que cubrir cuando les llevé las comidas. ¿Dónde dijiste que las compraste?", 
        opciones:["En Egipto de tour", "De Safari en Tanzania", "De Safari en Nigeria"], correcta:2},
    {titulo: "Quién dijo: Yo... una copita de frixante, de vino blanco", 
        opciones:["Pilar","Pilar"], correcta:0},
    {titulo: "Quién dijo: Pilar, ¿te puedes callar aunque sea cinco minutos?", 
        opciones:["Izan","Fran","Jose"], correcta:1},
    {titulo: "En la mesa del balcón que pinté, al tiempo, la pintura de uno de los edificios se estropeó, ¿Cuál fue??", 
        opciones:["El banco azul", "La veterinaria azul", "La casita de la Bella azul"], correcta:1},
    {titulo: "Cuántos meses he estado en muletas este año",
        opciones:["1","2","3","4"], correcta:1},
    {titulo: "¿Y cuántos meses cuando se me salió la rodilla?", 
        opciones:["1","2","3","4"], correcta:2},
    {titulo: "Día y hora a la que voy todas las semanas al fisio", 
        opciones:["Miércoles, 12:00","Miércoles, 12:30","Jueves, 12:00", "Jueves, 12:30"], correcta:2},
    {titulo: "Veces en el año que hemos ido al médico por las rodillas (las citas telefónicas y las pruebas cuentan)", 
        opciones:["9","11","13"], correcta:1},
    {titulo: "Título completo de la asignatura de segundo que aprobé en octubre", 
        opciones:["Bioquímica Estructural y Biología","Biología Molecular y Bioquímica", "Biología Celular y Bioquímica"], correcta:1},
    {titulo: "¿Cuántos entrevistados salieron en el reportaje de Quinto Mileuro?", 
        opciones:["2","3","4"], correcta:2},
    {titulo: "¿Qué tres objetos fueron robados y captados en cámara?", 
        opciones:["Caja de esturiones, el bote y Unicaja", "Caja de esturiones, Unicaja y un pascuero", "CajaSur, un pascuero y la caja de esturiones"], correcta:1},
    {titulo: "Nombre del libro que le has regalado a tu hijo estas navidades (francisco cállate la boca)", 
        opciones:["El reinado del naranjo","Como superar mi miedo a las naranjas", "El priorato del naranjo", "Soy alérgico a las naranjas"], correcta:2},
];

let indiceActual = 0;
let vidas = 3;

function actualizarVidasVisual() {
    const contenedorVidas = document.getElementById('contador-vidas');
    contenedorVidas.innerHTML = ""; // Limpiamos el contenido previo

    for (let i = 0; i < vidas; i++) {
        const corazon = document.createElement('img');
        // Cambia 'images/corazon.png' por la ruta de tu imagen
        corazon.src = 'https://cdn-icons-png.flaticon.com/512/833/833472.png'; 
        corazon.style.width = '30px'; // Ajusta el tamaño según prefieras
        corazon.style.marginRight = '5px';
        contenedorVidas.appendChild(corazon);
    }
}
// CARGA LAS PREGUNTAS
function cargarPregunta() {
    const contenedorCables = document.getElementById('contenedor-cables');
    const textoPregunta = document.getElementById('texto-pregunta');
    
    // Llamamos a la función para que los corazones salgan desde el inicio
    actualizarVidasVisual(); 

    contenedorCables.innerHTML = ""; 

    const pregunta = preguntas[indiceActual];
    textoPregunta.innerText = pregunta.titulo;

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
    const sonidoExplosion = document.getElementById('sonido-explosion');

    if (seleccion === preguntas[indiceActual].correcta) {
        indiceActual++;
        
        if (indiceActual < preguntas.length) {
            alert("¡Cable correcto! Sigamos...");
            cargarPregunta();
        } else {
            alert("BOMBA DESACTIVADA! Misión cumplida.");
            window.location.href = "/Bomba/desactivada";
        }
        
    } else {
        document.body.classList.add('shake-error');
        
        setTimeout(() => {
            document.body.classList.remove('shake-error');
        }, 2000);

        vidas--;
        // ACTUALIZAMOS LOS CORAZONES AQUÍ
        actualizarVidasVisual(); 
        
        if (vidas <= 0) {
            explosionDiv.style.backgroundImage = "url('images/gif/explosion.gif?a=" + Math.random() + "')";
            if(sonidoExplosion) sonidoExplosion.play();
            explosionDiv.style.display = "block";
            
            if(modelo3D) modelo3D.style.visibility = "hidden";
            document.body.style.animation = "shake-animation 0.2s infinite";

            setTimeout(() => {
                alert("¡BOOOOMBA! ¿Volvemos a empezar?");
                window.location.href = "/";
            }, 2000);

        } else {
            alert("¡ERROR! La bomba tiembla... te quedan " + vidas + " vidas.");
        }
    }
}

// Iniciar el juego al cargar la página
cargarPregunta();