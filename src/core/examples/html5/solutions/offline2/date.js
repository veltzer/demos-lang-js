// A clock that starts from the server's time (date.jsp writes it into
// #current) and keeps counting in the browser, so the page still shows the
// time while offline.
window.onload = function() {
	var current = document.getElementById("current");
	var date = new Date(Number(current.textContent) || Date.now());
	setInterval(function() {
		date.setSeconds(date.getSeconds() + 1);
		current.textContent = date.toString();
	}, 1000);
};
