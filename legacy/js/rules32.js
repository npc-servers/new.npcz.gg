// Rules data structure
var rulesData = {
    'common-sense': [
        {id: 'no-slurs', title: 'Slurs', description: 'No use of homophobic and racial slurs are permitted. Homophobic & Racial slurs are strictly prohibited, no matter the context. Saying/promoting these terms will get you banned.'},
        {id: 'no-harassment', title: 'Harassment', description: 'Do not harass or intentionally annoy other players.'},
        {id: 'no-mic-spam', title: 'Mic Spam', description: 'Mic Spamming/earraping is not allowed.'},
        {id: 'english-only', title: 'English Only in All-Chat', description: 'We are an english speaking server, so keep all-chat in english. You can use other languages in PMs/Near/Squads.'},
        {id: 'no-cheating', title: 'Cheating/Exploiting', description: 'Modifying your game to provide an unfair advantage (cheating/exploiting) is against the rules.'},
        {id: 'no-lag', title: 'Server Disruption', description: 'Intentionally lagging/crashing the server is not allowed.'},
        {id: 'no-dox', title: 'Doxxing/DDoS', description: 'Threatening or attempting to dox/DDoS other players will result in a permanent ban.'},
        {id: 'no-advertising', title: 'Advertising', description: 'Advertising/recruiting in the server (Discord invites, clan recruiting, or server promotion) is not allowed.'},
        {id: 'no-nsfw', title: 'NSFW Content', description: 'NSFW Content is not allowed.'},
        {id: 'no-offensive', title: 'Offensive Behavior', description: 'Do not engage in/use offensive behavior or language.'},
        {id: 'no-retaliation', title: 'Rule Breaking Retaliation', description: 'Do not break rules because someone else is breaking them; you will also be punished.'},
        {id: 'no-politics', title: 'Politics/Sensitive Topics', description: 'Topics about politics, shootings, ongoing wars, illegal content, etc, are highly discouraged, and will result in a punishment by staff.'},
        {id: 'respect-players', title: 'Respect All Players', description: 'Treat everyone with respect. Excessive Harassment, hate speech, and personal attacks will not be tolerated.'},
        {id: 'follow-admins', title: 'Follow Admin Instructions', description: 'Always listen to the admins and moderators. Their word is final.'}
    ],
    'prop-abuse': [
        {id: 'no-griefing', title: 'Griefing', description: 'Avoid behavior that disrupts the game experience for others, including excessive mic spam, punching & searching players without valid reason, or other forms of disruptive gameplay.'},
        {id: 'no-prop-push', title: 'Prop Push/Kill', description: 'Do not prop push or prop kill under any circumstances.'},
        {id: 'no-prop-entry', title: 'Unauthorized Base Entry', description: 'Using props/vehicles to enter peoples bases is not allowed.'},
        {id: 'no-prop-spam', title: 'Prop Spam', description: 'Do not prop spam, doing this may result in a ban without warning!'},
        {id: 'no-blocking', title: 'Map Blocking', description: 'Blocking off large parts of the map, including roads and spawnpoints, is not allowed.'},
        {id: 'no-skybox', title: 'Skybox Building', description: 'Do not build in the skybox.'},
        {id: 'no-unauthorized-props', title: 'Unauthorized Props', description: 'Do not spawn props/entities in or on a player\'s build/base without permission. This includes spawnpoints.'},
        {id: 'no-prop-access', title: 'Unauthorized Access Methods', description: 'Do not use props or balloons to gain access to a player\'s build/base. Propflying for map traversal is allowed.'}
    ],
    'pve-pvp': [
        {id: 'no-rdm', title: 'RDM', description: 'Killing other players without a valid reason is prohibited. Roleplay interactions must be meaningful.'},
        {id: 'no-teamkilling', title: 'Teamkilling', description: 'Do not kill your teammates.'},
        {id: 'no-revenge', title: 'Revenge RDM', description: 'If you are RDM\'d, do not attempt to RDM the player back. Report it to an admin.'},
        {id: 'no-metagaming', title: 'Metagaming', description: 'Do not use knowledge gained from out-of-character sources (Private Voice-chats/Direct Messages) to influence your in-game decisions.'},
        {id: 'pve-advantage', title: 'PVE Advantage', description: 'You may not use PVE mode to gain, or provide another player(s) any form of advantage in PVP.'},
        {id: 'playermodel-restrictions', title: 'Playermodel Restrictions', description: 'In PVP, equipping a smaller than average playermodel while in pvp mode is not allowed, same goes for playermodels that look normal but have smaller than usual hitboxes. If you are in PVE mode you are exempt from this rule.'},
        {id: 'map-boundaries', title: 'Map Boundaries', description: 'Attacking players from outside the map or inside a space that isn\'t accessible is not allowed.'},
        {id: 'pve-killing', title: 'PVE Killing', description: 'While in PVE mode you are not allowed to kill other players in any way.'},
        {id: 'pve-blocking', title: 'PVE Blocking', description: 'Do not use PVE mode to body block entries or areas.'},
        {id: 'pve-base-respect', title: 'PVE Base Respect', description: 'While in PVE mode, you must leave a PVP player\'s base if they ask you to.'}
    ],
    'basing': [
        {id: 'stay-inbounds', title: 'Stay Inbounds', description: 'Do not abuse mechanics to get out of bounds on maps.'},
        {id: 'keypad-access', title: 'Keypad Access', description: 'In PVP, doors must have an easily accessible and visible keypad or button within close proximity for entering.'},
        {id: 'keypad-restrictions', title: 'Keypad Restrictions', description: 'In PVP, you are not allowed to use keypads to disorient a raider (eg. multiple keypads for 1 door).'},
        {id: 'prop-blocking', title: 'Prop Blocking', description: 'Using props to block off areas without keypads is not allowed. If you are in PVE mode you are exempt from this rule.'},
        {id: 'pve-base-shooting', title: 'PVE Base Shooting', description: 'If you have a base in PVE you cannot let PVP players shoot out of it.'},
        {id: 'base-accessibility', title: 'Base Accessibility', description: 'Bases must be completely enterable without crouching/obstruction.'},
        {id: 'door-limits', title: 'Door Limits', description: 'Bases can have a maximum of 4 doors per entrance.'}
    ],
    'wiremod': [
        {id: 'no-exploiting', title: 'Exploiting/Cheating', description: 'Do not exploit bugs or glitches in the game. Report any issues to the server admins instead.'},
        {id: 'malicious-intent', title: 'Malicious Intent', description: 'If you wouldn\'t fight it, don\'t use it! Anything built for malicious intent is not allowed.'},
        {id: 'zombie-contraptions', title: 'Zombie Contraptions', description: 'Contraptions designed to automatically kill zombies in a large radius are not allowed. You are exempt from this rule if you are base building.'},
        {id: 'contraption-health', title: 'Contraption Health', description: 'If the intentions of the contraption is to fight with it you MUST have contraption health core present on the contraption. (see the construction tools section)'},
        {id: 'contraption-power', title: 'Contraption Power', description: 'Contraptions should be equal in power to their Glide counterparts.'},
        {id: 'drone-restrictions', title: 'Drone Restrictions', description: 'Drone contraptions are not allowed. You can use our counterparts in the entities tab or the !shop.'},
        {id: 'player-targeting', title: 'Player Targeting', description: 'Player targeting is not allowed. Using radars, Tracking Turrets, commands, or anything related is not allowed. This also includes player blinders and teleportation jails.'},
        {id: 'optimization', title: 'Optimization', description: 'Builds and contraptions must be optimized: paste without constraints, Prop2Mesh it, or rebuild it to be simpler. If your build degrades server or client performance, it will be deleted.'}
    ]
};

