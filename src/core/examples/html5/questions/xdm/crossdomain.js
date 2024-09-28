function init() {
	// var btnPressMe = document.getElementById("pressMe");
}

function setStatus(status) { // eslint-disable-line no-unused-vars
	var divStatus = document.getElementById("status");
	divStatus.innerHTML = status;
}

function addStatus(status) { // eslint-disable-line no-unused-vars
	var divStatus = document.getElementById("status");
	divStatus.innerHTML += status + "<br>";
}

function addMessage(message) { // eslint-disable-line no-unused-vars
	var divChatMessages = document.getElementById("divChatMessages");
	divChatMessages.innerHTML += "Inner Frame says: " + message + "<br>";
}

window.onload = init;
