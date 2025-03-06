/**
 * NPCZ Website Configuration
 * Central place to manage site-wide settings
 */

window.NPCZ = window.NPCZ || {};
window.NPCZ.config = {
    // Site information
    siteName: 'NPC Zombies',
    siteUrl: 'https://npcz.gg',
    gameUrl: 'https://play.npcz.gg',
    
    // Social media links
    social: {
        discord: 'https://discord.gg/npcz',
        twitter: 'https://twitter.com/npcz_game',
        instagram: 'https://instagram.com/npcz_game'
    },
    
    // Navigation links
    navLinks: [
        { href: 'index.html', text: 'Home' },
        { href: 'resources.html', text: 'Resources' },
        { href: 'gameplay.html', text: 'Gameplay' },
        { href: 'news.html', text: 'News' },
        { href: 'community.html', text: 'Community' }
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
    }
}; 