// Toggle category dropdown
function toggleCategory(header) {
    var content = header.nextSibling;
    while(content && content.nodeType != 1) {
        content = content.nextSibling;
    }
    
    var isActive = header.className.indexOf('active') !== -1;
    
    // Toggle current category
    if (isActive) {
        header.className = header.className.replace(' active', '');
        content.className = content.className.replace(' active', '');
    } else {
        header.className += ' active';
        content.className += ' active';
        
        // Scroll into view if opening
        setTimeout(function() {
            header.scrollIntoView();
        }, 100);
    }
}

// Copy link to rule
function copyLink(ruleId) {
    var url = window.location.href.split('#')[0] + '#' + ruleId;
    copyToClipboard(url);
    showToast('Link copied to clipboard!');
}

// Copy rule text
function copyText(button) {
    var ruleCard = button;
    while(ruleCard && !ruleCard.className.match(/\brule-card\b/)) {
        ruleCard = ruleCard.parentNode;
    }
    var description = ruleCard.getElementsByClassName('rule-description')[0].textContent;
    copyToClipboard(description);
    showToast('Rule text copied to clipboard!');
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

// Create rule card element
function createRuleCard(rule) {
    var card = document.createElement('div');
    card.id = rule.id;
    card.className = 'rule-card';
    
    var header = document.createElement('div');
    header.className = 'rule-header';
    
    var title = document.createElement('h2');
    title.className = 'rule-title';
    title.textContent = rule.title;
    
    var actions = document.createElement('div');
    actions.className = 'rule-actions';
    
    var linkBtn = document.createElement('button');
    linkBtn.title = 'Copy link to rule';
    linkBtn.onclick = function() { copyLink(rule.id); };
    linkBtn.innerHTML = '<i class="icon-link"></i>';
    
    var copyBtn = document.createElement('button');
    copyBtn.title = 'Copy rule text';
    copyBtn.onclick = function() { copyText(this); };
    copyBtn.innerHTML = '<i class="icon-copy"></i>';
    
    actions.appendChild(linkBtn);
    actions.appendChild(copyBtn);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    var description = document.createElement('div');
    description.className = 'rule-description';
    description.textContent = rule.description;
    
    card.appendChild(header);
    card.appendChild(description);
    
    return card;
}

// Initialize
window.onload = function() {
    // Populate rule categories
    var categories = document.getElementsByClassName('category-content');
    var categoryData = {
        0: rulesData['common-sense'],
        1: rulesData['prop-abuse'],
        2: rulesData['pve-pvp'],
        3: rulesData['basing'],
        4: rulesData['wiremod']
    };
    
    for (var i = 0; i < categories.length; i++) {
        var rules = categoryData[i];
        if (rules) {
            for (var j = 0; j < rules.length; j++) {
                categories[i].appendChild(createRuleCard(rules[j]));
            }
        }
    }
    
    // Open first category by default
    var firstHeader = document.getElementsByClassName('category-header')[0];
    if (firstHeader) {
        toggleCategory(firstHeader);
    }
    
    // Handle hash links
    handleHash();
};

// Handle hash links
function handleHash() {
    var hash = window.location.hash;
    if (hash) {
        var ruleId = hash.substring(1);
        var ruleElement = document.getElementById(ruleId);
        if (ruleElement) {
            var category = ruleElement;
            while(category && !category.className.match(/\brule-category\b/)) {
                category = category.parentNode;
            }
            if (category) {
                var header = category.getElementsByClassName('category-header')[0];
                toggleCategory(header);
                // Smooth scroll with delay to ensure animation completes
                setTimeout(function() {
                    ruleElement.scrollIntoView();
                }, 300);
            }
        }
    }
}

// Handle hash changes
window.onhashchange = handleHash; 