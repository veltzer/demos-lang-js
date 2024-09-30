var btnPressMe, btnScreenShot;
var video;
var canvas;
var context;

function init() {
	btnPressMe = document.getElementById("press_me");
	btnPressMe.onclick = processSubmit;

	btnScreenShot = document.getElementById("button_screen_shot");
	btnScreenShot.onclick = takeScreenShot;

	video = document.getElementById("my_video");
	canvas = document.getElementById("my_canvas");
	context = canvas.getContext("2d");
}

function processSubmit() {
	/* Enter Video Code Here */
	toggleSound();
	return false; // Prevent actual form submission
}

function toggleSound() {
	if (video.paused) {
		video.play();
		btnPressMe.innerHTML = "Pause";
	} else {
		video.pause();
		btnPressMe.innerHTML ="Play";
	}
}

function takeScreenShot() {
	//context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
	//context.translate(-100,100);
	context.drawImage(video, 0, 0, 300, 200);
	//context.translate(+100,-100);
}

window.onload = init;

