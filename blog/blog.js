/* ========================================================================
   |||||||||||| CÓDIGO COMPLETO Y DEFINITIVO para blog.js ||||||||||||
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DEFINICIÓN DE FUNCIONES AUXILIARES ---
  // Organizamos todas nuestras funciones especiales aquí arriba para que estén listas cuando se necesiten.

  /**
   * Anima los números en las tarjetas de datos, contando hacia arriba.
   */
  function animateCountUp(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let current = 0;
    const increment = target / 100 > 1 ? target / 100 : 1; // Asegura que el incremento sea al menos 1

    const updateCount = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.ceil(current).toLocaleString('es-CO');
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target.toLocaleString('es-CO'); // Asegura el valor final exacto
      }
    };
    updateCount();
  }

  /**
   * Activa los sliders de comparación de imágenes "Antes y Después".
   */
  function setupComparisonSliders() {
    const sliders = document.querySelectorAll('.image-comparison-slider');
    sliders.forEach(slider => {
      const imageAfter = slider.querySelector('.image-after');
      const handle = slider.querySelector('.slider-handle');
      let isDragging = false;

      const moveSlider = (x) => {
        const rect = slider.getBoundingClientRect();
        let newX = x - rect.left;
        if (newX < 0) newX = 0;
        if (newX > rect.width) newX = rect.width;
        
        const percentage = (newX / rect.width) * 100;
        if (handle) handle.style.left = `${percentage}%`;
        imageAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
      };

      slider.addEventListener('mousedown', () => { isDragging = true; });
      slider.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
      document.addEventListener('mouseup', () => { isDragging = false; });
      document.addEventListener('touchend', () => { isDragging = false; });
      slider.addEventListener('mousemove', e => { if (isDragging) moveSlider(e.clientX); });
      slider.addEventListener('touchmove', e => { if (isDragging) moveSlider(e.touches[0].clientX); }, { passive: true });
    });
  }

  /**
   * ¡LA FUNCIÓN CLAVE Y CORREGIDA!
   * Busca y anima TODOS los componentes interactivos dentro del modal.
   */
  function setupModalAnimations() {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    const elementsToAnimate = modalBody.querySelectorAll('[data-animation]');

    const modalObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animationType = entry.target.dataset.animation;
          entry.target.classList.add(animationType);
          entry.target.classList.add('visible');

          // Lógica para animar el contador numérico.
          const numberEl = entry.target.querySelector('.data-card-number');
          if (numberEl && numberEl.dataset.target) {
            animateCountUp(numberEl);
          }
          
          // ¡SIN LÓGICA EXTRA PARA EL GRÁFICO!
          // El JS ya no se mete con la animación de las barras.
          // Solo con añadir la clase 'visible' al '.chart-container', el CSS se encarga del resto.

          observer.unobserve(entry.target); // Animar cada elemento solo una vez.
        }
      });
    }, { 
      root: modalBody, // Observa el scroll DENTRO del modal.
      threshold: 0.2 // Se activa cuando el 20% del elemento es visible.
    });

    elementsToAnimate.forEach(el => modalObserver.observe(el));
  }


  // --- 2. LÓGICA PRINCIPAL DE LA PÁGINA ---
  
  // Lógica para el Modal de Posts
  const postGrid = document.querySelector('.blog-grid');
  const modal = document.getElementById('post-modal');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('modal-close-btn');

  if (postGrid && modal && modalBody && closeModalBtn) {
    
    const openModal = (postId) => {
      const postContent = document.querySelector(`#${postId}`).innerHTML;
      modalBody.innerHTML = postContent;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Al abrir el modal, llamamos a nuestras funciones de interactividad.
      setupModalAnimations();
      setupComparisonSliders(); 
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = 'auto';
    };

    postGrid.addEventListener('click', (e) => {
      const cardLink = e.target.closest('.card-link');
      if (cardLink) {
        e.preventDefault();
        const postId = cardLink.parentElement.getAttribute('data-post-id');
        openModal(postId);
      }
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // Animación de entrada de las tarjetas del blog en la página principal
  const cardsToAnimate = document.querySelectorAll('.blog-card');
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cardsToAnimate.forEach(card => cardObserver.observe(card));

  // Inicializar todos los íconos de Lucide
  lucide.createIcons();
});

