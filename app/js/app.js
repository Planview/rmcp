'use strict';

define([
	'angular',
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
			'myApp.services',
			'myApp.directives',
			'myApp.controllers',
			'ngCookies',
			'angulartics',
			'angulartics.google.analytics',
			'angulartics.marketo'
		])
		.run(['MarketoInfo', '$rootScope', '$route', function(MarketoInfo, $rootScope, $route){
			MarketoInfo.get();
			$rootScope.$on("TRIGGER_REG", function () {
				$rootScope.$broadcast("REG_TRIGGERED");
			});

			$rootScope.$on("CONFIRM_REG", function () {
				$rootScope.$broadcast("REG_CONFIRMED");
			});

			$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			    //Change page title, based on Route information
			    $rootScope.title = $route.current.title;
			  });
		}]);
});
