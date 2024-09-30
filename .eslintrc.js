module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
	"node": true
	},
	"extends": [
		"eslint:recommended",
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	plugins: ["html"],
	"rules": {
	// "html/indent": ["error", 2],
	/*
	"no-unused-vars": ["error", {
		"argsIgnorePattern": "^_",
		"varsIgnorePattern": "^_",
		"caughtErrorsIgnorePattern": "^_"
	}],
	*/
	"no-unused-vars": "off",
	// "no-empty": ["error", { "allowEmptyCatch": true }]
	"no-empty": "off",
	"no-undef": "off",
	},
	globals: {
		"$": "readonly",
		"dojo": "readonly",
		"dijit": "readonly",
		"Ext": "readonly",
		"Raphael": "readonly"
	}
};
