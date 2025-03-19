// Configuration for the tips system
var tipsConfig = {
    // Array of tip messages to display
    tips: [
        "Press F1 to access the server rules and information.",
        "Join our Discord server to stay updated with the latest server news.",
        "You can customize your character in the Appearance menu.",
        "Work together with other players to survive longer.",
        "Headshots deal increased damage to most enemies.",
        "You can trade items with other players using the trading system.",
        "Remember to drink water and eat food to maintain your health.",
        "Night time is more dangerous - be prepared!",
        "Some areas contain rare loot but are heavily guarded.",
        "Use the map markers to navigate and coordinate with your team."
    ],
    
    // Time in milliseconds between tip changes
    tipChangeInterval: 8000
};

// Function to update the tip text
function updateTip() {
    var tipContent = document.getElementsByClassName('tip-content')[0];
    if (tipContent) {
        // Get a random tip from the array
        var randomIndex = Math.floor(Math.random() * tipsConfig.tips.length);
        var tip = tipsConfig.tips[randomIndex];
        
        // Keep the old tip visible while preparing the new one
        var oldOpacity = tipContent.style.opacity;
        
        // Set new tip text immediately without delay
        tipContent.innerHTML = tip;
        
        // Briefly set opacity to 0.6 to create a subtle "refresh" effect without blank space
        tipContent.style.opacity = '0.6';
        tipContent.style.filter = 'alpha(opacity=60)';
        
        // Fade in new tip
        setTimeout(function() {
            tipContent.style.opacity = '0.9';
            tipContent.style.filter = 'alpha(opacity=90)';
        }, 100);
    }
}

// Initialize the tip system
if (window.addEventListener) {
    window.addEventListener('load', initTips);
} else if (window.attachEvent) {
    window.attachEvent('onload', initTips);
}

function initTips() {
    if (window.tipsInitialized) {
        return;
    }
    window.tipsInitialized = true;
    
    // Set initial tip
    updateTip();
    
    // Set interval to change tips
    setInterval(updateTip, tipsConfig.tipChangeInterval);
} 