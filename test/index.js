'use strict';

var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */
	, noda = require('noda')

	/* in-package */
	, shadowing = noda.inRequire('.')
	;

let unitGroups = {
	basic: 'Basic usage',
	array: 'Shadow of arrays',
	operator: 'Logic operators',
	extrem: 'Extrem cases'
};

console.log('  The operator ">>>" means the left-value shadowing the right one.');

for (var name in unitGroups) {
	describe(unitGroups[name], () => {
		require('./example/' + name).forEach((unit) => {
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
