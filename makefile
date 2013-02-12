CC = java -jar ./build/yuicompressor-2.4.8.jar
CFlAGS = WHITESPACE_ONLY
SOURCES_FILES =	class4js.js \
								type_exception.js \
								namespace.js \
								type_builder.js \
								type_extension.js \
								class.js \
								interface.js \
								object_factory.js \
								enum.js \
								module_exception.js \
								module_configuration.js \
								configuration.js \
								module.js

all: build-node build-browser

clean: clean-node clean-browser

test: test-node test-phantomjs test-browser

build-node: lib/class4js.js

lib/class4js.js: clean-node
	echo "\"use strict\";\n" >> $@
	cat $(addprefix src/,$(SOURCES_FILES)) >> $@

clean-node:
	rm -f ./lib/class4js.js

test-node:
	node ./tests/node/class.js
	node ./tests/node/abstract_class.js
	node ./tests/node/static_class.js
	node ./tests/node/constants.js
	node ./tests/node/fields.js
	node ./tests/node/inheritance.js
	node ./tests/node/interface.js
	node ./tests/node/object_factory.js
	node ./tests/node/properties.js
	node ./tests/node/static.js
	node ./tests/node/extension.js
	node ./tests/node/multiple_interface_inheritance.js
	node ./tests/node/type_checking.js
	node ./tests/node/namespace.js
	node ./tests/node/module_inline.js
	node ./tests/node/module_with_arguments.js
	node ./tests/node/enum.js

build-browser: class4js.min.js

class4js.js: clean-browser
	echo "var class4js = (function (global) {\n" >> $@
	echo "\"use strict\";\n" >> $@
	echo "var exports = {};\n" >> $@
	cat $(addprefix src/,$(SOURCES_FILES)) >> $@
	echo "return exports;" >> $@
	echo "\n}(window));" >> $@

class4js.min.js: class4js.js
	$(CC) --type js --nomunge --preserve-semi --disable-optimizations $^ -o $@
	node ./build/include-strict-mode.js

clean-browser:
	rm -f class4js.js
	rm -f class4js.min.js

test-browser:
	xdg-open ./examples/browser/index.html

test-phantomjs:
	phantomjs ./tests/node/class.js
	phantomjs ./tests/node/abstract_class.js
	phantomjs ./tests/node/static_class.js
	phantomjs ./tests/node/constants.js
	phantomjs ./tests/node/fields.js
	phantomjs ./tests/node/inheritance.js
	phantomjs ./tests/node/interface.js
	phantomjs ./tests/node/object_factory.js
	phantomjs ./tests/node/properties.js
	phantomjs ./tests/node/static.js
	phantomjs ./tests/node/extension.js
	phantomjs ./tests/node/multiple_interface_inheritance.js
	phantomjs ./tests/node/type_checking.js
	phantomjs ./tests/node/namespace.js
	phantomjs ./tests/node/module_inline.js
	phantomjs ./tests/node/module_with_arguments.js
	phantomjs ./tests/node/enum.js
