'use strict';

define(['angular', 'services', 'smartforms', 'sf-fields', 'jquery', 'simple-bar-chart', 'stacked-bar-chart'],
	function (angular, services, smartforms, sfFields, $, simpleBarChart, stackedBarChart) {

		/* Directives */
		
		angular.module('myApp.directives', ['myApp.services'])
			.directive('rmcpRegForm', [function () {
				return {
					templateUrl: 'app/partials/reg-form.html',
					restrict: 'C',
					//replace: true,
					scope: {
						model: '=',
						callback: '&'
					},
					link: function (scope, element, attrs)  {
						scope.sfFields = sfFields;
						scope.internalCallback = function () {
							element.find('input[type=hidden]').each(function () {
								scope.model[$(this).attr('name')] = $(this).val();
							});
							scope.callback();
						}
						element.on('submit', smartforms.config(scope.internalCallback).submit);
					}
				}
			}])
			// .directive('rmcpSimpleBar', [function () {
			// 	return {
			// 		template: '<div></div>',
			// 		restrict: 'C',
			// 		scope: {
			// 			chartData: '=',
			// 			unlocked: '=',
			// 			triggerRegistration: '&'
			// 		},
			// 		link: function (scope, element, attrs) {

			// 		}
			// 	}
			// }]);
	});
