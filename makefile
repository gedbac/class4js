CC = java -jar ./build/yuicompressor-2.4.8.jar
SOURCES_FILES =	Package.js \
				Compatability.js \
				TypeException.js \
				Namespace.js \
				TypeBuilder.js \
				TypeExtension.js \
				Class.js \
				Interface.js \
				ObjectFactory.js \
				Enum.js \
				IInterceptor.js \
				InvocationType.js \
				Invocation.js \
				IInterceptor.js \
				Proxy.js \
				ModuleException.js \
				ModuleConfiguration.js \
				Configuration.js \
				Module.js \
				IDisposable.js \
				EventException.js \
				IEventTarget.js \
				IEvent.js \
				Event.js \
				IEventListener.js \
				EventDispatcher.js

all: build-node build-browser

clean: clean-node clean-browser

test: test-node test-phantomjs test-browser

build-node: lib/class4js.js

lib/class4js.js: class4js.js
	cp class4js.js ./lib/class4js.js

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
	node ./tests/node/interface_proxy.js
	node ./tests/node/class_proxy.js
	node ./tests/node/event.js
	node ./tests/node/custom_event.js

build-browser: class4js.min.js

class4js.js: clean
	echo "var class4js = (function (global) {" >> $@
	echo >> $@
	echo "var exports = {};">> $@
	echo >> $@
	node ./build/cat.js $(addprefix src/,$(SOURCES_FILES)) >> $@
	echo >> $@
	echo >> $@
	echo "return exports;" >> $@
	echo >> $@
	echo "}(typeof global !== 'undefined' ? global : window));" >> $@
	echo >> $@
	echo "if (typeof module !== 'undefined' && module !== null) {" >> $@
	echo "  module.exports = class4js;" >> $@
	echo "}" >> $@
	node ./build/include_strict_mode.js $@

class4js.min.js: class4js.js   
	$(CC) --type js --nomunge --preserve-semi --disable-optimizations $^ -o $@
	node ./build/include_strict_mode.js

clean-browser:
	rm -f class4js.js
	rm -f class4js.min.js

test-browser:
	xdg-open ./tests/browser/index.html

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
	phantomjs ./tests/node/interface_proxy.js
	phantomjs ./tests/node/class_proxy.js
	phantomjs ./tests/node/event.js
	phantomjs ./tests/node/custom_event.js
