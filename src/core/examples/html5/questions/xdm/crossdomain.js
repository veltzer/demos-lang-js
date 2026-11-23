function init() {
	// var btnPressMe = document.getElementById("press_me");
}

function setStatus(status) {
	var divStatus = document.getElementById("status");
	divStatus.innerHTML = status;
}

function addStatus(status) {
	var divStatus = document.getElementById("status");
	divStatus.innerHTML += status + "<br>";
}

function addMessage(message) {
	var divChatMessages = document.getElementById("divChatMessages");
	divChatMessages.innerHTML += "Inner Frame says: " + message + "<br>";
}

window.onload = init;

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { setStatus, addStatus, addMessage });
