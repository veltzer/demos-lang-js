#!/usr/bin/env node
/*
	Exploration of global and local variable interaction in JavaScript.
*/
var i=7;
console.log(i);
function do_something() {
	console.log(i);
	i=9;
	console.log(i);
	var i; // oxlint-disable-line no-shadow -- teaching: the hoisted local var i shadows the global i, that is the lesson
	console.log(i);
	i=i+1;
	console.log(i);
}
do_something();
console.log(i);
