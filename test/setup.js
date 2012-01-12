var setup = function () {
	var img = $("<img>").attr({
		id: "test01",
		src: "sample.svg",
		width: "480",
		height: "320"
	});

	var fixture = $("#qunit-fixture")
		.empty()
		.append(img);

	img.scalable();
	var wrapper = img.parent();

	return {
		target: img,
		handle: $(".ui-resizable-handle", wrapper),
		bar: $(".ui-scalable-bar", wrapper),
		wrapper: wrapper
	};
};

$.extend($.simulate.prototype, {
	drag: function( el ) {
		var self = this,
			center = this.findCenter(this.target),
			options = this.options,
			x = Math.floor( center.x ),
			y = Math.floor( center.y ), 
			dx = options.dx || 0,
			dy = options.dy || 0,
			after_mousedown = options.after_mousedown,
			before_mouseup = options.before_mouseup,
			after_mouseup = options.after_mouseup,
			complete = options.complete,
			target = this.target,
			coord = { clientX: x, clientY: y };
		this.simulateEvent( target, "mousedown", coord );
		if (after_mousedown) { after_mousedown(); }
		coord = { clientX: x + 1, clientY: y + 1 };
		this.simulateEvent( document, "mousemove", coord );
		coord = { clientX: x + dx, clientY: y + dy };
		this.simulateEvent( document, "mousemove", coord );
		this.simulateEvent( document, "mousemove", coord );
		if (before_mouseup) { before_mouseup(); }
		this.simulateEvent( target, "mouseup", coord );
		if (after_mouseup) { after_mouseup(); }
		this.simulateEvent( target, "click", coord );
		if (complete) { complete(); }
	}
});

var drag = function (el, dx, dy, before_mouseup) {
	el.simulate("mouseover");

	return el.simulate("drag", {
		dx: dx || 0,
		dy: dy || 0,
		speed: 'sync',
		before_mouseup: before_mouseup
	});
};
