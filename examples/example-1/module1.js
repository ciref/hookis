"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var hookis_1 = require("@ticou/hookis");
var base_object_1 = require("../libs/base.object");
/**
 * Module 1.
 * @package: examples
 */
var Module1 = /** @class */ (function (_super) {
    __extends(Module1, _super);
    function Module1() {
        var _this = _super.call(this) || this;
        hookis_1.hookis.triggerBefore('test', _this.getName().toLowerCase());
        _this.test();
        hookis_1.hookis.triggerAfter('test', _this.getName().toLowerCase());
        return _this;
    }
    Module1.prototype.test = function () {
        hookis_1.hookis.trigger('test', this.getName().toLowerCase(), { module: this.getName() });
        console.log("Runing test on " + this.getName());
    };
    return Module1;
}(base_object_1.BaseObject));
exports.Module1 = Module1;
