/**
 * resources.js - JavaScript for the Resources page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add copy functionality for server info
    setupCopyServerInfo();
    
    // Add animation for resource cards
    animateResourceCards();
    
    // Handle responsive behavior
    handleResponsiveLayout();
});

/**
 * Sets up click-to-copy functionality for server information
 */
function setupCopyServerInfo() {
    const serverInfoItems = document.querySelectorAll('.info-item .value');
    
    serverInfoItems.forEach(item => {
        item.addEventListener('click', function() {
            const textToCopy = this.textContent;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Add a temporary success class
                    this.classList.add('copy-success');
                    
                    // Remove class after animation
                    setTimeout(() => {
                        this.classList.remove('copy-success');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });
}

/**
 * Adds staggered animation to resource cards
 */
function animateResourceCards() {
    const cards = document.querySelectorAll('.resource-card');
    
    cards.forEach((card, index) => {
        // Add initial invisible state
        card.style.opacity = '0';
        card.style.transform = 'translateX(-15px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        // Stagger the animations with shorter delay on mobile
        const delay = window.innerWidth <= 768 ? 70 : 100;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, delay * index);
    });
    
    // Prevent default behavior for server card clicks (except for the copy command)
    const serverCard = document.querySelector('.resource-card.server-card');
    if (serverCard) {
        serverCard.addEventListener('click', function(e) {
            // Only prevent default if the click is not on the copy command
            if (!e.target.closest('.info-item .value')) {
                e.preventDefault();
            }
        });
    }
}

/**
 * Handles responsive layout adjustments
 */
function handleResponsiveLayout() {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 480;
    
    // Apply specific mobile optimizations if needed
    if (isMobile) {
        // Ensure the copy text is visible on smaller screens
        const valueElements = document.querySelectorAll('.info-item .value');
        valueElements.forEach(el => {
            el.style.paddingRight = '70px'; // Ensure room for the "Click to copy" text
        });
    }
    
    // Listen for resize events
    window.addEventListener('resize', function() {
        const currentIsMobile = window.innerWidth <= 480;
        if (currentIsMobile !== isMobile) {
            // Refresh the page if crossing the mobile threshold
            // This ensures all responsive styles are properly applied
            location.reload();
        }
    });
} 