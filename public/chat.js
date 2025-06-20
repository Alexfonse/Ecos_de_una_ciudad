// Variables globales
let respuestas;            // Objeto con la base de conocimiento (respuestas.json)
let categoriaActual = null;
let indicePaso = 0;

// Elementos del DOM
const chatContainer = document.getElementById('chat-container');

// Función para agregar un mensaje al chat
function agregarMensaje(texto, clase = 'bot') {
  const p = document.createElement('p');
  p.className = `mensaje ${clase}`;
  p.textContent = texto;
  chatContainer.appendChild(p);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  if (clase === 'bot') {
    voz.sonido('paloma');
    voz.hablar(texto);
  }
}

// Función para agregar botones de opción
function agregarOpciones(opciones) {
  const divBtns = document.createElement('div');
  divBtns.className = 'opciones';
  opciones.forEach(opc => {
    const btn = document.createElement('button');
    btn.textContent = opc.texto;
    btn.onclick = opc.funcion;
    divBtns.appendChild(btn);
  });
  chatContainer.appendChild(divBtns);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Reinicia la conversación al menú principal
function mostrarMenuPrincipal() {
  chatContainer.innerHTML = '';  // limpiar chat
  categoriaActual = null;
  indicePaso = 0;
  agregarMensaje("¿En qué le puedo colaborar, sumercé? Elija un tema de conversación:", 'bot');
  // Botones de categorías principales
  const categorias = Object.keys(respuestas);
  const opciones = categorias.map(cat => ({
    texto: cat,
    funcion: () => seleccionarCategoria(cat)
  }));
  agregarOpciones(opciones);
}

// Maneja la selección de una categoría principal
function seleccionarCategoria(nombreCat) {
  // Guardar categoría seleccionada y reiniciar índice (para secuenciales)
  categoriaActual = nombreCat;
  indicePaso = 0;
  // Limpiar opciones anteriores y mostrar intro o subopciones
  chatContainer.innerHTML = '';
  const datosCat = respuestas[nombreCat];
  if (datosCat.intro) {
    // Si hay texto introductorio, mostrarlo
    agregarMensaje(datosCat.intro, 'bot');
  }
  // Dependiendo del tipo de items (lista de objetos o lista de strings), actuar:
  if (datosCat.items.length && typeof datosCat.items[0] === 'object') {
    // Caso: la categoría tiene subelementos seleccionables (objetos con título)
    const subOpciones = datosCat.items.map(item => ({
      texto: item.title,
      funcion: () => mostrarSubItem(item)
    }));
    // Añadir botón para volver al menú principal
    subOpciones.push({
      texto: '↩ Volver al menú',
      funcion: mostrarMenuPrincipal
    });
    agregarOpciones(subOpciones);
  } else {
    // Caso: la categoría es una secuencia de pasos (lista de strings)
    mostrarPasoSecuencial();
  }
}

// Muestra contenido de un sub-elemento (personaje o lugar) y luego opciones para continuar
function mostrarSubItem(item) {
  // Limpiar opciones previas
  chatContainer.innerHTML = '';
  agregarMensaje(item.text, 'bot');  // mostrar contenido del subitem
  // Ofrecer opciones: ver otro del mismo tema, o volver al menú principal
  const opciones = [
    {
      texto: '🔄 Otro tema de ' + categoriaActual.toLowerCase(),
      funcion: () => seleccionarCategoria(categoriaActual)
    },
    {
      texto: '↩ Volver al menú',
      funcion: mostrarMenuPrincipal
    }
  ];
  agregarOpciones(opciones);
}

// Muestra el siguiente paso de una categoría secuencial (transporte, curiosidades)
function mostrarPasoSecuencial() {
  const items = respuestas[categoriaActual].items;
  if (indicePaso < items.length) {
    agregarMensaje(items[indicePaso], 'bot');
    indicePaso++;
    // Si hay más pasos, mostrar botón "Siguiente"
    if (indicePaso < items.length) {
      agregarOpciones([
        { texto: '▶ Siguiente', funcion: mostrarPasoSecuencial },
        { texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal }
      ]);
    } else {
      // Último paso: solo opción de volver al menú
      agregarOpciones([
        { texto: '↩ Volver al menú', funcion: mostrarMenuPrincipal }
      ]);
    }
  }
}

// Cargar el archivo JSON con las respuestas
fetch('./respuestas.json')
  .then(response => response.json())
  .then(data => {
    respuestas = data;
    // Iniciar la conversación mostrando el menú principal
    mostrarMenuPrincipal();
  })
  .catch(error => {
    console.error("Error cargando respuestas.json:", error);
    agregarMensaje("Lo siento, hubo un error cargando la base de conocimientos.", 'bot');
  });
