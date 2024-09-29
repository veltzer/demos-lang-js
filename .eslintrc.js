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
	"no-unused-vars": ["error", {
		"argsIgnorePattern": "^_",
		"varsIgnorePattern": "^_",
		"caughtErrorsIgnorePattern": "^_"
	}],
	"no-empty": ["error", { "allowEmptyCatch": true }]
    },
    globals: {
	    "$": "readonly",
	    "dojo": "readonly",
	    "dijit": "readonly"
    }
};
