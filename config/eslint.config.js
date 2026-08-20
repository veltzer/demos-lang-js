// Flat config (eslint 9/10). Ports the former .eslintrc.js: lint the demo
// JavaScript, including scripts embedded in HTML, with the recommended ruleset
// but the noisy demo-code rules turned off, and the library globals the demos
// assume declared. The Makefile ran `eslint` over src/**/*.js with the old
// .eslintrc.js; this reproduces that under the flat-config format eslint now
// requires.

const js = require("@eslint/js");
const html = require("eslint-plugin-html");

module.exports = [
	js.configs.recommended,
	{
		files: ["**/*.js", "**/*.html"],
		plugins: {html},
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			globals: {
				window: "readonly",
				document: "readonly",
				console: "readonly",
				$: "readonly",
				dojo: "readonly",
				dijit: "readonly",
				Ext: "readonly",
				Raphael: "readonly",
			},
		},
		rules: {
			"no-empty": "off",
			"no-unused-vars": "off",
			"no-undef": "off",
			"no-prototype-builtins": "off",
		},
	},
];
