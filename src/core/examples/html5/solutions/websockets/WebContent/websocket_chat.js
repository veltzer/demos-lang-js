
var taMessage;
var txtUserName;
var divChatMessages;
var divStatus;
var btnPressMe;
var jWebSocketClient;
var txtMessageTo;
var cbPrivate;
var users;
//var lastProcessedUsId;

function init() {
	btnPressMe = document.getElementById("press_me");
	btnPressMe.onclick = processSubmit;
	taMessage = document.getElementById("message");
	txtUserName = document.getElementById("user_name");
	txtMessageTo = document.getElementById("messageTo");
	cbPrivate = document.getElementById("private");
	divChatMessages = document.getElementById("chat-messagess");
	divStatus = document.getElementById("status");
	var url = "ws://localhost:8787/Chat";
	var browserInfo = getBrowserInfo();
	var chatUsername = browserInfo.product;
	var password = "password";

	txtUserName.value = chatUsername;
	taMessage.value = browserInfo.product + " " + browserInfo.version;

	users = [];

	if( jws.browserSupportsWebSockets() ) {
		jWebSocketClient = new jws.jWebSocketJSONClient();
		var logonResult = jWebSocketClient.logon( url, chatUsername, password, {
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
			setStatus("No user found!");
			addStatus("Token: " + JSON.stringify(wsToken));
		}
	}
}

function connectionOpened(wsEvent) {
	setStatus("Connection opened: " + wsEvent.data);
}

function connectionClosed(wsEvent) {
	if(jWebSocketClient) {
		jWebSocketClient.close();
	}
	setStatus("Connection closed: " + wsEvent.data);
}


function processSubmit() {
	/* Enter WebSocket Code Here */
	var message = taMessage.value;
	var user_name = txtUserName.value;

	var messageToken = {
		ns: "nextgened.chat",
		messageType: "chatMessage"
	};
	messageToken.message = message;
	messageToken.user = {};
	messageToken.user.user_name = user_name;

	if (cbPrivate.checked) {
		setStatus("Private Messages not supported yet!");
		return;
	} else {
		jWebSocketClient.broadcastToken( messageToken, {
			OnResponse: function( responseToken ) {
				setStatus("Server responded: " + "vendor: " + responseToken.vendor +
					", version: " + responseToken.version
				);
				processMessage(null, responseToken);
			}
		});
		setStatus("Message sent: " + JSON.stringify(messageToken));
	}
	return false; // Prevent actual form submission
}

function getBrowserInfo() {
	var browserInfo = {};
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


