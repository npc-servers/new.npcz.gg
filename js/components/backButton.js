/**
 * Universal Back Button Component
 * Creates and manages a consistent back button across all pages
 */

window.NPCZ = window.NPCZ || {};
window.NPCZ.components = window.NPCZ.components || {};

window.NPCZ.components.BackButton = {
    /**
     * Creates and injects the back button into the page
     */
    create() {
        // Create the back button element
        const backButton = document.createElement('button');
        backButton.className = 'universal-back-btn';
        backButton.setAttribute('aria-label', 'Go back');
        
        // Create icon element
        const icon = document.createElement('i');
        icon.className = 'fas fa-arrow-left';
        backButton.appendChild(icon);
        
        // Create text element
        const text = document.createElement('span');
        text.textContent = 'Back';
        backButton.appendChild(text);
        
        // Add click handler
        backButton.addEventListener('click', this.handleClick);
        
        // Insert the button into the page
        document.body.appendChild(backButton);
        
        // Show button if we're not on the home page
        this.updateVisibility();
        
        // Listen for navigation events
        window.addEventListener('popstate', () => this.updateVisibility());
    },
    
    /**
     * Handles the back button click
     * @param {Event} e - Click event
     */
    handleClick(e) {
        e.preventDefault();
        
        // If there's a previous page in history, go back
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to home page if no history
            window.location.href = '/index.html';
        }
    },
    
    /**
     * Updates the visibility of the back button based on current page
     */
    updateVisibility() {
        const backButton = document.querySelector('.universal-back-btn');
        if (!backButton) return;
        
        // Hide on home page, show everywhere else
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname === '/index.html' ||
                          window.location.pathname.endsWith('/index.html');
        
        backButton.style.display = isHomePage ? 'none' : 'flex';
    }
};

// Initialize the back button when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    NPCZ.components.BackButton.create();
}); 