#!/usr/bin/env node
g_getName = function () {
	return this.name;
};
g_setName = function (iname) {
	this.name = iname;
};
g_getFullName = function () {
	return this.name + " " + this.age;
};
g_printSelf = function () {
	console.log(this.getFullName());
};

function createPerson (iname, iage) {
	return {
		name: iname,
		age: iage,
		getName: g_getName,
		setName: g_setName,
		getFullName: g_getFullName,
		printSelf: g_printSelf
	};
}
p1 = createPerson("Bilbo", 111);
p2 = createPerson("Frodo", 33);
p1.printSelf();
p2.printSelf();
