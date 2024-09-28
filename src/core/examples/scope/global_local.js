#!/usr/bin/env node
/*
	Exploration of global and local variable interaction in JavaScript.
*/
/*jsl:ignore*/
var i=7;
console.log(i);
function do_something() {
	console.log(i);
	i=9;
	console.log(i);
	var i;
	console.log(i);
	i=i+1;
	console.log(i);
}
do_something();
console.log(i);
/*jsl:end*/
