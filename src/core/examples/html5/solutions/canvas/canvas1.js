function init() {
	var btnPresMe = document.getElementById("press_me");
	btnPresMe.onclick = processSubmit;
}

function processSubmit() {
	/* Enter Canvas Code Here */
	var cnvMyCanvas = document.getElementById("my_canvas");
	var context = cnvMyCanvas.getContext("2d");

	context.beginPath();
	context.moveTo(50, 50);
	context.lineTo(350, 50);
	context.lineWidth = 16;
	context.strokeStyle = "#f42305";
	context.lineTo(350, 100);
	context.lineJoin = "round";
	context.stroke();
}

window.onload = init;
