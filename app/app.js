'use strict';

// Declare app level module which depends on views, and components
angular.module('sportium', [
  'ngRoute',
  'ngMaterial',
  'sportium.matchParser',
  'sportium.parser'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/match-parser'});
}])
.value('version', '0.1');
