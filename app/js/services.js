'use strict';

define(['angular', 'underscore', 'munchkin', 'chart-data', 'angularCookies'], function (angular, _, munchkin, chartData) {
	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', ['ngCookies'])
		.factory('userConfirmed', ['$location', function ($location) {
			return {
				status: false,
				confirm: function () {
					munchkin().munchkinFunction('visitWebPage', {
						url: $location.absUrl(), params: 'registered=true'
					});
					this.status = true;
				}
			};
		}])
		.factory('reportRequest', ['$location', function ($location) {
			return {
				status: false,
				confirm: function () {
					this.status = true;
				}
			};
		}])
		.factory('MarketoInfo', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore){
			var object = {
				userInfo: null,
				receivedData: false,
				get: function() {
					return $http.get('/token.json.php', {params: {action: 'lead'}, withCredentials: true, cache: true});
				} 
			};
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
			};
		}])
		.factory("ChartData", [function () {
			return chartData;
		}])
		.factory('Webcast', [function () {
			return [
				{
					'id': 'it',
					'name': "IT and EPMO", 
					'video': '17435676e9e8449587c31c52d09c2b72',
					'image': '/app/img/webcasts/it.png',
					'tweet': {
						text: "Watch the #webcast highlighting the State of #ResourceMgmt and #CapacityPlanning in #Enterprise #PMOT",
						url: "http://bit.ly/1wvas3q"
					}
				},
				{
					'id': 'pd',
					'name': "Product Development", 
					'video': '3e12cb8b54c54bdeb3238878ea0afd7e',
					'image': '/app/img/webcasts/pd.png',
					'tweet': {
						text: "Listen to the #webcast highlighting the State of #ResourceMgmt and #CapacityPlanning in #Proddev",
						url: "http://bit.ly/1s08Zf0"
					}
				},
				{
					'id': 'srp',
					'name': "Services Organizations", 
					'video': '1df21150beab4c039b5269c2a9155007',
					'image': '/app/img/webcasts/srp.png',
					'tweet': {
						text: "View the #webcast highlighting the State of #ResourceMgmt and #CapacityPlanning in #ProfessionalServices",
						url: "http://bit.ly/13Ew8PU"
					}
				}
			]
		}]);

});
