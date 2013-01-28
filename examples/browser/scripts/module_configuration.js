$run("Module Configuration", function () {

  class4js.Module.configure([
    {
      name: "*",
      path: "./scripts/modules/"
    },
    {
      name: "module4",
      path: "./scripts/module4.js"
    }
  ]);

  $module(function (module4, module5, exports) {

    $complete("Module Configuration");

  }, ["module4", "module5"]);

});
