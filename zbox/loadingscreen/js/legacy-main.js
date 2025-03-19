"use strict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;
var downloadingFileCalled = false;
var percentage = 0;

/**
 * Gmod Called functions
 */
function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  isGmod = true;
  if (!isTest) {
    loadAll();
  }

  var titleElement = document.getElementById("title");
  if (titleElement) {
    titleElement.innerHTML = servername;
    fadeIn(titleElement);
  }

  var mapElement = document.getElementById("map");
  if (mapElement) {
    // Clear existing text
    while (mapElement.firstChild) {
      mapElement.removeChild(mapElement.firstChild);
    }
    
    // Add new text
    mapElement.appendChild(document.createTextNode("You're playing on " + mapname));
    mapElement.style.display = "block";
    mapElement.style.opacity = "1";
    mapElement.style.filter = "alpha(opacity=100)";
  }

  var steamidElement = document.getElementById("steamid");
  if (steamidElement && Config.enableSteamID) {
    steamidElement.innerHTML = steamid;
    fadeIn(steamidElement);
  }
}

function SetFilesTotal(total) {
  totalCalled = true;
  totalFiles = total;
}

function SetFilesNeeded(needed) {
  if (totalCalled) {
    var sPercentage = 100 - Math.round((needed / totalFiles) * 100);
    percentage = sPercentage;
    setLoad(sPercentage);
  }
}

var fileCount = 0;
function DownloadingFile(filename) {
  filename = filename.replace("'", "").replace("?", "");
  downloadingFileCalled = true;
  var history = document.getElementById("history");
  if (history) {
    var newItem = document.createElement("div");
    newItem.className = "history-item";
    newItem.appendChild(document.createTextNode(filename));
    history.insertBefore(newItem, history.firstChild);

    var items = history.getElementsByTagName("div");
    for (var i = 0; i < items.length; i++) {
      if (i > 10 && items[i] && items[i].parentNode) {
        items[i].parentNode.removeChild(items[i]);
      } else if (items[i]) {
        var opacity = 1 - i * 0.1;
        items[i].style.opacity = opacity.toString();
        // Legacy IE opacity
        items[i].style.filter = "alpha(opacity=" + Math.round(opacity * 100) + ")";
      }
    }
  }
}

var allow_increment = true;
function SetStatusChanged(status) {
  var history = document.getElementById("history");
  if (history) {
    var newItem = document.createElement("div");
    newItem.className = "history-item";
    newItem.appendChild(document.createTextNode(status));
    history.insertBefore(newItem, history.firstChild);

    var items = history.getElementsByTagName("div");
    for (var i = 0; i < items.length; i++) {
      if (i > 10 && items[i] && items[i].parentNode) {
        items[i].parentNode.removeChild(items[i]);
      } else if (items[i]) {
        var opacity = 1 - i * 0.1;
        items[i].style.opacity = opacity.toString();
        // Legacy IE opacity
        items[i].style.filter = "alpha(opacity=" + Math.round(opacity * 100) + ")";
      }
    }
  }
  if (status === "Workshop Complete") {
    allow_increment = false;
    setLoad(80);
  } else if (status === "Client info sent!") {
    allow_increment = false;
    setLoad(95);
  } else if (status === "Starting Lua...") {
    setLoad(100);
  } else {
    if (allow_increment) {
      percentage = percentage + 0.1;
      setLoad(percentage);
    }
  }
}

/**
 * External Functions
 */
