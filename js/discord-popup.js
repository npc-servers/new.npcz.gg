/**
 * Discord Popup - Shows a Discord invitation popup after 10 seconds on the site
 */

// Initialize the Discord popup functionality
function initDiscordPopup() {
    // Check if the popup has been shown in this session
    const popupShown = sessionStorage.getItem('discordPopupShown');
    
    // If popup hasn't been shown yet, set a timeout to show it after 10 seconds
    if (!popupShown) {
        setTimeout(() => {
            showDiscordPopup();
        }, 10000); // 10 seconds
    }
}

// Create and show the Discord popup
function showDiscordPopup() {
    // Create the popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'discord-popup-overlay';
    
    // Create the popup content
    const popupHTML = `
        <div class="discord-popup">
            <button class="discord-popup-close" aria-label="Close popup"></button>
            <div class="discord-popup-content-wrapper">
                <div class="discord-popup-logo-container">
                    <img src="assets/images/discord-logo.svg" alt="Discord Logo" class="discord-popup-logo">
                </div>
                <h2 class="discord-popup-title">JOIN OUR DISCORD!</h2>
                <div class="discord-popup-content">
                    <p>Connect with our community, get the latest updates, and join the conversation about NPC Zombies!</p>
                </div>
            </div>
            <a href="https://discord.gg/npcz" class="discord-popup-btn" target="_blank">
                <i class="fab fa-discord"></i> JOIN DISCORD
            </a>
        </div>
    `;
    
    // Add the popup HTML to the overlay
    popupOverlay.innerHTML = popupHTML;
    
    // Add the overlay to the document body
    document.body.appendChild(popupOverlay);
    
    // Add event listener to close button
    const closeButton = popupOverlay.querySelector('.discord-popup-close');
    
    // Add event listeners for close button interactions
    closeButton.addEventListener('click', hideDiscordPopup);
    closeButton.addEventListener('mouseenter', () => {
        closeButton.setAttribute('title', 'Close');
    });
    
    // Add focus and blur events for accessibility
    closeButton.addEventListener('focus', () => {
        closeButton.classList.add('focus');
    });
    
    closeButton.addEventListener('blur', () => {
        closeButton.classList.remove('focus');
    });
    
    // Add event listener to close when clicking outside the popup
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            hideDiscordPopup();
        }
    });
    
    // Add event listener to close on escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Show the popup with a slight delay to allow for smooth animation
    setTimeout(() => {
        popupOverlay.classList.add('active');
        
        // Add a small animation to the close button after the popup appears
        setTimeout(() => {
            closeButton.classList.add('visible');
        }, 300);
    }, 50);
    
    // Mark that the popup has been shown in this session
    sessionStorage.setItem('discordPopupShown', 'true');
}

// Hide the Discord popup
function hideDiscordPopup() {
    const popupOverlay = document.querySelector('.discord-popup-overlay');
    if (popupOverlay) {
        // Get the close button
        const closeButton = popupOverlay.querySelector('.discord-popup-close');
        
        // Add a closing animation to the button
        if (closeButton) {
            closeButton.classList.add('closing');
        }
        
        // Remove the active class to trigger the fade-out animation
        popupOverlay.classList.remove('active');
        
        // Remove the popup from the DOM after the animation completes
        setTimeout(() => {
            document.body.removeChild(popupOverlay);
            // Remove the escape key event listener
            document.removeEventListener('keydown', handleEscapeKey);
        }, 300); // Match the transition duration in CSS
    }
}

// Handle escape key press
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        hideDiscordPopup();
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the popup
    initDiscordPopup();
});

// Export the Discord popup functionality
window.NPCZ = window.NPCZ || {};
window.NPCZ.discordPopup = {
    show: showDiscordPopup,
    hide: hideDiscordPopup
}; 