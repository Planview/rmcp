'use strict';

define(['angular', 'Cookies', 'munchkin', 'services'], function (angular, Cookies, munchkin) {

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
			$scope.isCurrentSet = function (set) {
				return $scope.currentSet === set;
			};
		}])
		.controller('ReportCtrl', ['$scope', '$location', 'userConfirmed', function ($scope, $location, userConfirmed) {
			$scope.requestPending = false;
			$scope.requestSent = false;

			$scope.requestReport = function () {
				if (!userConfirmed.status) {
					$scope.requestPending = true;
					$scope.$emit("TRIGGER_REG");
				} else {
					$scope.sendRequest();
				}
			};

			$scope.sendRequest = function () {
				munchkin().munchkinFunction('visitWebPage', {
					url: $location.absUrl(), params: 'requested_report=true'
				});
				$scope.requestSent = true;
			};

			$scope.$on("REG_CONFIRMED", function () {
				if ($scope.requestPending) {
					$scope.sendRequest();
					$scope.requestPending = false;
				}
			});
		}])
		.controller('AboutCtrl', [function(){
			
		}])
		.controller('DefinitionsCtrl', [function(){
			
		}]);
});
