#!/usr/bin/env node
/*
	Flyweight design pattern in JavaScript
*/

function Person() {
	Person.prototype.count++;
}
Person.prototype.count=0;
Person.prototype.name="Bilbo";
Person.prototype.age=111;
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
console.log("number of persons is "+Person.prototype.count);
var p1=new Person();
console.log(p1);
p1.setName("Frodo");
p1.setAge(33);
var p2=new Person();
console.log(p1);
console.log(p2);
console.log("number of persons is "+Person.prototype.count);
console.log("lets see if we can do this "+p1.count);
