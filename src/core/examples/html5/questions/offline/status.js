var statusMessages = ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"];
var needsUploading = false;

function init() {
}

function setEmailAddress(email) {
	var tdEmail = document.getElementById("tdEmail");
	tdEmail.innerHTML = email;
}

function setOnline(online) {
	var tdOnline = document.getElementById("tdOnline");
	if (online) {
		tdOnline.innerHTML = "Connected to Server";
		tdOnline.style = "#00ff00";
	} else {
		tdOnline.innerHTML = "Running in Disconnect Mode";
		tdOnline.style = "#ff0000";
	}
}

function getCacheStatusValue(number) {
	return statusMessages[number];
}

function setCacheStatus(status) {
	var tdCache = document.getElementById("tdCache");
	if (status instanceof Number) {
		tdCache.innerHTML = getCacheStatusValue(7);
	} else {
		tdCache.innerHTML = status;
	}
}

function getCacheStatus() {
	return window.applicationCache.status;
}

function setNeedsUploading(needs) {
	var tdNeedsUploading = document.getElementById("tdNeedsUploading");
	if (needs) {
		tdNeedsUploading.innerHTML = "Data needs to be uploaded";
		tdNeedsUploading.style = "#ff0000";
	} else {
		tdNeedsUploading.innerHTML = "Data is flushed";
		tdNeedsUploading.style = "#00ff00";
	}
}

function getNeedsUploading() {
	return needsUploading;
}

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { init, setEmailAddress, setOnline, setCacheStatus, getCacheStatus, setNeedsUploading, getNeedsUploading });
