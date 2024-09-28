#!/usr/bin/env node
/*
	Clean Javascript OO example...
*/
/*
Alternate syntax:
Person=function(name,lastname) {
	this.name=name;
	this.lastname=lastname;
}
*/
function Person(name,lastname) {
	this.name=name;
	this.lastname=lastname;
}
Person.prototype.getName=function() {
	return this.name;
};
Person.prototype.setName=function(newName) {
	this.name=newName;
};
Person.prototype.getLastname=function() {
	return this.lastname;
};
Person.prototype.setLastname=function(newName) {
	this.lastname=newName;
};
Person.prototype.toString=function() {
	return this.name+" "+this.lastname;
};
// now lets use the object...
var p1=new Person("James","Bond");
console.log(p1 instanceof Person);
console.log(p1.getName());
p1.setName("Fubar");
console.log(p1.getName());
