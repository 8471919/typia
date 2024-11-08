"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_coalesce = void 0;
var typescript_1 = __importDefault(require("typescript"));
var Writable_1 = require("../../../typings/Writable");
var iterate_metadata_coalesce = function (meta, type) {
    var filter = function (flag) { return (type.getFlags() & flag) !== 0; };
    if (filter(typescript_1.default.TypeFlags.Unknown) || filter(typescript_1.default.TypeFlags.Any)) {
        (0, Writable_1.Writable)(meta).any = true;
        return true;
    }
    else if (filter(typescript_1.default.TypeFlags.Null)) {
        (0, Writable_1.Writable)(meta).nullable = true;
        return true;
    }
    else if (filter(typescript_1.default.TypeFlags.Undefined) ||
        filter(typescript_1.default.TypeFlags.Never) ||
        filter(typescript_1.default.TypeFlags.Void) ||
        filter(typescript_1.default.TypeFlags.VoidLike)) {
        (0, Writable_1.Writable)(meta).required = false;
        return true;
    }
    return false;
};
exports.iterate_metadata_coalesce = iterate_metadata_coalesce;
//# sourceMappingURL=iterate_metadata_coalesce.js.map