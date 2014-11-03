'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/app/partials/home.html',
			controller: 'HomeCtrl',
			title: 'State of Resource Management and Capacity Planning'
		})
		.when('/resource-dilemma', {
			templateUrl: '/app/partials/infographic.html',
			controller: 'InfographicCtrl',
			title: 'Infographic'
		})
		.when('/webcasts/:marketId', {
			templateUrl: '/app/partials/webcasts.html',
			controller: 'WebcastsCtrl',
			title: 'Watch the Webcasts'
		})
		.when('/explore-findings', {
			templateUrl: '/app/partials/data.html',
			controller: 'DataCtrl',
			title: 'Explore the Findings'
		})
		.when('/report', {
			templateUrl: '/app/partials/report.html',
			controller: 'ReportCtrl',
			title: 'Get the Report'
		})
		.when('/about-research', {
			templateUrl: '/app/partials/about.html',
			controller: 'AboutCtrl',
			title: 'Assess Your Company’s Maturity'
		})
		.when('/maturity-levels', {
			templateUrl: '/app/partials/definitions.html',
			controller: 'DefinitionsCtrl',
			title: 'Assess Your Company’s Maturity'
		})
		.when('/handbook', {
			templateUrl: '/app/partials/handbook.html',
			controller: 'HandbookCtrl',
			title: 'RMCP Handbook'
		})
		.when('/webcasts', {redirectTo: '/webcasts/it'})
		.otherwise({redirectTo: '/'});
	}]).config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}]);

});
