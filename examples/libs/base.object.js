"use strict";
exports.__esModule = true;
/**
 * Base object.
 * @package: core.
 */
var BaseObject = /** @class */ (function () {
    function BaseObject() {
    }
    /**
     * Return class base name as string.
     * @return string
     */
    BaseObject.prototype.getName = function () {
        return this.constructor.name;
    };
    return BaseObject;
}());
exports.BaseObject = BaseObject;
