
    // Datos de las imágenes con información detallada
    const galleryData = [
      {
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=1200&fit=crop',
        title: 'Centro Histórico',
        description: 'La arquitectura colonial que define el corazón de la ciudad, donde cada piedra cuenta siglos de historia.',
        location: 'La Candelaria',
        year: '2023'
      },
      {
        src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=1200&fit=crop',
        title: 'Modernidad Urbana',
        description: 'El contraste entre lo tradicional y lo contemporáneo, reflejando la evolución constante de nuestra metrópoli.',
        location: 'Zona Rosa',
        year: '2023'
      },
      {
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop',
        title: 'Amanecer Capitalino',
        description: 'Los primeros rayos de sol iluminan la silueta urbana, prometiendo un nuevo día lleno de posibilidades.',
        location: 'Cerros Orientales',
        year: '2023'
      },
      {
        src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=1200&fit=crop',
        title: 'Vida Nocturna',
        description: 'Cuando cae la noche, la ciudad se transforma en un escenario de luces y movimiento constante.',
        location: 'Zona T',
        year: '2023'
      },
      {
        src: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=1200&fit=crop',
        title: 'Reflexiones',
        description: 'Los edificios modernos crean juegos de espejos que multiplican la realidad urbana.',
        location: 'Centro Internacional',
        year: '2023'
      },
      {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=1200&fit=crop',
        title: 'Perspectivas',
        description: 'Una vista única de la geometría urbana, donde las líneas arquitectónicas dibujan el futuro.',
        location: 'Financial District',
        year: '2023'
      },
      {
        src: 'https://images.unsplash.com/photo-1467581451999-2b09c4369ff6?w=800&h=1200&fit=crop',
        title: 'Contrastes',
        description: 'La dualidad urbana capturada en un instante, mostrando la diversidad de nuestra ciudad.',
        location: 'Chapinero',
        year: '2023'
      }
    ];

    class EnhancedGallery {
      constructor() {
        this.gallery = document.getElementById('gallery');
        this.centerInfo = document.getElementById('centerInfo');
        this.items = [];
        this.activeIndex = -1;
this.radius = window.innerWidth < 768 ? 140 : 280;

        this.init();
      }

      init() {
        this.createItems();
        this.positionItems();
        this.bindEvents();

        // Animación inicial
        setTimeout(() => {
          this.animateItemsIn();
        }, 500);
      }

      createItems() {
        galleryData.forEach((data, index) => {
          const item = document.createElement('div');
          item.className = 'gallery-item';
          item.innerHTML = `
            <img src="${data.src}" alt="${data.title}" loading="lazy">
            <div class="image-info">
              <h3 class="image-title">${data.title}</h3>
              <p class="image-description">${data.description}</p>
              <div class="image-details">
                <span>📍 ${data.location}</span>
                <span>📅 ${data.year}</span>
              </div>
            </div>
          `;

          item.addEventListener('click', () => this.selectItem(index));
                    // Limpia clases previas
          this.items.forEach(item => item.classList.remove('active', 'hidden'));
          this.gallery.appendChild(item);
          this.items.forEach(item => item.classList.remove('active', 'hidden'));
          this.items.push(item);
        });
      }

      positionItems() {
        const centerX = this.gallery.offsetWidth / 2;
        const centerY = this.gallery.offsetHeight / 2;
        const angleStep = (2 * Math.PI) / this.items.length;

        this.items.forEach((item, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = centerX + this.radius * Math.cos(angle) - 70;
          const y = centerY + this.radius * Math.sin(angle) - 100;

          gsap.set(item, {
            left: x,
            top: y,
            rotation: 0,
            scale: 0,
            opacity: 0
          });
        });
      }

      animateItemsIn() {
        this.items.forEach((item, index) => {
          gsap.to(item, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)"
          });
        });
      }

      selectItem(index) {
        if (this.activeIndex === index) {
          this.deselectAll();
          return;
        }

        this.activeIndex = index;
        this.centerInfo.classList.remove('visible');

        // Animar elementos
this.items.forEach((item, i) => {
  item.classList.remove('active', 'hidden'); // ✅ limpiar siempre

  if (i === index) {
    item.classList.add('active');
    gsap.to(item, {
      left: this.gallery.offsetWidth / 2 - 150,
      top: this.gallery.offsetHeight / 2 - 200,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });
  } else {
    item.classList.add('hidden');
    gsap.to(item, {
      scale: 0.6,
      opacity: 0.3,
      duration: 0.6,
      ease: "power2.out"
    });
  }
});

      }

      deselectAll() {
        this.activeIndex = -1;
        this.centerInfo.classList.add('visible');

        this.items.forEach((item, index) => {
          item.classList.remove('active', 'hidden');

          const centerX = this.gallery.offsetWidth / 2;
          const centerY = this.gallery.offsetHeight / 2;
          const angleStep = (2 * Math.PI) / this.items.length;
          const angle = index * angleStep - Math.PI / 2;
          const x = centerX + this.radius * Math.cos(angle) - 70;
          const y = centerY + this.radius * Math.sin(angle) - 100;

          gsap.to(item, {
            left: x,
            top: y,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        });
      }

      nextItem() {
        if (this.activeIndex === -1) {
          this.selectItem(0);
        } else {
          const nextIndex = (this.activeIndex + 1) % this.items.length;
          this.selectItem(nextIndex);
        }
      }

      prevItem() {
        if (this.activeIndex === -1) {
          this.selectItem(this.items.length - 1);
        } else {
          const prevIndex = this.activeIndex === 0 ? this.items.length - 1 : this.activeIndex - 1;
          this.selectItem(prevIndex);
        }
      }

      bindEvents() {
        document.getElementById('nextBtn').addEventListener('click', () => this.nextItem());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevItem());

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
          switch (e.key) {
            case 'ArrowRight':
              e.preventDefault();
              this.nextItem();
              break;
            case 'ArrowLeft':
              e.preventDefault();
              this.prevItem();
              break;
            case 'Escape':
              this.deselectAll();
              break;
          }
        });

        // Redimensionar
