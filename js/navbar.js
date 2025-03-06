document.addEventListener('DOMContentLoaded', function() {
    // Create and insert navbar
    createNavbar();
    
    // Initialize navbar functionality
    initNavbar();
});

/**
 * Creates and inserts the navbar HTML structure
 */
function createNavbar() {
    // Create navbar elements
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';
    
    // Create links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'navbar-links';
    
    // Get navigation links from config
    const navLinks = NPCZ.config.navLinks;
    
    // Create navigation links
    navLinks.forEach(link => {
        const navLink = document.createElement('a');
        navLink.href = link.href;
        navLink.className = 'navbar-link';
        navLink.textContent = link.text;
        linksContainer.appendChild(navLink);
    });
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
    
    // Create toggle button spans
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        toggleButton.appendChild(span);
    }
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    
    // Assemble navbar
    navbar.appendChild(linksContainer);
    navbar.appendChild(toggleButton);
    
    // Insert navbar and overlay at the beginning of the body
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(navbar, document.body.firstChild);
}

/**
 * Initializes navbar functionality
 */
function initNavbar() {
    // Get navbar elements
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const navbarLinkItems = document.querySelectorAll('.navbar-link');
    const navbarOverlay = document.querySelector('.navbar-overlay');
    
    // Toggle mobile menu
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            navbarLinks.classList.toggle('open');
            navbarOverlay.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    navbarLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('open');
            navbarLinks.classList.remove('open');
            navbarOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking on overlay
    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', function() {
            navbarToggle.classList.remove('open');
            navbarLinks.classList.remove('open');
            navbarOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (
            navbarLinks.classList.contains('open') && 
            !event.target.closest('.navbar-links') && 
            !event.target.closest('.navbar-toggle')
        ) {
            navbarToggle.classList.remove('open');
            navbarLinks.classList.remove('open');
            navbarOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    
    navbarLinkItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
} 