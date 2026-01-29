/**
 * Main Application Script
 * Orchestrates modules for Ecos de una Ciudad.
 */
import { initLoader } from './modules/loader.js';
import { initUI } from './modules/ui.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Start Loader Logic
    initLoader();

    // 2. Initialize UI (Menu, Navigation)
    initUI();

    // 3. Initialize Visuals
    initAnimations();

    // Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
