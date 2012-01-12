$(function () {
	// $(document).data("scalable", {auto: false});
	if ($(document).data("scalable")) {
		if ($(document).data("scalable").auto === false) {
			return;
		}
	}
	$(".scalable").scalable();
});
