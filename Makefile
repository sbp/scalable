# Makefile for jQuery Scalable
# Documentation: $ make help

SHELL = /bin/sh

.PHONY: all build
all build: jquery.scalable.min.js jquery.scalable.auto.min.js
	@## Create minified production files

jquery.scalable.min.js: src/jquery.scalable.js
	yuicompressor $< > $@

jquery.scalable.auto.min.js: src/jquery.scalable.auto.js
	yuicompressor $< > $@

src/jquery.scalable.auto.js: src/jquery.scalable.js src/jquery.scalable.ready.js
	cat $^ > $@

.PHONY: check test
check test:
	## Lint the source and run the test suite
	jshint src/*.js
	jshint test/*.js

	@echo
	@node test/version.js '~1.4'
	@phantomjs test/summary.js file://$(PWD)/test/1.4.html
	@phantomjs test/summary.js file://$(PWD)/test/1.5.html
	@phantomjs test/summary.js file://$(PWD)/test/1.6.html
	@phantomjs test/summary.js file://$(PWD)/test/1.7.1.html
	@phantomjs test/summary.js file://$(PWD)/test/1.7.1-auto.html
	@phantomjs test/summary.js file://$(PWD)/test/1.7.1-auto-off.html

.PHONY: clean
clean:
	## Remove minified production files
	@# Note: Using $< would build the script as a dependency
	-rm jquery.scalable.min.js

.PHONY: commit
commit: check
	## Commit the code and push to github
	git add .
	git commit -a && git push origin master

.PHONY: help targets
help targets: $(lastword $(MAKEFILE_LIST))
	@## Show Makefile targets and their functions
	@sed -n '/^.@*## /{s/@*## //;x;s/:.*//;G;p;};h' $<

.PHONY: qunit
qunit:
	## Update QUnit from the jQuery website
	@# Note: Deletes old files before getting the new

	-rm test/qunit/qunit-git.css test/qunit/qunit-git.js
	wget -nv -P test/qunit http://code.jquery.com/qunit/qunit-git.css
	wget -nv -P test/qunit http://code.jquery.com/qunit/qunit-git.js

# tagging
# $ git tag -a 0.0.1 -m "Version 0.0.1, initial beta release"
# $ git push --tags
# automatically update test to the latest QUnit?
