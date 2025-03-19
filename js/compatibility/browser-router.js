// Browser detection and routing logic
function detectBrowserAndRoute() {
    // Get browser information
    const ua = navigator.userAgent;
    const chromeMatch = ua.match(/Chrome\/(\d+)/);
    
    // Check if it's Chrome and version is below 18
    if (chromeMatch && parseInt(chromeMatch[1]) < 18) {
        window.location.href = '/legacy/rules32.html';
    }
    
    // For all other browsers and modern Chrome, stay on current page
    // No redirect needed as they're already on rules.html
}

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', detectBrowserAndRoute); 