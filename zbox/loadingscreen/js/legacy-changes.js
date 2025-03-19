// Configuration for the Changes tab
var changesConfig = {
    headerTitle: "Server Updates",
    mainUpdate: {
        title: "Excessive Teamkilling",
        date: "March 16, 2025",
        content: "We've implmeneted a system that will punish players for excessive teamkilling."
    },
    updates: [
        {
            title: "New Weapons",
            date: "June 10, 2023",
            content: "Added 5 new weapons to the arsenal including the Plasma Rifle and Quantum Blaster."
        },
        {
            title: "Map Updates",
            date: "June 5, 2023",
            content: "Redesigned the central plaza and added new secret areas to explore."
        }
    ]
};

// Function to update the Changes tab content
function updateChangesTab() {
    // Update header
    var changesHeader = document.getElementsByClassName('changes-header')[0];
    if (changesHeader) {
        changesHeader.innerHTML = changesConfig.headerTitle;
    }
    
    // Get container element
    var changesContainer = document.getElementsByClassName('changes-container')[0];
    if (changesContainer) {
        changesContainer.innerHTML = ''; // Clear existing content
        
        // Create and populate main update section
        var mainSection = document.createElement('div');
        mainSection.className = 'changes-main';
        
        var mainTitle = document.createElement('h3');
        mainTitle.className = 'changes-title';
        mainTitle.innerHTML = changesConfig.mainUpdate.title;
        
        var mainDate = document.createElement('div');
        mainDate.className = 'changes-date';
        mainDate.innerHTML = changesConfig.mainUpdate.date;
        
        var mainContent = document.createElement('div');
        mainContent.className = 'changes-content';
        mainContent.innerHTML = changesConfig.mainUpdate.content;
        
        // Append main update elements
        mainSection.appendChild(mainTitle);
        mainSection.appendChild(mainDate);
        mainSection.appendChild(mainContent);
        changesContainer.appendChild(mainSection);
        
        // Create grid for smaller updates
        var changesGrid = document.createElement('div');
        changesGrid.className = 'changes-grid';
        
        // Create and populate update boxes
        for (var i = 0; i < changesConfig.updates.length; i++) {
            var update = changesConfig.updates[i];
            var box = document.createElement('div');
            box.className = 'changes-box';
            
            var boxTitle = document.createElement('h4');
            boxTitle.className = 'changes-box-title';
            boxTitle.innerHTML = update.title;
            
            var boxDate = document.createElement('div');
            boxDate.className = 'changes-box-date';
            boxDate.innerHTML = update.date;
            
            var boxContent = document.createElement('div');
            boxContent.className = 'changes-box-content';
            boxContent.innerHTML = update.content;
            
            // Append box elements
            box.appendChild(boxTitle);
            box.appendChild(boxDate);
            box.appendChild(boxContent);
            changesGrid.appendChild(box);
        }
        
        // Add the grid to the container
        changesContainer.appendChild(changesGrid);
        
        // Add the message about viewing changelog on Discord
        // First, remove any existing message to prevent duplication
        var existingMsg = document.getElementsByClassName('changes-discord-message')[0];
        if (existingMsg) {
            existingMsg.parentNode.removeChild(existingMsg);
        }
        
        var discordMsg = document.createElement('div');
        discordMsg.className = 'changes-discord-message';
        
        // Create link element with styling
        var linkText = document.createElement('span');
        linkText.innerHTML = 'You can view the changelog on our discord: ';
        
        var link = document.createElement('a');
        link.href = 'https://discord.gg/npc';
        link.innerHTML = 'discord.gg/npc';
        link.className = 'discord-link';
        link.target = '_blank'; // Open in new tab
        
        // Append elements to message container
        discordMsg.appendChild(linkText);
        discordMsg.appendChild(link);
        
        changesContainer.appendChild(discordMsg);
    }
}

// Initialize the Changes tab
window.onload = function() {
    if (window.changesTabInitialized) {
        return;
    }
    window.changesTabInitialized = true;
    
    updateChangesTab();
    
    // Optional: Add animation to make the tab slide in
    setTimeout(function() {
        var changesTab = document.getElementsByClassName('changes-tab')[0];
        if (changesTab) {
            changesTab.style.opacity = '1';
            changesTab.style.filter = 'alpha(opacity=100)';
        }
    }, 500);
}; 