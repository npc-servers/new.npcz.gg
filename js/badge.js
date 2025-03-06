document.addEventListener('DOMContentLoaded', function() {
    // Create and insert ZMOD badge
    createZmodBadge();
});

/**
 * Creates and inserts the ZMOD badge
 */
function createZmodBadge() {
    // Create badge element
    const badge = document.createElement('a');
    badge.href = 'https://zmod.com';
    badge.className = 'zmod-badge';
    badge.target = '_blank';
    badge.rel = 'noopener noreferrer';
    badge.textContent = 'Powered by ZMOD';
    
    // Append badge to the body
    document.body.appendChild(badge);
} 