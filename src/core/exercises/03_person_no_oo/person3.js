#!/usr/bin/env node
const g_getName = function () {
	return this.name
}
const g_setName = function (iname) {
	this.name = iname
}
const g_getFullName = function () {
	return this.name + " " + this.age
}
const g_printSelf = function () {
	console.log(this.getFullName())
}

function createPerson (iname, iage) {
	return {
		name: iname,
		age: iage,
		getName: g_getName,
		setName: g_setName,
		getFullName: g_getFullName,
		printSelf: g_printSelf
	}
}
const p1 = createPerson("Bilbo", 111)
const p2 = createPerson("Frodo", 33)
p1.printSelf()
p2.printSelf()
