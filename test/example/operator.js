var shadowing = require('shadowing');

module.exports = [
	[
		{ "linkman": { "gender": undefined } },
		{ "linkman": { "gender": shadowing.EXIST } },
		true,
		"shadowing.EXIST"
	],
	[
		[ 1 ],
		[ shadowing.or(1, true) ],
		true,
		"shadowing.or()"
	],
	[
		{ "gender": "m" },
		{ "gender": shadowing.and("m", new shadowing.Shadow(function(value) { return value.length == 1; })) },
		true,
		"shadowing.and()"
	]
];
