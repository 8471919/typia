"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_escape = void 0;
var Metadata_1 = require("../../../schemas/metadata/Metadata");
var MetadataEscaped_1 = require("../../../schemas/metadata/MetadataEscaped");
var Writable_1 = require("../../../typings/Writable");
var TypeFactory_1 = require("../../TypeFactory");
var iterate_metadata_1 = require("./iterate_metadata");
var iterate_metadata_escape = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    if (options.escape === false || explore.escaped === true)
                        return false;
                    var escaped = TypeFactory_1.TypeFactory.getReturnType(checker)(type)("toJSON");
                    if (escaped === null)
                        return false;
                    if (meta.escaped === null) {
                        (0, Writable_1.Writable)(meta).escaped = MetadataEscaped_1.MetadataEscaped.create({
                            original: Metadata_1.Metadata.initialize(),
                            returns: Metadata_1.Metadata.initialize(),
                        });
                    }
                    (0, iterate_metadata_1.iterate_metadata)(checker)(options)(collection)(errors)(meta.escaped.original, type, __assign(__assign({}, explore), { escaped: true }));
                    (0, iterate_metadata_1.iterate_metadata)(checker)(options)(collection)(errors)(meta.escaped.returns, escaped, __assign(__assign({}, explore), { escaped: true }));
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_escape = iterate_metadata_escape;
//# sourceMappingURL=iterate_metadata_escape.js.map