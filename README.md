#     shadowing
__Light-weighted object/array analyse tool.__

[![total downloads of shadowing](https://img.shields.io/npm/dt/shadowing.svg)](https://www.npmjs.com/package/shadowing)
[![shadowing's License](https://img.shields.io/npm/l/shadowing.svg)](https://www.npmjs.com/package/shadowing)
[![latest version of shadowing](https://img.shields.io/npm/v/shadowing.svg)](https://www.npmjs.com/package/shadowing)
[![coverage status of github.com/YounGoat/nodejs.shadowing](https://coveralls.io/repos/github/YounGoat/nodejs.shadowing/badge.svg?branch=master)](https://coveralls.io/github/YounGoat/nodejs.shadowing2?branch=master)
[![dependencies of github.com/YounGoat/nodejs.shadowing](https://david-dm.org/YounGoat/nodejs.shadowing/status.svg)](https://david-dm.org/YounGoat/nodejs.shadowing)
[![devDependencies of github.com/YounGoat/nodejs.shadowing](https://david-dm.org/YounGoat/nodejs.shadowing/dev-status.svg)](https://david-dm.org/YounGoat/nodejs.shadowing?type=dev)
[![build status of github.com/YounGoat/nodejs.shadowing](https://travis-ci.org/YounGoat/nodejs.shadowing.svg?branch=master)](https://travis-ci.org/YounGoat/nodejs.shadowing)
[![star github.com/YounGoat/nodejs.shadowing](https://img.shields.io/github/stars/YounGoat/nodejs.shadowing.svg?style=social&label=Star)](https://github.com/YounGoat/nodejs.shadowing/stargazers)

##  Description

__shadowing__ offers an easy way to judge whether the object / array / string / number is what you want.

![Shadowing Logo](./docs/assets/logo.png)

##	Table of Contents

*	[Get Started](#get-started)
*	[APIs](#apis)
*	[Move Forward](#move-forward)
	*	[Deep Comparation Between Objects](#deep-comparation-between-objects)
	*	[Shadow of Array](#shadow-of-array)
	*	[More Than Strictly Equal](#more-than-strictly-equal)
    *   [Number Range](#./docs/NumberRange.md)
*	[Examples](#examples)
*	[CHANGELOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/nodejs.shadowing)

##	Get Started

```javascript
var shadowing = require('shadowing');

shadowing(
    /* origin */ { name: 'YounGoat', gender: 'male' },
    /* shadow */ { gender: 'male' }
);
// RETURN true

shadowing(
    /* origin */ { linkman: { name: 'YounGoat', gender: 'male' } },
    /* shadow */ { linkman: { gender: 'male' } }
);
// RETURN true

shadowing(
    /* origin */ { name: 'YounGoat', gender: 'male' },
    /* shadow */ { gender: shadowing.or('male', 'female') }
);
// RETURN true

shadowing(
    /* data */ 99,
    /* definition */ shadowing.numberRange('>90 <=120')
);
// RETURN true
```

##	APIs

```javascript
const shadowing = require('shadowing');

// Since v
const NumberRange = require('shadowing/NumberRange');
```

*	boolean __shadowing__( *origin*, *shadow* )
*	class __shadowing.Shadow__( Function *judge* )
*	symbol __shadowing.EXIST__  
*	shadowing.Shadow __shadowing.or__( Shadow *shadow1*, Shadow *shadow2* [, ...] )
*	shadowing.Shadow __shadowing.and__( Shadow *shadow1*, Shadow *shadow2* [, ...] )
*	shadowing.Shadow __shadowing.has__( string *propertyName* [, ...] )
*	shadowing.Shadow __shadowing.hasnot__( string *propertyName* [, ...] )
*	shadowing.Shadow __shadowing.numberRange__( string *numberRangeCode* )

##	Move Forward

*	[Deep Comparation Between Objects](#deep-comparation-between-objects)
*	[Shadow of Array](#shadow-of-array)
*	[More Than Strictly Equal](#more-than-strictly-equal)

###	Deep Comparation Between Objects

Suppose that we want an object which:

*	has property named "linkman",  
	and property "linkman" is an object with property "gender",  
	which valued "male";

*	has property named "city",  
	and property "city" is an object with property "name",  
	which valued "Shanghai".

Before, we will code like:

```javascript
if (foo
    && foo.linkman
    && foo.linkman.gender === 'male'
    && foo.city
    && foo.city.name === 'Shanghai') {
        // ...
    }
```

Or, [JSON Schema](http://json-schema.org) may be a more formal choice:

```javascript
// To run this snippet, do "npm install ajv" firstly.

var foo = {
    linkman: {
        name: 'YounGoat',
        gender: 'male'
    },
    city: {
        name: 'Shanghai'
    }
};

var schema = {
    type: 'object',
    properties: {
        linkman: {
            type: 'object',
            properties: {
                gender: {
                    type: 'string',
                    enum: ['male']
                }
            }
        },
        city: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    enum: ['Shanghai']
                }
            }
        }
    }
};

var Ajv = require('ajv');
if ((new Ajv).validate(schema, foo)) {
    // ...
}
```

Now, it is easier and more natural to achieve the target by *shadowing*:

```javascript
var foo = {
    linkman: {
        name: 'YounGoat',
        gender: 'male'
    },
    city: {
        name: 'Shanghai'
    }
};

var shadow = {
    linkman: { gender: 'male' },
    city: { name: 'Shanghai' }
};

var shadowing = require('shadowing');
if (shadowing(foo, shadow)) {
    // ...
}
```

###	Shadow of Array

The module can also be used to calculate the shadow of an array. E.g.

```javascript
shadowing( [ 1, 2, 3 ], [ 2 ] );
// RETURN true

shadowing( [ 1, 2, 3 ], [ 4 ] );
// RETURN false

shadowing( [ 1, 2, 3 ], 2 );
// RETURN false
```

According to *shadowing*, as you can see, the shadow of an array origin MUST be an array too. And, if items of origin array are scalar values, each items of the shadow array SHOULD be found in the origin array. However, while the origin array has vectorial items, the items of the shadow array NEED NOT strictly equal to any item of the origin. Instead, they MAY be shadow of at least one item of the origin. E.g.

```javascript
var origin = [ { gender: 'male', age: 22 }, { gender: 'female', age: 20 } ];

shadowing( origin, [ { gender: 'male' }] );
// RETURN true
```

###	More Than Strictly Equal

Sometime, we wanna make little changes. The module offers following ways for you to create shadows a little more adaptable,

```javascript
var shadow = {
    // The origin SHOULD have property "linkman".
    linkman: shadowing.EXIST
};

var shadow = {
    // The origin SHOULD have property "linkman",
    // and sub-property "gender" valued string "male" or "female".
    linkman: {
        gender: shadowing.or('male', 'female')
    }
};

/**
 * The origin SHOULD have both property "linkman" and "city", equals to
 * { linkman: shadowing.EXIST, city: shadowing.EXIST }
 */
var shadow = shadowing.and(
    { linkman: shadowing.EXIST },
    { city: shadowing.EXIST }
);
```

If there is some numbers, it is usual to know whether it belongs to a number set instead of whether it equals to some exact value. [__NumberRange__](./docs/NumberRange.md) is designed for such purpose. E.g.
```javascript
var shadow = {
    year: shadowing.numberRange('1980 1987 >2017')
};
```

##	Examples

We offer some examples to explain how *shadowing* works. There will be an array of test cases in each example file. A test unit is also an array with four items:

```javascript
[
    origin,  /* The origin object/array/others */
    shadow,  /* The shadow to be tested */
    ifValid, /* If the shadow is valid shadow to the origin according to shadowing */
    description
]
```

*	[Basic Usage](./test/example/basic.json)
*	[Shadow of Arrays](./test/example/array.json)
*	[Logic Operators](./test/example/operator.js)
*	[Ranged Shadow](./test/example/range.js)
*	[Edge Cases](./test/example/edge.js)
