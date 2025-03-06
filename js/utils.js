/**
 * Utility functions for the NPCZ website
 */

// Debounce function to limit how often a function can be called
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Add smooth scrolling to page anchors
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Image preloader
function preloadImages(images) {
    return images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });
}

// Initialize essential global events
function initEssentialEvents() {
    // Handle escape key for closing menus/popups
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeElements = document.querySelectorAll('.open, .active');
            activeElements.forEach(el => {
                el.classList.remove('open', 'active');
            });
            document.body.classList.remove('menu-open');
        }
    });
}

// Initialize utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize essential events
    initEssentialEvents();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

// Detect if device is mobile or tablet
function isMobileOrTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone|opera mini|silk/i.test(userAgent);
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(userAgent);
    return isMobile || isTablet || window.innerWidth < 992;
}

// Export utilities
window.NPCZ = window.NPCZ || {};
window.NPCZ.utils = {
    debounce,
    initSmoothScrolling,
    preloadImages,
    initEssentialEvents,
    isMobileOrTablet
}; 