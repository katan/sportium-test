'use strict';

angular.module('sportium.matchParser', ['ngRoute', 'sportium.parser.sport'])
	.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/match-parser', { 
			templateUrl: 'match-parser/match-parser.html',
			controller: 'matchParserCtrl',
			controllerAs: 'matchparser'
		});
	}])
	.controller('matchParserCtrl', ['sport', function(sport) {
		var vm = this;
		
		// properties
		vm.matchModel = {
			"sport": "default"
		};
		vm.sports = [
			{
				name: "Soccer",
				id: "soccer"
			},
			{
				name: "Tenis",
				id:"tenis"
			},
			{
				name: "American football",
				id:"football"
			},
			{
				name: "I don't know",
				id: "default"
			}
		];
		vm.result = '';

		// methods
		vm.submit = submit;

		function submit(formData) {
			if (formData.$valid) {
				// Check if exists a valid sport expression
				if (sport.exists(vm.matchModel.sport)) {
					vm.result = sport.parser(vm.matchModel.match, vm.matchModel.sport);
				}
			}
		}
	}]);