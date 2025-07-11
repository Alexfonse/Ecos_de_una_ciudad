// ==================================================================
// ARCHIVO: public/chat.js (VERSIÓN COMPLETA Y ACTUALIZADA)
// ==================================================================

// Variables globales
let respuestas;
const chatContainer = document.getElementById('chat-container');
const AVATAR_GAITALOMA = '../assets/img/prueba_2.png'; // Ruta al avatar
let categoriaActual = null;
let indicePaso = 0;


/**
 * MODIFICADO: La función ahora acepta un objeto de mensaje además de texto simple.
 * Esto nos permite pasar tanto el texto como la URL de una imagen.
 * @param {string|object} mensaje - El texto a mostrar o un objeto {texto, imagenURL}.
 * @param {string} clase - 'bot' o 'user'.
 */
function agregarMensaje(mensaje, clase = 'bot') {
    const filaMensaje = document.createElement('div');
    filaMensaje.className = `mensaje-fila ${clase}`;

    let contenidoHTML = '';
    let textoParaHablar = ''; // NUEVO: Variable para la síntesis de voz.

    if (clase === 'bot') {
        contenidoHTML += `<img src="${AVATAR_GAITALOMA}" alt="Avatar Don Gaitaloma" class="avatar-chat">`;
    }

    // NUEVO: Contenedor para la burbuja de mensaje para agrupar texto e imagen.
    const burbujaContenido = document.createElement('div');
    burbujaContenido.className = `mensaje ${clase}`;

    // MODIFICADO: Comprobamos si el mensaje es un objeto (con texto/imagen) o solo texto.
    if (typeof mensaje === 'object' && mensaje !== null) {
        textoParaHablar = mensaje.texto; // Usamos el texto del objeto para la voz.
        if (mensaje.texto) {
            const parrafo = document.createElement('p');
            parrafo.textContent = mensaje.texto;
            burbujaContenido.appendChild(parrafo);
        }
        if (mensaje.imagenURL) {
            const imagen = document.createElement('img');
            imagen.src = mensaje.imagenURL;
            imagen.alt = "Imagen enviada por Don Gaitaloma";
            imagen.className = "chat-image"; // Clase para darle estilo CSS
            burbujaContenido.appendChild(imagen);
        }
    } else {
        // Si es solo texto, funciona como antes.
        textoParaHablar = mensaje;
        burbujaContenido.textContent = mensaje;
    }

    // Unimos todo
    filaMensaje.innerHTML = contenidoHTML;
    filaMensaje.appendChild(burbujaContenido);
    chatContainer.appendChild(filaMensaje);

    // Animación y scroll (sin cambios)
    filaMensaje.style.opacity = 0;
    filaMensaje.style.transform = 'translateY(10px)';
    setTimeout(() => {
        filaMensaje.style.opacity = 1;
        filaMensaje.style.transform = 'translateY(0)';
    }, 100);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // MODIFICADO: Usamos la variable textoParaHablar para la síntesis de voz.
    if (clase === 'bot') {
        setTimeout(() => {
            voz.sonido('paloma');
            // Solo hablamos si hay texto que decir.
            if (textoParaHablar) {
                voz.hablar(textoParaHablar);
            }
        }, 400);
    }
}


// El resto del archivo JavaScript sigue la misma lógica de antes,
// solo que ahora `agregarMensaje` es más potente.

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
    // MODIFICADO: Se ajusta la lógica para que siempre espere objetos en la lista de items.
    if (datosCat.items && datosCat.items.length > 0) {
        // Comprobamos si los items tienen un 'title', lo que indica un submenú.
        if (datosCat.items[0].title) {
            const subOpciones = datosCat.items.map(item => ({
                texto: item.title,
                funcion: () => mostrarSubItem(item)
            }));
            subOpciones.push({ texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal });
            agregarOpciones(subOpciones);
        } else {
            // Si no hay 'title', es una conversación secuencial.
            mostrarPasoSecuencial();
        }
    }
}


function mostrarSubItem(item) {
    // MODIFICADO: Pasamos el objeto entero {text, imagenURL} a agregarMensaje
    // para que pueda mostrar tanto el texto como la imagen si existe.
    // Usamos 'item.text' en lugar de 'item' para el mensaje.
    agregarMensaje({ texto: item.text, imagenURL: item.imagenURL }, 'bot');
    
    const opciones = [
        { texto: `🔄 Ver otro de "${categoriaActual}"`, funcion: () => seleccionarCategoria(categoriaActual) },
        { texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal }
    ];
    agregarOpciones(opciones);
}


function mostrarPasoSecuencial() {
    const items = respuestas[categoriaActual].items;
    if (indicePaso < items.length) {
        // MODIFICADO: Pasamos el objeto entero del array de items.
        // agregarMensaje se encargará de mostrar el texto y la imagen.
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


// --- LÓGICA DE INICIO Y MANEJO DE SONIDO (SIN CAMBIOS) ---

fetch('./respuestas.json')
    .then(response => response.json())
    .then(data => {
        respuestas = data;
        chatContainer.innerHTML = '';
        mostrarMenuPrincipal();
        lucide.createIcons();
    })
    .catch(error => {
        console.error("Error cargando respuestas.json:", error);
        agregarMensaje("Lo siento, hubo un error cargando la base de conocimientos.", 'bot');
    });

document.addEventListener('DOMContentLoaded', () => {
    const soundCheckbox = document.getElementById('sound-checkbox');
    if (soundCheckbox) {
        soundCheckbox.addEventListener('change', () => {
            voz.controlarSonido();
        });
    }
});