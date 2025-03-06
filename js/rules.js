// Toggle category dropdown with simpler animation
function toggleCategory(header) {
    const content = header.nextElementSibling;
    
    // Close all other categories
    document.querySelectorAll('.category-header.active').forEach(function(activeHeader) {
        if (activeHeader !== header) {
            activeHeader.classList.remove('active');
            activeHeader.nextElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current category
    header.classList.toggle('active');
    content.classList.toggle('active');
    
    // Basic scroll into view for older browsers
    if (header.classList.contains('active')) {
        try {
            header.scrollIntoView(true);
        } catch (e) {
            // Fallback for very old browsers
            window.scrollTo(0, header.offsetTop);
        }
    }
}

// Copy link to rule with compatibility check
function copyLink(ruleId) {
    const url = window.location.href.split('#')[0] + '#' + ruleId;
    
    // Check if clipboard API is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function() {
            const button = document.querySelector('#' + ruleId + ' .copy-link');
            addClickAnimation(button);
            showNotification('Link copied to clipboard!');
        }).catch(function() {
            // Fallback for clipboard API failure
            fallbackCopy(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(url);
    }
}

// Copy rule text with compatibility check
function copyText(button) {
    const ruleCard = button.closest('.rule-card');
    const description = ruleCard.querySelector('.rule-description').textContent;
    
    // Check if clipboard API is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(description).then(function() {
            addClickAnimation(button);
            showNotification('Rule text copied to clipboard!');
        }).catch(function() {
            // Fallback for clipboard API failure
            fallbackCopy(description);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(description);
    }
}

// Fallback copy function for older browsers
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!');
    } catch (err) {
        showNotification('Failed to copy. Press Ctrl+C to copy manually.');
    }
    
    document.body.removeChild(textArea);
}

// Show notification with basic animation
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Force reflow
    notification.offsetHeight;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide and remove after delay
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Simple click animation
function addClickAnimation(button) {
    if (button) {
        button.classList.add('clicked');
        setTimeout(function() {
            button.classList.remove('clicked');
        }, 300);
    }
}

// Handle hash links with basic scroll
function handleHash() {
    var hash = window.location.hash;
    if (hash) {
        var ruleId = hash.substring(1);
        var ruleElement = document.getElementById(ruleId);
        if (ruleElement) {
            var category = ruleElement.closest('.rule-category');
            if (category) {
                var header = category.querySelector('.category-header');
                toggleCategory(header);
                
                // Basic scroll for older browsers
                try {
                    ruleElement.scrollIntoView(true);
                } catch (e) {
                    // Fallback for very old browsers
                    window.scrollTo(0, ruleElement.offsetTop);
                }
            }
        }
    }
}

// Initialize with basic feature detection
window.onload = function() {
    // Open first category by default
    var firstHeader = document.querySelector('.category-header');
    if (firstHeader) {
        toggleCategory(firstHeader);
    }
    
    // Handle hash links
    handleHash();
    
    // Basic initialization without modern features
    document.querySelectorAll('.rule-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.rule-actions')) {
                this.classList.toggle('expanded');
            }
        });
    });
};

// Handle hash changes
window.onhashchange = handleHash;

// Collapse all rules except the target
function collapseAllExcept(targetId) {
    document.querySelectorAll('.rule-card').forEach(card => {
        if (card.id !== targetId) {
            card.classList.remove('expanded');
        }
    });
}

// Initialize rules functionality
function initRules() {
    // Set animation order for rule cards
    document.querySelectorAll('.rule-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

    // Handle rule card clicks
    document.querySelectorAll('.rule-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking on action buttons
            if (!e.target.closest('.rule-actions')) {
                card.classList.toggle('expanded');
                collapseAllExcept(card.id);
            }
        });
    });

    // Handle hash changes and initial load
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const targetRule = document.querySelector(hash);
            if (targetRule) {
                // Collapse all rules first
                collapseAllExcept(targetRule.id);
                // Expand the target rule
                targetRule.classList.add('expanded');
                // Scroll into view with some delay to ensure smooth transition
                setTimeout(() => {
                    targetRule.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initRules); 