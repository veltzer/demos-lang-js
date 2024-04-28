#!/usr/bin/env node

async function* foo() {
	yield 1;
	console.log("after 1");
	yield 2;
	console.log("after 2");
}

(async function () {
	for await (const num of foo()) {
		console.log(num);
		//break;
	}
})();
