// Configuration for the Other Servers tab
const serversConfig = {
    headerTitle: "Other Servers",
    servers: [
        {
            id: "npc-zombies",
            title: "NPC Zombies Vs. Players",
            ip: "193.243.190.18",
            port: "27015",
            content: "Fast-paced action with instant respawn and all weapons unlocked."
        },
        {
            id: "horde-wave",
            title: "Horde Wave Survival",
            ip: "193.243.190.18",
            port: "27065",
            content: "Team up with other players to survive waves of enemies."
        },
        {
            id: "zgrad",
            title: "ZGRAD US1",
            ip: "193.243.190.18",
            port: "27066",
            content: "Build and design your own maps with unlimited resources."
        }
    ],
    
    async updateServerStatus(server) {
        try {
            const response = await fetch(`https://gameserveranalytics.com/api/v2/query?game=source&ip=${server.ip}&port=${server.port}&type=info`);
            const serverInfo = await response.json();
            
            const status = {
                online: false,
                players: 0,
                maxPlayers: 0
            };

            if (serverInfo && (serverInfo.status?.toLowerCase() === 'online' || serverInfo.players !== undefined)) {
                status.online = true;
                status.players = serverInfo.players || serverInfo.num_players || serverInfo.playercount || 0;
                status.maxPlayers = serverInfo.maxplayers || serverInfo.max_players || serverInfo.maxclients || "?";
            }

            return status;
        } catch (error) {
            console.error(`Error fetching data for ${server.id}:`, error);
            return { online: false, players: 0, maxPlayers: 0 };
        }
    }
};

// Function to update the Servers tab content
async function updateServersTab() {
    // Update header
    document.querySelector('.servers-header').textContent = serversConfig.headerTitle;
    
    // Clear and populate the servers grid
    const serversGrid = document.querySelector('.servers-grid');
    serversGrid.innerHTML = ''; // Clear existing content
    
    // Create and add server boxes
    for (const server of serversConfig.servers) {
        // Create server box element
        const serverBox = document.createElement('div');
        serverBox.className = 'server-box';
        serverBox.id = `server-${server.id}`;
        
        // Create and populate title element
        const titleElement = document.createElement('h4');
        titleElement.className = 'server-box-title';
        titleElement.textContent = server.title;
        
        // Create and populate players element
        const playersElement = document.createElement('div');
        playersElement.className = 'server-box-players';
        playersElement.textContent = 'Players: Loading...';
        
        // Create and populate content element
        const contentElement = document.createElement('div');
        contentElement.className = 'server-box-content';
        contentElement.textContent = server.content;
        
        // Append all elements to the server box
        serverBox.appendChild(titleElement);
        serverBox.appendChild(playersElement);
        serverBox.appendChild(contentElement);
        
        // Add the server box to the grid
        serversGrid.appendChild(serverBox);
        
        // Fetch server status
        try {
            const status = await serversConfig.updateServerStatus(server);
            
            if (status.online) {
                playersElement.textContent = `Players: ${status.players}/${status.maxPlayers}`;
                serverBox.classList.remove('server-offline');
            } else {
                playersElement.textContent = 'Server Offline';
                serverBox.classList.add('server-offline');
            }
        } catch (error) {
            console.error(`Error updating status for ${server.id}:`, error);
            playersElement.textContent = 'Status Unavailable';
            serverBox.classList.add('server-error');
        }
    }
    
    // Add the message about viewing more servers
    // First, remove any existing message box to prevent duplication
    const existingMsg = document.querySelector('.more-servers-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const moreServersMsg = document.createElement('div');
    moreServersMsg.className = 'more-servers-message';
    
    // Create link element with styling
    const linkText = document.createElement('span');
    linkText.textContent = 'You can view the rest of our servers on our website: ';
    
    const link = document.createElement('a');
    link.href = 'https://zgrad.gg/servers';
    link.textContent = 'zgrad.gg/servers';
    link.className = 'server-link';
    link.target = '_blank'; // Open in new tab
    
    // Append elements to message container
    moreServersMsg.appendChild(linkText);
    moreServersMsg.appendChild(link);
    
    document.querySelector('.servers-container').appendChild(moreServersMsg);
}

// Initialize the Servers tab
document.addEventListener('DOMContentLoaded', () => {
    // Initial update
    updateServersTab();
    
    // Optional: Add animation to make the tab slide in
    setTimeout(() => {
        document.querySelector('.servers-tab').style.opacity = '1';
    }, 500);
    
    // Refresh server status every 60 seconds
    setInterval(updateServersTab, 60000);
}); 