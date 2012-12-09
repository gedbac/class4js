CC = java -jar ./build/yuicompressor-2.4.8.jar
CFlAGS = WHITESPACE_ONLY
SOURCES_FILES = class4js.js \
								type_exception.js \
								namespace.js \
								type_builder.js \
								class.js \
								interface.js \
								object_factory.js

all: build-node build-browser

build-node: lib/class4js.js

lib/class4js.js: clean-node
	echo "module.exports = (function () {\n" >> $@
	echo "\"use strict\";\n" >> $@
	cat $(addprefix src/,$(SOURCES_FILES)) >> $@
	echo "return class4js;" >> $@
	echo "\n}());" >> $@

clean-node:
	rm -f ./lib/class4js.js

build-browser: class4js.min.js

class4js.js: clean-browser
	echo "var class4js = (function (global) {\n" >> $@
	echo "\"use strict\";\n" >> $@
	cat $(addprefix src/,$(SOURCES_FILES)) >> $@
	echo "return class4js;" >> $@
	echo "\n}(window));" >> $@

class4js.min.js: class4js.js
	$(CC) --type js --nomunge --preserve-semi --disable-optimizations $^ -o $@
	node ./build/include-strict-mode.js

clean-browser:
	rm -f class4js.js
	rm -f class4js.min.js

clean: clean-node clean-browser

samples-node:
	node ./samples/node/create.js
	node ./samples/node/constants.js
	node ./samples/node/fields.js
	node ./samples/node/inheritance.js
	node ./samples/node/interface.js
	node ./samples/node/object_factory.js
	node ./samples/node/properties.js
	node ./samples/node/static.js
	node ./samples/node/extension.js
	node ./samples/node/multiple_interface_inheritance.js
	node ./samples/node/type_checking.js
	node ./samples/node/namespace.js

samples-browser:
	xdg-open ./samples/browser/index.html
