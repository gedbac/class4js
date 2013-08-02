@echo off

set NODE="%ProgramFiles%\nodejs\node.exe"
set PHANTOMJS="%ProgramFiles%\phantomjs\phantomjs.exe"
set JAVA="%ProgramFiles(x86)%\Java\jre7\bin\java.exe"

set SOURCES_FILES= ^
	.\src\Package.js ^
	.\src\Compatability.js ^
	.\src\TypeException.js ^
	.\src\Namespace.js ^
	.\src\TypeBuilder.js ^
	.\src\TypeExtension.js ^
	.\src\Class.js ^
	.\src\Interface.js ^
	.\src\ObjectFactory.js ^
	.\src\Enum.js ^
	.\src\IInterceptor.js ^
	.\src\InvocationType.js ^
	.\src\Invocation.js ^
	.\src\IInterceptor.js ^
	.\src\Proxy.js ^
	.\src\ModuleException.js ^
	.\src\ModuleConfiguration.js ^
	.\src\Configuration.js ^
	.\src\Module.js ^
	.\src\IDisposable.js ^
	.\src\EventException.js ^
	.\src\IEventTarget.js ^
	.\src\IEvent.js ^
	.\src\Event.js ^
	.\src\IEventListener.js ^
	.\src\EventDispatcher.js

if /i "%1"=="all" goto :all
if /i "%1"=="clean" goto :clean
if /i "%1"=="test" goto :test
if /i "%1"=="build-node" goto :build-node
if /i "%1"=="clean-node" goto :clean-node
if /i "%1"=="test-node" goto :test-node
if /i "%1"=="build-browser" goto :build-browser
if /i "%1"=="clean-browser" goto :clean-browser
if /i "%1"=="test-browser" goto :test-browser
if /i "%1"=="test-phantomjs" goto :test-phantomjs

goto :all

:all
call :build-node
call :build-browser
goto :exit

:clean
call :clean-node
call :clean-browser
goto :exit

:test
call :test-node
call :test-browser
call :test-phantomjs
goto :exit

:build-node
call :clean-node
call :build-browser
copy .\class4js.js .\lib\class4js.js
goto :exit

:clean-node
if exist .\lib\class4js.js (del .\lib\class4js.js)
goto :exit

:test-node
%NODE% ./tests/node/class.js
%NODE% ./tests/node/abstract_class.js
%NODE% ./tests/node/static_class.js
%NODE% ./tests/node/constants.js
%NODE% ./tests/node/fields.js
%NODE% ./tests/node/inheritance.js
%NODE% ./tests/node/interface.js
%NODE% ./tests/node/object_factory.js
%NODE% ./tests/node/properties.js
%NODE% ./tests/node/static.js
%NODE% ./tests/node/extension.js
%NODE% ./tests/node/multiple_interface_inheritance.js
%NODE% ./tests/node/type_checking.js
%NODE% ./tests/node/namespace.js
%NODE% ./tests/node/module_inline.js
%NODE% ./tests/node/module_with_arguments.js
%NODE% ./tests/node/enum.js
%NODE% ./tests/node/interface_proxy.js
%NODE% ./tests/node/class_proxy.js
%NODE% ./tests/node/event.js
%NODE% ./tests/node/custom_event.js
%NODE% ./tests/node/namespace_within_class.js
goto :exit

:build-browser
call :clean-browser
echo var class4js = (function (global) {>> .\class4js.js
echo.>> .\class4js.js
echo var exports = {};>> .\class4js.js
echo.>> .\class4js.js
%NODE% .\build\cat.js %SOURCES_FILES% >> .\class4js.js
echo.>> .\class4js.js
echo.>> .\class4js.js
echo return exports;>> .\class4js.js
echo.>> .\class4js.js
echo }(typeof global !== 'undefined' ? global : window));>> .\class4js.js
echo.>> .\class4js.js
echo if (typeof module !== 'undefined' ^&^& module !== null) {>> .\class4js.js
echo   module.exports = class4js;>> .\class4js.js
echo }>> .\class4js.js
%NODE% .\build\include_strict_mode.js .\class4js.js
%JAVA% -jar ./build/yuicompressor-2.4.8.jar --type js --nomunge --preserve-semi --disable-optimizations .\class4js.js -o .\class4js.min.js
goto :exit

:clean-browser
if exist .\class4js.js (del .\class4js.js)
if exist .\class4js.min.js (del .\class4js.min.js)
goto :exit

:test-browser
start .\tests\browser\index.html
goto :exit

:test-phantomjs
%PHANTOMJS% ./tests/node/class.js
%PHANTOMJS% ./tests/node/abstract_class.js
%PHANTOMJS% ./tests/node/static_class.js
%PHANTOMJS% ./tests/node/constants.js
%PHANTOMJS% ./tests/node/fields.js
%PHANTOMJS% ./tests/node/inheritance.js
%PHANTOMJS% ./tests/node/interface.js
%PHANTOMJS% ./tests/node/object_factory.js
%PHANTOMJS% ./tests/node/properties.js
%PHANTOMJS% ./tests/node/static.js
%PHANTOMJS% ./tests/node/extension.js
%PHANTOMJS% ./tests/node/multiple_interface_inheritance.js
%PHANTOMJS% ./tests/node/type_checking.js
%PHANTOMJS% ./tests/node/namespace.js
%PHANTOMJS% ./tests/node/module_inline.js
%PHANTOMJS% ./tests/node/module_with_arguments.js
%PHANTOMJS% ./tests/node/enum.js
%PHANTOMJS% ./tests/node/interface_proxy.js
%PHANTOMJS% ./tests/node/class_proxy.js
%PHANTOMJS% ./tests/node/event.js
%PHANTOMJS% ./tests/node/custom_event.js
%PHANTOMJS% ./tests/node/namespace_within_class.js
goto :exit

:exit
goto :EOF