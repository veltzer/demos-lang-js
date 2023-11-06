#!/usr/bin/env node
/*
	This is a simple example of sleeping and then doing something in javascript
	in three different ways:
	- traditional
	- with async promises
	- with async await
*/
function f1() {
	console.log("f1");
	setTimeout(function() {
		console.log("f1-late");
	}, 3000);
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
function resolution(r) {
	setTimeout(r, 1000);
}
function more_explicit_sleep() {
	return new Promise(resolution);
}
function f2() {
	console.log("f2");
	// const p = sleep(3000);
	const p = more_explicit_sleep();
	p.then(() => {
		console.log("f2-late");
	});
}
async function f3() {
	console.log("f3");
	await sleep(3000);
	console.log("f3-after")
}
function f4() {
	f3().then((v) => { console.log("foo"+v); });
}
async function double_sleep() {
	// the following two lines are exactly the same
	return sleep(3000).then(() => sleep(3000));
	return sleep(3000).then(function() { return sleep(3000); });
}
function f5() {
	double_sleep().then(() => { console.log("bar"); });
}
f1()
f2()
f3()
f4()
f5()
