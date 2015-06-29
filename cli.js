#!/usr/bin/env node
'use strict';
var fs = require('fs');
var meow = require('meow');
var stripBomStream = require('strip-bom-stream');

var cli = meow({
	help: [
		'Usage',
		'  $ strip-bom <file> > <new-file>',
		'  $ cat <file> | strip-bom > <new-file>',
		'',
		'Example',
		'  $ strip-bom unicorn.txt > unicorn-without-bom.txt'
	]
});

var input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Expected a filename');
	process.exit(1);
}

if (input) {
	fs.createReadStream(input).pipe(stripBomStream()).pipe(process.stdout);
} else {
	process.stdin.pipe(stripBomStream()).pipe(process.stdout);
}
