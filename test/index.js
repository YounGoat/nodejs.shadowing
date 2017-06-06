'use strict';

var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */
	
	/* in-package */
	, shadowing = require('..')
	;

console.log('> The operator ">>>" means the left-value shadowing the right one.');

let units = {
	'Basic usage': [
		/**
		 * [ origin, shadow, true/false, desc ]
		 */
		[
 			{ linkman: { gender: 'm' }, city: 'Shanghai' },
 			{ linkman: { gender: 'm' } },
 			true,
 			'YES'
 		],
 		[
 			{ gender: 'm' },
 			{ gender: 'f' },
 			false,
 			'NO'
 		]
	],

	'Shadow of arrays': [
		[
			[ 1, 2, 3 ],
			[ 1 ],
			true,
			'Array FOO >>> BAR if FOO contains all items of BAR'
		],
		[
			[ 1, 2, 3 ],
			[ 4 ],
			false,
			'Arrry FOO not >>> BAR if BAR has item(s) not *shadowed* by any item of FOO'
		],
		[
			[ { gender: 'm' }, { gender: 'f' } ],
			[ { gender: 'f' } ],
			true,
			'Array FOO >>> BAR if for each item of BAR, there is some item(s) of FOO >>> it'
		]
	],

	'Logic operators': [
		[
			{ linkman: { gender: undefined } },
			{ linkman: { gender: shadowing.EXIST } },
			true,
			'shadowing.EXIST'
		],
		[
			[ 1 ],
			[ shadowing.or(1, true) ],
			true,
			'shadowing.or()'
		],
		[
			{ gender: 'm' },
			{ gender: shadowing.and('m', new shadowing.Shadow(function(value) { return value.length == 1; })) },
			true,
			'shadowing.and()'
		]
	],

	'Extrem cases': [
		[
			{},
			{},
			true,
			'empty objects >>> each other'
		],
		[
			{ gender: 'm' },
			{},
			true,
			'Non-empty object >>> an empty one'
		],
		[
			null,
			{},
			false,
			'null not >>> an empty object'
		],
		[
			{},
			null,
			false,
			'an empty object not >>> null either'
		],
		[
			null,
			null,
			true,
			'null >>> each other'
		],
		[
			undefined,
			{},
			false,
			'undefined not >>> an empty object'
		],
		[
			{},
			undefined,
			false,
			'an empty object not >>> undefined either'
		],
		[
			undefined,
			undefined,
			true,
			'undefined >>> each other'
		]
	]
}

for (var name in units) {
	describe(name, () => {
		units[name].forEach((unit) => {
			var origin = unit[0];
			var shadow = unit[1];
			var ret    = unit[2];
			var desc   = unit[3];

			it(desc, () => {
				assert.equal(ret, shadowing(origin, shadow));
			});
		});
	});
}
