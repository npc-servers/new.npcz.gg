/**
 * NPCZ Website Configuration
 * Central place to manage site-wide settings
 */

window.NPCZ = window.NPCZ || {};
window.NPCZ.config = {
    // Site information
    siteName: 'NPCZ',
    siteUrl: 'https://npcz.gg',
    gameUrl: 'steam://connect/193.243.190.18:27015',
    
    // Social media links
    social: {
        discord: 'https://discord.gg/npc',
    },
    
    // Navigation links
    navLinks: [
        { href: 'index.html', text: 'Home' },
        { href: 'resources.html', text: 'Resources' },
        { href: 'https://discord.gg/npc', text: 'Support' },
        { href: 'https://store.npcz.gg', text: 'Store' },
        { href: 'https://discord.gg/npc', text: 'Discord' }
    ],
    
    // Background image settings
    backgroundImages: {
        landing: [
            'assets/images/bg1.jpg',
            'assets/images/bg2.jpg',
            'assets/images/bg3.jpg',
            'assets/images/bg4.jpg'
        ],
        rotationInterval: 8000 // milliseconds
    },
    
    // Animation timing
    animations: {
        fadeIn: 300, // milliseconds
        buttonClick: 300, // milliseconds
        popupDuration: 3000 // milliseconds
    },
    
    // Component settings
    components: {
        backButton: {
            excludePaths: ['/', '/index.html'], // Paths where back button should not appear
            defaultTarget: '/index.html', // Default target when no history is available
            transitionDuration: 300 // milliseconds
        }
    }
}; 