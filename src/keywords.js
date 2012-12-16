function register(scope) {
  scope.$namespace = Namespace.create;
  scope.$class = Class.create;
  scope.$interface = Interface.create;
  scope.$is = Interface.instanceOf;
  scope.$create = ObjectFactory.create;
  scope.$init = ObjectFactory.initialize;
}

if (global) {
  register(global);
}
