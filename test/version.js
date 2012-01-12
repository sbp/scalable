var fs = require("fs");

if (process.argv.length !== 3) {
    console.log('Usage: node version.js semver');
    process.exit(2);
}

fs.readFile("package.json", function (error, data) {
	if (error) { throw error; }
	var obj = JSON.parse(data.toString());

	var version = null;
	try { version = obj.dependencies.jquery; }
	catch (error) { throw error; }

	if (version === process.argv[2]) {
		console.log("jQuery Version: " + version);
	} else {
		console.log("Error! Expecting jQuery Version " + process.argv[2]);
		console.log("Got jQuery Version " + version);
		process.exit(1);
	}
});
