angular.module('sportium.parser.sport.validation', ['sportium.parser.sport.format'])
	.factory('validation', validation);

validation.$inject=['$filter','format'];
function validation( $filter , format) {
	var expression = {
		teams: 			/\d{1,3}\s?-\s?\d{1,3}/g,
		scoreAndTeams: 	/\(\d\)\s?\d\s+?(\d{2}|adv)\s?-\s?(\d{2}|adv)\s\d\s?\(\d\)/gi,
		quarter: 		/[1-4]{1}[st|nd|rd|th].*$/g,
		gammes: 		/\(\d\)/g,
		sets: 			/\d\s+?(\d{2}|adv)\s?-\s?(\d{2}|adv)\s\d/gi
	};
	var error = {
		"notExists": "Not exist a format data to return",
		"invalidFormat": "Invalid format for"
	};
	var _validation = {
		expression: expression,
		error: error,
		soccer: soccer,
		tenis: tenis,
		football: football
	};
	return _validation;

	/**
	 * @param  {String} sport
	 * @return {Object} a json format result
	 */
	function soccer (match) {
		var teams = match.split(this.expression.teams); 	// get match teams
		var scores = match.match(this.expression.teams); 	// get match scores
		var teamsScores = [];
		var result = {};

		try {
			if (teams && scores && (teams.length > 0 && scores.length > 0)) {
				scores = scores[0].split('-');
				teamsScores = teamsScores.concat(teams).concat(scores);

				if (format.hasFormat('soccer')) {
					for (var i = 0; i < teamsScores.length; i++) {
						if (format['soccer'][i]) {
							result[format['soccer'][i]] = teamsScores[i].trim();
						}
					}
					return result;
				} else {
					throw new Error(this.error.notExists);
				}
			} else {
				throw new Error(this.error.invalidFormat + " soccer");
			}
		} catch (error) {
			console.error(error); // Print error on console (only for debugging)
			return error.message;
		}
	}

	/**
	 * @param  {String} sport
	 * @return {Object} a json format result
	 */
	function tenis (match) {
		var teams = match.split(this.expression.scoreAndTeams); // with serving
		var scores = teams.splice(1,2);
		var games = match.match(this.expression.gammes);
		var serving = $filter('filter')(teams, '*');
		var sets = match.match(this.expression.sets);
		var teamsScores = [];
		var result = {};

		try {
			if (teams && scores && games && serving && 
				(teams.length > 0 && scores.length > 0 && games.length > 0 && serving.length > 0))
			{
				if (sets.length > 0) {
					sets = sets[0].split(' ');
					sets.splice(1,1);
				}
				teamsScores = teamsScores.concat(teams).concat(scores).concat(games).concat(serving).concat([sets]);
				
				if (format.hasFormat('tenis')) {
					for (var i = 0; i < teamsScores.length; i++) {
						if (format['tenis'][i]) {
							if (i < 6) result[format['tenis'][i]] = teamsScores[i].replace(/[\(\)]/g,'').trim();
							if (i === 6) result[format['tenis'][i][teams.indexOf(serving[0])]] = true;
							if (i === 7 &&  teamsScores[i].length > 0) {
								result["scoreboard"] = {};
								result["scoreboard"]["element"] = [];
								result["scoreboard"]["element"][0] = {};
								result["scoreboard"]["element"][0][format['tenis'][i]["element"][0]] = "Sets"; // Hardcode
								for (var j = 0; j < teamsScores[i].length; j++) {
									result["scoreboard"]["element"][0][format['tenis'][i]["element"][j+1]] = teamsScores[i][j]
								}
							}
						}
					}
					return result;
				} else {
					throw new Error(this.error.notExists);
				}

			} else {
				throw new Error(this.error.invalidFormat + " tenis");
			}
		} catch (error) {
			console.error(error); // Print error on console (only for debugging)
			return error.message;
		}
	}

	/**
	 * @param  {String} sport
	 * @return {Object} a json format result
	 */
	function football (match) {
		var teams = match.replace(this.expression.quarter, '').trim().split(this.expression.teams);	// get match teams
		var scores = match.match(this.expression.teams);											// get match scores
		var quarter = match.match(this.expression.quarter); 										// Get quarter
		var teamsScores = [];
		var result = {};

		try {
			if (teams && scores && quarter && (teams.length > 0 && scores.length > 0 && quarter.length > 0)) {
				scores = scores[0].split('-');
				teamsScores = teamsScores.concat(teams).concat(scores).concat(quarter);

				if (format.hasFormat('football')) {
					for (var i = 0; i < teamsScores.length; i++) {
						if (format['football'][i]) {
							result[format['football'][i]] = teamsScores[i].trim();
						}
					}
					return result;
				} else {
					throw new Error(this.error.notExists);
				}
			} else {
				throw new Error(this.error.invalidFormat + " american football");
			}
		} catch (error) {
			console.error(error); // Print error on console (only for debugging)
			return error.message;
		}
	}
}