#!/usr/bin/env node
function Person(iname,iage) {
	this.name=iname;
	this.age=iage;
}
Person.prototype.getName=function() {
	return this.name;
};
Person.prototype.setName=function(iname) {
	this.name=iname;
};
Person.prototype.getFullName=function() {
	return this.name+" "+this.age;
};
Person.prototype.printSelf=function() {
	console.log(this.getFullName());
};
Person.prototype.toString=function() {
	var s="";
	for(var key in this) {
		if(typeof(this[key])!="function") {
			s+=key+": "+this[key];
		}
	}
	return s;
};

// This is the client code
var p1=new Person("Bilbo",111);
p1.setName("Gandalf");
var p2=new Person("Frodo",33);
console.log(p1);
console.log(p2);
