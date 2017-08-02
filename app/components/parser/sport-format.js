angular.module('sportium.parser.sport.format', [])
	.factory('format', format);

function format() {
	var soccer = {
		"0": "teamAName", 	// String
		"1": "teamBName", 	// String
		"2": "teamAScore",	// Integer
		"3": "teamBScore"	// Integer
	};

	var tenis = {
		"0": "teamAName",				// String
		"1": "teamBName",				// String
		"2": "teamAScore",				// Integer|String
		"3": "teamBScore",				// Integer|String
		"4": "teamAGames",				// Integer
		"5": "teamBGames",				// Integer
		"6": {
			"0": "teamAServing",		// Boolean
			"1": "teamBServing"			// Boolean
		},
		"7": {
			"element": {
				"0": "title",			// String
				"1": "teamAScore",		// Integer
				"2": "teamBScore"		// Integer
			}
		}
	};

	var football = {
		"0": "teamAName",		// String
		"1": "teamBName",		// String
		"2": "teamAScore",		// Integer
		"3": "teamBScore",		// Integer
		"4": "currentPeriod"	// String
	};

	var _format = {
		soccer: soccer,
		tenis: tenis,
		football: football,
		hasFormat: hasFormat
	};

	/**
	 * @param  {String} format
	 * @return {Boolean}
	 */
	function hasFormat (format) {
		return !!this[format];
	}

	return _format;
}