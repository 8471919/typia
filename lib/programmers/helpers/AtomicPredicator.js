"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtomicPredicator = void 0;
var ArrayUtil_1 = require("../../utils/ArrayUtil");
var AtomicPredicator;
(function (AtomicPredicator) {
    AtomicPredicator.constant = function (meta) {
        return function (name) {
            return !ArrayUtil_1.ArrayUtil.has(meta.natives, function (native) { return native.toLowerCase() === name; });
        };
    };
    AtomicPredicator.atomic = function (meta) {
        return function (name) {
            return !ArrayUtil_1.ArrayUtil.has(meta.natives, function (native) { return native.toLowerCase() === name; });
        };
    };
    AtomicPredicator.native = function (name) { return LIKE.has(name.toLowerCase()); };
    AtomicPredicator.template = function (meta) {
        return !ArrayUtil_1.ArrayUtil.has(meta.natives, function (native) { return native.toLowerCase() === "string"; });
    };
})(AtomicPredicator || (exports.AtomicPredicator = AtomicPredicator = {}));
var LIKE = new Set(["boolean", "bigint", "number", "string"]);
//# sourceMappingURL=AtomicPredicator.js.map