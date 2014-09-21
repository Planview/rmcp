define(function () {
	window.sf$ = {
		runSFSetup: function () { return; },
		forceSelection: function () { this.doSmartFormSubmit(); }
	};
	console.warn("SmartForms didn't load");
	return window.sf$;
});
