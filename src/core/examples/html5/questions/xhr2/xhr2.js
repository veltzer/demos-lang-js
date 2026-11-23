var divResults;  // eslint-disable-line no-unused-vars -- teaching: exercise skeleton, the student's code uses it

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
