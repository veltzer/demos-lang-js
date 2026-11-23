function init() {
	// var btnPressMe = document.getElementById("press_me");
}

function setStatus(status) {
	var divStatus = document.getElementById("divStatus");
	divStatus.innerHTML = status;
}

function addStatus(status) {
	var divStatus = document.getElementById("divStatus");
	divStatus.innerHTML += status + "<br>";
}

window.onload = init;

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { setStatus, addStatus });
