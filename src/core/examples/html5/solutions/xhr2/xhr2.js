var divResults;

function init() {
	var btnPresMe = document.getElementById("press_me");
	divResults = document.getElementById("results");
	btnPresMe.onclick = processSubmit;
}

function processSubmit() {
	/* Enter XHR2 Code Here */
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "Date.jsp", true);
	if (typeof xhr.onload != "undefined") {
		xhr.onload = function(_e) {
			divResults.innerHTML = JSON.parse(xhr.responseText);
		};
		xhr.onerror = function(_e) {
			divResults.innerHTML = "<span class=\"error\">" + JSON.parse(xhr.responseText) + "</span>";
		};
	} else {
		xhr.onreadystatechange = function(_e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					divResults.innerHTML = JSON.parse(xhr.responseText);
				} else if (xhr.status == 500) {
					divResults.innerHTML = "<span class=\"error\">" + JSON.parse(xhr.responseText) + "</span>";
				}
			}
		};
	}
	xhr.send(null);
	
	return false; // Prevent actual form submission
}

window.onload = init;
