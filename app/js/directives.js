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
			.directive('rmcpBarChart', ['userConfirmed', function (userConfirmed) {
				return {
					templateUrl: 'app/partials/chart.html',
					restrict: 'C',
					scope: {
						chartData: '=',
						unlocked: '=',
						set: '=',
						triggerRegistration: '&',
					},
					link: function (scope, element, attrs) {
						var chart;
						var navs = element.find('.switcher');
						scope.initialData = _.findWhere(scope.chartData.data, { isDefault: true });
						scope.currentData = scope.initialData.shortName;
						if (scope.chartData.type === "stacked") {
							chart = stackedBarChart(element.find('.chart').get(0), scope.initialData.dataset,
													scope.initialData.sample, scope.initialData.title,
													scope.initialData.callout);
						} else if (scope.chartData.type === "simple") {
							chart = simpleBarChart(element.find('.chart').get(0), scope.initialData.dataset,
													scope.initialData.sample, scope.initialData.title,
													scope.initialData.callout);
						}


						$(window).on('resize', chart.resizeChart);
						scope.changeData = function (shortName) {
							var newData = _.findWhere(scope.chartData.data, {shortName: shortName});

							chart.changeData(newData.dataset, newData.sample, newData.title, newData.callout);
							scope.currentData = newData.shortName;
						}
						scope.isActive = function (shortName) { return shortName === scope.currentData; }
					}
				}
			}]);
	});
