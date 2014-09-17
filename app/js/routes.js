'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/partials/home.html',
			controller: 'HomeCtrl'
		})
		.when('/resource-dilemma', {
			templateUrl: 'app/partials/infographic.html',
			controller: 'InfographicCtrl'
		})
		.when('/explore-findings', {
			templateUrl: 'app/partials/data.html',
			controller: 'DataCtrl'
		})
		.when('/report', {
			templateUrl: 'app/partials/report.html',
			controller: 'ReportCtrl'
		})
		.when('/about-research', {
			templateUrl: 'app/partials/about.html',
			controller: 'AboutCtrl'
		})
		.when('/maturity-levels', {
			templateUrl: 'app/partials/definitions.html',
			controller: 'DefinitionsCtrl'
		})
		.when('/handbook', {
			templateUrl: 'app/partials/handbook.html',
			controller: 'HandbookCtrl'
		})
		.otherwise({redirectTo: '/'});
	}]).config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}]);

});
