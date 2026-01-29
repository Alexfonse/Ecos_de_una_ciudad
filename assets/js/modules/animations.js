/**
 * Animations Module
 * Handles scroll animations and visual effects.
 */

export function initAnimations() {
    initFadeIn();
    initHoverEffects();
}

function initFadeIn() {
    const fadeElements = document.querySelectorAll(".fade-in-up");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ensure we only trigger if body is loaded
                if (document.body.classList.contains('js-loaded')) {
                    entry.target.classList.add("fade-visible");
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.classList.add("fade-hidden");
        observer.observe(el);
    });
    
    // Listen for load event to re-check visible elements
    const checkVisible = () => {
        if(document.body.classList.contains('js-loaded')) {
            // Force check logic if needed, or rely on observer updates
        }
    };
    
    // Observer triggers automatically, but we can hook into loader event if we want tighter control
}

function initHoverEffects() {
    // Mouse tracking for cards
    document.querySelectorAll('.img-hover-wrapper').forEach(wrapper => {
        const overlay = wrapper.querySelector('.mask-overlay');
        if (overlay) {
            wrapper.addEventListener('mousemove', e => {
                const rect = wrapper.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                overlay.style.setProperty('--x', `${x}%`);
                overlay.style.setProperty('--y', `${y}%`);
            });
        }
    });

    // Radial mask effect
    document.querySelectorAll('.mascara-radial').forEach(container => {
        const hoveredImg = container.querySelector('.img-hovered');
        const normalImg = container.querySelector('.img-normal');
        if (!hoveredImg || !normalImg) return;

        const maskWidth = 120;
        const maskHeight = 120; // Fixed size based on original code

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - maskWidth / 2;
            const y = e.clientY - rect.top - maskHeight / 2;

            hoveredImg.style.opacity = "1";
            // Check cross-browser support or fallback
            const maskValue = `url('assets/img/tinta_1.gif') no-repeat ${x}px ${y}px / ${maskWidth}px ${maskHeight}px`;
            
            // Standard and Webkit
            hoveredImg.style.mask = maskValue;
            hoveredImg.style.webkitMask = maskValue;
        });

        container.addEventListener('mouseleave', () => {
            hoveredImg.style.opacity = "0";
            normalImg.style.opacity = "1";
            hoveredImg.style.mask = "none";
            hoveredImg.style.webkitMask = "none";
        });
    });
}
