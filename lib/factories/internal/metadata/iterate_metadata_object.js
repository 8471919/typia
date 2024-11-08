"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_object = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var emplace_metadata_object_1 = require("./emplace_metadata_object");
var iterate_metadata_object = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, ensure) {
                    if (ensure === void 0) { ensure = false; }
                    if (ensure === false) {
                        var filter = function (flag) { return (type.getFlags() & flag) !== 0; };
                        if (!filter(typescript_1.default.TypeFlags.Object) &&
                            !type.isIntersection() &&
                            type.intrinsicName !== "object")
                            return false;
                    }
                    var obj = (0, emplace_metadata_object_1.emplace_metadata_object)(checker)(options)(collection)(errors)(type, meta.nullable);
                    ArrayUtil_1.ArrayUtil.add(meta.objects, obj, function (elem) { return elem.name === obj.name; });
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_object = iterate_metadata_object;
//# sourceMappingURL=iterate_metadata_object.js.map