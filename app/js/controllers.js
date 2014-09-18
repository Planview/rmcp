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
		.controller('ReportCtrl', ['$scope', '$location', 'userConfirmed', 'reportRequest', function ($scope, $location, userConfirmed, reportRequest) {
			$scope.requestPending = false;
			$scope.requestSent = function () {
				return reportRequest.status;
			};

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
				reportRequest.confirm();
			};

			$scope.$on("REG_CONFIRMED", function () {
				if ($scope.requestPending) {
					$scope.sendRequest();
					$scope.requestPending = false;
				}
			});
		}])
		.controller('AboutCtrl', ['$scope', function($scope){
			$scope.demographics = [
				{name: "Region", img: "/app/img/demographics/planview-rmcp-2014-breakdown-by-region-850.png", alt: "Alt Text"},
				{name: "Industry", img: "/app/img/demographics/planview-rmcp-2014-breakdown-by-industry-850.png", alt: "Alt Text"},
				{name: "Annual Worldwide Revenues", img: "/app/img/demographics/planview-rmcp-2014-annual-revenues-worldwide-850.png", alt: "Alt Text"},
				{name: "Number of Employees Worldwide", img: "/app/img/demographics/planview-rmcp-2014-employees-worldwide-850.png", alt: "Alt Text"},
				{name: "Job Level", img: "/app/img/demographics/planview-rmcp-2014-participant-job-level-850.png", alt: "Alt Text"},
				{name: "Role in RMCP Process", img: "/app/img/demographics/planview-rmcp-2014-role-in-rmcp-process-850.png", alt: "Alt Text"},
				{name: "Group Responsibilities", img: "/app/img/demographics/bar-group-responsibilities.png", alt: "Alt Text"},
				{name: "Group\u2019s Scope of Responsibility", img: "/app/img/demographics/planview-rmcp-2014-group-scope-of-responsibility-850.png", alt: "Alt Text"},
			];
			$scope.currentDemographic = $scope.demographics[0];

			$scope.isCurrentDemographic = function (demographic) {
				return demographic.name === $scope.currentDemographic.name;
			};

			$scope.setDemographic = function (demographic) {
				$scope.currentDemographic = demographic;
			};

			$scope.getDemographicAltText = function () {
				return $scope.currentDemographic.alt;
			};

			$scope.getDemographicImage = function () {
				return $scope.currentDemographic.img;
			};
		}])
		.controller('DefinitionsCtrl', ['$scope', function ($scope) {
			$scope.currentTab = 'cpLevels';
			$scope.isCurrentTab = function (tab) {
				return $scope.currentTab === tab;
			};
			$scope.setCurrentTab = function (tab) {
				$scope.currentTab = tab;
				return false;
			};
		}])
		.controller('HandbookCtrl', [function(){
			
		}]);
});
