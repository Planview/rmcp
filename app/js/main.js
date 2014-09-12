'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		text: '../bower_components/requirejs-text/text',
		vendorMunchkin: '//munchkin.marketo.net/munchkin',
		Cookies: '../bower_components/cookies-js/dist/cookies.min',
		underscore: '../bower_components/underscore/underscore',
		angularCookies: '../bower_components/angular-cookies/angular-cookies.min',
		SmartForms: '//www.reachforce.com/smartforms/v3-0/SmartForms',
		d3: '../bower_components/d3/d3.min',
		r2d3: '../bower_components/r2d3/r2d3.min',
		Headroom: '../bower_components/headroom.js/dist/headroom.min',
		jqHeadroom: '../bower_components/headroom.js/dist/jQuery.headroom.min',
		bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
		angulartics: '../bower_components/angulartics/dist/angulartics.min',
		angularticsGa: '../bower_components/angulartics/dist/angulartics-ga.min',
		angularticsMarketo: '../bower_components/angulartics/dist/angulartics-marketo.min',
		googleAnalytics: '//www.google-analytics.com/analytics'
	},
	shim: {
		'angular' : {
			deps: ['jquery'],
			'exports' : 'angular'
		},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'angularCookies': {
			deps: ['angular']
		},
		'vendorMunchkin': {
			'exports': 'Munchkin'
		},
		'SmartForms': {
			deps: ['shims/smartforms'],
			'exports': 'sf$'
		},
		'Headroom': {
			'exports': 'Headroom'
		},
		'jqHeadroom': {
			deps: ['jquery', 'Headroom']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'angulartics': {
			deps: ['angular']
		},
		'angularticsGa': {
			deps: ['angular', 'angulartics', 'ga']
		},
		'angularticsMarketo': {
			deps: ['angular', 'angulartics', 'munchkin']
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

if (!Modernizr.svg || !Modernizr.inlinesvg) {
	require.config({
		map: {
			'*': {
				'd3': 'r2d3'
			}
		}
	});
}

require( [
	'angular',
	'app',
	'routes',
	'munchkin',
	'jquery',
	'ga',
	'jqHeadroom',
	'bootstrap'
], function(angular, app, routes, Munchkin, $, ga) {

	$("#navbar").headroom({
		offset: 200,
		onUnpin: function () {
			$('#navbar').find('.dropdown.open').removeClass('open');
		}
	});

	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
