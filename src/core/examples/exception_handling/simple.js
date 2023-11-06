#!/usr/bin/env node
/*
 * This is a simple example of exception handling in javascript
 *
 * What we can see:
 * - console.*** has various methods to emit logs of various degrees of importance. Have a loot at that.
 * - You can throw anything but try to throw things derived from Error.
 * - You can access the messages accompanying the error using error.message.
 */
try {
	console.log("before throwing the error");
	throw new Error("this is the message")
	console.log("after throwing the error");
} catch(error) {
	console.error("An error occurred:", error.message);
}
