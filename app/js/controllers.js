'use strict';

define(['angular', 'Cookies', 'munchkin', 'services', 'smartforms', 'sf-fields', 'angularCookies'], function (angular, Cookies, munchkin, services, smartforms, sfFields) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services', 'ngCookies'])
		// Sample controller where service is being used
		.controller('RegistrationCtrl', ['$scope', 'userConfirmed', 'MarketoInfo', 'MunckinHash', '$cookieStore',
			function ($scope, userConfirmed, MarketoInfo, MunckinHash, $cookieStore) {
				$scope.userInfo = null;
				$scope.marketoInfo = MarketoInfo;
				$scope.sfFields = sfFields;
				$scope.userConfirmed = userConfirmed;

				$scope.cookie = function ()  {
					return $cookieStore.get("RMCPRegistered");
				}

				$scope.haveMarketoInfo = function () {
					return $scope.marketoInfo.receivedData && $scope.marketoInfo.userInfo.HaveData;
				}

				$scope.haveCookieInfo = function () {
					return !!$scope.cookie();
				}

				$scope.confirmUser = function () {
					$scope.userConfirmed.confirm();
					if (!$scope.haveCookieInfo()) {
						$cookieStore.put("RMCPRegistered", {
							'Email': $scope.marketoInfo.userInfo.Email,
							'FirstName': $scope.marketoInfo.userInfo.FirstName,
							'LastName': $scope.marketoInfo.userInfo.LastName
						});
					}
				}

				$scope.sendRegistration = function () {
					MunckinHash.get($scope.userInfo.Email).success(function (data) {
						Munchkin.munchkinFunction('associateLead', $scope.userInfo, data.hashSig);
						$cookieStore.put("RMCPRegistered", {
							'Email': $scope.userInfo.Email,
							'FirstName': $scope.userInfo.FirstName,
							'LastName': $scope.userInfo.LastName
						});
						$scope.marketoInfo.userInfo = $scope.userInfo;
					});
					$scope.confirmUser();
				}

				$scope.wrongUser = function () {
					$cookieStore.remove("RMCPRegistered");
					$scope.marketoInfo.userInfo = {HaveData:false};
				}

				$scope.haveUserInfo = function () {
					return $scope.haveCookieInfo() || $scope.haveMarketoInfo();
				}

				$scope.showMarketoBox = function () {
					return $scope.haveMarketoInfo() && !$scope.haveCookieInfo() && !$scope.userConfirmed.status;
				}

				$scope.showCookieBox = function () {
					return $scope.haveCookieInfo() && !$scope.userConfirmed.status;
				}
			}
		])
		.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location) {
			$scope.isActive = function (route) {
				return route === $location.path();
			}
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
			}
		}])
		.controller('ReportCtrl', [function(){
			
		}])
		.controller('AboutCtrl', [function(){
			
		}])
		.controller('DefinitionsCtrl', [function(){
			
		}]);
});
