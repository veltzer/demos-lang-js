function init() {
	// var btnPressMe = document.getElementById("press_me");
}

function setStatus(status) { // eslint-disable-line no-unused-vars
	var divStatus = document.getElementById("divStatus");
	divStatus.innerHTML = status;
}

function addStatus(status) { // eslint-disable-line no-unused-vars
	var divStatus = document.getElementById("divStatus");
	divStatus.innerHTML += status + "<br>";
}

window.onload = init;
