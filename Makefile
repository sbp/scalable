# Makefile for jQuery Scalable
# Documentation: $ make help

SHELL = /bin/sh
makefile = $(lastword $(MAKEFILE_LIST))

.PHONY: all build
all build: jquery.scalable.min.js jquery.scalable.auto.min.js
	@## Create minified production files

.SECONDARY: src/jquery.scalable.auto.js

%.min.js: src/%.js
	uglifyjs $< > $@

%.auto.js: %.js %.ready.js
	cat $^ > $@

.PHONY: check test
check test:
	## Lint the source and run the test suite
	@# Automatically update test to the latest QUnit?
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
	## Remove minified production files and intermediaries
	@# Note: Using $< would build the script as a dependency
	-rm jquery.scalable.min.js
	-rm jquery.scalable.auto.min.js
	-rm src/jquery.scalable.auto.js

.PHONY: commit
commit: check
	## Commit the code and push to github
	git add .
	git commit -a
	git push origin master

.PHONY: help targets
help targets:
	@## Show Makefile targets and their functions
	@sed -n '/^.@*## /{s/@*## //;x;s/:.*//;G;p;};h' $(makefile)

.PHONY: qunit
qunit:
	## Update QUnit from the jQuery website
	@# Note: Deletes old files before getting the new
	-rm test/qunit/qunit-git.css
	-rm test/qunit/qunit-git.js
	wget -nv -P test/qunit http://code.jquery.com/qunit/qunit-git.css
	wget -nv -P test/qunit http://code.jquery.com/qunit/qunit-git.js

.PHONY: tag
tag: check
	## Tag and push to github, e.g. make tag v=0.0.1
ifdef v
	git tag -a $(v) -m "Version $(v)"
	git push --tags
else
	$(error Missing variable. Specify e.g. v=0.0.1 as an argument)
endif
