#	shadowing
__Light-weighted object/array analyse tool.__

[![total downloads of shadowing](https://img.shields.io/npm/dt/shadowing.svg)](https://www.npmjs.com/package/shadowing)
[![shadowing's License](https://img.shields.io/npm/l/shadowing.svg)](https://www.npmjs.com/package/shadowing)
[![latest version of shadowing](https://img.shields.io/npm/v/shadowing.svg)](https://www.npmjs.com/package/shadowing)
[![coverage status of github.com/YounGoat/nodejs.shadowing](https://coveralls.io/repos/github/YounGoat/nodejs.shadowing/badge.svg?branch=master)](https://coveralls.io/github/YounGoat/nodejs.shadowing2?branch=master)
[![dependencies of github.com/YounGoat/nodejs.shadowing](https://david-dm.org/YounGoat/nodejs.shadowing/status.svg)](https://david-dm.org/YounGoat/nodejs.shadowing)
[![devDependencies of github.com/YounGoat/nodejs.shadowing](https://david-dm.org/YounGoat/nodejs.shadowing/dev-status.svg)](https://david-dm.org/YounGoat/nodejs.shadowing?type=dev)
[![build status of github.com/YounGoat/nodejs.shadowing](https://travis-ci.org/YounGoat/nodejs.shadowing.svg?branch=master)](https://travis-ci.org/YounGoat/nodejs.shadowing)
[![star github.com/YounGoat/nodejs.shadowing](https://img.shields.io/github/stars/YounGoat/nodejs.shadowing.svg?style=social&label=Star)](https://github.com/YounGoat/nodejs.shadowing/stargazers)

*shadowing* offers an easy way to judge whether the object is what you want.

![Shadowing Logo](./docs/logo.png)

##	Table of contents

*	[APIs](#apis)
*	[Get Started](#get-started)
*	[Move Forward](#move-forward)
*	[Examples](#examples)

##	LINKS

*	[CHANGELOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/nodejs.shadowing)

##	APIs

```javascript
/* boolean */ shadowing(/* object | Array */ origin, /* object | Array */  shadow);
```

##	Get Started

```javascript
var shadowing = require('shadowing');

shadowing(
	{ name: 'YounGoat', gender: 'male' },
	{ gender: 'male' }
);
// RETURN true

shadowing(
	{ linkman: { name: 'YounGoat', gender: 'male' } },
	{ linkman: { gender: 'male' } }
);
// RETURN true

shadowing(
	{ name: 'YounGoat', gender: 'male' },
	{ gender: shadowing.OR('male', 'female') }
);
// RETURN true
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
*	[Extrem Cases](./test/example/extrem.js)

##	Move Forward

*	[Deep Comparation Between Objects](#deep-comparation-between-objects)
*	[Shadow of Array](#shadow-of-array)
*	[More Than Strict Equal](#more-than-strict-equal)

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

###	More Than Strict Equal

Sometime, we wanna make little changes. The module offers following ways for you to create shadows a little more adaptable,

*	*symbol* __shadowing.EXIST__  
*	*shadowing.Shadow* __shadowing.or__( shadow1, shadow2 [, ...] )
*	*shadowing.Shadow* __shadowing.and__( shadow1, shadow2 [, ...] )
*	*shadowing.Shadow* __shadowing.has__( propertyName [, ...] )
*	*shadowing.Shadow* __shadowing.hasnot__( propertyName [, ...] )

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
