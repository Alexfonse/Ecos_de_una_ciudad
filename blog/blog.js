document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA PARA LA ANIMACIÓN DE SCROLL DE TARJETAS ---
  const cardsToAnimate = document.querySelectorAll('.blog-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cardsToAnimate.forEach(card => { observer.observe(card); });


  // ===================================================================
  // === NUEVA LÓGICA PARA EL MODAL DE POSTS ===
  // ===================================================================

  const postGrid = document.querySelector('.blog-grid');
  const modal = document.getElementById('post-modal');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('modal-close-btn');

  if (postGrid && modal && modalBody && closeModalBtn) {
    
    // Función para abrir el modal
    const openModal = (postId) => {
      const postContent = document.querySelector(`#${postId}`).innerHTML;
      modalBody.innerHTML = postContent;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    };

    // Función para cerrar el modal
    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = 'auto';
    };

    // Event listener para abrir el modal (usando delegación de eventos)
    postGrid.addEventListener('click', (e) => {
      const cardLink = e.target.closest('.card-link');
      if (cardLink) {
        e.preventDefault(); // Evita que el link navegue
        const postId = cardLink.parentElement.getAttribute('data-post-id');
        openModal(postId);
      }
    });

    // Event listeners para cerrar el modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      // Si se hace clic en el fondo oscuro (el overlay), se cierra.
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Cerrar con la tecla 'Escape'
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // Inicializar íconos de Lucide para el botón de cierre del modal
  lucide.createIcons();
});