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
						var chart, 
							chartType = scope.chartData.type,
							navs = element.find('.switcher');
						scope.initialData = _.findWhere(scope.chartData.data, { isDefault: true });
						scope.currentData = scope.initialData.shortName;
						scope.navNames = function (groupId) {
							return _.chain(scope.chartData.data).where({ group: groupId }).pluck('shortName').value();
						};
						scope.groups = [{ id: 0, name: "Group Data by:"}, { id: 1, name: "By Industry:"}];
						if (chartType === "stacked") {
							chart = stackedBarChart(element.find('.chart').get(0), scope.initialData.dataset,
													scope.initialData.sample, scope.initialData.title,
													scope.initialData.callout);
						} else if (chartType === "simple") {
							chart = simpleBarChart(element.find('.chart').get(0), scope.initialData.dataset,
													scope.initialData.sample, scope.initialData.title);
						}

						$(window).on('resize', chart.resizeChart);
						scope.changeData = function (shortName) {
							var newData = _.findWhere(scope.chartData.data, {shortName: shortName});

							chart.changeData(newData.dataset, newData.sample, newData.title, newData.callout);
							scope.currentData = newData.shortName;
						}

						scope.isActive = function (shortName) { return shortName === scope.currentData; };

						scope.$watch('chartData', function () {
							var newDataName = _.findWhere(scope.chartData.data, { isDefault: true }).shortName;
							
							scope.currentData = newDataName;

							if (scope.chartData.type === chartType) {
								scope.changeData(newDataName);
							} else {
								element.find('.chart').html('');
								chartType = scope.chartData.type;
								var newData = _.findWhere(scope.chartData.data, {shortName: newDataName});

								if (chartType === "stacked") {
									chart = stackedBarChart(element.find('.chart').get(0), newData.dataset,
															newData.sample, newData.title,
															newData.callout);
								} else if (chartType === "simple") {
									chart = simpleBarChart(element.find('.chart').get(0), newData.dataset,
															newData.sample, newData.title);
								}
							}
						});
					}
				}
			}]);
	});
