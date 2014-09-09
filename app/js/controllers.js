'use strict';

define(['angular', 'Cookies', 'munchkin', 'services', 'smartforms', 'sf-fields', 'angularCookies'], function (angular, Cookies, munchkin, services, smartforms, sfFields) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services', 'ngCookies'])
		// Sample controller where service is being used
		.controller('RegistrationController', ['$scope', 'userConfirmed', 'MarketoInfo', 'MunckinHash', '$cookieStore',
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
		// More involved example where controller is required from an external file
		.controller('MyCtrl2', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/myctrl2'], function(myctrl2) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(myctrl2, this, {'$scope': $scope});
			});
		}]);
});
