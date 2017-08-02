angular.module('sportium.parser.sport.validation', ['sportium.parser.sport.format'])
	.factory('validation', validation);

validation.$inject = ['format'];
function validation(format) {
	var _validation = {
		soccer: soccer,
		tenis: tenis
	}
	return _validation;

	/**
	 * @param  {String} sport
	 * @return {Object} a json format result
	 */
	function soccer (match) {
		var teams = match.split(/\d{1,3}\s?-\s?\d{1,3}/g); // get match teams
		var scores = match.match(/\d{1,3}\s?-\s?\d{1,3}/g); // get match scores
		var teamsScores = [];
		var result = {};

		try {
			if (teams && scores && (teams.length > 0 && scores.length > 0)) {
				scores = scores[0].split('-');
				teamsScores = teamsScores.concat(teams).concat(scores);

				if (format.hasFormat('soccer')) {
					for (var i = 0; i < teamsScores.length; i++) {
						result[format['soccer'][i]] = teamsScores[i].trim();
					}
					return result;

				} else {
					throw new Error("Not exist a format data to return");
				}

			} else {
				throw new Error("Invalid format for the soccer match");
			}
		} catch (error) {
			console.error(error); // Print error on console (only for debugging)
			return error.message;
		}
	}

	function tenis (match) {
		
	}
}