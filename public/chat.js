// Variables globales
let respuestas;
const chatContainer = document.getElementById('chat-container');
const AVATAR_GAITALOMA = '../assets/img/prueba_2.png'; // Ruta al avatar

/**
 * NOVEDAD: La función ahora crea una fila completa (avatar + burbuja).
 */
function agregarMensaje(texto, clase = 'bot') {
  const filaMensaje = document.createElement('div');
  filaMensaje.className = `mensaje-fila ${clase}`;

  let contenidoHTML = '';

  if (clase === 'bot') {
    // Si el mensaje es del bot, añade el avatar
    contenidoHTML += `<img src="${AVATAR_GAITALOMA}" alt="Avatar Don Gaitaloma" class="avatar-chat">`;
  }
  
  // Añade la burbuja del mensaje
  contenidoHTML += `<p class="mensaje ${clase}">${texto}</p>`;
  
  filaMensaje.innerHTML = contenidoHTML;
  
  // Inserta la fila completa en el chat
  chatContainer.appendChild(filaMensaje);

  // Animación y scroll (sin cambios)
  filaMensaje.style.opacity = 0;
  filaMensaje.style.transform = 'translateY(10px)';
  setTimeout(() => {
    filaMensaje.style.opacity = 1;
    filaMensaje.style.transform = 'translateY(0)';
  }, 100);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  if (clase === 'bot') {
    setTimeout(() => {
      voz.sonido('paloma');
      voz.hablar(texto);
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
  // 1. Mostrar la elección del usuario como un mensaje.
  agregarMensaje(textoSeleccion, 'user');

  // 2. Deshabilitar y eliminar los botones de opción.
  const opcionesActuales = chatContainer.querySelector('.opciones');
  if (opcionesActuales) {
    opcionesActuales.querySelectorAll('button').forEach(btn => btn.disabled = true);
    opcionesActuales.style.transition = 'opacity 0.3s ease';
    opcionesActuales.style.opacity = 0;
    setTimeout(() => { opcionesActuales.remove(); }, 300);
  }

  // 3. NOVEDAD: Mostrar el indicador de "escribiendo...".
  const indicador = document.createElement('div');
  indicador.className = 'mensaje-fila bot'; // Para que se alinee a la izquierda
  indicador.innerHTML = `
    <img src="${AVATAR_GAITALOMA}" alt="Avatar Don Gaitaloma" class="avatar-chat">
    <div class="typing-indicator">
      <span></span><span></span><span></span>
    </div>
  `;
  chatContainer.appendChild(indicador);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // 4. Simular que el bot "piensa".
  setTimeout(() => {
    // 5. NOVEDAD: Eliminar el indicador de "escribiendo...".
    indicador.remove();
    
    // 6. Ejecutar la acción correspondiente (mostrar la respuesta del bot).
    accionSiguiente();
  }, 1500); // Aumenté un poco el tiempo para que el indicador sea visible
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
  if (datosCat.items.length && typeof datosCat.items[0] === 'object') {
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

function mostrarSubItem(item) {
  agregarMensaje(item.text, 'bot');
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

fetch('./respuestas.json')
  .then(response => response.json())
  .then(data => {
    respuestas = data;
    chatContainer.innerHTML = '';
    mostrarMenuPrincipal();
    // NOVEDAD: Inicializa los íconos de Lucide que acabamos de añadir
    lucide.createIcons();
  })
  .catch(error => {
    console.error("Error cargando respuestas.json:", error);
    agregarMensaje("Lo siento, hubo un error cargando la base de conocimientos.", 'bot');
  });