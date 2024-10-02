/*
	This is an example of a set implemented in javascript

	References:
	http://www.javascriptexamples.org/2011/01/17/how-to-implement-a-set-in-javascript/
*/
var MySet=function() {
	this.items={};
	for(var i in arguments) {
		this.add(arguments[i]);
	}
};
MySet.prototype.add=function(o) {
	this.items[o]=true;
};
MySet.prototype.remove=function(o) {
	delete this.items[o];
};
MySet.prototype.addObject=function(o) {
	for(var prop in o) {
		this.add(prop);
	}
};
MySet.prototype.removeObject=function(o) {
	for(var prop in o) {
		this.remove(prop);
	}
};
MySet.prototype.clear=function() {
	this.items={};
};
MySet.prototype.toString=function() {
	var a=[];
	for(var x in this.items) {
		a.push(x);
	}
	return a.join(",");
};
MySet.prototype.foreach=function(func) {
	for(var x in this.items) {
		func(x);
	}
};
