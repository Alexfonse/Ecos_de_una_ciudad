const voz = (() => {
  // Configurar síntesis de voz
  const vozConfig = new SpeechSynthesisUtterance();
  vozConfig.lang = 'es-CO';
  vozConfig.rate = 1;  // velocidad normal
  vozConfig.pitch = 1; // tono normal

  // Cargar audio de efecto de paloma
  const sonidoPaloma = new Audio('./assets/audio/paloma.mp3');

  return {
    hablar: (texto) => {
      // Usar la API de síntesis de voz del navegador
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
