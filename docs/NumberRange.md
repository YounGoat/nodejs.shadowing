#   Number Range

__shadowing/NumberRange__ accepts a literal string and transforms it to a set of numbers of number intervals. 

__NumberRange__ shows its intelligence on transformation, trying to understand what you want and avoid ambiguity at the same time. E.g., `>80 !=88` is understood as *larger than 80 AND not equals to 88*, while `>80 77` as *larger than 80 OR equals to 77* because nobody will define a range *larger than 80 AND equals to 77*.

```javascript
const NumberRange = require('shadowing/NumberRange');

var r1 = new NumberRange('80');
// The range syntax is compatible with literal of single number.
r1.covers(80);
// RETURN true

var r2 = new NumberRange('80 87 88');
var r2 = new NumberRange('80,87,88');
var r2 = new NumberRange('80 || 87 || 88');
// { 80, 87, 88 }

var r3 = rnew NumberRange('80-87');
var r3 = new NumberRange('80~87');
var r3 = new NumberRange('>=80 <=87');
// >= 80 AND <= 87

var r4 = new NumberRange('>=80 <=87 2017');
// ( >= 80 AND <= 87 ) OR = 2017

var r5 = new NumberRange('25+/-5');
// >= 20 AND <= 30
```

##  API

*   Class __NumberRange__( string *pattern* )
*   boolean __\<range\>.covers__( number *num* )