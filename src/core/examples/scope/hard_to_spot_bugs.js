#!/usr/bin/env node
/*
	This example shows that dynamic languages like JavaScript can
	produce very hard to spot bugs...
*/
function plusOneOf(myFirstArgument) {
	myFirstArgment=myFirstArgument+1;
	return myFirstArgument;
}
console.log(plusOneOf(5))
console.log(myFirstArgment)
console.log(plusOneOf(6))
console.log(myFirstArgment)
