[jQuery Scalable](http://sbp.so/scalable): Vector Image Scaling UI
===

**jQuery Scalable** adds interface controls to vector images to allow the user to scale them up or down to different sizes. Aspect ratio is always preserved.

The interface is a translucent top bar overlay (called the *bar*) on the image, with a left-right arrow on the right hand side. The user can drag the left-right arrow (called the *handle*) to scale the image. Clicking on the *bar* scales the image back to its original size.

This functionality is implemented as a jQuery module, and depends on the jQuery UI Resizable module from the jQuery UI project.

Download and use
---

There are two flavours of jQuery Scalable that can be downloaded, a manual flavour and an automatic flavour. The manual flavour requires you to call the `.scalable()` method on the elements you want to be scalable. The automatic flavour will do that automatically on any element with the "scalable" class set.

* **Manual**: [jquery.scalable.min.js](jquery.scalable.min.js)
* **Automatic**: [jquery.scalable.auto.min.js](jquery.scalable.auto.min.js)

Example of the manual flavour:

```html
<script src="jquery-1.7.1.min.js"></script>
<script src="jquery-ui-1.8.16.custom.min.js"></script>
<script src="jquery.scalable.min.js"></script>
<script>
$(function () {
	$("img[src=~.svg]").scalable();
});
</script>

<p><img src="example.svg" width="320" height="280">
```

This makes all images whose `src` attribute values end in ".svg" use the scalable interface.

Example of the automatic flavour:

```html
<script src="jquery-1.7.1.min.js"></script>
<script src="jquery-ui-1.8.16.custom.min.js"></script>
<script src="jquery.scalable.auto.min.js"></script>

<p><img src="example.svg" width="320" height="280" class="scalable">
```

Here the image is automatically given the scalable interface because it has `class="scalable"` set.

Usage notes
---

You must set at least a `width` attribute on `<img>` elements for the code to work, a limitation due to the use of jQuery UI Resizable. You can attempt to use the scalable interface on any element, but vector images are the core intended functionality, and only those have been tested rigorously.

The code should work with jQuery 1.4 onwards. The code has not been tested with versions of jQuery UI prior to 1.8.16. There is an extensive test suite. The code is known to not work in any version if IE up to and including IE9. It is not known whether this is a bug in IE9, or a bug in jQuery UI. If the code does not work in other browsers, please [submit an issue](issues/new).

If you use the automatic flavour on your site but still want to disable it on a case by case basis, for example if you were including the automatic flavour in a template in a CMS, then you can do so using this code in a ```<script>``` element in the head of your document:

```js
$(document).data("scalable", {auto: false});
```

Public API
---

* **.scalable()**

	Sets up the scalable

* **.scalable(options)**

	Where **options** is a object map of options. The only supported option is `arrow`. This is the URL to a background image for the *handle*. The background image should be 72px x 48px. Example:

	```js
	.scalable({arrow: "arrow.svg"})
	```

* **.scalable("reset")**

	Resets the scalable object back to its original size.

* **.scalable("destroy")**

	Removes the scalable interface, restoring the element to its original appearance.

Feedback
---

Send questions and comments to @sbp.
