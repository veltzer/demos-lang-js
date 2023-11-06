#!/usr/bin/env node
function make_iterator(start,step,stop) {
	var value=start-step;
	return function() {
		if(arguments.length>0) {
			value=start-step;
			return undefined;
		} else {
			value+=step;
			if(value>stop) {
				throw "wow man! too much for me...";
			} else {
				return value;
			}
		}
	};
}
var iter=make_iterator(5,2,17);
console.log(iter());
console.log(iter());
console.log(iter());
console.log(iter());
iter(null);
console.log(iter());
console.log(iter());
console.log(iter());
console.log(iter());
