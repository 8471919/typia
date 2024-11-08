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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
exports.JsonStringifyProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var JsonMetadataFactory_1 = require("../../factories/JsonMetadataFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var ValueFactory_1 = require("../../factories/ValueFactory");
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataArray_1 = require("../../schemas/metadata/MetadataArray");
var MetadataAtomic_1 = require("../../schemas/metadata/MetadataAtomic");
var ArrayUtil_1 = require("../../utils/ArrayUtil");
var FeatureProgrammer_1 = require("../FeatureProgrammer");
var IsProgrammer_1 = require("../IsProgrammer");
var AtomicPredicator_1 = require("../helpers/AtomicPredicator");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var OptionPredicator_1 = require("../helpers/OptionPredicator");
var StringifyJoinder_1 = require("../helpers/StringifyJoinder");
var StringifyPredicator_1 = require("../helpers/StringifyPredicator");
var UnionExplorer_1 = require("../helpers/UnionExplorer");
var check_native_1 = require("../internal/check_native");
var decode_union_object_1 = require("../internal/decode_union_object");
var postfix_of_tuple_1 = require("../internal/postfix_of_tuple");
var wrap_metadata_rest_tuple_1 = require("../internal/wrap_metadata_rest_tuple");
var JsonStringifyProgrammer;
(function (JsonStringifyProgrammer) {
    /* -----------------------------------------------------------
      WRITER
    ----------------------------------------------------------- */
    JsonStringifyProgrammer.decompose = function (props) {
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
    JsonStringifyProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = JsonStringifyProgrammer.decompose({
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
                    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
                    // ANY TYPE
                    if (meta.any === true)
                        return wrap_required(input, meta, explore)(wrap_functional(input, meta, explore)(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("JSON.stringify"), undefined, [input])));
                    // ONLY NULL OR UNDEFINED
                    var size = meta.size();
                    if (size === 0 &&
                        (meta.isRequired() === false || meta.nullable === true)) {
                        if (meta.isRequired() === false && meta.nullable === true)
                            return explore.from === "array"
                                ? typescript_1.default.factory.createStringLiteral("null")
                                : typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createNull(), input), undefined, typescript_1.default.factory.createStringLiteral("null"), undefined, typescript_1.default.factory.createIdentifier("undefined"));
                        else if (meta.isRequired() === false)
                            return explore.from === "array"
                                ? typescript_1.default.factory.createStringLiteral("null")
                                : typescript_1.default.factory.createIdentifier("undefined");
                        else
                            return typescript_1.default.factory.createStringLiteral("null");
                    }
                    //----
                    // LIST UP UNION TYPES
                    //----
                    var unions = [];
                    // toJSON() METHOD
                    if (meta.escaped !== null)
                        unions.push({
                            type: "resolved",
                            is: meta.escaped.original.size() === 1 &&
                                meta.escaped.original.natives[0] === "Date"
                                ? function () { return (0, check_native_1.check_native)("Date")(input); }
                                : function () { return IsProgrammer_1.IsProgrammer.decode_to_json(false)(input); },
                            value: function () {
                                return decode_to_json(project)(config)(importer)(input, meta.escaped.returns, explore);
                            },
                        });
                    else if (meta.functions.length)
                        unions.push({
                            type: "functional",
                            is: function () { return IsProgrammer_1.IsProgrammer.decode_functional(input); },
                            value: function () { return decode_functional(explore); },
                        });
                    // TEMPLATES
                    if (meta.templates.length ||
                        ArrayUtil_1.ArrayUtil.has(meta.constants, function (c) { return c.type === "string"; }))
                        if (AtomicPredicator_1.AtomicPredicator.template(meta)) {
                            var partial_1 = Metadata_1.Metadata.initialize();
                            partial_1.atomics.push(MetadataAtomic_1.MetadataAtomic.create({ type: "string", tags: [] })),
                                unions.push({
                                    type: "template literal",
                                    is: function () {
                                        return IsProgrammer_1.IsProgrammer.decode(project)(importer)(input, partial_1, explore);
                                    },
                                    value: function () {
                                        return decode_atomic(project)(importer)(input, "string", explore);
                                    },
                                });
                        }
                    var _loop_1 = function (constant) {
                        if (AtomicPredicator_1.AtomicPredicator.constant(meta)(constant.type) === false)
                            return "continue";
                        else if (constant.type !== "string")
                            unions.push({
                                type: "atomic",
                                is: function () {
                                    return IsProgrammer_1.IsProgrammer.decode(project)(importer)(input, (function () {
                                        var partial = Metadata_1.Metadata.initialize();
                                        partial.atomics.push(MetadataAtomic_1.MetadataAtomic.create({
                                            type: constant.type,
                                            tags: [],
                                        }));
                                        return partial;
                                    })(), explore);
                                },
                                value: function () {
                                    return decode_atomic(project)(importer)(input, constant.type, explore);
                                },
                            });
                        else if (meta.templates.length === 0)
                            unions.push({
                                type: "const string",
                                is: function () {
                                    return IsProgrammer_1.IsProgrammer.decode(project)(importer)(input, (function () {
                                        var partial = Metadata_1.Metadata.initialize();
                                        partial.atomics.push(MetadataAtomic_1.MetadataAtomic.create({
                                            type: "string",
                                            tags: [],
                                        }));
                                        return partial;
                                    })(), explore);
                                },
                                value: function () {
                                    return decode_constant_string(project)(importer)(input, __spreadArray([], __read(constant.values.map(function (v) { return v.value; })), false), explore);
                                },
                            });
                    };
                    try {
                        // CONSTANTS
                        for (var _e = __values(meta.constants), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var constant = _f.value;
                            _loop_1(constant);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    var _loop_2 = function (a) {
                        if (AtomicPredicator_1.AtomicPredicator.atomic(meta)(a.type))
                            unions.push({
                                type: "atomic",
                                is: function () {
                                    return IsProgrammer_1.IsProgrammer.decode(project)(importer)(input, (function () {
                                        var partial = Metadata_1.Metadata.initialize();
                                        partial.atomics.push(a);
                                        return partial;
                                    })(), explore);
                                },
                                value: function () {
                                    return decode_atomic(project)(importer)(input, a.type, explore);
                                },
                            });
                    };
                    try {
                        /// ATOMICS
                        for (var _g = __values(meta.atomics), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var a = _h.value;
                            _loop_2(a);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var _loop_3 = function (tuple) {
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
                        for (var _j = __values(meta.tuples), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var tuple = _k.value;
                            _loop_3(tuple);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    // ARRAYS
                    if (meta.arrays.length) {
                        var value = meta.arrays.length === 1
                            ? function () {
                                return decode_array(config)(importer)(input, meta.arrays[0], __assign(__assign({}, explore), { from: "array" }));
                            }
                            : meta.arrays.some(function (elem) { return elem.type.value.any; })
                                ? function () {
                                    return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("JSON.stringify"), undefined, [input]);
                                }
                                : function () {
                                    return explore_arrays(project)(config)(importer)(input, meta.arrays, __assign(__assign({}, explore), { from: "array" }));
                                };
                        unions.push({
                            type: "array",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isArray(input); },
                            value: value,
                        });
                    }
                    // BUILT-IN CLASSES
                    if (meta.natives.length) {
                        var _loop_4 = function (native) {
                            unions.push({
                                type: "object",
                                is: function () { return (0, check_native_1.check_native)(native)(input); },
                                value: function () {
                                    return AtomicPredicator_1.AtomicPredicator.native(native)
                                        ? decode_atomic(project)(importer)(input, native.toLowerCase(), explore)
                                        : typescript_1.default.factory.createStringLiteral("{}");
                                },
                            });
                        };
                        try {
                            for (var _l = __values(meta.natives), _m = _l.next(); !_m.done; _m = _l.next()) {
                                var native = _m.value;
                                _loop_4(native);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                    // SETS
                    if (meta.sets.length)
                        unions.push({
                            type: "object",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Set")(input); },
                            value: function () { return typescript_1.default.factory.createStringLiteral("{}"); },
                        });
                    // MAPS
                    if (meta.maps.length)
                        unions.push({
                            type: "object",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Map")(input); },
                            value: function () { return typescript_1.default.factory.createStringLiteral("{}"); },
                        });
                    // OBJECTS
                    if (meta.objects.length)
                        unions.push({
                            type: "object",
                            is: function () {
                                return ExpressionFactory_1.ExpressionFactory.isObject({
                                    checkNull: true,
                                    checkArray: meta.objects.some(function (obj) {
                                        return obj.properties.every(function (prop) {
                                            return !prop.key.isSoleLiteral() || !prop.value.isRequired();
                                        });
                                    }),
                                })(input);
                            },
                            value: function () {
                                return explore_objects(config)(importer)(input, meta, __assign(__assign({}, explore), { from: "object" }));
                            },
                        });
                    //----
                    // RETURNS
                    //----
                    // CHECK NULL AND UNDEFINED
                    var wrapper = function (output) {
                        return wrap_required(input, meta, explore)(wrap_nullable(input, meta)(output));
                    };
                    // DIRECT RETURN
                    if (unions.length === 0)
                        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("JSON.stringify"), undefined, [input]);
                    else if (unions.length === 1)
                        return wrapper(unions[0].value());
                    // RETURN WITH TYPE CHECKING
                    return wrapper(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, iterate(importer, input, unions, meta.getName())), undefined, undefined));
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
                return FeatureProgrammer_1.FeatureProgrammer.decode_array(config)(importer)(StringifyJoinder_1.StringifyJoiner.array)(input, array, explore);
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
                        .filter(function (elem) { return elem.rest === null; })
                        .map(function (elem, index) {
                        return decode(project)(config)(importer)(typescript_1.default.factory.createElementAccessExpression(input, index), elem, __assign(__assign({}, explore), { from: "array", postfix: explore.postfix.length
                                ? "".concat((0, postfix_of_tuple_1.postfix_of_tuple)(explore.postfix), "[").concat(index, "]\"")
                                : "\"[".concat(index, "]\"") }));
                    });
                    var rest = (function () {
                        if (tuple.elements.length === 0)
                            return null;
                        var last = tuple.elements.at(-1);
                        if (last.rest === null)
                            return null;
                        var code = decode(project)(config)(importer)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("slice"), undefined, [ExpressionFactory_1.ExpressionFactory.number(tuple.elements.length - 1)]), (0, wrap_metadata_rest_tuple_1.wrap_metadata_rest_tuple)(tuple.elements.at(-1).rest), __assign(__assign({}, explore), { start: tuple.elements.length - 1 }));
                        return typescript_1.default.factory.createCallExpression(importer.use("rest"), undefined, [code]);
                    })();
                    return StringifyJoinder_1.StringifyJoiner.tuple(children, rest);
                };
            };
        };
    };
    var decode_atomic = function (project) {
        return function (importer) {
            return function (input, type, explore) {
                if (type === "string")
                    return typescript_1.default.factory.createCallExpression(importer.use("string"), undefined, [input]);
                else if (type === "number" && OptionPredicator_1.OptionPredicator.numeric(project.options))
                    input = typescript_1.default.factory.createCallExpression(importer.use("number"), undefined, [input]);
                return explore.from !== "top"
                    ? input
                    : typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("toString"), undefined, undefined);
            };
        };
    };
    var decode_constant_string = function (project) {
        return function (importer) {
            return function (input, values, explore) {
                if (values.every(function (v) { return !StringifyPredicator_1.StringifyPredicator.require_escape(v); }))
                    return [
                        typescript_1.default.factory.createStringLiteral('"'),
                        input,
                        typescript_1.default.factory.createStringLiteral('"'),
                    ].reduce(function (x, y) { return typescript_1.default.factory.createAdd(x, y); });
                else
                    return decode_atomic(project)(importer)(input, "string", explore);
            };
        };
    };
    var decode_to_json = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, resolved, explore) {
                    return decode(project)(config)(importer)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("toJSON"), undefined, []), resolved, explore);
                };
            };
        };
    };
    var decode_functional = function (explore) {
        return explore.from === "array"
            ? typescript_1.default.factory.createStringLiteral("null")
            : typescript_1.default.factory.createIdentifier("undefined");
    };
    /* -----------------------------------------------------------
      EXPLORERS
    ----------------------------------------------------------- */
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
    /* -----------------------------------------------------------
      RETURN SCRIPTS
    ----------------------------------------------------------- */
    var wrap_required = function (input, meta, explore) {
        if (meta.isRequired() === true && meta.any === false)
            return function (expression) { return expression; };
        return function (expression) {
            return typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createIdentifier("undefined"), input), undefined, expression, undefined, explore.from === "array"
                ? typescript_1.default.factory.createStringLiteral("null")
                : typescript_1.default.factory.createIdentifier("undefined"));
        };
    };
    var wrap_nullable = function (input, meta) {
        if (meta.nullable === false)
            return function (expression) { return expression; };
        return function (expression) {
            return typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createNull(), input), undefined, expression, undefined, typescript_1.default.factory.createStringLiteral("null"));
        };
    };
    var wrap_functional = function (input, meta, explore) {
        if (meta.functions.length === 0)
            return function (expression) { return expression; };
        return function (expression) {
            return typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createStringLiteral("function"), ValueFactory_1.ValueFactory.TYPEOF(input)), undefined, expression, undefined, decode_functional(explore));
        };
    };
    var iterate = function (importer, input, unions, expected) {
        return typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([], __read(unions.map(function (u) {
            return typescript_1.default.factory.createIfStatement(u.is(), typescript_1.default.factory.createReturnStatement(u.value()));
        })), false), [
            create_throw_error(importer)(expected)(input),
        ], false), true);
    };
    /* -----------------------------------------------------------
      CONFIGURATIONS
    ----------------------------------------------------------- */
    var PREFIX = "$s";
    var configure = function (project) {
        return function (importer) {
            var config = {
                types: {
                    input: function (type, name) {
                        return typescript_1.default.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory_1.TypeFactory.getFullName(project.checker)(type));
                    },
                    output: function () { return TypeFactory_1.TypeFactory.keyword("string"); },
                },
                prefix: PREFIX,
                trace: false,
                path: false,
                initializer: initializer,
                decoder: function () { return decode(project)(config)(importer); },
                objector: {
                    checker: function () { return IsProgrammer_1.IsProgrammer.decode(project)(importer); },
                    decoder: function () { return decode_object(importer); },
                    joiner: StringifyJoinder_1.StringifyJoiner.object(importer),
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
        return JsonMetadataFactory_1.JsonMetadataFactory.analyze("typia.json.".concat(importer.method))(project.checker, project.context)(type);
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
})(JsonStringifyProgrammer || (exports.JsonStringifyProgrammer = JsonStringifyProgrammer = {}));
//# sourceMappingURL=JsonStringifyProgrammer.js.map