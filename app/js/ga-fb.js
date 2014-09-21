define(function () {
	window.ga = function () {
		return;
	}
	console.warn("Google Analytics didn't load");
	return window.ga;
})