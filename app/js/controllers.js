'use strict';

define(['angular', 'Cookies', 'services'], function (angular, Cookies) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services'])
		// Sample controller where service is being used
		.controller('MyCtrl1', ['$scope', 'version', 'apiToken', 'marketoCookie', function ($scope, version, apiToken, marketoCookie) {
			$scope.scopedAppVersion = version;
			$scope.token = null;
			$scope.leadRecord = 

			apiToken.getToken().success(function(data) { $scope.token = data.access_token; });

			$scope.cookie = marketoCookie.getToken();
			
		}])
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
