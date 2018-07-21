'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, namedb = noda.inRequire('database')
	;

function find(options) {
	let filters = [];

	if (options.name !== undefined) {
		if (typeof options.name == 'string' && /^[a-zA-Z*?]+$/.test(options.name)) {
			let re = options.name
				.toLowerCase()
				.replace(/\?/g, '[a-z]')
				.replace(/\*/g, '[a-z]+')
				;
			re = new RegExp('^' + re + '$', 'i');
			filters.push(info => re.test(info.name));
		}
		else if (options.name instanceof RegExp) {
			filters.push(info => options.name.test(info.name));
		}
		else {
			throw new Error('options.name should be a string with or without wildcard *?, or a regular expression objects');
		}
	}

	if (options.gender !== undefined) {
		filters.push(info => info.gender == options.gender);
	}

	let matcher = info => filters.every(filter => filter(info));
	
	return namedb.filter(matcher);
}

module.exports = find;