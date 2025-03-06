/**
 * Server Status Module
 * Fetches and displays game server status and player count
 */

window.NPCZ = window.NPCZ || {};
window.NPCZ.serverStatus = {
    // Configuration
    serverConfig: {
        ip: '193.243.190.18',
        port: '27015',
        updateInterval: 60000, // Update every minute
    },
    
    // DOM elements
    elements: {
        statusContainer: null,
        statusIndicator: null,
        playerCount: null
    },
    
    // Initialize the server status module
    init: function() {
        // Create and inject the server status HTML if it doesn't exist
        this.createStatusElement();
        
        // Cache DOM elements
        this.cacheElements();
        
        // Fetch initial server status
        this.fetchServerStatus();
        
        // Set up interval for regular updates
        setInterval(() => this.fetchServerStatus(), this.serverConfig.updateInterval);
    },
    
    // Create the server status HTML element
    createStatusElement: function() {
        if (document.getElementById('server-status-badge')) return;
        
        const statusHTML = `
            <div id="server-status-badge" class="server-status-badge btn">
                <span class="status-indicator" id="status-indicator"></span>
                <span class="player-count" id="player-count">-</span>
            </div>
        `;
        
        // Find the button group in the landing page
        const buttonGroup = document.querySelector('.button-group');
        if (buttonGroup) {
            // Insert the server status badge as the last child of the button group
            buttonGroup.insertAdjacentHTML('beforeend', statusHTML);
        }
    },
    
    // Cache DOM elements for better performance
    cacheElements: function() {
        this.elements.statusContainer = document.getElementById('server-status-badge');
        this.elements.statusIndicator = document.getElementById('status-indicator');
        this.elements.playerCount = document.getElementById('player-count');
    },
    
    // Fetch server status using the provided API endpoint and format
    fetchServerStatus: function() {
        // Add updating class to show loading state
        if (this.elements.statusContainer) {
            this.elements.statusContainer.classList.add('updating');
        }
        
        const { ip, port } = this.serverConfig;
        const self = this;
        
        fetch(`https://gameserveranalytics.com/api/v2/query?game=source&ip=${ip}&port=${port}&type=info`)
            .then(function(response) {
                return response.json();
            })
            .then(function(serverInfo) {
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
                
                self.updateStatusDisplay(status);
            })
            .catch(function(error) {
                console.error('Error fetching server status:', error);
                self.showErrorState();
            })
            .finally(function() {
                // Remove updating class
                if (self.elements.statusContainer) {
                    self.elements.statusContainer.classList.remove('updating');
                }
            });
    },
    
    // Update the status display with the fetched data
    updateStatusDisplay: function(status) {
        if (!this.elements.statusContainer) return;
        
        // Update status indicator
        this.elements.statusIndicator.className = 'status-indicator ' + (status.online ? 'online' : 'offline');
        
        // Update player count
        this.elements.playerCount.textContent = status.online ? `${status.players} players` : 'Offline';
        
        // Update container class based on status
        this.elements.statusContainer.classList.toggle('server-online', status.online);
        this.elements.statusContainer.classList.toggle('server-offline', !status.online);
    },
    
    // Show error state when API request fails
    showErrorState: function() {
        if (!this.elements.statusContainer) return;
        
        this.elements.statusIndicator.className = 'status-indicator unknown';
        this.elements.playerCount.textContent = 'Status unknown';
    }
};

// Initialize the server status module when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.NPCZ.serverStatus.init();
}); 