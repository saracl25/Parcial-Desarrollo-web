console.log("CYLONS Softbot - Sistema de Asistencia Iniciado");

// 1. Consumir API Externa (Alertas Urbanas/Comunitarias simuladas)
async function obtenerAlertasUrbanas() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
        const noticias = await respuesta.json();
        renderizarNoticias(noticias);
    } catch (error) {
        console.error("Error consultando alertas urbanas:", error);
    }
}

function renderizarNoticias(noticias) {
    const contenedor = document.querySelector("#listaNoticias");
    contenedor.innerHTML = "";

    for (const noticia of noticias) {
        const articulo = document.createElement("article");
        articulo.classList.add("card-item");

        const titulo = document.createElement("h3");
        titulo.textContent = "🔔 " + noticia.title.substring(0, 30) + "...";

        const contenido = document.createElement("p");
        contenido.textContent = noticia.body;

        articulo.appendChild(titulo);
        articulo.appendChild(contenido);
        contenedor.appendChild(articulo);
    }
}

// 2. Consumir JSON Local (rutas.json)
async function obtenerRutasGuardadas() {
    try {
        const respuesta = await fetch("rutas.json");
        const rutas = await respuesta.json();
        renderizarRutas(rutas);
    } catch (error) {
        console.error("Error al cargar las rutas desde rutas.json:", error);
    }
}

function renderizarRutas(rutas) {
    const contenedor = document.querySelector("#listaRutas");
    contenedor.innerHTML = "";

    for (const ruta of rutas) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card-item");

        const titulo = document.createElement("h3");
        titulo.textContent = ruta.nombre;

        const tiempo = document.createElement("p");
        tiempo.innerHTML = `<strong>Tiempo est.:</strong> ${ruta.tiempo}`;

        const modalidad = document.createElement("p");
        modalidad.textContent = `Estado: ${ruta.modalidad}`;

        const alerta = document.createElement("p");
        alerta.style.color = "#fbbf24";
        alerta.textContent = `⚠️ ${ruta.alerta}`;

        const botonSeleccionar = document.createElement("button");
        botonSeleccionar.classList.add("btn-secundario");
        botonSeleccionar.textContent = "Seleccionar Ruta";
        botonSeleccionar.setAttribute("data-ruta", ruta.nombre);

        botonSeleccionar.addEventListener("click", () => {
            mostrarMensajeTexto(`Ruta seleccionada: ${ruta.nombre}. ${ruta.alerta}`);
        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(tiempo);
        tarjeta.appendChild(modalidad);
        tarjeta.appendChild(alerta);
        tarjeta.appendChild(botonSeleccionar);

        contenedor.appendChild(tarjeta);
    }
}

function mostrarMensajeTexto(mensajeTexto) {
    const consola = document.querySelector("#mensajeConsola");
    consola.style.display = "block";
    consola.textContent = mensajeTexto;
}


document.querySelector("#btnNavegacion").addEventListener("click", () => {
    mostrarMensajeTexto("Iniciando navegacion guiada paso a paso. Buscando senal GPS...");
});


obtenerRutasGuardadas();
obtenerAlertasUrbanas();