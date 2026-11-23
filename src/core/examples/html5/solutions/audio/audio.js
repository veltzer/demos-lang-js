function init() {
}

function processSubmit() {

	return false; // Prevent actual form submission
}

window.onload = init;

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { processSubmit });
