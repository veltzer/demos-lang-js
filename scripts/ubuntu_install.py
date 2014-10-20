#!/usr/bin/python3

'''
this script will install all the required packages that you need on
ubuntu to compile and work with this package.
'''

import subprocess # for check_call

packs=[
	'libjs-jquery',
	'libjs-jquery-mobile',
	'libjs-prototype',
	'libjs-json',
	'libjs-raphael',
	'libjs-jquery-ui',
	'libjs-jquery-ui-docs',
	'libjs-jquery-ui-theme-ui-lightness',
	'libjs-dojo-core',
	'libjs-dojo-dijit',
	'libjs-dojo-dojox',
	'libjs-extjs',
	'libjs-extjs-doc',
	'libjs-yui',
	#'libjs-yui2',
	'libjs-yui-doc',
	'libjs-yui3-common',
	'libjs-yui3-debug',
	'libjs-yui3-doc',
	'libjs-yui3-full',
	'libjs-yui3-min',
	'yui-builder',
	'yui-compressor',
	'libjs-backbone',
	'libjs-mootools',
	'libjs-scriptaculous',
	'slimit',
	'shrinksafe',
	'closure-linter',
]

args=['sudo','apt-get','install','--assume-yes']
args.extend(packs)
subprocess.check_call(args)
