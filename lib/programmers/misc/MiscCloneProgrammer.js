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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCloneProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../factories/MetadataFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataArray_1 = require("../../schemas/metadata/MetadataArray");
var TransformerError_1 = require("../../transformers/TransformerError");
var FeatureProgrammer_1 = require("../FeatureProgrammer");
var IsProgrammer_1 = require("../IsProgrammer");
var CloneJoiner_1 = require("../helpers/CloneJoiner");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var UnionExplorer_1 = require("../helpers/UnionExplorer");
var decode_union_object_1 = require("../internal/decode_union_object");
var postfix_of_tuple_1 = require("../internal/postfix_of_tuple");
var wrap_metadata_rest_tuple_1 = require("../internal/wrap_metadata_rest_tuple");
var MiscCloneProgrammer;
(function (MiscCloneProgrammer) {
    MiscCloneProgrammer.decompose = function (props) {
        var config = configure(props.project)(props.importer);
        if (props.validated === false)
            config.addition = function (collection) {
                return IsProgrammer_1.IsProgrammer.write_function_statements(props.project)(props.importer)(collection);
            };
        var composed = FeatureProgrammer_1.FeatureProgrammer.compose(__assign(__assign({}, props), { config: config }));
        return {
            functions: composed.functions,
            statements: composed.statements,
            arrow: typescript_1.default.factory.createArrowFunction(undefined, undefined, composed.parameters, composed.response, undefined, composed.body),
        };
    };
    MiscCloneProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = MiscCloneProgrammer.decompose({
                    validated: false,
                    project: project,
                    importer: importer,
                    type: type,
                    name: name,
                });
                return FeatureProgrammer_1.FeatureProgrammer.writeDecomposed({
                    modulo: modulo,
                    importer: importer,
                    result: result,
                });
            };
        };
    };
    var write_array_functions = function (config) {
        return function (importer) {
            return function (collection) {
                return collection
                    .arrays()
                    .filter(function (a) { return a.recursive; })
                    .map(function (type, i) {
                    return StatementFactory_1.StatementFactory.constant("".concat(config.prefix, "a").concat(i), typescript_1.default.factory.createArrowFunction(undefined, undefined, FeatureProgrammer_1.FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(typescript_1.default.factory.createIdentifier("input")), TypeFactory_1.TypeFactory.keyword("any"), undefined, decode_array_inline(config)(importer)(typescript_1.default.factory.createIdentifier("input"), MetadataArray_1.MetadataArray.create({
                        type: type,
                        tags: [],
                    }), {
                        tracable: config.trace,
                        source: "function",
                        from: "array",
                        postfix: "",
                    })));
                });
            };
        };
    };
    var write_tuple_functions = function (project) {
        return function (config) {
            return function (importer) {
                return function (collection) {
                    return collection
                        .tuples()
                        .filter(function (t) { return t.recursive; })
                        .map(function (tuple, i) {
                        return StatementFactory_1.StatementFactory.constant("".concat(config.prefix, "t").concat(i), typescript_1.default.factory.createArrowFunction(undefined, undefined, FeatureProgrammer_1.FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(typescript_1.default.factory.createIdentifier("input")), TypeFactory_1.TypeFactory.keyword("any"), undefined, decode_tuple_inline(project)(config)(importer)(typescript_1.default.factory.createIdentifier("input"), tuple, {
                            tracable: config.trace,
                            source: "function",
                            from: "array",
                            postfix: "",
                        })));
                    });
                };
            };
        };
    };
    /* -----------------------------------------------------------
          DECODERS
      ----------------------------------------------------------- */
    var decode = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, meta, explore) {
                    var e_1, _a, e_2, _b, e_3, _c;
                    // ANY TYPE
                    if (meta.any ||
                        meta.arrays.some(function (a) { return a.type.value.any; }) ||
                        meta.tuples.some(function (t) {
                            return !!t.type.elements.length && t.type.elements.every(function (e) { return e.any; });
                        }))
                        return typescript_1.default.factory.createCallExpression(importer.use("any"), undefined, [
                            input,
                        ]);
                    var unions = [];
                    //----
                    // LIST UP UNION TYPES
                    //----
                    // FUNCTIONAL
                    if (meta.functions.length)
                        unions.push({
                            type: "functional",
                            is: function () {
                                return typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("function"), typescript_1.default.factory.createTypeOfExpression(input));
                            },
                            value: function () { return typescript_1.default.factory.createIdentifier("undefined"); },
                        });
                    var _loop_1 = function (tuple) {
                        unions.push({
                            type: "tuple",
                            is: function () {
                                return IsProgrammer_1.IsProgrammer.decode(project)(importer)(input, (function () {
                                    var partial = Metadata_1.Metadata.initialize();
                                    partial.tuples.push(tuple);
                                    return partial;
                                })(), explore);
                            },
                            value: function () {
                                return decode_tuple(project)(config)(importer)(input, tuple, explore);
                            },
                        });
                    };
                    try {
                        // TUPLES
                        for (var _d = __values(meta.tuples), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var tuple = _e.value;
                            _loop_1(tuple);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    // ARRAYS
                    if (meta.arrays.length)
                        unions.push({
                            type: "array",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isArray(input); },
                            value: function () {
                                return explore_arrays(project)(config)(importer)(input, meta.arrays, __assign(__assign({}, explore), { from: "array" }));
                            },
                        });
                    // NATIVE TYPES
                    if (meta.sets.length)
                        unions.push({
                            type: "set",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Set")(input); },
                            value: function () {
                                return explore_sets(project)(config)(importer)(input, meta.sets, __assign(__assign({}, explore), { from: "array" }));
                            },
                        });
                    if (meta.maps.length)
                        unions.push({
                            type: "map",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Map")(input); },
                            value: function () {
                                return explore_maps(project)(config)(importer)(input, meta.maps, __assign(__assign({}, explore), { from: "array" }));
                            },
                        });
                    var _loop_2 = function (native) {
                        unions.push({
                            type: "native",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf(native)(input); },
                            value: function () {
                                return native === "Boolean" || native === "Number" || native === "String"
                                    ? typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("valueOf"), undefined, undefined)
                                    : decode_native(native)(input);
                            },
                        });
                    };
                    try {
                        for (var _f = __values(meta.natives), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var native = _g.value;
                            _loop_2(native);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    // OBJECTS
                    if (meta.objects.length)
                        unions.push({
                            type: "object",
                            is: function () {
                                return ExpressionFactory_1.ExpressionFactory.isObject({
                                    checkNull: true,
                                    checkArray: false,
                                })(input);
                            },
                            value: function () {
                                return explore_objects(config)(importer)(input, meta, __assign(__assign({}, explore), { from: "object" }));
                            },
                        });
                    // COMPOSITION
                    if (unions.length === 0)
                        return input;
                    else if (unions.length === 1 && meta.size() === 1) {
                        var value = (meta.nullable || meta.isRequired() === false) && is_instance(meta)
                            ? typescript_1.default.factory.createConditionalExpression(input, undefined, unions[0].value(), undefined, input)
                            : unions[0].value();
                        return typescript_1.default.factory.createAsExpression(value, TypeFactory_1.TypeFactory.keyword("any"));
                    }
                    else {
                        var last = input;
                        try {
                            for (var _h = __values(unions.reverse()), _j = _h.next(); !_j.done; _j = _h.next()) {
                                var u = _j.value;
                                last = typescript_1.default.factory.createConditionalExpression(u.is(), undefined, u.value(), undefined, last);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return typescript_1.default.factory.createAsExpression(last, TypeFactory_1.TypeFactory.keyword("any"));
                    }
                };
            };
        };
    };
    var decode_object = function (importer) {
        return FeatureProgrammer_1.FeatureProgrammer.decode_object({
            trace: false,
            path: false,
            prefix: PREFIX,
        })(importer);
    };
    var decode_array = function (config) {
        return function (importer) {
            return function (input, array, explore) {
                return array.type.recursive
                    ? typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(config.prefix, "a").concat(array.type.index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(__assign(__assign({}, explore), { source: "function", from: "array" }))(input))
                    : decode_array_inline(config)(importer)(input, array, explore);
            };
        };
    };
    var decode_array_inline = function (config) {
        return function (importer) {
            return function (input, array, explore) {
                return FeatureProgrammer_1.FeatureProgrammer.decode_array(config)(importer)(CloneJoiner_1.CloneJoiner.array)(input, array, explore);
            };
        };
    };
    var decode_tuple = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, tuple, explore) {
                    return tuple.type.recursive
                        ? typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(config.prefix, "t").concat(tuple.type.index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(__assign(__assign({}, explore), { source: "function" }))(input))
                        : decode_tuple_inline(project)(config)(importer)(input, tuple.type, explore);
                };
            };
        };
    };
    var decode_tuple_inline = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, tuple, explore) {
                    var children = tuple.elements
                        .filter(function (m) { return m.rest === null; })
                        .map(function (elem, index) {
                        return decode(project)(config)(importer)(typescript_1.default.factory.createElementAccessExpression(input, index), elem, __assign(__assign({}, explore), { from: "array", postfix: explore.postfix.length
                                ? "".concat((0, postfix_of_tuple_1.postfix_of_tuple)(explore.postfix), "[").concat(index, "]\"")
                                : "\"[".concat(index, "]\"") }));
                    });
                    var rest = (function () {
                        if (tuple.elements.length === 0)
                            return null;
                        var last = tuple.elements.at(-1);
                        var rest = last.rest;
                        if (rest === null)
                            return null;
                        return decode(project)(config)(importer)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("slice"), undefined, [ExpressionFactory_1.ExpressionFactory.number(tuple.elements.length - 1)]), (0, wrap_metadata_rest_tuple_1.wrap_metadata_rest_tuple)(tuple.elements.at(-1).rest), __assign(__assign({}, explore), { start: tuple.elements.length - 1 }));
                    })();
                    return CloneJoiner_1.CloneJoiner.tuple(children, rest);
                };
            };
        };
    };
    /* -----------------------------------------------------------
          NATIVE CLASSES
      ----------------------------------------------------------- */
    var decode_native = function (type) { return function (input) {
        return type === "Date" ||
            type === "Uint8Array" ||
            type === "Uint8ClampedArray" ||
            type === "Uint16Array" ||
            type === "Uint32Array" ||
            type === "BigUint64Array" ||
            type === "Int8Array" ||
            type === "Int16Array" ||
            type === "Int32Array" ||
            type === "BigInt64Array" ||
            type === "Float32Array" ||
            type === "Float64Array" ||
            type === "RegExp"
            ? decode_native_copyable(type)(input)
            : type === "ArrayBuffer" || type === "SharedArrayBuffer"
                ? decode_native_buffer(type)(input)
                : type === "DataView"
                    ? decode_native_data_view(input)
                    : typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(type), undefined, []);
    }; };
    var decode_native_copyable = function (type) { return function (input) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier(type), undefined, [input]);
    }; };
    var decode_native_buffer = function (type) { return function (input) {
        return ExpressionFactory_1.ExpressionFactory.selfCall(typescript_1.default.factory.createBlock([
            StatementFactory_1.StatementFactory.constant("buffer", typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier(type), undefined, [IdentifierFactory_1.IdentifierFactory.access(input)("byteLength")])),
            typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Uint8Array"), undefined, [typescript_1.default.factory.createIdentifier("buffer")]))("set"), undefined, [
                typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Uint8Array"), undefined, [input]),
            ])),
            typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createIdentifier("buffer")),
        ], true));
    }; };
    var decode_native_data_view = function (input) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("DataView"), undefined, [IdentifierFactory_1.IdentifierFactory.access(input)("buffer")]);
    };
    /* -----------------------------------------------------------
          EXPLORERS FOR UNION TYPES
      ----------------------------------------------------------- */
    var explore_sets = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, sets, explore) {
                    return typescript_1.default.factory.createCallExpression(UnionExplorer_1.UnionExplorer.set({
                        checker: IsProgrammer_1.IsProgrammer.decode(project)(importer),
                        decoder: function (input, array, explore) {
                            return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Set"), [TypeFactory_1.TypeFactory.keyword("any")], [decode_array(config)(importer)(input, array, explore)]);
                        },
                        empty: typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Set"), [TypeFactory_1.TypeFactory.keyword("any")], []),
                        success: typescript_1.default.factory.createTrue(),
                        failure: function (input, expected) {
                            return create_throw_error(importer)(expected)(input);
                        },
                    })([])(input, sets, explore), undefined, undefined);
                };
            };
        };
    };
    var explore_maps = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, maps, explore) {
                    return typescript_1.default.factory.createCallExpression(UnionExplorer_1.UnionExplorer.map({
                        checker: function (top, entry, explore) {
                            var func = IsProgrammer_1.IsProgrammer.decode(project)(importer);
                            return typescript_1.default.factory.createLogicalAnd(func(typescript_1.default.factory.createElementAccessExpression(top, 0), entry[0], __assign(__assign({}, explore), { postfix: "".concat(explore.postfix, "[0]") })), func(typescript_1.default.factory.createElementAccessExpression(top, 1), entry[1], __assign(__assign({}, explore), { postfix: "".concat(explore.postfix, "[1]") })));
                        },
                        decoder: function (input, array, explore) {
                            return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Map"), [TypeFactory_1.TypeFactory.keyword("any"), TypeFactory_1.TypeFactory.keyword("any")], [decode_array(config)(importer)(input, array, explore)]);
                        },
                        empty: typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Map"), [TypeFactory_1.TypeFactory.keyword("any"), TypeFactory_1.TypeFactory.keyword("any")], []),
                        success: typescript_1.default.factory.createTrue(),
                        failure: function (input, expected) {
                            return create_throw_error(importer)(expected)(input);
                        },
                    })([])(input, maps, explore), undefined, undefined);
                };
            };
        };
    };
    var explore_objects = function (config) {
        return function (importer) {
            return function (input, meta, explore) {
                return meta.objects.length === 1
                    ? decode_object(importer)(input, meta.objects[0], explore)
                    : typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(PREFIX, "u").concat(meta.union_index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(explore)(input));
            };
        };
    };
    var explore_arrays = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, elements, explore) {
                    return explore_array_like_union_types(config)(importer)(UnionExplorer_1.UnionExplorer.array({
                        checker: IsProgrammer_1.IsProgrammer.decode(project)(importer),
                        decoder: decode_array(config)(importer),
                        empty: typescript_1.default.factory.createIdentifier("[]"),
                        success: typescript_1.default.factory.createTrue(),
                        failure: function (input, expected) {
                            return create_throw_error(importer)(expected)(input);
                        },
                    }))(input, elements, explore);
                };
            };
        };
    };
    var explore_array_like_union_types = function (config) {
        return function (importer) {
            return function (factory) {
                return function (input, elements, explore) {
                    var arrow = function (parameters) {
                        return function (explore) {
                            return function (input) {
                                return factory(parameters)(input, elements, explore);
                            };
                        };
                    };
                    if (elements.every(function (e) { return e.type.recursive === false; }))
                        typescript_1.default.factory.createCallExpression(arrow([])(explore)(input), undefined, []);
                    explore = __assign(__assign({}, explore), { source: "function", from: "array" });
                    return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.emplaceUnion(config.prefix, elements.map(function (e) { return e.type.name; }).join(" | "), function () {
                        return arrow(FeatureProgrammer_1.FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(typescript_1.default.factory.createIdentifier("input")))(__assign(__assign({}, explore), { postfix: "" }))(typescript_1.default.factory.createIdentifier("input"));
                    })), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(explore)(input));
                };
            };
        };
    };
    /* -----------------------------------------------------------
          CONFIGURATIONS
      ----------------------------------------------------------- */
    var PREFIX = "$c";
    var configure = function (project) {
        return function (importer) {
            var config = {
                types: {
                    input: function (type, name) {
                        return typescript_1.default.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory_1.TypeFactory.getFullName(project.checker)(type));
                    },
                    output: function (type, name) {
                        return typescript_1.default.factory.createImportTypeNode(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral("typia")), undefined, typescript_1.default.factory.createIdentifier("Resolved"), [
                            typescript_1.default.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory_1.TypeFactory.getFullName(project.checker)(type)),
                        ], false);
                    },
                },
                prefix: PREFIX,
                trace: false,
                path: false,
                initializer: initializer,
                decoder: function () { return decode(project)(config)(importer); },
                objector: {
                    checker: function () { return IsProgrammer_1.IsProgrammer.decode(project)(importer); },
                    decoder: function () { return decode_object(importer); },
                    joiner: CloneJoiner_1.CloneJoiner.object,
                    unionizer: (0, decode_union_object_1.decode_union_object)(IsProgrammer_1.IsProgrammer.decode_object(project)(importer))(decode_object(importer))(function (exp) { return exp; })(function (input, expected) {
                        return create_throw_error(importer)(expected)(input);
                    }),
                    failure: function (input, expected) {
                        return create_throw_error(importer)(expected)(input);
                    },
                },
                generator: {
                    arrays: function () { return write_array_functions(config)(importer); },
                    tuples: function () { return write_tuple_functions(project)(config)(importer); },
                },
            };
            return config;
        };
    };
    var initializer = function (project) { return function (importer) { return function (type) {
        var collection = new MetadataCollection_1.MetadataCollection();
        var result = MetadataFactory_1.MetadataFactory.analyze(project.checker, project.context)({
            escape: false,
            constant: true,
            absorb: true,
            validate: function (meta) {
                var output = [];
                if (meta.natives.some(function (n) { return n === "WeakSet"; }))
                    output.push("unable to clone WeakSet");
                else if (meta.natives.some(function (n) { return n === "WeakMap"; }))
                    output.push("unable to clone WeakMap");
                return output;
            },
        })(collection)(type);
        if (result.success === false)
            throw TransformerError_1.TransformerError.from("typia.misc.".concat(importer.method))(result.errors);
        return [collection, result.data];
    }; }; };
    var create_throw_error = function (importer) {
        return function (expected) {
            return function (value) {
                return typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(importer.use("throws"), [], [
                    typescript_1.default.factory.createObjectLiteralExpression([
                        typescript_1.default.factory.createPropertyAssignment("expected", typescript_1.default.factory.createStringLiteral(expected)),
                        typescript_1.default.factory.createPropertyAssignment("value", value),
                    ], true),
                ]));
            };
        };
    };
    var is_instance = function (meta) {
        return !!meta.objects.length ||
            !!meta.arrays.length ||
            !!meta.tuples.length ||
            !!meta.sets.length ||
            !!meta.maps.length ||
            !!meta.natives.length ||
            (meta.rest !== null && is_instance(meta.rest));
    };
})(MiscCloneProgrammer || (exports.MiscCloneProgrammer = MiscCloneProgrammer = {}));
//# sourceMappingURL=MiscCloneProgrammer.js.map