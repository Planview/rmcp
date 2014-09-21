({
    baseUrl: "app/js",
    paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		text: '../bower_components/requirejs-text/text',
		vendorMunchkin: 'empty:',
		Cookies: '../bower_components/cookies-js/dist/cookies.min',
		underscore: '../bower_components/underscore/underscore',
		angularCookies: '../bower_components/angular-cookies/angular-cookies.min',
		SmartForms: 'empty:',
		d3: '../bower_components/d3/d3.min',
		Headroom: '../bower_components/headroom.js/dist/headroom.min',
		jqHeadroom: '../bower_components/headroom.js/dist/jQuery.headroom.min',
		bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
		angulartics: '../bower_components/angulartics/dist/angulartics.min',
		angularticsGa: '../bower_components/angulartics/dist/angulartics-ga.min',
		angularticsMarketo: 'angulartics-marketo.min',
		googleAnalytics: 'empty:',
		stellarjs: '../bower_components/stellar.js/jquery.stellar.min',
		sharrre: '../bower_components/sharrre/jquery.sharrre.min',
		'stacked-bar-chart': 'charts-blank',
		'simple-bar-chart': 'charts-blank2'
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
		},
		'stellarjs': {
			deps: ['jquery']
		},
		'sharrre': {
			deps: ['jquery']
		}
	},
    name: "main",
    out: "app/js/main-nod3.js",
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: 'uglify2'
})