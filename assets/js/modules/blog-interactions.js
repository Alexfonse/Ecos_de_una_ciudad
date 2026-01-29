/**
 * Blog Interactions Module
 * Handles modal logic, comparison sliders, and data scrolling animations.
 */

// --- Helper Functions ---

/**
 * Animates numbers counting up in data cards.
 * @param {HTMLElement} el - The element containing the number.
 */
function animateCountUp(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  
  let current = 0;
  // Determine increment to ensure smooth animation for large or small numbers
  const increment = target / 100 > 1 ? target / 100 : 1; 

  const updateCount = () => {
    current += increment;
    if (current < target) {
      el.textContent = Math.ceil(current).toLocaleString('es-CO');
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target.toLocaleString('es-CO');
    }
  };
  updateCount();
}

/**
 * Initializes "Before/After" image comparison sliders.
 */
function setupComparisonSliders() {
  const sliders = document.querySelectorAll('.image-comparison-slider');
  
  sliders.forEach(slider => {
    const startInteraction = () => { isDragging = true; };
    const endInteraction = () => { isDragging = false; };
    
    // Scoped variable for dragging state
    let isDragging = false;
    const imageAfter = slider.querySelector('.image-after');
    const handle = slider.querySelector('.slider-handle');

    const moveSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let x = clientX - rect.left;
      
      // Clamp values
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      
      const percentage = (x / rect.width) * 100;
      
      if (handle) handle.style.left = `${percentage}%`;
      if (imageAfter) imageAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    };

    // Event Listeners
    slider.addEventListener('mousedown', startInteraction);
    slider.addEventListener('touchstart', startInteraction, { passive: true });
    
    document.addEventListener('mouseup', endInteraction);
    document.addEventListener('touchend', endInteraction);
    
    slider.addEventListener('mousemove', (e) => {
      if (isDragging) moveSlider(e.clientX);
    });
    
    slider.addEventListener('touchmove', (e) => {
      if (isDragging) moveSlider(e.touches[0].clientX);
    }, { passive: true });
  });
}

/**
 * Sets up intersection observers for animations inside the modal.
 */
function setupModalAnimations() {
  const modalBody = document.getElementById('modal-body');
  if (!modalBody) return;

  const elementsToAnimate = modalBody.querySelectorAll('[data-animation]');

  const modalObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const animationType = target.dataset.animation;
        
        target.classList.add(animationType, 'visible');

        // Trigger number counter if present
        const numberEl = target.querySelector('.data-card-number');
        if (numberEl && numberEl.dataset.target) {
          animateCountUp(numberEl);
        }

        observer.unobserve(target);
      }
    });
  }, { 
    root: modalBody, 
    threshold: 0.2 
  });

  elementsToAnimate.forEach(el => modalObserver.observe(el));
}

// --- Main Initialization ---

export function initBlogInteractions() {
  // Modal Logic
  const postGrid = document.querySelector('.blog-grid');
  const modal = document.getElementById('post-modal');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('modal-close-btn');

  if (postGrid && modal && modalBody && closeModalBtn) {
    
    const openModal = (postId) => {
      const sourcePost = document.querySelector(`#${postId}`);
      if (!sourcePost) return;

      modalBody.innerHTML = sourcePost.innerHTML;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Re-initialize dynamic content scripts
      setupModalAnimations();
      setupComparisonSliders(); 
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = 'auto';
    };

    // Open Modal
    postGrid.addEventListener('click', (e) => {
      const cardLink = e.target.closest('.card-link');
      if (cardLink && cardLink.parentElement.dataset.postId) {
        e.preventDefault();
        openModal(cardLink.parentElement.dataset.postId);
      }
    });

    // Close Modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // Scroll Animations for Main Blog Grid
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

  // Initialize Lucide Icons if available globally
  if (window.lucide) {
    window.lucide.createIcons();
  }
}


