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
		{},
		{},
		true,
		"empty objects >>> each other"
	],
	[
		{ "gender": "m" },
		{},
		true,
		"Non-empty object >>> an empty one"
	],
	[
		null,
		{},
		false,
		"null not >>> an empty object"
	],
	[
		{},
		null,
		false,
		"an empty object not >>> null either"
	],
	[
		null,
		null,
		true,
		"null >>> each other"
	],
	[
		undefined,
		{},
		false,
		"undefined not >>> an empty object"
	],
	[
		{},
		undefined,
		false,
		"an empty object not >>> undefined either"
	],
	[
		undefined,
		undefined,
		true,
		"undefined >>> each other"
	]
];
