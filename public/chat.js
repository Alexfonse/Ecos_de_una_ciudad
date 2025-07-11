// ==================================================================
// ARCHIVO: public/chat.js (VERSIÓN FINAL CON PODCASTS INTEGRADOS)
// ==================================================================

// Variables globales
let respuestas;
const chatContainer = document.getElementById('chat-container');
const AVATAR_GAITALOMA = '../assets/img/gaita_sola.png'; // Ruta al avatar
let categoriaActual = null;
let indicePaso = 0;

/**
 * MODIFICADO: La función ahora acepta un objeto de mensaje con texto, imagen y/o audio.
 * @param {string|object} mensaje - El texto a mostrar o un objeto {texto, imagenURL, audioURL}.
 * @param {string} clase - 'bot' o 'user'.
 */
function agregarMensaje(mensaje, clase = 'bot') {
    const filaMensaje = document.createElement('div');
    filaMensaje.className = `mensaje-fila ${clase}`;

    let contenidoHTML = '';
    let textoParaHablar = '';

    if (clase === 'bot') {
        contenidoHTML += `<img src="${AVATAR_GAITALOMA}" alt="Avatar Don Gaitaloma" class="avatar-chat">`;
    }

    const burbujaContenido = document.createElement('div');
    burbujaContenido.className = `mensaje ${clase}`;

    if (typeof mensaje === 'object' && mensaje !== null) {
        textoParaHablar = mensaje.texto;
        
        // Añadir texto si existe
        if (mensaje.texto) {
            const parrafo = document.createElement('p');
            parrafo.textContent = mensaje.texto;
            burbujaContenido.appendChild(parrafo);
        }
        
        // Añadir imagen si existe
        if (mensaje.imagenURL) {
            const imagen = document.createElement('img');
            imagen.src = mensaje.imagenURL;
            imagen.alt = "Imagen enviada por Don Gaitaloma";
            imagen.className = "chat-image";
            burbujaContenido.appendChild(imagen);
        }

        // ¡NUEVO! Añadir reproductor de audio si existe
        if (mensaje.audioURL) {
            const audioPlayer = document.createElement('audio');
            audioPlayer.src = mensaje.audioURL;
            audioPlayer.controls = true;
            audioPlayer.className = "chat-audio"; // Clase para darle estilo
            burbujaContenido.appendChild(audioPlayer);
        }

    } else {
        textoParaHablar = mensaje;
        burbujaContenido.textContent = mensaje;
    }

    filaMensaje.innerHTML = contenidoHTML;
    filaMensaje.appendChild(burbujaContenido);
    chatContainer.appendChild(filaMensaje);

    filaMensaje.style.opacity = 0;
    filaMensaje.style.transform = 'translateY(10px)';
    setTimeout(() => {
        filaMensaje.style.opacity = 1;
        filaMensaje.style.transform = 'translateY(0)';
    }, 100);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (clase === 'bot' && textoParaHablar) {
        setTimeout(() => {
            voz.sonido('paloma');
            voz.hablar(textoParaHablar);
        }, 400);
    }
}

function agregarOpciones(opciones) {
    const divBtns = document.createElement('div');
    divBtns.className = 'opciones';
    opciones.forEach(opc => {
        const btn = document.createElement('button');
        btn.textContent = opc.texto;
        btn.onclick = () => manejarSeleccionUsuario(opc.texto, opc.funcion);
        divBtns.appendChild(btn);
    });
    chatContainer.appendChild(divBtns);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function manejarSeleccionUsuario(textoSeleccion, accionSiguiente) {
    agregarMensaje(textoSeleccion, 'user');

    const opcionesActuales = chatContainer.querySelector('.opciones');
    if (opcionesActuales) {
        opcionesActuales.querySelectorAll('button').forEach(btn => btn.disabled = true);
        opcionesActuales.style.transition = 'opacity 0.3s ease';
        opcionesActuales.style.opacity = 0;
        setTimeout(() => { opcionesActuales.remove(); }, 300);
    }

    const indicador = document.createElement('div');
    indicador.className = 'mensaje-fila bot';
    indicador.innerHTML = `
      <img src="${AVATAR_GAITALOMA}" alt="Avatar Don Gaitaloma" class="avatar-chat">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    chatContainer.appendChild(indicador);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        indicador.remove();
        accionSiguiente();
    }, 1500);
}

function mostrarMenuPrincipal() {
    agregarMensaje("¿En qué le puedo colaborar, sumercé? Elija un tema de conversación:", 'bot');
    const categorias = Object.keys(respuestas);
    const opciones = categorias.map(cat => ({
        texto: cat,
        funcion: () => seleccionarCategoria(cat)
    }));
    agregarOpciones(opciones);
}

function seleccionarCategoria(nombreCat) {
    categoriaActual = nombreCat;
    indicePaso = 0;
    const datosCat = respuestas[nombreCat];
    if (datosCat.intro) {
        agregarMensaje(datosCat.intro, 'bot');
    }
    if (datosCat.items && datosCat.items.length > 0) {
        if (datosCat.items[0].title) {
            const subOpciones = datosCat.items.map(item => ({
                texto: item.title,
                funcion: () => mostrarSubItem(item)
            }));
            subOpciones.push({ texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal });
            agregarOpciones(subOpciones);
        } else {
            mostrarPasoSecuencial();
        }
    }
}

/**
 * MODIFICADO: Ahora pasa el objeto completo, que puede incluir
 * texto, imagen y/o audio a la función `agregarMensaje`.
 */
function mostrarSubItem(item) {
    agregarMensaje({
        texto: item.text,
        imagenURL: item.imagenURL,
        audioURL: item.audioURL // ¡NUEVO! Pasamos la URL del audio
    }, 'bot');
    
    const opciones = [
        { texto: `🔄 Ver otro de "${categoriaActual}"`, funcion: () => seleccionarCategoria(categoriaActual) },
        { texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal }
    ];
    agregarOpciones(opciones);
}

function mostrarPasoSecuencial() {
    const items = respuestas[categoriaActual].items;
    if (indicePaso < items.length) {
        agregarMensaje(items[indicePaso], 'bot');
        indicePaso++;

        const opcionesSiguientes = [];
        if (indicePaso < items.length) {
            opcionesSiguientes.push({ texto: '▶ Siguiente', funcion: mostrarPasoSecuencial });
        }
        opcionesSiguientes.push({ texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal });
        agregarOpciones(opcionesSiguientes);
    }
}

// --- LÓGICA DE INICIO Y MANEJO DE SONIDO ---
fetch('./respuestas.json')
    .then(response => response.json())
    .then(data => {
        respuestas = data;
        const loader = document.getElementById('loader');
        if(loader) loader.style.display = 'none'; // Ocultar el loader
        
        chatContainer.innerHTML = '';
        mostrarMenuPrincipal();
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
    })
    .catch(error => {
        console.error("Error cargando respuestas.json:", error);
        agregarMensaje("Lo siento, hubo un error cargando la base de conocimientos.", 'bot');
    });

document.addEventListener('DOMContentLoaded', () => {
    const soundCheckbox = document.getElementById('sound-checkbox');
    if (soundCheckbox) {
        soundCheckbox.addEventListener('change', () => {
            if (typeof voz !== 'undefined') {
              voz.controlarSonido();
            }
        });
    }

    // Ya no necesitas la lógica del modal de podcast, la hemos integrado.
    // Puedes borrar el código relacionado a podcast-button, podcast-modal, etc.
});