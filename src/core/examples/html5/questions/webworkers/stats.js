function messageHandler(event) { // eslint-disable-line no-unused-vars
}

function errorHandler(event) { // eslint-disable-line no-unused-vars
}

function updateData(data) { // eslint-disable-line no-unused-vars
	postMessage(data);
}

function init() { // eslint-disable-line no-unused-vars
	trigger();
	updateData( {
		message : "Init",
		timestamp : new Date()
	});
}

function trigger() { // eslint-disable-line no-unused-vars
}
