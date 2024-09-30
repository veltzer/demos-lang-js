var btnPressMe;
var video; // eslint-disable-line no-unused-vars

function init() {
	btnPressMe = document.getElementById("press_me");
	btnPressMe.onclick = processSubmit;
	video = document.getElementById("my_video");
}

function processSubmit() {
	/* Enter Video Code Here */

	return false; // Prevent actual form submission
}

window.onload = init;
