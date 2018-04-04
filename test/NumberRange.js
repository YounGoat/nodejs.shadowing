'use strict';

var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */
	, noda = require('noda')

	/* in-package */
	, NumberRange = noda.inRequire('NumberRange')
	;

describe('NumberRange', () => {
	it('single number', () => {
        let range = new NumberRange('80');
        assert( range.covers(80));
    });

    it('space seperated numbers', () => {
        let range = new NumberRange('80 8080');
        assert( range.covers(80));
        assert(!range.covers(443));
        assert( range.covers(8080));
    });

    it('comparator !=', () => {
        let range = new NumberRange('!=80');
        assert(!range.covers(80));
        assert( range.covers(21));
        assert( range.covers(443));
    });

    it('comparator >=', () => {
        let range = new NumberRange('>=1024');
        assert(!range.covers(80));
        assert( range.covers(1024));
        assert( range.covers(8080));
    });

    it('comparator <=', () => {
        let range = new NumberRange('<=1024');
        assert( range.covers(80));
        assert( range.covers(1024));     
        assert(!range.covers(8080));
    });

    it('comparator >', () => {
        let range = new NumberRange('>1024');
        assert(!range.covers(80));
        assert(!range.covers(1024));
        assert( range.covers(8080));
    });

    it('comparator <', () => {
        let range = new NumberRange('<1024');
        assert( range.covers(80));
        assert(!range.covers(1024));
        assert(!range.covers(8080));
    });

    it('comparator =', () => {
        let range = new NumberRange('=1024');
        assert( range.covers(1024));
        assert(!range.covers(80));
    });

    it('combined comparators', () => {
        let range = new NumberRange('>=7000 <=8000 !=7100');
        assert(!range.covers(6999));
        assert( range.covers(7000));
        assert(!range.covers(7100));
        assert( range.covers(8000));
        assert(!range.covers(8001));
        
	});
	
	it('tilde range', () => {
        let range = new NumberRange('7000~8000');
        assert(!range.covers(6999));
        assert( range.covers(7000));
        assert( range.covers(8000));
        assert(!range.covers(8001));
    });
    
    it('hyphen range', () => {
        let range = new NumberRange('7000-8000');
        assert(!range.covers(6999));
        assert( range.covers(7000));
        assert( range.covers(8000));
        assert(!range.covers(8001));
    });

    it('comma seperated range', () => {
        let range = new NumberRange('80,8080');
        assert( range.covers(80));
        assert(!range.covers(443));
        assert( range.covers(8080));
    });

    it('logical ||', () => {
        let range = new NumberRange('80 || 8080');
        assert( range.covers(80));
        assert(!range.covers(443));
        assert( range.covers(8080));
    });

    it('mixed numbers and comparators', () => {
		let range = new NumberRange('80 8080 >=9000');
		assert( range.covers(80));
        assert( range.covers(8080));
        assert( range.covers(9000));
    });

	it('decimal numbers', () => {
		let range = new NumberRange('80.1 80.2');
		assert( range.covers(80.1));
		assert(!range.covers(80));
		assert(!range.covers(80.3));
	});

	it('comparator >=, negative numbers', () => {
		let range = new NumberRange('>= -100');
		assert( range.covers(0));
		assert( range.covers(-99));
		assert( range.covers(-100));
		assert(!range.covers(-101));
		assert(!range.covers(-100.1));
	});

	it('tilde range, negative numbers', () => {
		let range = new NumberRange('-1~-10');
		assert( range.covers(-1));
		assert( range.covers(-10));
		assert( range.covers(-5));
		assert(!range.covers(0));
		assert(!range.covers(-11));
	});

	it('hyphen range, negative numbers', () => {
		let range = new NumberRange('-1--10');
		assert( range.covers(-1));
		assert( range.covers(-10));
		assert( range.covers(-5));
		assert(!range.covers(0));
		assert(!range.covers(-11));
    });
    
    it('up-down difference operator +/-', () => {
        let range = new NumberRange('87+/-1');
        assert(!range.covers(85));
        assert( range.covers(86));
        assert( range.covers(87));
        assert( range.covers(88));
        assert(!range.covers(89));
    });
});