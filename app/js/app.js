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
	], function (angular) {

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
		.run(['MarketoInfo', '$rootScope', function(MarketoInfo, $rootScope){
			MarketoInfo.get();
			$rootScope.$on("TRIGGER_REG", function () {
				$rootScope.$broadcast("REG_TRIGGERED");
			});

			$rootScope.$on("CONFIRM_REG", function () {
				$rootScope.$broadcast("REG_CONFIRMED");
			});
		}]);
});
