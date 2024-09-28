var statusMessages = ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"];
var needsUploading = false;

function init() { // eslint-disable-line no-unused-vars
	var _tdNeedsUploading = document.getElementById("tdNeedsUploading");
}

function setEmailAddress(email) { // eslint-disable-line no-unused-vars
	var tdEmail = document.getElementById("tdEmail");
	tdEmail.innerHTML = email;
}

function setOnline(online) { // eslint-disable-line no-unused-vars
	var tdOnline = document.getElementById("tdOnline");
	if (online) {
		tdOnline.innerHTML = "Connected to Server";
		tdOnline.style = "#00ff00";
	} else {
		tdOnline.innerHTML = "Running in Disconnect Mode";
		tdOnline.style = "#ff0000";
	}
}

function getCacheStatusValue(number) { // eslint-disable-line no-unused-vars
	return statusMessages[number];
}

function setCacheStatus(status) { // eslint-disable-line no-unused-vars
	var tdCache = document.getElementById("tdCache");
	if (status instanceof Number) {
		tdCache.innerHTML = getCacheStatusValue(7);
	} else {
		tdCache.innerHTML = status;
	}
}

function getCacheStatus() { // eslint-disable-line no-unused-vars
	return window.applicationCache.status;
}

function setNeedsUploading(needs) { // eslint-disable-line no-unused-vars
	var tdNeedsUploading = document.getElementById("tdNeedsUploading");
	if (needs) {
		tdNeedsUploading.innerHTML = "Data needs to be uploaded";
		tdNeedsUploading.style = "#ff0000";
	} else {
		tdNeedsUploading.innerHTML = "Data is flushed";
		tdNeedsUploading.style = "#00ff00";
	}
}

function getNeedsUploading() { // eslint-disable-line no-unused-vars
	return needsUploading;
}
