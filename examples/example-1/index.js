"use strict";
exports.__esModule = true;
var hookis_1 = require("@ticou/hookis");
// register handler
var handler = function (params, ret) {
    console.log(params);
    console.log(ret);
};
// register hooks
var hookType = 'test';
for (var i = 1; i <= 3; i++) {
    var hookName = 'module' + i;
    hookis_1.hookis.registerBefore(hookName, hookType, handler);
    hookis_1.hookis.registerAfter(hookName, hookType, handler);
    hookis_1.hookis.register(hookName, hookType, handler);
}
// list all registered hooks
console.log(hookis_1.hookis.getAllHandlers());
