'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		text: '../bower_components/requirejs-text/text',
		munchkin: '//munchkin.marketo.net/munchkin',
		Cookies: '../bower_components/cookies-js/dist/cookies.min',
		underscore: '../bower_components/underscore/underscore',
		angularCookies: '../bower_components/angular-cookies/angular-cookies.min'
	},
	shim: {
		'angular' : {
			deps: ['jquery'],
			'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'angularCookies': {
			deps: ['angular']
		},
		'munchkin': {
			'exports': 'Munchkin'
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes',
	'munchkin'
], function(angular, app, routes, munchkin) {
	munchkin.init('587-QLI-337');

	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
