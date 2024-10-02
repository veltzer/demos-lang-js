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
	throw new Error("this is the message");
	/* jshint ignore:start */
	console.log("after throwing the error, you should not get here"); // eslint-disable-line no-unreachable
	/* jshint ignore:end */
} catch(error) {
	console.error("An error occurred:", error.message);
}
