#!/usr/bin/env node
/*
	This example shows that dynamic languages like JavaScript can
	produce very hard to spot bugs...
*/
function plusOneOf(myFirstArgument) {
	myFirstArgment=myFirstArgument+1; // eslint-disable-line no-undef -- the typo'd global is this lesson's bug
	return myFirstArgument;
}
console.log(plusOneOf(5));
console.log(myFirstArgment); // eslint-disable-line no-undef -- the typo'd global is this lesson's bug
console.log(plusOneOf(6));
console.log(myFirstArgment); // eslint-disable-line no-undef -- the typo'd global is this lesson's bug
