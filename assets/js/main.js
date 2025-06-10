document.addEventListener("DOMContentLoaded", () => {
  // === Iconos ===
  lucide.createIcons();

  // === Scroll a sección "Explorar ahora" ===
  function scrollToSeccion() {
    const destino = document.querySelector(".seccion-ondas");
    if (destino) destino.scrollIntoView({ behavior: "smooth" });
  }

  // === 1. Animación de entrada de tarjetas ===
  const hoverImages = document.querySelectorAll(".img-hover-wrapper");
  hoverImages.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 0.8s ease-out";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 200 + i * 150);
  });

  // === 2. Parallax del fondo principal ===
  const header = document.querySelector(".hero-bg");
  if (header) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      header.style.transform = `translateY(${scroll * 0.3}px)`;
    });
  }

  // === 3. Responsividad altura imágenes hover ===
  const resizeObserver = new ResizeObserver(() => {
    document.querySelectorAll('.img-hover-wrapper').forEach(el => {
      el.style.height = `${el.offsetWidth * 0.75}px`;
    });
  });
  document.querySelectorAll('.img-hover-wrapper').forEach(el => resizeObserver.observe(el));

  // === 4. Menú cápsula hamburguesa ===
  const menuBtn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("menu-fullscreen");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("open");
  });

  document.querySelectorAll(".menu-items a").forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      menu.classList.remove("open");
    });
  });

  // === 5. Canvas ola animada (si se usa) ===
  const canvas = document.getElementById("waveCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let step = 0;
    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(0, 100);
      for (let x = 0; x < canvas.width; x++) {
        const y = 20 * Math.sin((x + step) * 0.02) + 100;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = "#2f4a3d";
      ctx.fill();
      step += 1;
      requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  // === 6. Hover con máscara que sigue el cursor ===
  document.querySelectorAll('.img-hover-wrapper').forEach(wrapper => {
    const overlay = wrapper.querySelector('.mask-overlay');
    wrapper.addEventListener('mousemove', e => {
      const rect = wrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      overlay.style.setProperty('--x', `${x}%`);
      overlay.style.setProperty('--y', `${y}%`);
    });
  });
});

// === 7. Ocultar loader cuando carga todo ===
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// === 8. Scroll suave para enlaces internos ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// === 9. Validación de formulario ===
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    alert("Formulario enviado correctamente.");
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// === 10. Lazy Loading de imágenes ===
const lazyImages = document.querySelectorAll("img.lazy");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: "0px 0px 200px 0px"
});

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

document.querySelectorAll('.mascara-radial').forEach(container => {
  const hoveredImg = container.querySelector('.img-hovered');
  const normalImg = container.querySelector('.img-normal');

  const maskWidth = 120;
  const maskHeight = 120;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - maskWidth / 2;
    const y = e.clientY - rect.top - maskHeight / 2;

    hoveredImg.style.opacity = "1";

    hoveredImg.style.maskImage = "url('assets/img/tinta_1.gif')";
    hoveredImg.style.webkitMaskImage = "url('assets/img/tinta_1.gif')";
    hoveredImg.style.maskRepeat = "no-repeat";
    hoveredImg.style.webkitMaskRepeat = "no-repeat";
    hoveredImg.style.maskSize = `${maskWidth}px ${maskHeight}px`;
    hoveredImg.style.webkitMaskSize = `${maskWidth}px ${maskHeight}px`;
    hoveredImg.style.maskPosition = `${x}px ${y}px`;
    hoveredImg.style.webkitMaskPosition = `${x}px ${y}px`;
  });

  container.addEventListener('mouseleave', () => {
    hoveredImg.style.opacity = "0";
    normalImg.style.opacity = "1";

    hoveredImg.style.maskImage = "none";
    hoveredImg.style.webkitMaskImage = "none";
  });
});

// === 11. Animaciones al hacer scroll (fade-in) ===
const fadeElements = document.querySelectorAll(".fade-in-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-visible");
      observer.unobserve(entry.target); // opcional si solo quieres que se anime una vez
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => {
  el.classList.add("fade-hidden");
  observer.observe(el);
});

// Transición de página suave al hacer clic en una tarjeta
document.querySelectorAll(".tarjeta-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const url = link.dataset.href;

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = url;
      });
    } else {
      window.location.href = url;
    }
  });
});
// === 12. Animación de entrada de tarjetas al hacer scroll ===
const tarjetaLinks = document.querySelectorAll(".tarjeta-link");
tarjetaLinks.forEach((link, i) => {
  link.style.opacity = 0;
  link.style.transform = "translateY(20px)";
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.transition = "opacity 1s ease, transform 0.8s ease-out";
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }, 200 + i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(link);
});

