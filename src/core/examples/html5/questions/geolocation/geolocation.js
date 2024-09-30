function init() {
	var btnPressMe = document.getElementById("press_me");
	var btnStop = document.getElementById("stop");
	btnPressMe.onclick = processSubmit;
	btnStop.onclick = stopWatchingLocation;
}

function processSubmit() { // eslint-disable-line no-unused-vars
	/* Enter GeoLocation Code Here */
}

function stopWatchingLocation() { // eslint-disable-line no-unused-vars
	/* Enter Stop Watching Code here */
}

function updatePosition(position) { // eslint-disable-line no-unused-vars
	/* Enter Position Update Code here */
}

function errorPosition(error) { // eslint-disable-line no-unused-vars
	/* Enter Position Error Code here */
}

function optionsPosition() { // eslint-disable-line no-unused-vars
	/* Enter Position Options Code here */
}

window.onload = init;
