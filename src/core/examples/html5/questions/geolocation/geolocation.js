function init() {
	var btnPressMe = document.getElementById("press_me");
	var btnStop = document.getElementById("stop");
	btnPressMe.onclick = processSubmit;
	btnStop.onclick = stopWatchingLocation;
}

function processSubmit() {
	/* Enter GeoLocation Code Here */
}

function stopWatchingLocation() {
	/* Enter Stop Watching Code here */
}

function updatePosition(position) {
	/* Enter Position Update Code here */
}

function errorPosition(error) {
	/* Enter Position Error Code here */
}

function optionsPosition() {
	/* Enter Position Options Code here */
}

window.onload = init;

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { updatePosition, errorPosition, optionsPosition });
