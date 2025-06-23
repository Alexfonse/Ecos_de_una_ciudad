/*
================================================================================
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
================================================================================
      AQUÍ EMPIEZA EL CÓDIGO COMPLETO PARA TU ARCHIVO 'galeria.js'
================================================================================
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
================================================================================
*/

// ========================================================================
// --- SECCIÓN 1: CÓDIGO PARA LA GALERÍA CIRCULAR (LA DE ARRIBA) ---
// ========================================================================

const circularGalleryData = [
  {
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=1200&fit=crop',
    title: 'Centro Histórico',
    description: 'La arquitectura colonial que define el corazón de la ciudad.',
    location: 'La Candelaria',
    year: '2023'
  },
  {
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=1200&fit=crop',
    title: 'Modernidad Urbana',
    description: 'El contraste entre lo tradicional y lo contemporáneo.',
    location: 'Zona Rosa',
    year: '2023'
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop',
    title: 'Amanecer Capitalino',
    description: 'Los primeros rayos de sol iluminan la silueta urbana.',
    location: 'Cerros Orientales',
    year: '2023'
  },
    {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop',
    title: 'Amanecer Capitalino',
    description: 'Los primeros rayos de sol iluminan la silueta urbana.',
    location: 'Cerros Orientales',
    year: '2023'
  },
    {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop',
    title: 'Amanecer Capitalino',
    description: 'Los primeros rayos de sol iluminan la silueta urbana.',
    location: 'Cerros Orientales',
    year: '2023'
  },
    {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop',
    title: 'Amanecer Capitalino',
    description: 'Los primeros rayos de sol iluminan la silueta urbana.',
    location: 'Cerros Orientales',
    year: '2023'
  },
];

class EnhancedGallery {
  constructor() {
    this.gallery = document.getElementById('gallery');
    this.centerInfo = document.getElementById('centerInfo');
    if (!this.gallery) return;
    this.items = [];
    this.activeIndex = -1;
    this.radius = window.innerWidth < 768 ? 140 : 280;
    this.init();
  }

  init() {
    this.createItems();
    this.positionItems();
    this.bindEvents();
    setTimeout(() => this.animateItemsIn(), 500);
  }

  createItems() {
    circularGalleryData.forEach((data, index) => {
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
      this.gallery.appendChild(item);
      this.items.push(item);
    });
  }

  positionItems() {
    if (!this.gallery) return;
    const centerX = this.gallery.offsetWidth / 2;
    const centerY = this.gallery.offsetHeight / 2;
    const angleStep = (2 * Math.PI) / this.items.length;
    this.items.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + this.radius * Math.cos(angle) - 70;
      const y = centerY + this.radius * Math.sin(angle) - 100;
      gsap.set(item, { left: x, top: y, rotation: 0, scale: 0, opacity: 0 });
    });
  }

  animateItemsIn() {
    this.items.forEach((item, index) => {
      gsap.to(item, { scale: 1, opacity: 1, duration: 0.6, delay: index * 0.1, ease: "back.out(1.7)" });
    });
  }

  selectItem(index) {
    if (this.activeIndex === index) {
      this.deselectAll();
      return;
    }
    this.activeIndex = index;
    if (this.centerInfo) this.centerInfo.classList.remove('visible');
    this.items.forEach((item, i) => {
      item.classList.remove('active', 'hidden');
      if (i === index) {
        item.classList.add('active');
        gsap.to(item, { left: this.gallery.offsetWidth / 2 - 150, top: this.gallery.offsetHeight / 2 - 200, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" });
      } else {
        item.classList.add('hidden');
        gsap.to(item, { scale: 0.6, opacity: 0.3, duration: 0.6, ease: "power2.out" });
      }
    });
  }

  deselectAll() {
    this.activeIndex = -1;
    if (this.centerInfo) this.centerInfo.classList.add('visible');
    this.items.forEach(item => item.classList.remove('active', 'hidden'));
    this.positionItems();
    this.animateItemsIn();
  }

  nextItem() {
    const nextIndex = this.activeIndex === -1 ? 0 : (this.activeIndex + 1) % this.items.length;
    this.selectItem(nextIndex);
  }

  prevItem() {
    const prevIndex = this.activeIndex <= 0 ? this.items.length - 1 : this.activeIndex - 1;
    this.selectItem(prevIndex);
  }

  bindEvents() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextItem());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevItem());

    document.addEventListener('keydown', (e) => {
      if (!this.gallery.contains(document.activeElement) && !this.gallery.matches(':hover')) return;
      if (e.key === 'ArrowRight') this.nextItem();
      if (e.key === 'ArrowLeft') this.prevItem();
      if (e.key === 'Escape') this.deselectAll();
    });
    window.addEventListener('resize', () => {
      this.radius = window.innerWidth < 768 ? 140 : 280;
      this.deselectAll();
    });
  }
}

