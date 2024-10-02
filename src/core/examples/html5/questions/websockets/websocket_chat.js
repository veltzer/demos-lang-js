/*global jws*/
var taMessage;
var txtUserName;
var divChatMessages;
var divStatus;
var btnPressMe;
var jWebSocketClient;
var cbPrivate;
var users;
//var lastProcessedUsId;

function init() {
	btnPressMe = document.getElementById("press_me");
	btnPressMe.onclick = processSubmit;
	taMessage = document.getElementById("message");
	txtUserName = document.getElementById("user_name");
	//var txtMessageTo = document.getElementById("message_to");
	cbPrivate = document.getElementById("private");
	divChatMessages = document.getElementById("chat-messagess");
	divStatus = document.getElementById("status");
	var url = "ws://localhost:8787/Chat";
	var browserInfo = getBrowserInfo();
	var chatUsername = browserInfo.product;
	var password = "password";

	txtUserName.value = chatUsername;
	taMessage.value = browserInfo.product + " " + browserInfo.version;

	users = new Array();

	if(jws.browserSupportsWebSockets()) {
		jWebSocketClient = new jws.jWebSocketJSONClient();
		var _logonResult = jWebSocketClient.logon( url, chatUsername, password, {
			// OnOpen callback
			OnOpen: connectionOpened,
			// OnMessage callback
			OnMessage: processMessage,
			// OnClose callback
			OnClose: connectionClosed
		});
	} else {
		setStatus("Web Sockets NOT supported!");
		btnPressMe.disabled = true;
	}
}

function setStatus(status) {
	divStatus.innerHTML = status;
}

function addStatus(status) {
	divStatus.innerHTML += status;
}

function addMessage(chatMessage) {
	divChatMessages.innerHTML += chatMessage.user.user_name + ": " + chatMessage.message + "<br>";
}

function processMessage(wsEvent, wsToken) {
	setStatus("Got message: " + wsEvent.data);
	// For some reason were getting double messages. Ignore the second one.
//	if (wsEvent.timeStamp == lastProcessedUsId) {
//		addStatus("Ignoring second copy...");
//		return;
//	}
//	lastProcessedUsId = wsEvent.timeStamp;
	var chatMessage = wsToken;
	if (chatMessage.user) {
		users[wsToken.sourceId] = chatMessage.user.user_name	;
		addMessage(chatMessage);
	} else {
		if (wsToken.reqType && wsToken.reqType == "login") {
			setStatus(wsToken.username + " has entered the chat.");
			users[wsToken.sourceId] = wsToken.username;
			return;
		} else if (wsToken.name && wsToken.name == "disconnect") {
			setStatus(users[wsToken.sourceId] + " has disconnected.");
		} else {
			setStatus("No user found!")
			addStatus("Token: " + JSON.stringify(wsToken));
		}
	}
}

function connectionOpened(wsEvent) {
	setStatus("Connection opened: " + wsEvent.data);
}

function connectionClosed(wsEvent) {
	if( jWebSocketClient ) {
		jWebSocketClient.close();
	}
	setStatus("Connection closed: " + wsEvent.data);
}


function processSubmit() {
	/* Enter WebSocket Code Here */
	var message = taMessage.value;
	var user_name = txtUserName.value;

	var message_token = {
		ns: "nextgened.chat",
		messageType: "chatMessage"
	};
	message_token.message = message;
	message_token.user = new Object();
	message_token.user.user_name = user_name;

	if (cbPrivate.checked) {
		setStatus("Private Messages not supported yet!");
		return;
	} else {
		jWebSocketClient.broadcastToken( message_token, {
			OnResponse: function( responseToken ) {
				setStatus("Server responded: "
					+ "vendor: " + responseToken.vendor
					+ ", version: " + responseToken.version
				);
				processMessage(null, responseToken);
			}
		});
		setStatus("Message sent: " + JSON.stringify(message_token));
	}
	return false; // Prevent actual form submission
}

function getBrowserInfo() {
	var browserInfo = new Object();
	var agent = navigator.userAgent;
	if (agent.match(/Chrome/)) {
		browserInfo.product = "Chrome";
		browserInfo.version = agent.replace(/^(.*) Chrome\/(.*) (.*)/, "$2");
	} else if (agent.match(/Opera/)) {
		browserInfo.product = "Opera";
		browserInfo.version = agent.replace(/^(.*) Version\/(.*)/, "$2");
	} else {
		agent = agent.replace(/^(.*) (.*)$/, "$2");
		browserInfo.product = agent.replace(/^(.*)\/(.*)$/, "$1");
		browserInfo.version = agent.replace(/^(.*)\/(.*)$/, "$2");
	}
	return browserInfo;
}

window.onload = init;


