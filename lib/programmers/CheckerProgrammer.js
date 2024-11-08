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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../factories/IdentifierFactory");
var MetadataCollection_1 = require("../factories/MetadataCollection");
var MetadataFactory_1 = require("../factories/MetadataFactory");
var StatementFactory_1 = require("../factories/StatementFactory");
var TypeFactory_1 = require("../factories/TypeFactory");
var ValueFactory_1 = require("../factories/ValueFactory");
var MetadataArray_1 = require("../schemas/metadata/MetadataArray");
var MetadataTuple_1 = require("../schemas/metadata/MetadataTuple");
var TransformerError_1 = require("../transformers/TransformerError");
var FeatureProgrammer_1 = require("./FeatureProgrammer");
var IsProgrammer_1 = require("./IsProgrammer");
var AtomicPredicator_1 = require("./helpers/AtomicPredicator");
var OptionPredicator_1 = require("./helpers/OptionPredicator");
var UnionExplorer_1 = require("./helpers/UnionExplorer");
var check_array_length_1 = require("./internal/check_array_length");
var check_bigint_1 = require("./internal/check_bigint");
var check_native_1 = require("./internal/check_native");
var check_number_1 = require("./internal/check_number");
var check_string_1 = require("./internal/check_string");
var check_template_1 = require("./internal/check_template");
var decode_union_object_1 = require("./internal/decode_union_object");
var postfix_of_tuple_1 = require("./internal/postfix_of_tuple");
var wrap_metadata_rest_tuple_1 = require("./internal/wrap_metadata_rest_tuple");
var CheckerProgrammer;
(function (CheckerProgrammer) {
    /* -----------------------------------------------------------
          WRITERS
      ----------------------------------------------------------- */
    CheckerProgrammer.compose = function (props) {
        return FeatureProgrammer_1.FeatureProgrammer.compose(__assign(__assign({}, props), { config: configure(props.project)(props.config)(props.importer) }));
    };
    CheckerProgrammer.write = function (project) { return function (config) { return function (importer) {
        return FeatureProgrammer_1.FeatureProgrammer.write(project)(configure(project)(config)(importer))(importer);
    }; }; };
    CheckerProgrammer.write_object_functions = function (project) { return function (config) { return function (importer) {
        return FeatureProgrammer_1.FeatureProgrammer.write_object_functions(configure(project)(config)(importer))(importer);
    }; }; };
    CheckerProgrammer.write_union_functions = function (project) { return function (config) { return function (importer) {
        return FeatureProgrammer_1.FeatureProgrammer.write_union_functions(configure(project)(__assign(__assign({}, config), { numeric: false }))(importer));
    }; }; };
    CheckerProgrammer.write_array_functions = function (project) {
        return function (config) {
            return function (importer) {
                return function (collection) {
                    return collection
                        .arrays()
                        .filter(function (a) { return a.recursive; })
                        .map(function (type, i) {
                        return StatementFactory_1.StatementFactory.constant("".concat(config.prefix, "a").concat(i), typescript_1.default.factory.createArrowFunction(undefined, undefined, FeatureProgrammer_1.FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(typescript_1.default.factory.createIdentifier("input")), TypeFactory_1.TypeFactory.keyword("any"), undefined, decode_array_inline(project)(config)(importer)(typescript_1.default.factory.createIdentifier("input"), MetadataArray_1.MetadataArray.create({
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
    };
    CheckerProgrammer.write_tuple_functions = function (project) {
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
    var configure = function (project) {
        return function (config) {
            return function (importer) {
                var _a;
                return ({
                    types: {
                        input: function () { return TypeFactory_1.TypeFactory.keyword("any"); },
                        output: function (type, name) {
                            return typescript_1.default.factory.createTypePredicateNode(undefined, "input", typescript_1.default.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory_1.TypeFactory.getFullName(project.checker)(type)));
                        },
                    },
                    trace: config.trace,
                    path: config.path,
                    prefix: config.prefix,
                    initializer: function (project) { return function (importer) { return function (type) {
                        var collection = new MetadataCollection_1.MetadataCollection();
                        var result = MetadataFactory_1.MetadataFactory.analyze(project.checker, project.context)({
                            escape: false,
                            constant: true,
                            absorb: true,
                        })(collection)(type);
                        if (result.success === false)
                            throw TransformerError_1.TransformerError.from("typia.".concat(importer.method))(result.errors);
                        return [collection, result.data];
                    }; }; },
                    addition: config.addition,
                    decoder: function () { var _a, _b; return (_b = (_a = config.decoder) === null || _a === void 0 ? void 0 : _a.call(config)) !== null && _b !== void 0 ? _b : CheckerProgrammer.decode(project)(config)(importer); },
                    objector: {
                        checker: function () { var _a, _b; return (_b = (_a = config.decoder) === null || _a === void 0 ? void 0 : _a.call(config)) !== null && _b !== void 0 ? _b : CheckerProgrammer.decode(project)(config)(importer); },
                        decoder: function () { return CheckerProgrammer.decode_object(config)(importer); },
                        joiner: config.joiner.object,
                        unionizer: config.equals
                            ? (0, decode_union_object_1.decode_union_object)(CheckerProgrammer.decode_object(config)(importer))(function (input, obj, explore) {
                                return CheckerProgrammer.decode_object(config)(importer)(input, obj, __assign(__assign({}, explore), { tracable: true }));
                            })((_a = config.joiner.is) !== null && _a !== void 0 ? _a : (function (expr) { return expr; }))(function (value, expected) {
                                return typescript_1.default.factory.createReturnStatement(config.joiner.failure(value, expected));
                            })
                            : function (input, targets, explore) {
                                return config.combiner(explore)("or")(input, targets.map(function (obj) { return ({
                                    expression: CheckerProgrammer.decode_object(config)(importer)(input, obj, explore),
                                    combined: true,
                                }); }), "(".concat(targets.map(function (t) { return t.name; }).join(" | "), ")"));
                            },
                        failure: function (value, expected) {
                            return typescript_1.default.factory.createReturnStatement(config.joiner.failure(value, expected));
                        },
                        is: config.joiner.is,
                        required: config.joiner.required,
                        full: config.joiner.full,
                        type: TypeFactory_1.TypeFactory.keyword("boolean"),
                    },
                    generator: {
                        unions: config.numeric
                            ? function () {
                                return FeatureProgrammer_1.FeatureProgrammer.write_union_functions(configure(project)(__assign(__assign({}, config), { numeric: false }))(importer));
                            }
                            : undefined,
                        arrays: function () { return CheckerProgrammer.write_array_functions(project)(config)(importer); },
                        tuples: function () { return CheckerProgrammer.write_tuple_functions(project)(config)(importer); },
                    },
                });
            };
        };
    };
    /* -----------------------------------------------------------
          DECODERS
      ----------------------------------------------------------- */
    /**
     * @internal
     */
    CheckerProgrammer.decode = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, meta, explore) {
                    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
                    if (meta.any)
                        return config.success;
                    var top = [];
                    var binaries = [];
                    var add = create_add(binaries)(input);
                    var getConstantValue = function (value) {
                        if (typeof value === "string")
                            return typescript_1.default.factory.createStringLiteral(value);
                        else if (typeof value === "bigint")
                            return ExpressionFactory_1.ExpressionFactory.bigint(value);
                        return typescript_1.default.factory.createIdentifier(value.toString());
                    };
                    //----
                    // CHECK OPTIONAL
                    //----
                    // @todo -> should be elaborated
                    var checkOptional = meta.empty() || meta.isUnionBucket();
                    // NULLABLE
                    if (checkOptional || meta.nullable)
                        (meta.nullable ? add : create_add(top)(input))(meta.nullable, ValueFactory_1.ValueFactory.NULL());
                    // UNDEFINDABLE
                    if (checkOptional || !meta.isRequired())
                        (meta.isRequired() ? create_add(top)(input) : add)(!meta.isRequired(), ValueFactory_1.ValueFactory.UNDEFINED());
                    // FUNCTIONAL
                    if (meta.functions.length)
                        if (OptionPredicator_1.OptionPredicator.functional(project.options) || meta.size() !== 1)
                            add(true, typescript_1.default.factory.createStringLiteral("function"), ValueFactory_1.ValueFactory.TYPEOF(input));
                        else
                            binaries.push({
                                combined: false,
                                expression: config.success,
                            });
                    //----
                    // VALUES
                    //----
                    // CONSTANT VALUES
                    var constants = meta.constants.filter(function (c) {
                        return AtomicPredicator_1.AtomicPredicator.constant(meta)(c.type);
                    });
                    var constantLength = constants
                        .map(function (c) { return c.values.length; })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (constantLength >= 10) {
                        var values = constants
                            .map(function (c) { return c.values.map(function (v) { return v.value; }); })
                            .flat();
                        add(true, typescript_1.default.factory.createTrue(), typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(importer.emplaceVariable("".concat(config.prefix, "v").concat(importer.increment()), typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Set"), undefined, [
                            typescript_1.default.factory.createArrayLiteralExpression(values.map(function (v) {
                                return typeof v === "boolean"
                                    ? v === true
                                        ? typescript_1.default.factory.createTrue()
                                        : typescript_1.default.factory.createFalse()
                                    : typeof v === "bigint"
                                        ? ExpressionFactory_1.ExpressionFactory.bigint(v)
                                        : typeof v === "number"
                                            ? ExpressionFactory_1.ExpressionFactory.number(v)
                                            : typescript_1.default.factory.createStringLiteral(v.toString());
                            })),
                        ])))("has"), undefined, [input]));
                    }
                    else
                        try {
                            for (var constants_1 = __values(constants), constants_1_1 = constants_1.next(); !constants_1_1.done; constants_1_1 = constants_1.next()) {
                                var c = constants_1_1.value;
                                if (AtomicPredicator_1.AtomicPredicator.constant(meta)(c.type))
                                    try {
                                        for (var _e = (e_2 = void 0, __values(c.values)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            var v = _f.value;
                                            add(true, getConstantValue(v.value));
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
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (constants_1_1 && !constants_1_1.done && (_a = constants_1.return)) _a.call(constants_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    try {
                        // ATOMIC VALUES
                        for (var _g = __values(meta.atomics), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var atom = _h.value;
                            if (AtomicPredicator_1.AtomicPredicator.atomic(meta)(atom.type) === false)
                                continue;
                            else if (atom.type === "number")
                                binaries.push({
                                    expression: config.atomist(explore)((0, check_number_1.check_number)(project, config.numeric)(atom)(input))(input),
                                    combined: false,
                                });
                            else if (atom.type === "bigint")
                                binaries.push({
                                    expression: config.atomist(explore)((0, check_bigint_1.check_bigint)(project)(atom)(input))(input),
                                    combined: false,
                                });
                            else if (atom.type === "string")
                                binaries.push({
                                    expression: config.atomist(explore)((0, check_string_1.check_string)(project)(atom)(input))(input),
                                    combined: false,
                                });
                            else
                                add(true, typescript_1.default.factory.createStringLiteral(atom.type), ValueFactory_1.ValueFactory.TYPEOF(input));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    // TEMPLATE LITERAL VALUES
                    if (meta.templates.length)
                        if (AtomicPredicator_1.AtomicPredicator.template(meta))
                            binaries.push({
                                expression: config.atomist(explore)((0, check_template_1.check_template)(meta.templates)(input))(input),
                                combined: false,
                            });
                    try {
                        // NATIVE CLASSES
                        for (var _j = __values(meta.natives), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var native = _k.value;
                            binaries.push({
                                expression: (0, check_native_1.check_native)(native)(input),
                                combined: false,
                            });
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    var instances = [];
                    var prepare = function (pre, expected) {
                        return function (body) {
                            return instances.push({
                                pre: pre,
                                expected: expected,
                                body: body,
                            });
                        };
                    };
                    // SETS
                    if (meta.sets.length) {
                        var install = prepare((0, check_native_1.check_native)("Set")(input), meta.sets.map(function (elem) { return "Set<".concat(elem.getName(), ">"); }).join(" | "));
                        if (meta.sets.some(function (elem) { return elem.any; }))
                            install(null);
                        else
                            install(explore_sets(project)(config)(importer)(input, meta.sets, __assign(__assign({}, explore), { from: "array" })));
                    }
                    // MAPS
                    if (meta.maps.length) {
                        var install = prepare((0, check_native_1.check_native)("Map")(input), meta.maps
                            .map(function (_a) {
                            var key = _a.key, value = _a.value;
                            return "Map<".concat(key, ", ").concat(value, ">");
                        })
                            .join(" | "));
                        if (meta.maps.some(function (elem) { return elem.key.any && elem.value.any; }))
                            install(null);
                        else
                            install(explore_maps(project)(config)(importer)(input, meta.maps, __assign(__assign({}, explore), { from: "array" })));
                    }
                    // ARRAYS AND TUPLES
                    if (meta.tuples.length + meta.arrays.length > 0) {
                        var install = prepare(config.atomist(explore)({
                            expected: __spreadArray(__spreadArray([], __read(meta.tuples.map(function (t) { return t.type.name; })), false), __read(meta.arrays.map(function (a) { return a.getName(); })), false).join(" | "),
                            expression: ExpressionFactory_1.ExpressionFactory.isArray(input),
                            conditions: [],
                        })(input), __spreadArray(__spreadArray([], __read(meta.tuples), false), __read(meta.arrays), false).map(function (elem) { return elem.type.name; })
                            .join(" | "));
                        if (meta.arrays.length === 0)
                            if (meta.tuples.length === 1)
                                install(decode_tuple(project)(config)(importer)(input, meta.tuples[0], __assign(__assign({}, explore), { from: "array" })));
                            // TUPLE ONLY
                            else
                                install(explore_tuples(project)(config)(importer)(input, meta.tuples, __assign(__assign({}, explore), { from: "array" })));
                        else if (meta.arrays.some(function (elem) { return elem.type.value.any; }))
                            install(null);
                        else if (meta.tuples.length === 0)
                            if (meta.arrays.length === 1)
                                // ARRAY ONLY
                                install(decode_array(project)(config)(importer)(input, meta.arrays[0], __assign(__assign({}, explore), { from: "array" })));
                            else
                                install(explore_arrays(project)(config)(importer)(input, meta.arrays, __assign(__assign({}, explore), { from: "array" })));
                        else
                            install(explore_arrays_and_tuples(project)(config)(importer)(input, __spreadArray(__spreadArray([], __read(meta.tuples), false), __read(meta.arrays), false), explore));
                    }
                    // OBJECT
                    if (meta.objects.length > 0)
                        prepare(ExpressionFactory_1.ExpressionFactory.isObject({
                            checkNull: true,
                            checkArray: meta.objects.some(function (obj) {
                                return obj.properties.every(function (prop) { return !prop.key.isSoleLiteral() || !prop.value.isRequired(); });
                            }),
                        })(input), meta.objects.map(function (obj) { return obj.name; }).join(" | "))(explore_objects(config)(importer)(input, meta, __assign(__assign({}, explore), { from: "object" })));
                    if (instances.length) {
                        var transformer = function (merger) {
                            return function (ins) {
                                return ins.body
                                    ? {
                                        expression: merger(ins.pre, ins.body),
                                        combined: true,
                                    }
                                    : {
                                        expression: ins.pre,
                                        combined: false,
                                    };
                            };
                        };
                        if (instances.length === 1)
                            binaries.push(transformer(function (pre, body) {
                                return config.combiner(explore)("and")(input, [pre, body].map(function (expression) { return ({
                                    expression: expression,
                                    combined: expression !== pre,
                                }); }), meta.getName());
                            })(instances[0]));
                        else
                            binaries.push({
                                expression: config.combiner(explore)("or")(input, instances.map(transformer(typescript_1.default.factory.createLogicalAnd)), meta.getName()),
                                combined: true,
                            });
                    }
                    // ESCAPED CASE
                    if (meta.escaped !== null)
                        binaries.push({
                            combined: false,
                            expression: meta.escaped.original.size() === 1 &&
                                meta.escaped.original.natives.length === 1
                                ? (0, check_native_1.check_native)(meta.escaped.original.natives[0])(input)
                                : typescript_1.default.factory.createLogicalAnd(CheckerProgrammer.decode(project)(config)(importer)(input, meta.escaped.original, explore), typescript_1.default.factory.createLogicalAnd(IsProgrammer_1.IsProgrammer.decode_to_json(false)(input), decode_escaped(project)(config)(importer)(input, meta.escaped.returns, explore))),
                        });
                    //----
                    // COMBINE CONDITIONS
                    //----
                    return top.length && binaries.length
                        ? config.combiner(explore)("and")(input, __spreadArray(__spreadArray([], __read(top), false), [
                            {
                                expression: config.combiner(explore)("or")(input, binaries, meta.getName()),
                                combined: true,
                            },
                        ], false), meta.getName())
                        : binaries.length
                            ? config.combiner(explore)("or")(input, binaries, meta.getName())
                            : config.success;
                };
            };
        };
    };
    CheckerProgrammer.decode_object = function (config) { return function (importer) {
        var func = FeatureProgrammer_1.FeatureProgrammer.decode_object(config)(importer);
        return function (input, obj, explore) {
            obj.validated = true;
            return func(input, obj, explore);
        };
    }; };
    var decode_array = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, array, explore) {
                    if (array.type.recursive === false)
                        return decode_array_inline(project)(config)(importer)(input, array, explore);
                    explore = __assign(__assign({}, explore), { source: "function", from: "array" });
                    return typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(config.prefix, "a").concat(array.type.index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(__assign(__assign({}, explore), { source: "function", from: "array" }))(input)), config.joiner.failure(input, array.type.name, explore));
                };
            };
        };
    };
    var decode_array_inline = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, array, explore) {
                    var length = (0, check_array_length_1.check_array_length)(project)(array)(input);
                    var main = FeatureProgrammer_1.FeatureProgrammer.decode_array({
                        prefix: config.prefix,
                        trace: config.trace,
                        path: config.path,
                        decoder: function () { return CheckerProgrammer.decode(project)(config)(importer); },
                    })(importer)(config.joiner.array)(input, array, explore);
                    return length.expression === null && length.conditions.length === 0
                        ? main
                        : typescript_1.default.factory.createLogicalAnd(config.atomist(explore)(length)(input), main);
                };
            };
        };
    };
    var decode_tuple = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, tuple, explore) {
                    if (tuple.type.recursive === false)
                        return decode_tuple_inline(project)(config)(importer)(input, tuple.type, explore);
                    explore = __assign(__assign({}, explore), { source: "function", from: "array" });
                    return typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(config.prefix, "t").concat(tuple.type.index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(__assign(__assign({}, explore), { source: "function" }))(input)), config.joiner.failure(input, tuple.type.name, explore));
                };
            };
        };
    };
    var decode_tuple_inline = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, tuple, explore) {
                    var binaries = tuple.elements
                        .filter(function (meta) { return meta.rest === null; })
                        .map(function (meta, index) {
                        return CheckerProgrammer.decode(project)(config)(importer)(typescript_1.default.factory.createElementAccessExpression(input, index), meta, __assign(__assign({}, explore), { from: "array", postfix: explore.postfix.length
                                ? "".concat((0, postfix_of_tuple_1.postfix_of_tuple)(explore.postfix), "[").concat(index, "]\"")
                                : "\"[".concat(index, "]\"") }));
                    });
                    var rest = tuple.elements.length && tuple.elements.at(-1).rest !== null
                        ? CheckerProgrammer.decode(project)(config)(importer)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("slice"), undefined, [ExpressionFactory_1.ExpressionFactory.number(tuple.elements.length - 1)]), (0, wrap_metadata_rest_tuple_1.wrap_metadata_rest_tuple)(tuple.elements.at(-1).rest), __assign(__assign({}, explore), { start: tuple.elements.length - 1 }))
                        : null;
                    var arrayLength = typescript_1.default.factory.createPropertyAccessExpression(input, "length");
                    return config.combiner(explore)("and")(input, __spreadArray(__spreadArray(__spreadArray([], __read((rest === null
                        ? tuple.elements.every(function (t) { return t.optional === false; })
                            ? [
                                {
                                    combined: false,
                                    expression: typescript_1.default.factory.createStrictEquality(arrayLength, ExpressionFactory_1.ExpressionFactory.number(tuple.elements.length)),
                                },
                            ]
                            : [
                                {
                                    combined: false,
                                    expression: typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createLessThanEquals(ExpressionFactory_1.ExpressionFactory.number(tuple.elements.filter(function (t) { return t.optional === false; })
                                        .length), arrayLength), typescript_1.default.factory.createGreaterThanEquals(ExpressionFactory_1.ExpressionFactory.number(tuple.elements.length), arrayLength)),
                                },
                            ]
                        : [])), false), __read((config.joiner.tuple
                        ? [
                            {
                                expression: config.joiner.tuple(binaries),
                                combined: true,
                            },
                        ]
                        : binaries.map(function (expression) { return ({
                            expression: expression,
                            combined: true,
                        }); }))), false), __read((rest !== null
                        ? [
                            {
                                expression: rest,
                                combined: true,
                            },
                        ]
                        : [])), false), "[".concat(tuple.elements.map(function (t) { return t.getName(); }).join(", "), "]"));
                };
            };
        };
    };
    var decode_escaped = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, meta, explore) {
                    return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("input", TypeFactory_1.TypeFactory.keyword("any"))], undefined, undefined, CheckerProgrammer.decode(project)(config)(importer)(typescript_1.default.factory.createIdentifier("input"), meta, explore))), undefined, [
                        typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("toJSON"), undefined, []),
                    ]);
                };
            };
        };
    };
    /* -----------------------------------------------------------
          UNION TYPE EXPLORERS
      ----------------------------------------------------------- */
    var explore_sets = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, sets, explore) {
                    return typescript_1.default.factory.createCallExpression(UnionExplorer_1.UnionExplorer.set({
                        checker: CheckerProgrammer.decode(project)(config)(importer),
                        decoder: decode_array(project)(config)(importer),
                        empty: config.success,
                        success: config.success,
                        failure: function (input, expected, explore) {
                            return typescript_1.default.factory.createReturnStatement(config.joiner.failure(input, expected, explore));
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
                        checker: function (input, entry, explore) {
                            var func = CheckerProgrammer.decode(project)(config)(importer);
                            return typescript_1.default.factory.createLogicalAnd(func(typescript_1.default.factory.createElementAccessExpression(input, 0), entry[0], __assign(__assign({}, explore), { postfix: "".concat(explore.postfix, "[0]") })), func(typescript_1.default.factory.createElementAccessExpression(input, 1), entry[1], __assign(__assign({}, explore), { postfix: "".concat(explore.postfix, "[1]") })));
                        },
                        decoder: decode_array(project)(config)(importer),
                        empty: config.success,
                        success: config.success,
                        failure: function (input, expected, explore) {
                            return typescript_1.default.factory.createReturnStatement(config.joiner.failure(input, expected, explore));
                        },
                    })([])(input, maps, explore), undefined, undefined);
                };
            };
        };
    };
    var explore_tuples = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, tuples, explore) {
                    return explore_array_like_union_types(config)(importer)(UnionExplorer_1.UnionExplorer.tuple({
                        checker: decode_tuple(project)(config)(importer),
                        decoder: decode_tuple(project)(config)(importer),
                        empty: config.success,
                        success: config.success,
                        failure: function (input, expected, explore) {
                            return typescript_1.default.factory.createReturnStatement(config.joiner.failure(input, expected, explore));
                        },
                    }))(input, tuples, explore);
                };
            };
        };
    };
    var explore_arrays = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, arrays, explore) {
                    return explore_array_like_union_types(config)(importer)(UnionExplorer_1.UnionExplorer.array({
                        checker: CheckerProgrammer.decode(project)(config)(importer),
                        decoder: decode_array(project)(config)(importer),
                        empty: config.success,
                        success: config.success,
                        failure: function (input, expected, explore) {
                            return typescript_1.default.factory.createReturnStatement(config.joiner.failure(input, expected, explore));
                        },
                    }))(input, arrays, explore);
                };
            };
        };
    };
    var explore_arrays_and_tuples = function (project) {
        return function (config) {
            return function (importer) {
                return function (input, elements, explore) {
                    return explore_array_like_union_types(config)(importer)(UnionExplorer_1.UnionExplorer.array_or_tuple({
                        checker: function (front, target, explore, array) {
                            return target instanceof MetadataTuple_1.MetadataTuple
                                ? decode_tuple(project)(config)(importer)(front, target, explore)
                                : config.atomist(explore)({
                                    expected: elements
                                        .map(function (elem) {
                                        return elem instanceof MetadataArray_1.MetadataArray
                                            ? elem.getName()
                                            : elem.type.name;
                                    })
                                        .join(" | "),
                                    expression: CheckerProgrammer.decode(project)(config)(importer)(front, target, explore),
                                    conditions: [],
                                })(array);
                        },
                        decoder: function (input, target, explore) {
                            return target instanceof MetadataTuple_1.MetadataTuple
                                ? decode_tuple(project)(config)(importer)(input, target, explore)
                                : decode_array(project)(config)(importer)(input, target, explore);
                        },
                        empty: config.success,
                        success: config.success,
                        failure: function (input, expected, explore) {
                            return typescript_1.default.factory.createReturnStatement(config.joiner.failure(input, expected, explore));
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
                    return typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.emplaceUnion(config.prefix, elements.map(function (e) { return e.type.name; }).join(" | "), function () {
                        return arrow(FeatureProgrammer_1.FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(typescript_1.default.factory.createIdentifier("input")))(__assign(__assign({}, explore), { postfix: "" }))(typescript_1.default.factory.createIdentifier("input"));
                    })), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(explore)(input)), config.joiner.failure(input, elements.map(function (e) { return e.type.name; }).join(" | "), explore));
                };
            };
        };
    };
    var explore_objects = function (config) {
        return function (importer) {
            return function (input, meta, explore) {
                return meta.objects.length === 1
                    ? CheckerProgrammer.decode_object(config)(importer)(input, meta.objects[0], explore)
                    : typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(config.prefix, "u").concat(meta.union_index))), undefined, FeatureProgrammer_1.FeatureProgrammer.argumentsArray(config)(explore)(input));
            };
        };
    };
})(CheckerProgrammer || (exports.CheckerProgrammer = CheckerProgrammer = {}));
var create_add = function (binaries) {
    return function (defaultInput) {
        return function (exact, left, right) {
            if (right === void 0) { right = defaultInput; }
            var factory = exact
                ? typescript_1.default.factory.createStrictEquality
                : typescript_1.default.factory.createStrictInequality;
            binaries.push({
                expression: factory(left, right),
                combined: false,
            });
        };
    };
};
//# sourceMappingURL=CheckerProgrammer.js.map