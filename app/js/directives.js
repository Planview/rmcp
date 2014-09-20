/* global Modernizr */
'use strict';

define([
	'angular',
	'services',
	'smartforms',
	'sf-fields',
	'jquery',
	'simple-bar-chart',
	'stacked-bar-chart',
	'underscore',
	'munchkin',
	'countries',
	'bootstrap',
	'angularCookies',
	'jqHeadroom',
	'stellarjs',
	'sharrre'],
	function (angular, services, smartforms, sfFields, $, simpleBarChart, stackedBarChart, _, munchkin, countries) {
		/* Directives */
		
		angular.module('myApp.directives', ['myApp.services'])
			.directive('rmcpRegForm', [function () {

				return {
					templateUrl: 'app/partials/reg-form.html',
					restrict: 'C',
					//replace: true,
					controller: ['$scope', 'MarketoInfo', 'userConfirmed', 'MunckinHash', '$cookieStore', function ($scope, MarketoInfo, userConfirmed, MunckinHash, $cookieStore) {
						$scope.userInfo = {};
						$scope.marketoInfo = MarketoInfo;
						$scope.sfFields = sfFields;
						$scope.userConfirmed = userConfirmed;
						$scope.countries = countries;

						$scope.cookie = function ()  {
							return $cookieStore.get("RMCPRegistered");
						};

						$scope.haveMarketoInfo = function () {
							return $scope.marketoInfo.receivedData && $scope.marketoInfo.userInfo.HaveData;
						};

						$scope.haveCookieInfo = function () {
							return !!$scope.cookie();
						};

						$scope.confirmUser = function () {
							$scope.userConfirmed.confirm();
							if (!$scope.haveCookieInfo()) {
								$cookieStore.put("RMCPRegistered", {
									'Email': $scope.marketoInfo.userInfo.Email,
									'FirstName': $scope.marketoInfo.userInfo.FirstName,
									'LastName': $scope.marketoInfo.userInfo.LastName
								});
							}
							$scope.$emit("CONFIRM_REG");
						};

						$scope.sendRegistration = function () {
							MunckinHash.get($scope.userInfo.Email).success(function (data) {
								munchkin().munchkinFunction('associateLead', $scope.userInfo, data.hashSig);
								$cookieStore.put("RMCPRegistered", {
									'Email': $scope.userInfo.Email,
									'FirstName': $scope.userInfo.FirstName,
									'LastName': $scope.userInfo.LastName
								});
								$scope.marketoInfo.userInfo = $scope.userInfo;
							});
							$scope.confirmUser();
						};

						$scope.wrongUser = function () {
							$cookieStore.remove("RMCPRegistered");
							$scope.marketoInfo.userInfo = {HaveData:false};
						};

						$scope.haveUserInfo = function () {
							return $scope.haveCookieInfo() || $scope.haveMarketoInfo();
						};

						$scope.showMarketoBox = function () {
							return $scope.haveMarketoInfo() && !$scope.haveCookieInfo() && !$scope.userConfirmed.status;
						};

						$scope.showCookieBox = function () {
							return $scope.haveCookieInfo() && !$scope.userConfirmed.status;
						};

						$scope.knownSubmit = function () {
							$scope.userInfo.Email = $scope.marketoInfo.userInfo.Email;
							console.log($scope.userInfo);
							MunckinHash.get($scope.userInfo.Email).success(function (data) {
								munchkin().munchkinFunction('associateLead', $scope.userInfo, data.hashSig);
							});
							$scope.confirmUser();
						};
					}],
					link: function (scope, element)  {
						scope.internalCallback = function () {
							element.find('input[type=hidden]').each(function () {
								scope.userInfo[$(this).attr('name')] = $(this).val();
							});
							scope.sendRegistration();
							element.find('.modal').modal('hide');
							showThankYou();
							$("#RFBlockFrame").remove();
						};
						element.find('form').on('submit', smartforms.config(scope.internalCallback).submit);

						if (!Modernizr.formattribute) {
							element.find('button[type=submit]').on('click', function (e) {
								e.preventDefault();
								element.find('form').trigger('submit');
							});
						}

						scope.confirmClose = function () {
							scope.confirmUser();
							element.find('.modal').modal('hide');
							showThankYou();
						};

						scope.knownClose = function () {
							scope.knownSubmit();
							element.find('.modal').modal('hide');
							showThankYou();
						};

						var showThankYou = function () {
							var alert = $('<div />').addClass('alert')
									.addClass('alert-danger')
									.addClass('alert-dismissable')
									.addClass('pull-right')
									.attr('role', 'alert')
									.css({
										'position': 'fixed',
										'top': 10,
										'right': 10,
										'z-index': 999,
									})
									.html('<button type="button" class="close" data-dismiss="alert">' +
										'<span aria-hidden="true">&times;</span><span class="sr-only">' +
										'Close</span></button><h4>Thanks for registering!</h4> ' +
										'You now have full access to the RMCP Study Website.');

							$('body').append(alert);
						};

						scope.$on("REG_TRIGGERED", function () {
							element.find('.modal').modal('show');
						});
					}
				};
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
					controller: ['$scope', function (scope) {
						scope.initialData = _.findWhere(scope.chartData.data, { isDefault: true });
						scope.currentData = scope.initialData.shortName;
						scope.userConfirmed = userConfirmed;
						scope.groups = [{ id: 0, name: "Group Data by:"}, { id: 1, name: "By Organizational Function:"}];

						scope.isActive = function (shortName) { return shortName === scope.currentData; };

						scope.navNames = function (groupId) {
							return _.chain(scope.chartData.data).where({ group: groupId }).pluck('shortName').value();
						};

						scope.keyTakeaway = function () {
							return _.findWhere(scope.chartData.data, {shortName: scope.currentData}).takeaway;
						};

						scope.chartImage = function () {
							return _.findWhere(scope.chartData.data, {shortName: scope.currentData}).img;
						};

						scope.chartTitle = function () {
							return _.findWhere(scope.chartData.data, {shortName: scope.currentData}).title;
						};

						scope.staticCharts = !(Modernizr.inlinesvg && Modernizr.svg);
					}],
					link: function (scope, element) {
						var chart, 
							chartType = scope.chartData.type,
							queuedData = null;

						scope.changeData = function (shortName) {
							var newData = _.findWhere(scope.chartData.data, {shortName: shortName});

							if (newData.isLocked && !scope.userConfirmed.status) {
								queuedData = shortName;
								scope.$emit("TRIGGER_REG");
							} else {
								if (!scope.staticCharts) {
									if (chartType === "stacked") {
										chart.changeData(newData.dataset, newData.sample, newData.title, newData.callout);
									} else if (chartType === "simple") {
										chart.changeData(newData.dataset, newData.sample, newData.title, newData.set);
									}
								}
								scope.currentData = newData.shortName;
								queuedData = null;						
							}
						};

						if (!scope.staticCharts) {
							element.find('.chart').children().remove();

							if (chartType === "stacked") {
								chart = stackedBarChart(element.find('.chart').get(0), scope.initialData.dataset,
														scope.initialData.sample, scope.initialData.title,
														scope.initialData.callout);
							} else if (chartType === "simple") {
								chart = simpleBarChart(element.find('.chart').get(0), scope.initialData.dataset,
														scope.initialData.sample, scope.initialData.title, scope.initialData.set);
							}
							$(window).on('resize', chart.resizeChart);


							scope.$watch('chartData', function () {
								var newDataName = _.findWhere(scope.chartData.data, { isDefault: true }).shortName;
								
								scope.currentData = newDataName;

								element.find('.chart').html('');
								chartType = scope.chartData.type;
								var newData = _.findWhere(scope.chartData.data, {shortName: newDataName});

								if (chartType === "stacked") {
									chart = stackedBarChart(element.find('.chart').get(0), newData.dataset,
															newData.sample, newData.title,
															newData.callout);
								} else if (chartType === "simple") {
									chart = simpleBarChart(element.find('.chart').get(0), newData.dataset,
															newData.sample, newData.title, newData.set);
								}

								$(window).on('resize', chart.resizeChart);
							});
						}

						scope.$on("REG_CONFIRMED", function () {
							if (queuedData !== null) {
								scope.changeData(queuedData);
							}
						});

					}
				};
			}])
			.directive('rmcpCtaBar', function () {
				return {
					template: '<div id="cta-banner"><div class="container">' +
						'<a class="btn btn-danger btn-lg" href="/explore-findings">Explore the Findings</a>' +
						'<a class="btn btn-danger btn-lg" href="/report">Get the Report</a></div></div>',
					restrict: "C",
					replace: true,
					link: function (s, element) {
						element.headroom({
							offset: 300
						});
					}
				};
			})
			.directive('rmcpIncludeStellar', function () {
				return {
					restrict: 'C',
					link: function (scope, element) {
						if (Modernizr.ie8 || Modernizr.ie9) { return; }

						$(window).data('plugin_stellar', null);

						$.stellar({
							horizontalScrolling: false,
							verticalOffset: 40
						});
					}
				};
			})
			.directive('rmcpShareButtons', function () {
				return {
					restrict: "C",
					template: '<ul class="list-inline"><li class="twitter"></li><li class="facebook"></li><li class="linkedin"></li></ul>',
					controller: ['$scope', '$location', function ($scope, $location) {
						$scope.url = $location.absUrl();
					}],
					link: function (scope, element, attr) {
						element.find('.twitter').sharrre({
							share: {
								twitter: true
							},
							url: attr.shareUrl,
							text: attr.shareText,
							enableHover: false,
  							template: '<a class="btn btn-xs btn-twitter" href="#"><span class="fa fa-twitter"></span>&nbsp;&nbsp;Tweet</div></a>',
							  buttons: { twitter: {via: 'planview', hashtags: attr.shareHash}},
							  click: function(api, options){
							    api.simulateClick();
							    api.openPopup('twitter');
							  }
						});
						element.find('.facebook').sharrre({
						  share: {
						    facebook: true
						  },
							url: attr.shareUrl,
							text: attr.shareText,
						  template: '<a class="btn btn-xs btn-facebook" href="#"><span class="fa fa-facebook"></span>&nbsp;&nbsp;Like</div></a>',
						  enableHover: false,
						  buttons: { facebook: {action: 'like'}},
						  click: function(api, options){
						    api.simulateClick();
						    api.openPopup('facebook');
						  }
						});
						element.find('.linkedin').sharrre({
						  share: {
						    linkedin: true
						  },
							url: attr.shareUrl,
							text: attr.shareText,
						  template: '<a class="btn btn-xs btn-linkedin" href="#"><span class="fa fa-linkedin"></span>&nbsp;&nbsp;Share</div></a>',
						  enableHover: false,
						  click: function(api, options){
						    api.simulateClick();
						    api.openPopup('linkedin');
						  }
						});
					}
				};
			})
			.directive('rmcpToolTip', function () {
				return {
					restrict: 'C',
					link: function (scope, element, attr) {
						element.attr('data-toggle', 'tooltip')
							.tooltip({ title: attr.rmcpToolTitle, placement: 'bottom' });
					}
				};
			})
			.directive('rmcpScrollTop', function () {
				return {
					restrict: 'C',
					controller: ['$scope', function ($scope) {
						$scope.$on("$routeChangeSuccess", function () {
							$scope.scrollToTop();
						});
					}],
					link: function (scope) {
						scope.scrollToTop = function () {
							window.scrollTo(0,0);
						};
					}
				};
			});
	});
