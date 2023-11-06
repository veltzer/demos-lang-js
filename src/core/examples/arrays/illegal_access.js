#!/usr/bin/env node
/*
	This fragment shows that we can access an array in
	yet unassigned position and get undefined as a result

	Mark Veltzer <mark.veltzer@gmail.com>
*/
var foo=[];
var t=foo[8];
console.log(t);
