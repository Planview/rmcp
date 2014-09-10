'use strict';

define(['angular', 'underscore', 'angularCookies'], function (angular, _) {
	
	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', ['ngCookies'])
		.factory('userConfirmed', function () {
			return {
				status: false,
				confirm: function () { this.status = true; }
			}
		})
		.factory('MarketoInfo', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore){
			var object = {
				userInfo: null,
				receivedData: false,
				get: function() {
					return $http.get('/token.json.php', {params: {action: 'lead'}, withCredentials: true, cache: true});
				} 
			}
			object.get().success(function (data) {
				object.userInfo = data;
				object.receivedData = true;
				return data;
			});
			return object;
		}])
		.factory('MunckinHash', ['$http', function ($http) {
			return {
				get: function (email) {
					return $http.get('/token.json.php', {params: {action: 'hash', key: email}, cache: false});
				}
			}
		}]);

});
