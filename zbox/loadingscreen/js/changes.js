// Configuration for the Changes tab
const changesConfig = {
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
    document.querySelector('.changes-header').textContent = changesConfig.headerTitle;
    
    // Get container element
    const changesContainer = document.querySelector('.changes-container');
    changesContainer.innerHTML = ''; // Clear existing content
    
    // Create and populate main update section
    const mainSection = document.createElement('div');
    mainSection.className = 'changes-main';
    
    const mainTitle = document.createElement('h3');
    mainTitle.className = 'changes-title';
    mainTitle.textContent = changesConfig.mainUpdate.title;
    
    const mainDate = document.createElement('div');
    mainDate.className = 'changes-date';
    mainDate.textContent = changesConfig.mainUpdate.date;
    
    const mainContent = document.createElement('div');
    mainContent.className = 'changes-content';
    mainContent.textContent = changesConfig.mainUpdate.content;
    
    // Append main update elements
    mainSection.appendChild(mainTitle);
    mainSection.appendChild(mainDate);
    mainSection.appendChild(mainContent);
    changesContainer.appendChild(mainSection);
    
    // Create grid for smaller updates
    const changesGrid = document.createElement('div');
    changesGrid.className = 'changes-grid';
    
    // Create and populate update boxes
    changesConfig.updates.forEach(update => {
        const box = document.createElement('div');
        box.className = 'changes-box';
        
        const boxTitle = document.createElement('h4');
        boxTitle.className = 'changes-box-title';
        boxTitle.textContent = update.title;
        
        const boxDate = document.createElement('div');
        boxDate.className = 'changes-box-date';
        boxDate.textContent = update.date;
        
        const boxContent = document.createElement('div');
        boxContent.className = 'changes-box-content';
        boxContent.textContent = update.content;
        
        // Append box elements
        box.appendChild(boxTitle);
        box.appendChild(boxDate);
        box.appendChild(boxContent);
        changesGrid.appendChild(box);
    });
    
    // Add the grid to the container
    changesContainer.appendChild(changesGrid);
    
    // Add the message about viewing changelog on Discord
    // First, remove any existing message to prevent duplication
    const existingMsg = document.querySelector('.changes-discord-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const discordMsg = document.createElement('div');
    discordMsg.className = 'changes-discord-message';
    
    // Create link element with styling
    const linkText = document.createElement('span');
    linkText.textContent = 'You can view the changelog on our discord: ';
    
    const link = document.createElement('a');
    link.href = 'https://discord.gg/npc';
    link.textContent = 'discord.gg/npc';
    link.className = 'discord-link';
    link.target = '_blank'; // Open in new tab
    
    // Append elements to message container
    discordMsg.appendChild(linkText);
    discordMsg.appendChild(link);
    
    changesContainer.appendChild(discordMsg);
}

// Initialize the Changes tab
document.addEventListener('DOMContentLoaded', () => {
    updateChangesTab();
    
    // Optional: Add animation to make the tab slide in
    setTimeout(() => {
        document.querySelector('.changes-tab').style.opacity = '1';
    }, 500);
}); 