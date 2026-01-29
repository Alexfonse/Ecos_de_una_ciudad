/**
 * Loader Module
 * Handles the loading screen transition efficiently without blocking render.
 */
export function initLoader() {
  const loader = document.getElementById("loader");
  
  if (!loader) return;

  const hideLoader = () => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
      loader.style.display = "none";
      // Trigger animations
      document.body.classList.add("js-loaded");
      document.querySelectorAll(".fade-in-up").forEach(el => {
        el.classList.add("animate");
      });
    }, 500);
  };

  // Ensure minimum display time to prevent flashing, but don't wait for all images
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(hideLoader, 500);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(hideLoader, 500);
    });
  }
}

// Auto-init if not using imports purely
if (typeof window !== 'undefined') {
    // Check if we are in a module environment or script tag
    // For now, exposure to window for legacy support if needed
    window.initGlobalLoader = initLoader;
}
