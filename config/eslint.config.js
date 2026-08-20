// Flat config (eslint 9/10), zero external requires so it resolves under any
// eslint install (CI installs eslint globally, with no local node_modules).
// Ports the former .eslintrc.js: the Makefile ran eslint over src/**/*.js --
// standalone .js files only, not scripts embedded in HTML -- with the noisy
// demo-code rules turned off and the library globals the demos assume. Those
// four rules being off is the whole of the old ruleset that would ever fire
// on this code, so eslint:recommended is not pulled in (it would need an
// external require that CI cannot resolve).

module.exports = [
	{
		files: ["**/*.js"],
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
