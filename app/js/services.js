'use strict';

define(['angular', 'Cookies', 'underscore'], function (angular, Cookies, _) {
	
	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', [])
		.value('version', '0.1')
		.factory('apiToken', ['$http', function($http){
			var getToken = function () {
				return $http.get('/token.json.php');
			}
			return {
				getToken: getToken
			}
		}])
		.factory('marketoCookie', function () {
			return {
				get: function() {
					return Cookies.get('_mkto_trk');
				},
				getObject: function() {
					var cookie = this.get();
					if (!cookie) return null;
					return _.chain(cookie.split('&')).map(function(val) {return val.split(':')}).object().value();
				},
				getToken: function() {
					var cookieData = this.getObject();
					if (!cookieData) return null;
					return cookieData.token;
				}
			}
		});

});
