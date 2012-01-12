// Derived from https://gist.github.com/1305062

if (phantom.args.length !== 1) {
    console.log('Usage: phantomjs summary.js url');
    phantom.exit(2);
}

var page = new WebPage();
page.open(phantom.args[0], function (status) {
	if (status !== "success") {
		console.log("Unable to load the url");
		phantom.exit(1);
	}

	var name = phantom.args[0].replace(/.*\//, ''),
		start = new Date().getTime();

	setInterval(function () {
		var completed = page.evaluate(function () {
			var el = document.getElementById("qunit-testresult");
			return (el && el.innerText.match("completed"));
		});

		if (completed) {
			var results = page.evaluate(function () { 
				var value = function (selector) {
					try {
						var elems = document.body.querySelectorAll(selector);
						return parseInt(elems[0].innerHTML, 10);
					} catch (error) {
						console.log("Error: " + error);
						phantom.exit(1);
					}
				};
				return {pass: value("#qunit-testresult .passed"),
					fail: value("#qunit-testresult .failed"),
					total: value("#qunit-testresult .total")};
			});

			var pass = " (" + results.pass + "/" + results.total + " passes)";
			if (results.fail) {
				console.log("Error: FAILURES: " + results.fail + pass);
				phantom.exit(1);
			}
			console.log(name + ": tests passed!" + pass);
			phantom.exit(0);
		} else if ((new Date().getTime() - start) > 3500) {
			console.log("Error: Timeout in runner");
			phantom.exit(1);
		}
	}, 50);
});
