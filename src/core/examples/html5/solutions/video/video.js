var btnPressMe;
var video;
function init() {
	btnPressMe=document.getElementById("press_me");
	btnPressMe.onclick=processSubmit;
	video=document.getElementById("my_video");
}
function processSubmit() {
	/* Enter Video Code Here */
	toggleSound();
	return false; // Prevent actual form submission
}
function toggleSound() {
	if (video.paused) {
		video.play();
		btnPressMe.innerHTML="Pause";
	} else {
		video.pause();
		btnPressMe.innerHTML="Play";
	}
}
window.onload=init;
