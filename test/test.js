reset();

test("Method existence", function () {
	expect(1);
	var div = $("<div></div>");
	ok(div.scalable, "div.scalable");
});

test("Setup structure", function () {
	expect(10);
	var s = setup();

	ok(s.target.is("img"), "Image is an img element");
	ok(s.handle.is("div"), "Handle is a div element");
	ok(s.bar.is("div"), "Bar is a div element");
	ok(s.wrapper.is("div"), "Wrapper is a div element");

	ok(s.target.hasClass("ui-resizable"), "Image has resizable class");
	ok(s.handle.hasClass("ui-resizable-handle"), "Handle has handle class");
	ok(s.handle.hasClass("ui-resizable-e"),
		"Handle has handle orientation class");
	ok(s.bar.hasClass("ui-scalable-bar"), "Bar has bar class");
	ok(s.wrapper.hasClass("ui-wrapper"), "Wrapper has wrapper class");
	ok(s.wrapper.hasClass("ui-resizable-autohide"),
		"Wrapper has autohide class");
});

test("Simple scale", function () {
	expect(4);
	var s = setup();

	drag(s.handle, 48, 0);
	equals(s.target.width(), 528, "Enlarged result is 48px wider");
	equals(s.target.height(), 352, "Enlarged result is 32px taller");

	s = setup();
	drag(s.handle, -48, 0);
	equals(s.target.width(), 432, "Shrunk result is 48px thinner");
	equals(s.target.height(), 288, "Shrunk result is 32px shorter");
});

test("Double call", function () {
	expect(7);
	var s = setup();
	s.target.scalable();

	ok($(".ui-resizable", s.wrapper).size() === 1, "Only one image");
	ok($(".ui-resizable-handle", s.wrapper).size() === 1, "Only one handle");
	ok($(".ui-scalable-bar", s.wrapper).size() === 1, "Only one bar");
	ok($(".ui-wrapper", s.wrapper).size() === 0, "No wrapper in the wrapper");
	ok((!s.wrapper.parent().hasClass("ui-wrapper")),
		"No wrapper around the wrapper");

	drag(s.handle, 48, 0);
	equals(s.target.width(), 528, "Enlarged result is 48px wider");
	equals(s.target.height(), 352, "Enlarged result is 32px taller");
});

test("Multiple scales", function () {
	expect(2);
	var s = setup();

	drag(s.handle, 48, 0);
	drag(s.handle, 48, 0);
	drag(s.handle, -48, 0);
	equals(s.target.width(), 528, "Enlarged result is 48px wider");

	drag(s.handle, -48, 0);
	drag(s.handle, -48, 0);
	drag(s.handle, -48, 0);
	equals(s.target.width(), 384, "Shrunk result is 96px thinner");
});

test("Minimum size", function () {
	var s = setup();
	drag(s.handle, -480 + 72, 0);
	equals(s.target.width(), 72, "Minimum width is 72px");
	equals(s.target.height(), 48, "Minimum height is 48px");

	s = setup();
	drag(s.handle, -480, 0);
	equals(s.target.width(), 72, "Minimum width is 72px");
	equals(s.target.height(), 48, "Minimum height is 48px");

	s = setup();
	drag(s.handle, -480 - 96, 0);
	equals(s.target.width(), 72, "Minimum width is 72px");
	equals(s.target.height(), 48, "Minimum height is 48px");
});

test("Reset to original size", function () {
	expect(4);
	var s = setup();

	drag(s.handle, 96, 0);
	equals(s.target.width(), 576, "Enlarged result is 96px wider");
	equals(s.target.height(), 384, "Enlarged result is 64px taller");
	s.target.scalable("reset");

	equals(s.target.width(), 480, "Reset to original width");
	equals(s.target.height(), 320, "Reset to original height");
});

test("Added border before creation", function () {
	expect(6); // 8
	reset();
	var s = setup2({border: "64px solid #ccc"});
	var w = s.wrapper.width();
	var h = s.wrapper.height();

	drag(s.handle, 24, 0);
	equals(s.target.width(), 504, "Enlarged result is 24px wider");
	// bug! the border size doesn't scale!
	// equals(s.target.height(), 336, "Enlarged result is 16px taller");
	s.target.scalable("reset");

	drag(s.handle, 96, 0);
	equals(s.target.width(), 576, "Enlarged result is 96px wider");

	// regression test: bug in 0.0.1
	// equals(s.target.height(), 384, "Enlarged result is 64px taller");
	s.target.scalable("reset");

	equals(s.target.width(), 480, "Reset to original width");
	equals(s.target.height(), 320, "Reset to original height");

	// regression tests: bugs in 0.0.1
	equals(s.wrapper.width(), w, "Reset to original wrapper width");
	equals(s.wrapper.height(), h, "Reset to original wrapper height");
});

