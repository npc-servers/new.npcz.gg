// Toggle category dropdown
function toggleCategory(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');
    
    // Toggle current category
    header.classList.toggle('active');
    content.classList.toggle('active');
    
    // Scroll into view if opening
    if (!isActive) {
        setTimeout(() => {
            header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Copy link to rule
function copyLink(ruleId) {
    const url = window.location.href.split('#')[0] + '#' + ruleId;
    navigator.clipboard.writeText(url).then(() => {
        const button = document.querySelector(`#${ruleId} .copy-link`);
        addClickAnimation(button);
        showNotification('Link copied to clipboard!');
    });
}

// Copy rule text
function copyText(button) {
    const ruleCard = button.closest('.rule-card');
    const description = ruleCard.querySelector('.rule-description').textContent;
    navigator.clipboard.writeText(description).then(() => {
        addClickAnimation(button);
        showNotification('Rule text copied to clipboard!');
    });
}

// Helper function to copy text to clipboard
function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
    
    document.body.removeChild(textarea);
}

// Show toast message
function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        document.body.removeChild(toast);
    }, 3000);
}

// Handle hash links
function handleHash() {
    var hash = window.location.hash;
    if (hash) {
        var ruleId = hash.substring(1);
        var ruleElement = document.getElementById(ruleId);
        if (ruleElement) {
            var category = ruleElement.closest('.rule-category');
            if (category) {
                var header = category.querySelector('.category-header');
                // Only toggle if the category is not already active
                if (!header.classList.contains('active')) {
                    toggleCategory(header);
                }
                // Remove highlight from any previously highlighted rules
                document.querySelectorAll('.rule-card').forEach(card => {
                    card.classList.remove('highlight');
                });
                // Add highlight to the target rule
                ruleElement.classList.add('highlight');
                // Smooth scroll with delay to ensure animation completes
                setTimeout(function() {
                    ruleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    }
}

// Initialize
window.onload = function() {
    // Open first category by default
    var firstHeader = document.querySelector('.category-header');
    if (firstHeader) {
        toggleCategory(firstHeader);
    }
    
    // Handle hash links
    handleHash();
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

function createNotification() {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    document.body.appendChild(notification);
    return notification;
}

const notification = createNotification();

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function addClickAnimation(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300);
} 