#!/usr/bin/env node
function createPerson (iname, iage) {
	return {
		name: iname,
		age: iage,
		getName: createPerson.getName,
		setName: createPerson.setName,
		getFullName: createPerson.getFullName,
		printSelf: createPerson.printSelf,
		toString: createPerson.toString
	};
}
createPerson.getName = function () {
	return this.name;
};
createPerson.setName = function (iname) {
	this.name = iname;
};
createPerson.getFullName = function () {
	return this.name + " " + this.age;
};
createPerson.printSelf = function () {
	console.log(this.getFullName());
};
createPerson.toString = function () {
	var s = "";
	for (var key in this) {
		if (typeof (this[key]) !== "function") {
			s += key + ": " + this[key] + "\n";
		}
	}
	return s;
};

// This is the client code
p1 = createPerson("Bilbo", 111);
p2 = createPerson("Frodo", 33);
console.log("" + p1);
console.log("" + p2);
