// Landing page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Get background images from config
    const backgroundImages = NPCZ.config.backgroundImages.landing;
    const rotationInterval = NPCZ.config.backgroundImages.rotationInterval;
    const fadeInDuration = NPCZ.config.animations.fadeIn;
    
    // Initialize variables
    let currentBgIndex = 0;
    let isTransitioning = false;
    const landingContainer = document.querySelector('.landing-container');
    
    // Handle PLAY NOW button for mobile/tablet devices
    const playButton = document.querySelector('.btn-primary');
    if (playButton) {
        if (NPCZ.utils.isMobileOrTablet()) {
            // Change button text and disable it on mobile/tablet
            playButton.textContent = 'ONLY AVAILABLE ON PC';
            playButton.classList.add('disabled');
            
            // Remove existing click event listeners
            const newPlayButton = playButton.cloneNode(true);
            playButton.parentNode.replaceChild(newPlayButton, playButton);
            
            // Add new click handler to show message
            newPlayButton.addEventListener('click', (e) => {
                e.preventDefault();
                showPopupMessage('This game is only available on PC devices.');
            });
        }
    }
    
    // Set initial background
    if (landingContainer) {
        // Preload images using utility function
        NPCZ.utils.preloadImages(backgroundImages);
        
        // Set initial background
        landingContainer.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;
        
        // Function to change background
        const changeBackground = () => {
            // Prevent multiple transitions at once
            if (isTransitioning) return;
            isTransitioning = true;
            
            // Get next background index
            const nextIndex = (currentBgIndex + 1) % backgroundImages.length;
            
            // Remove any existing transition backgrounds first
            document.querySelectorAll('.landing-background').forEach(bg => {
                bg.remove();
            });
            
            // Create a new div for the next background
            const nextBg = document.createElement('div');
            nextBg.className = 'landing-background';
            nextBg.style.backgroundImage = `url('${backgroundImages[nextIndex]}')`;
            
            // Add the new background behind the content
            landingContainer.appendChild(nextBg);
            
            // Force a reflow before changing opacity for proper transition
            void nextBg.offsetWidth;
            
            // Fade in the new background
            nextBg.style.opacity = '1';
            
            // After transition completes
            const transitionEndHandler = () => {
                // Update the main container background
                landingContainer.style.backgroundImage = `url('${backgroundImages[nextIndex]}')`;
                
                // Update current index
                currentBgIndex = nextIndex;
                
                // Clean up
                nextBg.remove();
                isTransitioning = false;
                
                // Remove event listener
                nextBg.removeEventListener('transitionend', transitionEndHandler);
            };
            
            // Listen for the transition to complete
            nextBg.addEventListener('transitionend', transitionEndHandler);
        };
        
        // Change background every 8 seconds
        const bgInterval = setInterval(changeBackground, rotationInterval);
        
        // Clean up interval on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(bgInterval);
        });
    }
    
    // Fade in animation for content
    const textContainer = document.querySelector('.text-container');
    
    // Add event listeners to buttons with debouncing to prevent multiple rapid clicks
    const handleButtonClick = (e) => {
        // Prevent default action
        e.preventDefault();
        
        // Skip if button is disabled
        const button = e.currentTarget;
        if (button.classList.contains('disabled')) {
            return;
        }
        
        // Add button click animation
        button.classList.add('btn-clicked');
        
        // Remove animation after button press effect completes
        setTimeout(() => {
            button.classList.remove('btn-clicked');
            
            // Handle button action based on its class or attributes
            const isPlayButton = button.classList.contains('btn-primary');
            
            if (isPlayButton) {
                // Open game in new tab or same window as needed
                window.open(NPCZ.config.gameUrl, '_blank');
            } else {
                // For other buttons, show a popup message
                showPopupMessage('Coming Soon!');
            }
        }, NPCZ.config.animations.buttonClick);
    };
    
    // Apply debounced click handler to all buttons
    const debouncedButtonClick = NPCZ.utils.debounce(handleButtonClick, NPCZ.config.animations.buttonClick);
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', debouncedButtonClick);
    });
    
    // Function to show popup message
    function showPopupMessage(message) {
        // Check if popup already exists and remove it
        const existingPopup = document.querySelector('.popup-message');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'popup-message';
        popup.textContent = message;
        
        // Append to body
        document.body.appendChild(popup);
        
        // Force reflow before adding active class for animation
        void popup.offsetWidth;
        
        // Show popup
        popup.classList.add('active');
        
        // Remove popup after animation
        setTimeout(() => {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, NPCZ.config.animations.popupDuration);
    }
    
    // Handle window resize for responsive button state
    const updateButtonState = NPCZ.utils.debounce(() => {
        const playButton = document.querySelector('.btn-primary');
        if (!playButton) return;
        
        if (NPCZ.utils.isMobileOrTablet()) {
            if (!playButton.classList.contains('disabled')) {
                playButton.textContent = 'ONLY AVAILABLE ON PC';
                playButton.classList.add('disabled');
                
                // Remove existing click event listeners
                const newPlayButton = playButton.cloneNode(true);
                playButton.parentNode.replaceChild(newPlayButton, playButton);
                
                // Add new click handler to show message
                newPlayButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPopupMessage('This game is only available on PC devices.');
                });
            }
        } else {
            if (playButton.classList.contains('disabled')) {
                playButton.textContent = 'PLAY NOW';
                playButton.classList.remove('disabled');
                
                // Remove existing click event listeners
                const newPlayButton = playButton.cloneNode(true);
                playButton.parentNode.replaceChild(newPlayButton, playButton);
                
                // Reapply the debounced click handler
                newPlayButton.addEventListener('click', debouncedButtonClick);
            }
        }
    }, 250);
    
    // Listen for window resize events
    window.addEventListener('resize', updateButtonState);
}); 