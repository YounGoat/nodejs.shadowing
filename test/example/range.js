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
		{ "age": 18 },
		{ "age": shadowing.numberRange('>=18') },
		true,
		"shadowing.numberRange"
	],
	[
		{ "height": 176.5 },
		{ "height": shadowing.numberRange('<=180 >=170') },
		true,
		"shadowing.numberRange"
	],
	[
		'99',
		shadowing.numberRange('90-120'),
		true,
		"shadowing.numberRange"
	]
];
