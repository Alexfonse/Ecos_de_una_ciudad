const voz = (() => {
  const vozConfig = new SpeechSynthesisUtterance();
  let vocesDisponibles = [];

  // --- CONFIGURACIÓN DE LA VOZ ---
  // Estos valores son para darle carácter a Don Gaitaloma. ¡Puedes jugar con ellos!
  vozConfig.lang = 'es-CO'; // Idioma y acento deseado
  vozConfig.volume = 1;     // Volumen (0 a 1)
  vozConfig.rate = 0.9;     // Velocidad del habla (0.1 a 10). Un poco más lento suena más deliberado.
  vozConfig.pitch = 0.95;   // Tono de la voz (0 a 2). Un poco más grave.

  // --- FUNCIÓN PARA CARGAR Y SELECCIONAR LA MEJOR VOZ ---
  function cargarVoces() {
    vocesDisponibles = window.speechSynthesis.getVoices();
    
    // Prioridad de búsqueda: Intentamos encontrar las voces de mayor calidad primero.
    let vozSeleccionada = 
      vocesDisponibles.find(v => v.name.includes('Google') && v.lang.startsWith('es')) ||
      vocesDisponibles.find(v => v.name.includes('Microsoft') && v.lang.startsWith('es')) ||
      vocesDisponibles.find(v => v.lang === 'es-CO') ||
      vocesDisponibles.find(v => v.lang === 'es-ES') ||
      vocesDisponibles.find(v => v.lang === 'es-US') ||
      vocesDisponibles.find(v => v.lang.startsWith('es')); // Cualquier otra voz en español

    if (vozSeleccionada) {
      vozConfig.voice = vozSeleccionada;
      console.log(`Voz seleccionada: ${vozSeleccionada.name}`);
    } else {
      console.log('No se encontró una voz de alta calidad en español, usando la voz por defecto.');
    }
  }

  // Las voces a veces no cargan de inmediato. Este evento nos avisa cuando están listas.
  window.speechSynthesis.onvoiceschanged = cargarVoces;
  // Llamamos a la función una vez por si las voces ya estaban cargadas.
  cargarVoces();

  // --- REPRODUCTOR DE SONIDOS ---
  const sonidoPaloma = new Audio('../assets/audio/paloma.mp3'); // Ruta corregida
  sonidoPaloma.volume = 0.3; // Bajamos un poco el volumen del efecto

  return {
    hablar: (texto) => {
      // Detenemos cualquier habla anterior para evitar que se superpongan
      window.speechSynthesis.cancel(); 
      
      vozConfig.text = texto;
      window.speechSynthesis.speak(vozConfig);
    },
    sonido: (nombre) => {
      if (nombre === 'paloma') {
        try {
          sonidoPaloma.currentTime = 0;
          sonidoPaloma.play();
        } catch (e) {
          console.warn("No se pudo reproducir el sonido de paloma:", e);
        }
      }
    }
  };
})();