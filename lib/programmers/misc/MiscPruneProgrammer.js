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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscPruneProgrammer = void 0;
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
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var PruneJoiner_1 = require("../helpers/PruneJoiner");
var UnionExplorer_1 = require("../helpers/UnionExplorer");
var decode_union_object_1 = require("../internal/decode_union_object");
var postfix_of_tuple_1 = require("../internal/postfix_of_tuple");
var wrap_metadata_rest_tuple_1 = require("../internal/wrap_metadata_rest_tuple");
var MiscPruneProgrammer;
(function (MiscPruneProgrammer) {
    MiscPruneProgrammer.decompose = function (props) {
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
    MiscPruneProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = MiscPruneProgrammer.decompose({
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
                    var e_1, _a, e_2, _b;
                    if (filter(meta) === false)
                        return typescript_1.default.factory.createBlock([]);
                    var unions = [];
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
                        //----
                        // LIST UP UNION TYPES
                        //----
                        // TUPLES
                        for (var _c = __values(meta.tuples.filter(function (tuple) {
                            return tuple.type.elements.some(function (e) { var _a; return filter((_a = e.rest) !== null && _a !== void 0 ? _a : e); });
                        })), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var tuple = _d.value;
                            _loop_1(tuple);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    // ARRAYS
                    if (meta.arrays.filter(function (a) { return filter(a.type.value); }).length)
                        unions.push({
                            type: "array",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isArray(input); },
                            value: function () {
                                return explore_arrays(project)(config)(importer)(input, meta.arrays, __assign(__assign({}, explore), { from: "array" }));
                            },
                        });
                    // BUILT-IN CLASSES
                    if (meta.natives.length) {
                        var _loop_2 = function (native) {
                            unions.push({
                                type: "native",
                                is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf(native)(input); },
                                value: function () { return typescript_1.default.factory.createReturnStatement(); },
                            });
                        };
                        try {
                            for (var _e = __values(meta.natives), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var native = _f.value;
                                _loop_2(native);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    if (meta.sets.length)
                        unions.push({
                            type: "set",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Set")(input); },
                            value: function () { return typescript_1.default.factory.createReturnStatement(); },
                        });
                    if (meta.maps.length)
                        unions.push({
                            type: "map",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Map")(input); },
                            value: function () { return typescript_1.default.factory.createReturnStatement(); },
                        });
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
                    //----
                    // STATEMENTS
                    //----
                    var converter = function (v) {
                        return typescript_1.default.isReturnStatement(v) || typescript_1.default.isBlock(v)
                            ? v
                            : typescript_1.default.factory.createExpressionStatement(v);
                    };
                    var statements = unions.map(function (u) {
                        return typescript_1.default.factory.createIfStatement(u.is(), converter(u.value()));
                    });
                    return typescript_1.default.factory.createBlock(statements, true);
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
                return FeatureProgrammer_1.FeatureProgrammer.decode_array(config)(importer)(PruneJoiner_1.PruneJoiner.array)(input, array, explore);
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
                        .map(function (elem, index) { return [elem, index]; })
                        .filter(function (_a) {
                        var _b = __read(_a, 1), elem = _b[0];
                        return filter(elem) && elem.rest === null;
                    })
                        .map(function (_a) {
                        var _b = __read(_a, 2), elem = _b[0], index = _b[1];
                        return decode(project)(config)(importer)(typescript_1.default.factory.createElementAccessExpression(input, index), elem, __assign(__assign({}, explore), { from: "array", postfix: explore.postfix.length
                                ? "".concat((0, postfix_of_tuple_1.postfix_of_tuple)(explore.postfix), "[").concat(index, "]\"")
                                : "\"[".concat(index, "]\"") }));
                    });
                    var rest = (function () {
                        if (tuple.elements.length === 0)
                            return null;
                        var last = tuple.elements.at(-1);
                        var rest = last.rest;
                        if (rest === null || filter(rest) === false)
                            return null;
                        return decode(project)(config)(importer)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("slice"), undefined, [ExpressionFactory_1.ExpressionFactory.number(tuple.elements.length - 1)]), (0, wrap_metadata_rest_tuple_1.wrap_metadata_rest_tuple)(tuple.elements.at(-1).rest), __assign(__assign({}, explore), { start: tuple.elements.length - 1 }));
                    })();
                    return PruneJoiner_1.PruneJoiner.tuple(children, rest);
                };
            };
        };
    };
    /* -----------------------------------------------------------
          UNION TYPE EXPLORERS
      ----------------------------------------------------------- */
    var explore_objects = function (config) {
        return function (importer) {
            return function (input, meta, explore) {
                if (meta.objects.length === 1)
                    return decode_object(importer)(input, meta.objects[0], explore);
                return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(PREFIX, "u").concat(meta.union_index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(explore)(input));
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
                        empty: typescript_1.default.factory.createStringLiteral("[]"),
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
    // @todo -> must filter out recursive visit
    var filter = function (meta) {
        return meta.any === false &&
            (meta.objects.length !== 0 ||
                meta.tuples.some(function (t) {
                    return !!t.type.elements.length &&
                        t.type.elements.some(function (e) { var _a; return filter((_a = e.rest) !== null && _a !== void 0 ? _a : e); });
                }) ||
                meta.arrays.some(function (e) { return filter(e.type.value); }));
    };
    /* -----------------------------------------------------------
          CONFIGURATIONS
      ----------------------------------------------------------- */
    var PREFIX = "$p";
    var configure = function (project) {
        return function (importer) {
            var config = {
                types: {
                    input: function (type, name) {
                        return typescript_1.default.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory_1.TypeFactory.getFullName(project.checker)(type));
                    },
                    output: function () { return TypeFactory_1.TypeFactory.keyword("void"); },
                },
                prefix: PREFIX,
                trace: false,
                path: false,
                initializer: initializer,
                decoder: function () { return decode(project)(config)(importer); },
                objector: {
                    checker: function () { return IsProgrammer_1.IsProgrammer.decode(project)(importer); },
                    decoder: function () { return decode_object(importer); },
                    joiner: PruneJoiner_1.PruneJoiner.object,
                    unionizer: (0, decode_union_object_1.decode_union_object)(IsProgrammer_1.IsProgrammer.decode_object(project)(importer))(decode_object(importer))(function (exp) { return exp; })(function (value, expected) {
                        return create_throw_error(importer)(expected)(value);
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
})(MiscPruneProgrammer || (exports.MiscPruneProgrammer = MiscPruneProgrammer = {}));
//# sourceMappingURL=MiscPruneProgrammer.js.map