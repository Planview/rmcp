define(['vendorMunchkin'], function (Munchkin) {
	if (!window.MUNCHKIN_INITIALIZED === true) {
		Munchkin.init('587-QLI-337');
		window.MUNCHKIN_INITIALIZED = true;
	}

	return function () {
		return window.Munchkin;
	};
});