window.addEventListener('resize', () => {
  // 🔁 Recalcular radio dinámicamente
  this.radius = window.innerWidth < 768 ? 140 : 280;

  this.positionItems();
  if (this.activeIndex !== -1) {
    this.selectItem(this.activeIndex);
  }
});

      }
    }

    // Inicializar cuando se carga la página
    window.addEventListener('load', () => {
      document.getElementById('loader').style.display = 'none';
      new EnhancedGallery();
    });

// Animación de aparición al hacer scroll para la galería adicional
document.addEventListener('DOMContentLoaded', () => {
  const scrollItems = document.querySelectorAll('.scroll-reveal');
  const observerOptions = {
    threshold: 0.2  // Porcentaje del elemento visible para activar/desactivar la animación
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');    // Mostrar con animación
      } else {
        entry.target.classList.remove('is-visible'); // Ocultar cuando sale del viewport
      }
    });
  }, observerOptions);

  // Observar cada elemento con la clase .scroll-reveal
  scrollItems.forEach(item => observer.observe(item));
});

// ========================================================================
// NUEVA SECCIÓN: LÓGICA DE LA MÁSCARA DE REVELADO TIPO PINTURA CON SVG
// ========================================================================

document.querySelectorAll('.reveal-mask-container').forEach(container => {
    // La imagen de primer plano (overlay) es la que se va a enmascarar para revelar la de abajo.
    const imgMaskOverlay = container.querySelector('.img-mask-overlay');
    // Creamos un indicador de clic específico para cada contenedor de imagen, para la retroalimentación visual.
    const clickIndicator = document.createElement('div');
    clickIndicator.className = 'click-indicator-scroll'; // Aplica la clase CSS definida en style.css
    container.appendChild(clickIndicator); // Añade el indicador al contenedor de la imagen.

    // Variables de estado para cada contenedor de imagen:
    let transitioning = false; // Controla si una animación está en curso para evitar clics múltiples.
    // ESTADO REVISADO: isRevealed es true si la imagen de ABAJO es visible.
    // Inicialmente, la imagen de primer plano (overlay) cubre, por lo que isRevealed es false.
    let isRevealed = false; 
    let currentAnimationId = null; // Almacena el ID de requestAnimationFrame para poder cancelarlo.
    let currentUniqueMask = null; // Almacena la referencia a la máscara SVG única actual para su limpieza.

    // Función principal para animar la transición de la máscara al hacer clic.
    function animateSvgMaskTransition(event) {
        // Si ya hay una animación en curso, ignora clics adicionales para evitar conflictos.
        if (transitioning) {
            return;
        }
        transitioning = true; // Marca que una transición ha comenzado.

        const containerRect = container.getBoundingClientRect();
        // Calcula las coordenadas del clic relativas al contenedor de la imagen.
        const clickX = event.clientX - containerRect.left;
        const clickY = event.clientY - containerRect.top;

        // Muestra y anima el indicador de clic en el punto del clic para retroalimentación visual.
        clickIndicator.style.left = `${clickX}px`;
        clickIndicator.style.top = `${clickY}px`;
        clickIndicator.style.opacity = '0.8';
        clickIndicator.style.transform = 'translate(-50%, -50%) scale(1.5)';

        // Programa el desvanecimiento y encogimiento del indicador después de un breve tiempo.
        setTimeout(() => {
            clickIndicator.style.opacity = '0';
            clickIndicator.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);

        // CLONACIÓN DEL CÍRCULO SVG Y LA MÁSCARA:
        const originalMask = document.getElementById('paintMask');
        if (!originalMask) {
            console.error("ERROR: La máscara SVG con ID 'paintMask' NO fue encontrada. Verifica tu galeria.html.");
            transitioning = false;
            return;
        }
        const uniqueMask = originalMask.cloneNode(true); // Clona la MÁSCARA completa.

        const uniqueMaskId = `paintMask-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        uniqueMask.id = uniqueMaskId;

        const uniqueMaskCircle = uniqueMask.querySelector('circle');
        uniqueMaskCircle.id = `maskCircle-${uniqueMaskId}`;
        
        const defsElement = document.querySelector('.hidden-svg-mask defs');
        if (!defsElement) {
            console.error("ERROR: No se encontró el elemento <defs> dentro de .hidden-svg-mask. ¿Está el SVG correctamente estructurado?");
            transitioning = false;
            return;
        }
        defsElement.appendChild(uniqueMask); // Añade la MÁSCARA clonada al <defs> del SVG global.
        currentUniqueMask = uniqueMask; // Guarda la referencia para posible limpieza posterior.


        // Aplica la máscara SVG con el ID único a la imagen de overlay.
        imgMaskOverlay.style.mask = `url(#${uniqueMaskId})`;
        imgMaskOverlay.style.webkitMask = `url(#${uniqueMaskId})`;
        // Importante: Al iniciar la animación, aseguramos que el overlay sea visible
        // para que la máscara tenga efecto sobre él.
        imgMaskOverlay.style.opacity = '1'; 


        // Calcula el radio máximo necesario para que el círculo cubra completamente la imagen.
        // AUMENTADO EL BUFFER para asegurar que cubra toda la rugosidad.
        const maxRadius = Math.sqrt(
            Math.max(clickX, containerRect.width - clickX)**2 +
            Math.max(clickY, containerRect.height - clickY)**2
        ) * 1.5; // AJUSTA ESTE MULTIPLICADOR (EJ: 1.6, 1.8, 2.0) SI AÚN SE VEN BORDES.


        // Determina el radio inicial del círculo basado en el estado actual (revelado o no).
        const initialRadius = isRevealed ? maxRadius : 0;
        // Para asegurar una transición suave si el estado no es el esperado al inicio,
        // el círculo puede empezar en un estado intermedio si se interrumpió una animación previa.
        // Pero para el clic, siempre empezamos desde el estado actual.
        uniqueMaskCircle.setAttribute('r', `${initialRadius}`);


        let startTime = null;
        // AJUSTE DE SUAVIDAD: Puedes ajustar la duración de la animación principal de la máscara aquí (en milisegundos).
        const animationDuration = 2000; // 2 segundos para una animación muy suave. AJUSTA ESTO (ej: 2500, 3000).


        // Función de bucle para la animación del círculo de la máscara utilizando requestAnimationFrame.
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = (currentTime - startTime) / animationDuration;

            if (!isRevealed) { // Si estamos REVELANDO la imagen (primer clic)
                if (progress < 1) {
                    // El radio crece desde initialRadius hasta maxRadius.
                    uniqueMaskCircle.setAttribute('r', `${initialRadius + progress * (maxRadius - initialRadius)}`);
                    currentAnimationId = requestAnimationFrame(animate);
                } else {
                    // Animación de revelado terminada:
                    uniqueMaskCircle.setAttribute('r', `${maxRadius}`); // Asegura que el círculo esté en su tamaño máximo.
                    
                    // IMPORTANTE: Aquí la imagen de overlay se hace completamente transparente.
                    // Esto revela la imagen de abajo de forma permanente hasta el próximo clic.
                    imgMaskOverlay.style.opacity = '0'; 
                    imgMaskOverlay.style.mask = 'none'; // Quita la máscara
                    imgMaskOverlay.style.webkitMask = 'none';
                    isRevealed = true; // Marca el estado como revelado.
                    
                    // Limpia la máscara SVG única del DOM.
                    setTimeout(() => {
                        if (currentUniqueMask && currentUniqueMask.parentNode) {
                            currentUniqueMask.parentNode.removeChild(currentUniqueMask);
                            currentUniqueMask = null;
                        }
                    }, 500); // Retraso antes de eliminar.

                    transitioning = false; // Libera la bandera de transición.
                    currentAnimationId = null; // Reinicia el ID de animación.
                }
            } else { // Si estamos OCULTANDO la imagen (segundo clic)
                // Invierte el progreso para que la animación se ejecute en reversa (de 1 a 0).
                progress = 1 - progress; 
                if (progress > 0) { // Asegura que el radio no sea negativo o quede en 0.
                    // El radio se contrae desde maxRadius hasta 0.
                    uniqueMaskCircle.setAttribute('r', `${progress * maxRadius}`);
                    currentAnimationId = requestAnimationFrame(animate);
                } else {
                    // Animación de ocultamiento terminada:
                    uniqueMaskCircle.setAttribute('r', '0'); // Vuelve el radio a 0.
                    
                    // IMPORTANTE: Aquí la imagen de overlay vuelve a ser completamente visible.
                    // Esto cubre la imagen de abajo de nuevo.
                    imgMaskOverlay.style.opacity = '1'; 
                    imgMaskOverlay.style.mask = 'none'; // Asegura que no tenga máscara después de la animación de reversa.
                    imgMaskOverlay.style.webkitMask = 'none';
                    isRevealed = false; // Marca el estado como no revelado (oculto).
                    
                    // Limpia la máscara SVG única del DOM.
                    setTimeout(() => {
                        if (currentUniqueMask && currentUniqueMask.parentNode) {
                            currentUniqueMask.parentNode.removeChild(currentUniqueMask);
                            currentUniqueMask = null;
                        }
                    }, 500);

                    transitioning = false; // Libera la bandera de transición.
                    currentAnimationId = null; // Reinicia el ID de animación.
                }
            }
        }

        currentAnimationId = requestAnimationFrame(animate); // Inicia la animación.
    }

    // Añade el evento de clic al contenedor de la imagen para iniciar el efecto.
    container.addEventListener('click', animateSvgMaskTransition);

    // Comportamiento al quitar el hover (mouse leave):
    // Se ha simplificado para que no interfiera con el ciclo de clic revelar/ocultar.
    // Solo si una transición está activa y el mouse sale, se cancela y se restablece el estado.
    container.addEventListener('mouseleave', () => {
        if (transitioning) { // Si el mouse sale *durante* una transición activa...
            if (currentAnimationId) {
                cancelAnimationFrame(currentAnimationId); // Cancela la animación.
                currentAnimationId = null;
            }
            
            // Restablece el estado visual del overlay al estado que DEBERÍA tener al final de la animación,
            // si esta no se hubiera interrumpido.
            if (isRevealed) { // Si la animación interrumpida era para OCULTAR
                 imgMaskOverlay.style.opacity = '0'; // Se queda revelada
                 imgMaskOverlay.style.mask = 'none';
                 imgMaskOverlay.style.webkitMask = 'none';
            } else { // Si la animación interrumpida era para REVELAR
                imgMaskOverlay.style.opacity = '1'; // Se queda cubierta
                imgMaskOverlay.style.mask = 'none';
                imgMaskOverlay.style.webkitMask = 'none';
            }
            
            // Limpia cualquier máscara única que haya quedado en el DOM.
            if (currentUniqueMask && currentUniqueMask.parentNode) {
                currentUniqueMask.parentNode.removeChild(currentUniqueMask);
                currentUniqueMask = null;
            }
            transitioning = false; // Libera la bandera.
        }
    });

    // Listener para el redimensionamiento del contenedor:
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === container) {
          // El maxRadius se calcula al clic, asegurando la responsividad.
        }
      }
    });
    resizeObserver.observe(container);
});
