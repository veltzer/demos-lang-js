function messageHandler(event) { // oxlint-disable-line no-unused-vars -- teaching: exercise stub, the student writes the body that uses it
}

function errorHandler(event) { // oxlint-disable-line no-unused-vars -- teaching: exercise stub, the student writes the body that uses it
}

function updateData(data) {
	postMessage(data);
}

function init() {
	trigger();
	updateData( {
		message : "Init",
		timestamp : new Date()
	});
}

function trigger() {
}

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { messageHandler, errorHandler, init });