function loadAll() {
  // Make sure the nav is visible
  var navElement = document.getElementById("top-nav") || document.getElementsByClassName("nav")[0];
  var mainElement = document.getElementsByClassName("main")[0];
  
  if (navElement) {
    navElement.style.display = "block";
    navElement.style.opacity = "1";
    navElement.style.filter = "alpha(opacity=100)";
  }
  
  if (mainElement) {
    mainElement.style.display = "block";
    mainElement.style.opacity = "1"; 
    mainElement.style.filter = "alpha(opacity=100)";
  }

  // first time loading if DownloadingFile isn't called after some time
  setTimeout(function() {
    if (downloadingFileCalled) {
      announce(
        "This is your first time loading, please wait for the files to download.",
        true
      );
    }
  }, 10000);
}
function setLoad(percentage) {
  var overhaul = document.getElementsByClassName("overhaul")[0];
  if (overhaul) {
    overhaul.style.left = percentage + "%";
  }
}
var permanent = false;
function announce(message, ispermanent) {
  if (Config && Config.enableAnnouncements && !permanent) {
    var announcement = document.getElementById("announcement");
    if (announcement) {
      announcement.style.display = "block";
      announcement.innerHTML = message;
      // Make sure it's visible
      announcement.style.opacity = "1";
      announcement.style.filter = "alpha(opacity=100)";
    }
  }
  if (ispermanent) {
    permanent = true;
  }
}

function fadeIn(element) {
  if (!element) return;
  
  element.style.opacity = 1;
  // Legacy IE opacity
  element.style.filter = "alpha(opacity=100)";
  element.style.display = "block";
  
  // Handle nav element specifically
  if (element.className && (element.className.indexOf('nav') !== -1 || element.id === 'top-nav')) {
    // Force nav to be visible
    element.style.display = "block";
    element.style.opacity = 1;
    element.style.filter = "alpha(opacity=100)";
    
    // Also ensure the powered-by element is visible
    var poweredBy = element.getElementsByClassName('powered-by')[0];
    if (poweredBy) {
      poweredBy.style.opacity = 1;
      poweredBy.style.filter = "alpha(opacity=100)";
    }
  }
}

/**
 * Initial function
 */
// Use window.onload for older browsers
window.onload = function() {
  // Ensure the nav is visible immediately
  var navElement = document.getElementById("top-nav") || document.getElementsByClassName("nav")[0];
  if (navElement) {
    navElement.style.display = "block";
    navElement.style.opacity = "1";
    navElement.style.filter = "alpha(opacity=100)";
  }

  // Make sure announcement is visible
  var announcement = document.getElementById("announcement");
  if (announcement) {
    announcement.style.display = "block";
    announcement.style.opacity = "1";
    announcement.style.filter = "alpha(opacity=100)";
  }

  // print announcement messages every few seconds
  if (
    typeof Config !== 'undefined' &&
    Config.announceMessages &&
    Config.enableAnnouncements &&
    Config.announcementLength
  ) {
    if (Config.announceMessages.length > 0) {
      var i = 0;
      announce(Config.announceMessages[i]);  // Show first message immediately
      setInterval(function() {
        announce(Config.announceMessages[i]);
        i++;
        if (i > Config.announceMessages.length - 1) {
          i = 0;
        }
      }, Config.announcementLength);
    }
  }

  // if it isn't loaded by gmod load manually
  setTimeout(function() {
    if (!isGmod) {
      isTest = true;
      loadAll();

      GameDetails(
        "Servername",
        "Serverurl",
        "Mapname",
        "Maxplayers",
        "SteamID",
        "Gamemode"
      );

      var totalTestFiles = 100;
      SetFilesTotal(totalTestFiles);

      var needed = totalTestFiles;
      setInterval(function() {
        if (needed > 0) {
          needed = needed - 1;
          SetFilesNeeded(needed);
          DownloadingFile("Filename " + needed);
        }
      }, 500);

      SetStatusChanged("Testing..");
    }
  }, 1000);
};

// Fix for old browsers that don't support getElementsByClassName
if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(className) {
    return this.querySelectorAll("." + className);
  };
  Element.prototype.getElementsByClassName = document.getElementsByClassName;
}

// Fix for old browsers that don't support querySelector
if (!document.querySelector) {
  document.querySelector = function(selector) {
    return document.getElementsByTagName(selector.replace(".", ""))[0];
  };
} 