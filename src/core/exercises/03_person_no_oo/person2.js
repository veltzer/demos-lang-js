#!/usr/bin/env node
function createPerson(iname,iage) {
	return {
		name: iname,
		age: iage,
		getName: function() {
			return this.name;
		},
		setName: function(iiname) {
			this.name=iiname;
		},
		getFullName: function() {
			return this.name+" "+this.age;
		},
		printSelf: function() {
			console.log(this.getFullName());
		}
	};
}
var p1=createPerson("Bilbo",111);
var p2=createPerson("Frodo",33);
p1.printSelf();
p2.printSelf();
