angular.module('sportium.parser.sport', ['sportium.parser.sport.validation'])
	.factory('sport', sport);

sport.$inject = ['validation'];
function sport(validation) {
	var sports = ["tenis","football","soccer"];
	var factory = {
		sports: sports, 			// property
		parser: parser,				// method
		exists: exists				// method
	}
	return factory;

	/**
	 * [parser description]
	 * @param  {String} match 	a match text string
	 * @param  {String} sport 	a valid sport
	 * @return {String}       	match string parsed
	 */
	function parser(match, sport) {
		try {
			var matchParsed = '';

			if (angular.isFunction(validation[sport])) {
				matchParsed = validation[sport](match);
			} else if (sport === "default") {
				// Search for all sports available
				for (var i = 0; i < sports.length; i++) {
					if (angular.isFunction(validation[sports[i]])) {
						matchParsed = validation[sports[i]](match);
						if (angular.isObject(matchParsed)) {
							return matchParsed;
						}
					}
				}
			} else {
				throw new Error("Not exists a validation function for the '" + sport + "' sport");
			}

			return matchParsed;

		} catch (error) {
			console.error(error); // Print error on console (only for debugging)
			return error.message;
		}
	}

	function exists (sport) {
		return sport === "default" || sports.indexOf(sport) > -1;
	}
}