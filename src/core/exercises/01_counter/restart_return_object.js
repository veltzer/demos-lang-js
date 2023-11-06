#!/usr/bin/env node
function make_iterator(start,step,stop) {
	var value=start-step;
	return {
		next:function() {
			value+=step;
			if(value>stop) {
				throw "wow man! too much for me...";
			} else {
				return value;
			}
		},
		reset: function() {
			value=start-step;
		}
	};
}
var iter=make_iterator(5,2,17);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
iter.reset();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
