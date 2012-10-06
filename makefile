CC = java -jar ./build/compiler.jar
CFlAGS = WHITESPACE_ONLY
SOURCES_FILES = class4js.js \
								type_exception.js \
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
	$(CC) --compilation_level $(CFlAGS) --js $^ --js_output_file $@

clean-browser:
	rm -f class4js.js
	rm -f class4js.min.js

clean: clean-node clean-browser
