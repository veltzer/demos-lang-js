#!/usr/bin/python

# this script will install all the required packages that you need on
# ubuntu to compile and work with this package.

import subprocess # for check_call
import urllib2 # for urlopen
import os # for mkdir
import os.path # for isdir, isfile

def download(url,output_file):
	if not os.path.isfile(output_file):
		opener = urllib2.build_opener()
		opener.addheaders = [('User-agent', 'Mozilla/5.0')]
		response = opener.open(url)
		f=open(output_file,'w')
		f.write(response.read())
		f.close()

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
]

args=['sudo','apt-get','install']
args.extend(packs)
subprocess.check_call(args)

# now install stuff which is not in the ubuntu store...

if not os.path.isdir('download'):
	os.mkdir('download')

download('http://code.highcharts.com/zips/Highcharts-3.0.5.zip', 'download/Highcharts-3.0.5.zip')
download('http://cdn.sencha.com/ext/gpl/ext-4.2.1-gpl.zip', 'download/ext-4.2.1-gpl.zip') 
