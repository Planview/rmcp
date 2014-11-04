'use strict';

define(['angular', 'Cookies', 'munchkin', 'underscore', 'services'], function (angular, Cookies, munchkin, _) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services', 'ngCookies'])
		// Sample controller where service is being used
		.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location) {
			$scope.isActive = function (route) {
				return route === $location.path() ||
					($location.path().indexOf(route) > -1 && route !== '/');
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
				return false;
			};
			$scope.isCurrentSet = function (set) {
				return $scope.currentSet === set;
			};
		}])
		.controller('ReportCtrl', ['$scope', '$location', 'userConfirmed', 'reportRequest', function ($scope, $location, userConfirmed, reportRequest) {
			$scope.requestPending = false;
			$scope.requestSent = function (report) {
				return reportRequest[report];
			};

			$scope.primers = [
				{
					id: 'it',
					name: 'IT and EPMO',
					title: 'Moving from Managing Risk to Proactive Planning',
					img: '/app/img/reports/hex-it-epmo-250.png'
				},
				{
					id: 'pd',
					name: 'Product Development',
					title: 'A Panoramic View of Pipleing Demand and Resource Capacity Gives Top Performers an Advantage',
					img: '/app/img/reports/hex-product-development-250.png'
				},
				{
					id: 'srp',
					name: 'Services Organizations',
					title: 'Maintaining Margins by Aligning Resources to High Value Projects',
					img: '/app/img/reports/hex-services-250.png'
				}
			];

			$scope.requestReport = function (report) {
				if (!userConfirmed.status) {
					$scope.requestPending = report || 'full';
					$scope.$emit("TRIGGER_REG");
				} else {
					$scope.sendRequest(report);
				}
				return false;
			};

			$scope.sendRequest = function (report) {
				var queryVal = report === 'full' ? 'true' : report;
				munchkin().munchkinFunction('visitWebPage', {
					url: $location.absUrl(), params: 'requested_report=' + queryVal
				});
				reportRequest.confirm(report);
			};

			$scope.$on("REG_CONFIRMED", function () {
				if ($scope.requestPending !== false) {
					$scope.sendRequest($scope.requestPending);
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
				return false;
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
			
		}])
		.controller('WebcastsCtrl', ['$scope', 'Webcast', 'userConfirmed', '$routeParams', function ($scope, Webcast, userConfirmed, $routeParams) {
			$scope.webcasts = Webcast;
			$scope.userConfirmed = userConfirmed;
			$scope.currentSetId = $routeParams.marketId;

			$scope.isCurrentSet = function (set) {
				return $scope.currentSetId === set;
			};

			$scope.currentSet = function () {
				return _.findWhere($scope.webcasts, { 'id': $scope.currentSetId });
			};

			$scope.register = function () {
				$scope.$emit("TRIGGER_REG");
			}

		}]);
});
