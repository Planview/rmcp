'use strict';

define(['angular', 'Cookies', 'munchkin', 'services'], function (angular, Cookies, Munchkin) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services', 'ngCookies'])
		// Sample controller where service is being used
		.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location) {
			$scope.isActive = function (route) {
				return route === $location.path();
			};
		}])
		.controller('HomeCtrl', [function(){
			
		}])
		.controller('InfographicCtrl', [function(){
			
		}])
		.controller('DataCtrl', ['$scope', 'ChartData', function ($scope, ChartData) {
			$scope.chartData = ChartData;
			$scope.currentSet = ChartData.defaultView;

			$scope.currentChartData = function () {
				return $scope.chartData[$scope.currentSet];
			};
			$scope.setDataSet = function (set) {
				$scope.currentSet = set;
			};
		}])
		.controller('ReportCtrl', [function(){
			
		}])
		.controller('AboutCtrl', [function(){
			
		}])
		.controller('DefinitionsCtrl', [function(){
			
		}]);
});
