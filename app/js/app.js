'use strict';

define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularCookies',
	'angularticsGa',
	'angularticsMarketo'
	], function (angular, filters, services, directives, controllers) {

		// Declare app level module which depends on filters, and services
		
		return angular.module('myApp', [
			'ngRoute',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers',
			'ngCookies',
			'angulartics',
			'angulartics.google.analytics',
			'angulartics.marketo'
		])
		.run(['MarketoInfo', function(MarketoInfo){
			MarketoInfo.get();
		}]);
});
