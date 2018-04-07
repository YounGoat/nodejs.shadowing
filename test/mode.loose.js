'use strict';

var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */
	, noda = require('noda')

    /* in-package */
    , shadowing = noda.inRequire('index')
	;

describe('mode loose', () => {
	it('number shadowing NumberRange string', () => {
        assert(shadowing(87, '80,87', 'loose'));
    });

    it('loose for array item', () => {
        assert(shadowing([87], ['80,87'], 'loose'));
    });

    it('loose for object property', () => {
        assert(shadowing({ ad: 87 }, { ad: '80,87' }, 'loose'));
    });
});