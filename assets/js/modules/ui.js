/**
 * UI Module
 * Handles interactions like Menu, Scroll, and Navigation.
 */

export function initUI() {
    initMenu();
    initScroll();
    initFloatingNav();
}

function initMenu() {
    const menuBtn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("menu-fullscreen");

    if (menuBtn && menu) {
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
    }
}

function initScroll() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    const exploreBtn = document.getElementById("explorar-btn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            const dest = document.querySelector(".seccion-ondas");
            if (dest) dest.scrollIntoView({ behavior: "smooth" });
        });
    }
    
    // Parallax
    const headerBg = document.querySelector(".hero-bg");
    if (headerBg) {
        window.addEventListener("scroll", () => {
            const scroll = window.scrollY;
            headerBg.style.transform = `translateY(${scroll * 0.3}px)`;
        });
    }
}

function initFloatingNav() {
    // Logic for floating navbar visibility if needed
    // Currently CSS handles position, but GSAP could enhance this
}