// ========================================================================
// --- SECCIÓN 2: CÓDIGO PARA LAS GALERÍAS DE SCROLL ---
// ========================================================================

// --- 2.1 DATOS PARA LA GALERÍA DE ARQUITECTURA ---
const scrollGalleryData = [
    { 
        items: [
            {
                src: 'assets/img/prueba.png',
                title: 'Plaza de Bolívar y sus Alrededores',
                description: 'Un recorrido visual por el corazón histórico y político de Bogotá, donde convergen el pasado y el presente.'
            },
            {
                src: 'assets/img/prueba3.jpeg',
                title: 'El Capitolio Nacional',
                description: 'Sede del Congreso de la República, su construcción tardó casi 80 años en completarse.'
            },
            {
                src: 'assets/img/prueba_2.png',
                title: 'Catedral Primada de Colombia',
                description: 'Construida entre 1807 y 1823, es un monumento neoclásico que guarda la historia religiosa del país.'
            }
        ]
    },
    { 
        items: [
            {
                src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
                title: 'La Metrópoli desde las Alturas',
                description: 'Una vista panorámica que captura la inmensidad y la densidad de la ciudad moderna.'
            },
            {
                src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
                title: 'Reflejos de la Vida Urbana',
                description: 'Los edificios actúan como espejos, duplicando la energía y el movimiento constante de las calles.'
            }
        ]
    }
];

// --- 2.2 DATOS PARA LA GALERÍA DE PERSONAJES ---
const characterGalleryData = [
    { 
        items: [
            {
                src: 'assets/img/prueba.png',
                title: 'Gabriel García Márquez',
                description: 'Premio Nobel de Literatura en 1982, su obra inmortalizó a Colombia en el realismo mágico.'
            },
            {
                src: 'assets/img/prueba.png',
                title: 'Gabo, Años de Juventud',
                description: '“Lo que importa en la vida no es lo que te ocurre, sino lo que recuerdas y cómo lo recuerdas para contarlo.”'
            }
        ]
    },
    { 
        items: [
            {
                src: 'assets/img/prueba3.jpeg',
                title: 'Jorge Eliécer Gaitán',
                description: 'Líder político cuya voz resonó en toda la nación y cuyo asesinato marcó un antes y un después en la historia del país.'
            }
        ]
    }
];

