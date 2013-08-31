test: test-node test-phantomjs test-browser

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
	node ./tests/node/modules/main.js
	node ./tests/node/namespace_within_module.js

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
