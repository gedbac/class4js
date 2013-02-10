$run("Module Configuration", function () {

  class4js.Module.configure([
    {
      name: "*",
      path: "./scripts/modules/"
    },
    {
      name: "module4",
      path: "./scripts/modules/module4.js"
    }
  ]);

  $module(function (module4, module5, exports) {

    $assert(exports);
    $assert(module4);
    $assert(module4.version === "module4");
    $assert(module5); 
    $assert(module5.version === "module5");

    $complete("Module Configuration");

  }, ["module4", "module5"]);

});
