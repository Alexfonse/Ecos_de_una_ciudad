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
    src: 'assets/img/artis.png',
    title: 'Pionero del Impresionismo Colombiano',
    description: 'Andrés de Santa María fue el artista que rompió con la tradición académica en Colombia, introduciendo el Impresionismo y abriendo un nuevo camino para el arte moderno en el país. Sus obras, como "La calle en Bogotá" o "Interior del claustro de San Agustín", capturaron la luz y la atmósfera de su tiempo, dejando un legado transformador.',
    location: '(Director de la Escuela Nacional de Bellas Artes)',
    year: '1860-1945'
  },
  {
    src: 'assets/img/silva.png',
    title: 'La Voz del Modernismo',
    description: 'José Asunción Silva, figura central del modernismo literario en Colombia, fue un poeta cuya obra se caracteriza por una profunda sensibilidad, introspección y melancolía. Títulos como "Nocturno" y "De sobremesa" son referentes de su genio. Su legado poético sigue vivo en Bogotá, donde su antigua casa es hoy la Casa de Poesía Silva, un importante museo literario.',
    location: 'Bogotá (Casa de Poesía Silva)',
    year: '1865-1896'
  },
  {
    src: 'assets/img/mario.png',
    title: 'El Cronista del Caos Urbano',
    description: 'Mario Mendoza es uno de los novelistas contemporáneos más influyentes de Bogotá. Su obra literaria se sumerge en el caos urbano, entrelazando elementos psicológicos y sociales que reflejan los miedos, contradicciones y espiritualidades de la ciudad. Novelas como "Satanás", "Scorpio City" y "El año del verano que nunca llegó" a menudo se ambientan en las calles y lugares reales de Bogotá, consolidando su legado como un agudo observador de la vida capitalina.',
    location: 'Bogotá (Lugares reales de la ciudad en sus novelas)',
    year: '2023'
  },
    {
    src: 'assets/img/elisa.png',
    title: 'Precursora de la Voz Femenina',
    description: ' Elisa Mujica fue una destacada escritora, poeta, activista y diplomática que residió en Bogotá. Su obra fue precursora al abordar temas cruciales como la identidad femenina, la ciencia y la cultura, dándole voz a las mujeres en un ámbito literario y social tradicionalmente dominado por hombres. Su libro "El mundo secreto" es un reflejo de sus profundas reflexiones sobre el papel de la mujer en la sociedad intelectual de su tiempo.',
    location: 'Bogotá',
    year: '1918-2003'
  },
    {
    src: 'assets/img/lucy.png',
    title: 'Miradas Femeninas en el Arte Colombiano',
    description: 'Aunque oriunda de Pereira, Lucy Tejada tuvo una gran presencia artística en Bogotá, donde sus obras reflejan con maestría la vida cotidiana femenina, la maternidad y el conflicto interno. Participó activamente en exposiciones en la capital, aportando una visión profundamente femenina y social al arte colombiano y enriqueciendo el panorama cultural con su perspectiva única.',
    location: 'Bogotá (Exposiciones y presencia artística)',
    year: '1920-2011'
  },
    {
    src: 'assets/img/garavito.png',
    title: 'El Astrónomo de la Luna Bogotana',
    description: 'Julio Garavito Armero, astrónomo, ingeniero y matemático nacido y criado en Bogotá, es una de las mentes científicas más brillantes de Colombia, cuyo rostro adorna el billete de $20.000 pesos. Desde el Observatorio Astronómico Nacional, que dirigió por más de 25 años, realizó cálculos precisos sobre la órbita lunar y sus perturbaciones. Su trabajo fue tan riguroso que la NASA lo reconoció y utilizó en los programas de cálculo para las misiones Apolo, e incluso un cráter lunar lleva su nombre en su honor.',
    location: 'Bogotá (Observatorio Astronómico Nacional, billete de $20.000)',
    year: '1865-1920'
  },
      {
    src: 'assets/img/leon.png',
    title: ' El Bardo Vanguardista de la Universidad Nacional',
    description: 'Nacido en Medellín, León de Greiff fue un poeta, intelectual y maestro cuya figura se volvió esencial en Bogotá, especialmente en la Universidad Nacional de Colombia. Pionero del lenguaje experimental y vanguardista, transformó la poesía colombiana con su estilo musical, barroco y filosófico, y defendió la libertad de pensamiento y el arte por el arte. Como profesor en la Universidad Nacional, inspiró generaciones, y su legado como "maestro espiritual" es honrado con la Biblioteca Central y el Auditorio León de Greiff, símbolos de la libertad intelectual y artística.',
    location: 'Bogotá (Universidad Nacional de Colombia, Biblioteca Central "León de Greiff")',
    year: '1895-1976'
  },
      {
    src: 'assets/img/devora.png',
    title: 'La Pintora Rebelde de Colombia',
    description: 'Aunque antioqueña, Débora Arango Pérez fue una pintora rebelde y pionera que dejó una huella imborrable en el arte colombiano, desafiando tabúes al retratar la realidad política y social con una visión audazmente crítica. En Bogotá, sus obras inicialmente fueron rechazadas por la élite conservadora, pero eventualmente encontraron escenarios que reconocieron su genialidad. Fue una de las primeras en pintar desnudos femeninos en Colombia, rompiendo normas y abriendo caminos para la libertad de expresión artística.',
    location: 'Bogotá (Exposiciones y reconocimiento artístico)',
    year: '1907-2005'
  }
  
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
        <img src="${data.src}" alt="${data.title}" loading="lazy" class="gallery-main-image">
        <div class="gallery-info-panel">
          <h3 class="image-title">${data.title}</h3>
          <p class="image-description">${data.description}</p>
          <div class="image-details">
            <span>📍 ${data.location}</span>
            <span>📅 ${data.year}</span>
          </div>
        </div>
      `; // <<--- ESTE ES EL NUEVO CONTENIDO DE item.innerHTML
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
                src: 'assets/img/jorge.png',
                title: ' Jorge Eliécer Gaitán (1903-1948)',
                description: 'Jorge Eliécer Gaitán fue un abogado y carismático líder liberal que se erigió como la voz de las clases populares en Colombia, criticando fuertemente a la oligarquía. Su asesinato el 9 de abril de 1948 en Bogotá no solo truncó su prometedora carrera política, sino que desató el violento estallido social conocido como "El Bogotazo", un evento que marcó profundamente el inicio de una larga y dolorosa era de violencia política en el país. Su influencia es innegable y su memoria perdura en numerosos homenajes a nivel nacional, reafirmando el eco de su icónica frase: "Yo no soy un hombre, soy un pueblo.',
            },
            {
                src: 'assets/img/rafael_uribe.png ',
                title: 'Rafael Uribe Uribe (1859-1914)',
                description: 'Rafael Uribe Uribe fue un destacado general liberal y político que se distinguió por su ferviente defensa de los derechos laborales y sociales en Colombia, siendo además una figura crucial durante la Guerra de los Mil Días. Su vida fue trágicamente segada en Bogotá, cuando fue brutalmente asesinado a hachazos, un suceso que generó un intenso debate sobre las condiciones laborales y el poder de las élites dominantes. Su legado como precursor de las reivindicaciones sociales se mantiene vivo a través de una localidad que lleva su nombre y su imponente estatua frente al Congreso Nacional, simbolizando su eterna defensa del pueblo.'
            },
            {
                src: 'assets/img/francisco.png ',
                title: 'Francisco José de Caldas (1768-1816)',
                description: 'Francisco José de Caldas fue un brillante científico, ingeniero, militar e intelectual criollo, reconocido como uno de los primeros grandes sabios del continente americano. Su compromiso con la causa independentista le costó la vida, siendo fusilado por el régimen español durante la Reconquista. Su ejecución se convirtió en un poderoso símbolo del sacrificio por la libertad y la búsqueda incansable del conocimiento. Hoy, su invaluable aporte a la ciencia y su espíritu patriótico son honrados por la Universidad Distrital Francisco José de Caldas, así como por barrios, calles y su presencia en importantes museos de historia.'
            }
        ]
    },
    { 
        items: [
            {
                src: 'assets/img/loca_margarita.png',
                title: 'La Loca Margarita (¿1860? - 1925 aprox.)',
                description: 'Margarita Villaquirá, cariñosamente conocida como La Loca Margarita, fue una figura enigmática y entrañable que deambulaba por el centro de Bogotá, vestida de blanco, siempre con su sombrilla y flores. Más allá de su aparente excentricidad, fue vista por muchos como un símbolo de la dignidad en la marginalidad, la resistencia y la memoria viva del pueblo bogotano. Aunque las circunstancias exactas de su muerte son inciertas, su historia se diluyó en la leyenda, convirtiéndola en una leyenda urbana querida por niños, artistas y escritores. Su legado persiste en murales, obras de teatro y en la sabiduría de su frase: "¡No se ría, que usted también está loco y no se ha dado cuenta!"'
            },
            {
                src: 'assets/img/camilo.png',
                title: 'Camilo Torres Restrepo (1929-1966)',
                description: 'Camilo Torres Restrepo fue un sacerdote, sociólogo y activista político que se convirtió en una figura central del movimiento de la Teología de la Liberación en Colombia antes de unirse a la guerrilla del ELN. Su vida terminó abruptamente al morir en su primer combate como guerrillero, lo que lo convirtió en una figura profundamente polémica: para algunos, un mártir que se sacrificó por los más necesitados, para otros, una dolorosa traición a la Iglesia. A pesar de las divisiones, su impacto es innegable y su memoria se mantiene viva en colegios, parques populares y en diversas expresiones de la cultura urbana y popular.'
            },
            {
                src: 'assets/img/pepe_cierra.png',
                title: 'Pepe Sierra (1836-1921)',
                description: 'Pepe Sierra fue uno de los empresarios más ricos y visionarios de su época en Colombia, destacándose como banquero, inversionista y un crucial impulsor del desarrollo urbano en Bogotá. A diferencia de otros personajes históricos, su vida concluyó en paz, dejando un inmenso legado económico que contribuyó significativamente a la modernización del país. Se le reconoce como uno de los pioneros de la transformación empresarial y urbana de la capital. Su nombre y contribuciones son perpetuados en homenajes tan relevantes como la transitada Avenida Pepe Sierra (Calle 116), la estación de TransMilenio, y varios colegios y barrios residenciales.'
            },
            {
                src: 'assets/img/jaime.png',
                title: 'Jaime Garzón (1960-1999)',
                description: 'Jaime Garzón fue un abogado, periodista, humorista, pedagogo y activista por la paz cuya perspicacia y humor lo convirtieron en una de las voces más críticas y queridas de Colombia. A través de programas como Zoociedad y ¡Quac! El Noticiero, utilizó la sátira para cuestionar el poder. Su vida fue trágicamente segada el 13 de agosto de 1999 por sicarios en Bogotá, en un crimen que expuso la responsabilidad de paramilitares y agentes estatales, y que se convirtió en un crudo símbolo de la censura por medio de la violencia. A pesar del dolor, su legado sigue vivo en parques, murales y en su emblemática frase: "Si ustedes los jóvenes no asumen el control de su propio país, nadie va a venir a salvárselos", que inspira a nuevas generaciones.'
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

