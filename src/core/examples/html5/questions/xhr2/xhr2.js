var divResults; // eslint-disable-line no-unused-vars

function init() {
	var btnPresMe = document.getElementById("press_me");
	divResults = document.getElementById("results");
	btnPresMe.onclick = processSubmit;
}

function processSubmit() {
	/* Enter XHR2 Code Here */
	return false; // Prevent actual form submission
}

window.onload = init;
