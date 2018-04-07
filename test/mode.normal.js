'use strict';

var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */
	, noda = require('noda')

    /* in-package */
    , shadowing = noda.inRequire('index')
	;

describe('mode normal', () => {
	it('falsy shadowing false', () => {
        assert(shadowing(0, false, 'normal'));
    });

    it('truthy shadowing true', () => {
        assert(shadowing(1, true, 'normal'));
    });

});