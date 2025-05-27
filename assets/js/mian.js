document.addEventListener("DOMContentLoaded", () => {
  // === 1. Animación de entrada de tarjetas ===
  const hoverImages = document.querySelectorAll(".img-hover-wrapper");
  hoverImages.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 0.8s ease-out"; // mejora visual
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

  // === 5. Ola animada canvas (si se usa) ===
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
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// === 6. Scroll suave para enlaces internos ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
// === 7. Validación de formulario de contacto ===  
document.getElementById("contact-form").addEventListener("submit", function (e) {
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

  // Aquí podrías enviar el formulario a un servidor
  alert("Formulario enviado correctamente.");
});
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
// === 8. Carga de imágenes con Intersection Observer ===
const lazyImages = document.querySelectorAll("img.lazy"); 
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Asigna la URL de la imagen
      img.classList.remove("lazy");
      observer.unobserve(img); // Deja de observar la imagen
    }
  });
}, {
  rootMargin: "0px 0px 200px 0px" // Carga antes de que entre en vista
});
lazyImages.forEach(img => {
  imageObserver.observe(img); // Comienza a observar cada imagen
});