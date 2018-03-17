'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
	/* NPM */
	, papply = require('jinang/papply')
    
    /* in-package */

    /* in-file */
    , coverFn = {
        '!=': (rangePort, realPort) => realPort != rangePort,
        '>=': (rangePort, realPort) => realPort >= rangePort,
        '<=': (rangePort, realPort) => realPort <= rangePort,
        '>' : (rangePort, realPort) => realPort >  rangePort,
        '<' : (rangePort, realPort) => realPort <  rangePort,
        '=' : (rangePort, realPort) => realPort == rangePort,
    }
    ;

function NumberRange(rangeCode) {
    if (rangeCode instanceof NumberRange) return rangeCode;

    const reNumber = /^(\+|-)?\d+(\.\d*)?$/;
    const orRangeJudgers = [];
    
    // First level seperators include '||' and ','.
    rangeCode.trim().split(/\|\||,/).forEach((code) => {
        code = code.trim()
            // Remove spaces between operator and number.
            .replace(/([!>=<])\s+/g, '$1')
            // Remove spaces between range connector and numbers.
            .replace(/\s*~\s*/g, '~')
            ;

        let fns = [];
        let parts = code.split(/\s+/);
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            let ex = new Error(`Invalid number range code: ${part}`);

            // ---------------------------
            // Just number.

            if (reNumber.test(part)) {
                orRangeJudgers.push(part);
                continue;
            }

            // ---------------------------
            // One number expression.

            let comparator = null;
            [ '!=', '>=', '<=', '>', '<', '=' ].every(sign => {
                if (part.startsWith(sign)) {
                    comparator = sign;
                }
                return !comparator;
            });

            if (comparator) {
                let numcode = part.substr(comparator.length);

                // If there is an explicit comparator, 
                // the following SHOULD be a valid number.
                if (!reNumber.test(numcode)) throw ex;

                fns.push(papply(coverFn[comparator], parseFloat(numcode)));
                continue;
            }

            // ---------------------------
            // Two number expression.
            
            let n = part.indexOf('~');
            
            // If tilde not found, try hyphen.
            if (n == -1) {
                n = part.indexOf('-', 1);
            }

            if (n > 0) {
                let left  = part.slice(0, n);
                let right = part.slice(n + 1);
                if (!reNumber.test(left) || !reNumber.test(right)) {
                    throw ex;
                }
                let interval = [ parseFloat(left), parseFloat(right) ]
                    .sort((a, b) => a > b);
                fns.push(
                    // This is an IIFE and the return value is an array function.
                    ( (a, b) => /*return*/ num => num >= a && num <= b )
                    .apply(null, interval)
                );
                continue;
            }

            // ---------------------------
            // Others.
            throw ex;
        }
        if (fns.length) {
            orRangeJudgers.push(fns);
        }
    });

    Object.assign(this, { orRangeJudgers, cursor: 0 });
}

/**
 * Whether the range covers the port.
 * @param  {string|number} port
 * @return boolean
 */
NumberRange.prototype.covers = function(port) {
    let found = false;
    // .every() used to iterate the array until the first false returned.
    this.orRangeJudgers.every(judger => {
        if (judger instanceof Array) {
            let matched = true;
            // Cease on not matched.
            judger.every(fn => matched = fn(port));
            found = matched;
        }
        else {
            found = (judger == port);
        }
        // Cease on found.
        return !found;
    });
    return found;
};

module.exports = NumberRange;