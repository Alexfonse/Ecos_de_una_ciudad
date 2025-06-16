
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
        this.radius = 280;
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

