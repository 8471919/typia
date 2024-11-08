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
exports.iterate_metadata = void 0;
var TypeFactory_1 = require("../../TypeFactory");
var iterate_metadata_alias_1 = require("./iterate_metadata_alias");
var iterate_metadata_array_1 = require("./iterate_metadata_array");
var iterate_metadata_atomic_1 = require("./iterate_metadata_atomic");
var iterate_metadata_coalesce_1 = require("./iterate_metadata_coalesce");
var iterate_metadata_constant_1 = require("./iterate_metadata_constant");
var iterate_metadata_escape_1 = require("./iterate_metadata_escape");
var iterate_metadata_function_1 = require("./iterate_metadata_function");
var iterate_metadata_intersection_1 = require("./iterate_metadata_intersection");
var iterate_metadata_map_1 = require("./iterate_metadata_map");
var iterate_metadata_native_1 = require("./iterate_metadata_native");
var iterate_metadata_object_1 = require("./iterate_metadata_object");
var iterate_metadata_set_1 = require("./iterate_metadata_set");
var iterate_metadata_template_1 = require("./iterate_metadata_template");
var iterate_metadata_tuple_1 = require("./iterate_metadata_tuple");
var iterate_metadata_union_1 = require("./iterate_metadata_union");
var iterate_metadata = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    if (type.isTypeParameter() === true) {
                        errors.push({
                            name: TypeFactory_1.TypeFactory.getFullName(checker)(type),
                            explore: __assign({}, explore),
                            messages: ["non-specified generic argument found."],
                        });
                        return;
                    }
                    // CHECK SPECIAL CASES
                    else if ((explore.aliased !== true &&
                        (0, iterate_metadata_alias_1.iterate_metadata_alias)(checker)(options)(collection)(errors)(meta, type, explore)) ||
                        (0, iterate_metadata_intersection_1.iterate_metadata_intersection)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_union_1.iterate_metadata_union)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_escape_1.iterate_metadata_escape)(checker)(options)(collection)(errors)(meta, type, explore))
                        return;
                    // ITERATE CASES
                    (0, iterate_metadata_coalesce_1.iterate_metadata_coalesce)(meta, type) ||
                        (0, iterate_metadata_function_1.iterate_metadata_function)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_constant_1.iterate_metadata_constant)(checker)(options)(meta, type) ||
                        (0, iterate_metadata_template_1.iterate_metadata_template)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_atomic_1.iterate_metadata_atomic)(meta, type) ||
                        (0, iterate_metadata_tuple_1.iterate_metadata_tuple)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_array_1.iterate_metadata_array)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_native_1.iterate_metadata_native)(checker)(meta, type) ||
                        (0, iterate_metadata_map_1.iterate_metadata_map)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_set_1.iterate_metadata_set)(checker)(options)(collection)(errors)(meta, type, explore) ||
                        (0, iterate_metadata_object_1.iterate_metadata_object)(checker)(options)(collection)(errors)(meta, type);
                };
            };
        };
    };
};
exports.iterate_metadata = iterate_metadata;
//# sourceMappingURL=iterate_metadata.js.map