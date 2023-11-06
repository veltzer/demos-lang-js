#!/usr/bin/env node
function make_iterator(start,step,stop) {
	var value=start-step;
	var func=function() {
		value+=step;
		if(value>stop) {
			throw "wow man! too much for me...";
		} else {
			return value;
		}
	};
	func.restart=function() {
		value=start-step;
	};
	return func;
}
var iter=make_iterator(5,2,17);
console.log(iter());
console.log(iter());
console.log(iter());
console.log(iter());
iter.restart();
console.log(iter());
console.log(iter());
console.log(iter());
console.log(iter());
