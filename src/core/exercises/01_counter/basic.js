#!/usr/bin/env node
function make_iterator(start,step,stop) {
	var value=start-step;
	return function() {
		value+=step;
		if(value>stop) {
			throw "wow man! too much for me...";
		} else {
			return value;
		}
	};
}
var iter=make_iterator(5,2,17);
while(true) { // eslint-disable-line no-constant-condition
	console.log(iter());
}
