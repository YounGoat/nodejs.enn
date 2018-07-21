#!/usr/bin/env node

'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, commandos = require('commandos')
	, noda = require('noda')
	, table = require('piui/table')
	, sort = require('jinang/sort')
	
	/* in-package */
	, find = noda.inRequire('lib/find')
	;

function help() {
	console.log(noda.nextRead('help.txt', 'utf8'));
}

let cmd = commandos.parse({
	explicit: true,
	groups: [
		[ 
			'--help -h [*:=* help] REQUIRED', 
		], [
			'--name -n [0] NOT NULL REQUIRED'
		]
	],
	catcher: help
});

if (!cmd) {
	return;
}
else if (cmd.help) {
	return help();
}
else {
	let names = find(cmd);
	sort(names, 'name');
	table.print(names, {
		columns: [
			{ name: 'name', title: 'Name', size: 20 },
			{ name: 'gender', title: 'Gender', size: 6,  formatter: g => g == 'male' ? '\u2642' : '\u2640', align: 'center' },
		]
	});
}