test("Added border after creation", function () {
	expect(4);
	var s = setup();

	s.target.css("border", "64px solid #ccc");

	drag(s.handle, 96, 0);
	equals(s.target.width(), 576, "Enlarged result is 96px wider");
	equals(s.target.height(), 384, "Enlarged result is 64px taller");
	s.target.scalable("reset");

	equals(s.target.width(), 480, "Reset to original width");
	equals(s.target.height(), 320, "Reset to original height");
});

test("Two scalable elements", function () {
	expect(18);
	reset();
	var a = setup2();
	var b = setup2();

	ok($(".ui-resizable", a.wrapper).size() === 1,
		"Only one image (a)");
	ok($(".ui-resizable-handle", a.wrapper).size() === 1,
		"Only one handle (a)");
	ok($(".ui-scalable-bar", a.wrapper).size() === 1,
		"Only one bar (a)"); // regression test: bug in 0.0.1
	ok($(".ui-wrapper", a.wrapper).size() === 0,
		"No wrapper in the wrapper (a)");
	ok((!a.wrapper.parent().hasClass("ui-wrapper")),
		"No wrapper around the wrapper (b)");

	ok($(".ui-resizable", b.wrapper).size() === 1,
		"Only one image (b)");
	ok($(".ui-resizable-handle", b.wrapper).size() === 1,
		"Only one handle (b)");
	ok($(".ui-scalable-bar", b.wrapper).size() === 1,
		"Only one bar (b)");
	ok($(".ui-wrapper", b.wrapper).size() === 0,
		"No wrapper in the wrapper (b)");
	ok((!b.wrapper.parent().hasClass("ui-wrapper")),
		"No wrapper around the wrapper (b)");

	drag(a.handle, 96, 0);
	equals(a.target.width(), 576, "Enlarged a is 96px wider");
	equals(a.target.height(), 384, "Enlarged a is 64px taller");

	drag(b.handle, 64, 0);
	equals(b.target.width(), 544, "Enlarged b is 64px wider");
	equals(b.target.height(), 362, "Enlarged b is 42px taller");

	a.target.scalable("reset");
	b.target.scalable("reset");

	equals(a.target.width(), 480, "Reset a to original width");
	equals(a.target.height(), 320, "Reset a to original height");
	equals(b.target.width(), 480, "Reset b to original width");
	equals(b.target.height(), 320, "Reset b to original height");
});

test("Large size", function () {
	expect(4);
	var s = setup();

	drag(s.handle, 4320, 0);
	equals(s.target.width(), 4800, "Scaled up to 4800px width");
	equals(s.target.height(), 3200, "Scaled up to 3200px height");

	s.target.scalable("reset");
	equals(s.target.width(), 480, "Reset to original width");
	equals(s.target.height(), 320, "Reset to original height");
});

test("Resizing class", function() {
	expect(3);
	var s = setup();

	drag(s.handle, 50, 50, function () {
		ok(s.wrapper.hasClass("ui-resizable-resizing"),
			"Resizing class when dragging handle");
	});

	ok((!s.wrapper.hasClass("ui-resizable-resizing")),
		"No resizing class after dragging handle");
   equals(s.target.width(), 530, "Scaled correctly");
});

test("Scalable element can be hidden", function () {
	expect(2);
	var s = setup();

	s.target.hide();
	ok((!s.target.is(":visible")), "Element is hidden");
	s.target.show();
	ok(s.target.is(":visible"), "Element is visible");
});

test("Always show handle when dragging", function () {
	expect(3);
	var s = setup();

	drag(s.handle, 50, -50, function () {
		ok(s.handle.is(":visible"), "Handle is visible when dragging");
	});
	ok(s.handle.is(":visible"), "Handle is visible before mouseout");
	s.handle.simulate("mouseout");
	ok((!s.handle.is(":visible")), "Handle is hidden after dragging");
});

// Test without @height, and without @width and @height
// Test previous versions of jQuery
