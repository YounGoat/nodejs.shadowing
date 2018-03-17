'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')

	/* in-package */
	, shadowing = noda.inRequire('.')
	;

/**
 * In each array:
 * [ 
 *   origin, 
 *   shadow, 
 *   shadowing(origin, shadow), 
 *   description,
 * ]
 */

module.exports = [
	[
		{ "linkman": { "gender": undefined } },
		{ "linkman": { "gender": shadowing.EXIST } },
		true,
		"shadowing.EXIST"
	],
	[
		[ 1 ],
		[ shadowing.or(1, true) ],
		true,
		"shadowing.or()"
	],
	[
		{ "gender": "m" },
		{ "gender": shadowing.and("m", new shadowing.Shadow(function(value) { return value.length == 1; })) },
		true,
		"shadowing.and()"
	],
	[
		{ "gender": "m" },
		shadowing.has("gender"),
		true,
		"shadowing.has()"
	],
	[
		{ "gender": "m" },
		shadowing.hasnot("gender"),
		false,
		"shadowing.hasnot()"
	],
	[
		{ "gender": "m" },
		shadowing.has("name"),
		false,
		"shadowing.has()"
	],
	[
		{ "gender": "m" },
		shadowing.hasnot("name"),
		true,
		"shadowing.hasnot()"
	],
	[
		{ "gender": "m", "name": { "first": "Ching", "last": "Chiang" } },
		{ "name": shadowing.has("first", "last") },
		true,
		"shadowing.has()"
	],
	[
		{ "gender": "m", "name": { "first": "Ching", "last": "Chiang" } },
		{ "name": shadowing.hasnot("first", "last") },
		false,
		"shadowing.hasnot()"
	],
	[
		{ "gender": "m", "name": { "first": "Ching", "last": "Chiang" } },
		{ "name": shadowing.has("middle") },
		false,
		"shadowing.hasnot()"
	],
	[
		{ "gender": "m", "name": { "first": "Ching", "last": "Chiang" } },
		{ "name": shadowing.hasnot("middle") },
		true,
		"shadowing.hasnot()"
	],
];
