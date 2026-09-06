var current;
var clientDataSource; // eslint-disable-line no-unused-vars

function ClientDateSource(timestamp) { // eslint-disable-line no-unused-vars
	this.date = new Date(timestamp);
	this.timer = tick();
	this.constructor = init;
	init();
	function tick() {
		this.date.setMilliseconds(this.date.getMilliseconds() + 1000);
		current.innerHTML = this.date.getMilliseconds();
		return setTimeout(tick, 1000);
	}
	function setTime(timestamp) { // eslint-disable-line no-unused-vars
		this.date.setMilliseconds(timestamp);
	}
}

window.onload = function() {
	current = document.getElementById("current");
};
