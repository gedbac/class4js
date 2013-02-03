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
								module_handler.js \
								module_configuration.js \
								module.js

all: build-node build-browser

clean: clean-node clean-browser

run-examples: run-examples-node run-examples-browser

build-node: lib/class4js.js

lib/class4js.js: clean-node
	echo "\"use strict\";\n" >> $@
	cat $(addprefix src/,$(SOURCES_FILES)) >> $@

clean-node:
	rm -f ./lib/class4js.js

run-examples-node:
	node ./examples/node/class.js
	node ./examples/node/abstract_class.js
	node ./examples/node/static_class.js
	node ./examples/node/constants.js
	node ./examples/node/fields.js
	node ./examples/node/inheritance.js
	node ./examples/node/interface.js
	node ./examples/node/object_factory.js
	node ./examples/node/properties.js
	node ./examples/node/static.js
	node ./examples/node/extension.js
	node ./examples/node/multiple_interface_inheritance.js
	node ./examples/node/type_checking.js
	node ./examples/node/namespace.js
	node ./examples/node/module_inline.js
	#node ./examples/node/module_with_arguments.js
	node ./examples/node/enum.js

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

run-examples-browser:
	xdg-open ./examples/browser/index.html

run-examples-phantomjs:
	phantomjs ./examples/node/class.js
	phantomjs ./examples/node/abstract_class.js
	phantomjs ./examples/node/static_class.js
	phantomjs ./examples/node/constants.js
	phantomjs ./examples/node/fields.js
	phantomjs ./examples/node/inheritance.js
	phantomjs ./examples/node/interface.js
	phantomjs ./examples/node/object_factory.js
	phantomjs ./examples/node/properties.js
	phantomjs ./examples/node/static.js
	phantomjs ./examples/node/extension.js
	phantomjs ./examples/node/multiple_interface_inheritance.js
	phantomjs ./examples/node/type_checking.js
	phantomjs ./examples/node/namespace.js
	phantomjs ./examples/node/module_inline.js
	#phantomjs ./examples/node/module_with_arguments.js
	phantomjs ./examples/node/enum.js