// --- 2.3 LÓGICA PRINCIPAL QUE SE EJECUTA AL CARGAR LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    // Inicia la galería circular de arriba
    new EnhancedGallery();

    const maskCircle = document.getElementById('maskCircle');
    if (!maskCircle) return; // Si no hay máscara, detenemos todo para evitar errores.

    // --- FUNCIÓN GENÉRICA PARA CREAR UNA GALERÍA DE SCROLL ---
    // Esta función tomará los datos, el ID del contenedor y una clase especial
    // para crear una galería. La usaremos para Arquitectura y para Personajes.
    function createScrollGallery(data, containerId, specialClass) {
        const galleryContainer = document.getElementById(containerId);
        if (!galleryContainer) return; // Si no encuentra el contenedor, no hace nada.

        data.forEach((gallery, galleryIndex) => {
            const initialItem = gallery.items[0];
            const galleryItem = document.createElement('div');
            galleryItem.className = `scroll-gallery-item ${specialClass} scroll-reveal`;

            galleryItem.innerHTML = `
                <div class="scroll-item-image reveal-mask-container">
                    <img src="${initialItem.src}" alt="${initialItem.title}" class="img-revealed">
                    <img src="" alt="" class="img-mask-overlay" style="opacity: 0;">
                    <div class="click-indicator-scroll"></div>
                </div>
                <div class="scroll-item-text">
                    <h3 class="gallery-item-title">${initialItem.title}</h3>
                    <p class="gallery-item-description">${initialItem.description}</p>
                    <p class="text-sm text-gray-400" style="opacity: 0.7;">Haz clic en la imagen para explorar.</p>
                </div>
            `;
            galleryContainer.appendChild(galleryItem);

            if ((galleryIndex + 1) % 2 === 0) {
                galleryItem.style.flexDirection = 'row-reverse';
            }

            const imageContainer = galleryItem.querySelector('.reveal-mask-container');
            const currentImage = galleryItem.querySelector('.img-revealed');
            const nextImage = galleryItem.querySelector('.img-mask-overlay');
            const clickIndicator = galleryItem.querySelector('.click-indicator-scroll');
            const titleElement = galleryItem.querySelector('.gallery-item-title');
            const descriptionElement = galleryItem.querySelector('.gallery-item-description');
            
            let currentIndex = 0;
            let transitioning = false;

            imageContainer.addEventListener('click', (event) => {
                if (transitioning) return;
                transitioning = true;

                titleElement.style.opacity = '0';
                descriptionElement.style.opacity = '0';

                const containerRect = imageContainer.getBoundingClientRect();
                const clickX = event.clientX - containerRect.left;
                const clickY = event.clientY - containerRect.top;

                clickIndicator.style.left = `${clickX}px`;
                clickIndicator.style.top = `${clickY}px`;
                clickIndicator.style.opacity = '0.8';
                setTimeout(() => { clickIndicator.style.opacity = '0'; }, 300);

                const newIndex = (currentIndex + 1) % gallery.items.length;
                const newItem = gallery.items[newIndex];
                
                nextImage.src = newItem.src;
                nextImage.alt = newItem.title;
                nextImage.style.opacity = '1';
                nextImage.style.mask = 'url(#paintMask)';
                nextImage.style.webkitMask = 'url(#paintMask)';
                
                maskCircle.setAttribute('cx', `${clickX}px`);
                maskCircle.setAttribute('cy', `${clickY}px`);
                maskCircle.setAttribute('r', '0');

                let startTime = null;
                const duration = 1500;
                const maxRadius = Math.sqrt(Math.max(clickX, containerRect.width - clickX)**2 + Math.max(clickY, containerRect.height - clickY)**2) * 1.1;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const progress = (currentTime - startTime) / duration;

                    if (progress < 1) {
                        maskCircle.setAttribute('r', `${progress * maxRadius}`);
                        requestAnimationFrame(animate);
                    } else {
                        currentImage.src = newItem.src;
                        currentImage.alt = newItem.title;
                        
                        titleElement.textContent = newItem.title;
                        descriptionElement.textContent = newItem.description;

                        titleElement.style.opacity = '1';
                        descriptionElement.style.opacity = '1';
                        
                        nextImage.style.opacity = '0';
                        nextImage.style.mask = 'none';
                        nextImage.style.webkitMask = 'none';
                        maskCircle.setAttribute('r', '0');
                        
                        currentIndex = newIndex;
                        transitioning = false;
                    }
                }
                requestAnimationFrame(animate);
            });
        });
    }

    // --- AHORA USAMOS LA FUNCIÓN PARA CREAR AMBAS GALERÍAS ---
    // 1. Creamos la galería de Arquitectura (sin clase especial)
    createScrollGallery(scrollGalleryData, 'scroll-gallery-container', '');
    
    // 2. Creamos la galería de Personajes (con la clase 'character-item' para los estilos Polaroid)
    createScrollGallery(characterGalleryData, 'character-gallery-container', 'character-item');

    // --- CÓDIGO PARA EL EFECTO DE APARICIÓN AL HACER SCROLL ---
    const scrollItems = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });
    scrollItems.forEach(item => observer.observe(item));
});