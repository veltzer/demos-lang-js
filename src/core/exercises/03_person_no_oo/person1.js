#!/usr/bin/env node
var person1={
	name: "Bilbo",
	age: 111,
	getName: function() {
		return this.name;
	},
	setName: function(iname) {
		this.name=iname;
	},
	getFullName: function() {
		return this.name+" "+this.age;
	},
	printSelf: function() {
		console.log(this.getFullName());
	}
};
var person2={
	name: "Frodo",
	age: 33,
	getName: function() {
		return this.name;
	},
	setName: function(iname) {
		this.name=iname;
	},
	getFullName: function() {
		return this.name+" "+this.age;
	},
	printSelf: function() {
		console.log(this.getFullName());
	}
};
person1.printSelf();
person2.printSelf();
