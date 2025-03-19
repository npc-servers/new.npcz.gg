// Configuration for tips
if (!Config) {
    var Config = {};
}

// Enable tips at the bottom of the screen
Config.enableTips = true;

// How many milliseconds to show each tip
Config.tipRotationTime = 5000;

// List of tips to display - keeping them concise for the horizontal layout
Config.tipMessages = [
    "Press F1 to access the server menu",
    "Join our Discord server for community events",
    "Report bugs in our Discord",
    "Type !help in chat for commands",
    "Press TAB to see the scoreboard",
    "Check the server rules",
    "Customize your character in settings",
    "New content added monthly",
    "Join events for special rewards",
    "Be respectful to other players"
];

// Initialize tips functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const tipContainer = document.querySelector('.tip-container');
    const tipContent = document.querySelector('.tip-content');
    
    if (!tipContainer || !tipContent || !Config.enableTips) {
        return;
    }
    
    let currentTipIndex = 0;
    
    // Function to update the tip message - no animations, just immediate change
    function updateTip() {
        if (Config.tipMessages.length === 0) {
            tipContent.textContent = "No tips available";
            return;
        }
        
        // Immediately update to next tip
        tipContent.textContent = Config.tipMessages[currentTipIndex];
        
        // Increment index for next tip
        currentTipIndex = (currentTipIndex + 1) % Config.tipMessages.length;
    }
    
    // Set first tip immediately
    if (Config.tipMessages.length > 0) {
        tipContent.textContent = Config.tipMessages[0];
    }
    
    // Start rotation if multiple tips exist
    if (Config.tipMessages.length > 1) {
        setInterval(updateTip, Config.tipRotationTime);
    }
}); 