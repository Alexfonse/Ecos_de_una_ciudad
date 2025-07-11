// Usamos un "módulo" para mantener todo nuestro código de voz organizado
// y evitar conflictos con otras partes de tu proyecto.
const voz = (() => {
  // --- VARIABLES INTERNAS DEL MÓDULO ---
  const vozConfig = new SpeechSynthesisUtterance();
  const sonidoPaloma = new Audio('../assets/audio/paloma.mp3');
  let vocesDisponibles = [];
  let sonidoActivado = true; // El estado del sonido ahora vive dentro de nuestro módulo

  // --- CONFIGURACIÓN INICIAL DE LA VOZ DE DON GAITALOMA ---
  vozConfig.lang = 'es-CO';
  vozConfig.volume = 1;
  vozConfig.rate = 0.9;
  vozConfig.pitch = 0.95;
  sonidoPaloma.volume = 0.3;

  // --- FUNCIONES INTERNAS ---
  function cargarVoces() {
    vocesDisponibles = window.speechSynthesis.getVoices();
    let vozSeleccionada = 
      vocesDisponibles.find(v => v.name.includes('Google') && v.lang.startsWith('es')) ||
      vocesDisponibles.find(v => v.name.includes('Microsoft') && v.lang.startsWith('es')) ||
      vocesDisponibles.find(v => v.lang === 'es-CO') ||
      vocesDisponibles.find(v => v.lang === 'es-ES') ||
      vocesDisponibles.find(v => v.lang.startsWith('es'));

    if (vozSeleccionada) {
      vozConfig.voice = vozSeleccionada;
      console.log(`Voz seleccionada: ${vozSeleccionada.name}`);
    } else {
      console.log('No se encontró una voz de alta calidad en español, usando la por defecto.');
    }
  }

  // --- EVENTOS DEL NAVEGADOR ---
  window.speechSynthesis.onvoiceschanged = cargarVoces;
  cargarVoces(); // Llamada inicial

  // Evento para detener la voz si el usuario cierra o cambia de página
  window.addEventListener('beforeunload', () => {
    window.speechSynthesis.cancel();
  });

  // --- MÉTODOS PÚBLICOS (Lo que otras partes de tu código pueden usar) ---
  return {
    hablar: (texto) => {
      // Si el sonido está desactivado, no hacemos nada
      if (!sonidoActivado) return;
      
      window.speechSynthesis.cancel();
      vozConfig.text = texto;
      window.speechSynthesis.speak(vozConfig);
    },
    sonido: (nombre) => {
      // El efecto de la paloma también respeta si el sonido está activado
      if (!sonidoActivado) return;

      if (nombre === 'paloma') {
        try {
          sonidoPaloma.currentTime = 0;
          sonidoPaloma.play();
        } catch (e) {
          console.warn("No se pudo reproducir el sonido de paloma:", e);
        }
      }
    },
    // ¡NUEVO MÉTODO! Para controlar el encendido/apagado desde fuera
    controlarSonido: () => {
        sonidoActivado = !sonidoActivado; // Invierte el estado
        if (!sonidoActivado) {
            window.speechSynthesis.cancel(); // Si se apaga, se detiene el habla
        }
        return sonidoActivado; // Devuelve el nuevo estado (true o false)
    }
  };
})();