angular.module('sportium.parser.sport.format', [])
	.factory('format', format);

function format() {
	var soccer = {
		"0": "teamAName",
		"1": "teamBName",
		"2": "teamAScore",
		"3": "teamBScore"
	};

	var _format = {
		soccer: soccer,
		hasFormat: hasFormat
	};

	function hasFormat (format) {
		return !!this[format];
	}

	return _format;
}