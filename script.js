const canciones = [
    { nombre: "Children of the Elder God", archivo: "mp3/Children of the Elder God.mp3" },
    { nombre: "Footsteps", archivo: "mp3/Cryptex - Footsteps.mp3" },
    { nombre: "I'm Still Standing", archivo: "mp3/Elton John - I'm Still Standing.mp3" }
];

let cancionActual = 0;

const audio = document.getElementById('audio');
const BtnAnterior = document.getElementById('anterior');
const BtnReproducir = document.getElementById('play-pausa');
const BtnSiguiente = document.getElementById('siguiente');
const songNameDisplay = document.getElementById('nombre-cancion');
const listaCanciones = document.getElementById('lista-canciones');

function cargarCancion() {
   
    document.querySelectorAll("#lista-canciones li").forEach(li => li.classList.remove('playing'));

    const canciónActualLi = document.querySelector(`#lista-canciones li:nth-child(${cancionActual + 1})`);
    canciónActualLi.classList.add('playing');

    audio.src = canciones[cancionActual].archivo;
    songNameDisplay.textContent = canciones[cancionActual].nombre;
    audio.load();
}

canciones.forEach((cancion, index) => {
    let li = document.createElement("li");
    li.textContent = cancion.nombre;
    li.setAttribute("data-index", index);
    li.addEventListener("click", () => {
        cancionActual = index;
        cargarCancion();
        audio.play();
    });
    listaCanciones.appendChild(li);
});

BtnAnterior.addEventListener('click', () => cambiarCancion("anterior"));
BtnSiguiente.addEventListener('click', () => cambiarCancion("siguiente"));

BtnReproducir.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        BtnReproducir.textContent = "⏸️ Pausar";
    } else {
        audio.pause();
        BtnReproducir.textContent = "▶️ Reproducir";
    }
});

audio.addEventListener('ended', () => {
    cambiarCancion("siguiente");
});

function cambiarCancion(direccion) {
    if (direccion === "anterior") {
        cancionActual = cancionActual === 0 ? canciones.length - 1 : cancionActual - 1;
    } else if (direccion === "siguiente") {
        cancionActual = cancionActual === canciones.length - 1 ? 0 : cancionActual + 1;
    }
    cargarCancion();
    audio.play();
}

cargarCancion();
