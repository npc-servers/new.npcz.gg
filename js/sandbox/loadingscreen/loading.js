function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

// Delay between message changes in milliseconds
var messagesDelay = 5000;

// Messages fade time in milliseconds
var messagesFade = 1000;

var messages = [
	"Join our discord: discord.gg/npc"
];

var neededFiles;
var downloadedFiles = 0;

function DownloadingFile(fileName) {
	downloadedFiles++;
	refreshProgress();
	setStatus("Downloading files...");
}

function SetStatusChanged(status) {
	if (status.indexOf("Getting Addon #") != -1) {
		downloadedFiles++;
		refreshProgress();
	} else if (status === "Sending client info...") {
		setProgress(100);
	}

	setStatus(status);
}

function SetFilesNeeded(needed) {
	neededFiles = needed + 1;
}

function refreshProgress() {
	var progress = Math.floor(((downloadedFiles / neededFiles) * 100));
	setProgress(progress);
}

function setStatus(text) {
	document.getElementById("status").innerHTML = text;
}

function setProgress(progress) {
	document.getElementById("loading-progress").style.width = progress + "%";
}

function showMessage(message) {
	if (message >= messages.length) {
		message = 0;
	}

	document.getElementById("messages").innerHTML = messages[message];

	if (messages.length > 1) {
		setTimeout(function() {
			showMessage(message + 1);
		}, messagesDelay + messagesFade * 2);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	var video = document.querySelector('video');
	if ('fetch' in window) {
		video.addEventListener('play', function() {
			// Set the background color of the HTML element
			document.documentElement.style.backgroundColor = "transparent";
	
			// Shuffle the messages and display the first one
			shuffle(messages);
			showMessage(0);
	
			// Center align the header
			document.getElementById("header").style.textAlign = "center";
		});
	}else{
		var body = document.getElementsByTagName("body")[0];
		body.style.backgroundColor = "black";

		// Set large_logo.png as the background
		body.style.backgroundImage = "url('/assets/logos/large_logo.png')";
		body.style.backgroundRepeat = "no-repeat";
		body.style.backgroundPosition = "center";

		// Shuffle the messages and display the first one
		shuffle(messages);
		showMessage(0);

		// Center align the header
		document.getElementById("header").style.textAlign = "center";
	}	
});
