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
exports.RandomProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../factories/IdentifierFactory");
var MetadataCollection_1 = require("../factories/MetadataCollection");
var MetadataFactory_1 = require("../factories/MetadataFactory");
var StatementFactory_1 = require("../factories/StatementFactory");
var TemplateFactory_1 = require("../factories/TemplateFactory");
var TypeFactory_1 = require("../factories/TypeFactory");
var Metadata_1 = require("../schemas/metadata/Metadata");
var MetadataArray_1 = require("../schemas/metadata/MetadataArray");
var MetadataArrayType_1 = require("../schemas/metadata/MetadataArrayType");
var MetadataAtomic_1 = require("../schemas/metadata/MetadataAtomic");
var MetadataTuple_1 = require("../schemas/metadata/MetadataTuple");
var MetadataTupleType_1 = require("../schemas/metadata/MetadataTupleType");
var TransformerError_1 = require("../transformers/TransformerError");
var Escaper_1 = require("../utils/Escaper");
var FeatureProgrammer_1 = require("./FeatureProgrammer");
var FunctionImporter_1 = require("./helpers/FunctionImporter");
var RandomJoiner_1 = require("./helpers/RandomJoiner");
var RandomRanger_1 = require("./helpers/RandomRanger");
var random_custom_1 = require("./internal/random_custom");
var RandomProgrammer;
(function (RandomProgrammer) {
    RandomProgrammer.decompose = function (props) {
        var _a, _b;
        var collection = new MetadataCollection_1.MetadataCollection();
        var result = MetadataFactory_1.MetadataFactory.analyze(props.project.checker, props.project.context)({
            escape: false,
            constant: true,
            absorb: true,
            validate: function (meta) {
                var output = [];
                if (meta.natives.some(function (n) { return n === "WeakSet"; }))
                    output.push("WeakSet is not supported.");
                else if (meta.natives.some(function (n) { return n === "WeakMap"; }))
                    output.push("WeakMap is not supported.");
                return output;
            },
        })(collection)(props.type);
        if (result.success === false)
            throw TransformerError_1.TransformerError.from("typia.".concat(props.importer.method))(result.errors);
        // GENERATE FUNCTION
        var functions = Object.fromEntries(__spreadArray(__spreadArray(__spreadArray([], __read(write_object_functions(props.importer)(collection).map(function (v, i) { return [
            Prefix.object(i),
            v,
        ]; })), false), __read(write_array_functions(props.importer)(collection).map(function (v, i) { return [
            Prefix.array(i),
            v,
        ]; })), false), __read(write_tuple_functions(props.importer)(collection).map(function (v, i) { return [
            Prefix.tuple(i),
            v,
        ]; })), false));
        var arrow = typescript_1.default.factory.createArrowFunction(undefined, undefined, [
            IdentifierFactory_1.IdentifierFactory.parameter("generator", typescript_1.default.factory.createTypeReferenceNode("Partial<typia.IRandomGenerator>"), (_a = props.init) !== null && _a !== void 0 ? _a : typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionToken)),
        ], typescript_1.default.factory.createImportTypeNode(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral("typia")), undefined, typescript_1.default.factory.createIdentifier("Resolved"), [
            typescript_1.default.factory.createTypeReferenceNode((_b = props.name) !== null && _b !== void 0 ? _b : TypeFactory_1.TypeFactory.getFullName(props.project.checker)(props.type)),
        ], false), undefined, typescript_1.default.factory.createBlock([
            typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier("_generator"), typescript_1.default.SyntaxKind.EqualsToken, typescript_1.default.factory.createIdentifier("generator"))),
            typescript_1.default.factory.createReturnStatement(decode(props.importer)({
                function: false,
                recursive: false,
            })(result.data)),
        ], true));
        return {
            functions: functions,
            statements: [StatementFactory_1.StatementFactory.mut("_generator")],
            arrow: arrow,
        };
    };
    RandomProgrammer.write = function (project) {
        return function (modulo) {
            return function (init) {
                return function (type, name) {
                    var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                    var result = RandomProgrammer.decompose({
                        project: project,
                        importer: importer,
                        type: type,
                        name: name,
                        init: init,
                    });
                    return FeatureProgrammer_1.FeatureProgrammer.writeDecomposed({
                        modulo: modulo,
                        importer: importer,
                        result: result,
                    });
                };
            };
        };
    };
    var write_object_functions = function (importer) {
        return function (collection) {
            return collection.objects().map(function (obj, i) {
                return StatementFactory_1.StatementFactory.constant(Prefix.object(i), typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                    IdentifierFactory_1.IdentifierFactory.parameter("_recursive", TypeFactory_1.TypeFactory.keyword("boolean"), typescript_1.default.factory.createIdentifier(String(obj.recursive))),
                    IdentifierFactory_1.IdentifierFactory.parameter("_depth", TypeFactory_1.TypeFactory.keyword("number"), ExpressionFactory_1.ExpressionFactory.number(0)),
                ], TypeFactory_1.TypeFactory.keyword("any"), undefined, RandomJoiner_1.RandomJoiner.object(COALESCE(importer))(decode(importer)({
                    recursive: obj.recursive,
                    function: true,
                }))(obj)));
            });
        };
    };
    var write_array_functions = function (importer) {
        return function (collection) {
            return collection
                .arrays()
                .filter(function (a) { return a.recursive; })
                .map(function (array, i) {
                return StatementFactory_1.StatementFactory.constant(Prefix.array(i), typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                    IdentifierFactory_1.IdentifierFactory.parameter("length", TypeFactory_1.TypeFactory.keyword("number")),
                    IdentifierFactory_1.IdentifierFactory.parameter("unique", TypeFactory_1.TypeFactory.keyword("boolean")),
                    IdentifierFactory_1.IdentifierFactory.parameter("_recursive", TypeFactory_1.TypeFactory.keyword("boolean"), typescript_1.default.factory.createTrue()),
                    IdentifierFactory_1.IdentifierFactory.parameter("_depth", TypeFactory_1.TypeFactory.keyword("number"), ExpressionFactory_1.ExpressionFactory.number(0)),
                ], TypeFactory_1.TypeFactory.keyword("any"), undefined, RandomJoiner_1.RandomJoiner.array(COALESCE(importer))(decode(importer)({
                    recursive: true,
                    function: true,
                }))({
                    recursive: true,
                    function: true,
                })(typescript_1.default.factory.createIdentifier("length"), typescript_1.default.factory.createIdentifier("unique"))(array.value)));
            });
        };
    };
    var write_tuple_functions = function (importer) {
        return function (collection) {
            return collection
                .tuples()
                .filter(function (a) { return a.recursive; })
                .map(function (tuple, i) {
                return StatementFactory_1.StatementFactory.constant(Prefix.tuple(i), typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                    IdentifierFactory_1.IdentifierFactory.parameter("_recursive", TypeFactory_1.TypeFactory.keyword("boolean"), typescript_1.default.factory.createTrue()),
                    IdentifierFactory_1.IdentifierFactory.parameter("_depth", TypeFactory_1.TypeFactory.keyword("number"), ExpressionFactory_1.ExpressionFactory.number(0)),
                ], TypeFactory_1.TypeFactory.keyword("any"), undefined, RandomJoiner_1.RandomJoiner.tuple(decode(importer)({
                    function: true,
                    recursive: true,
                }))(tuple.elements)));
            });
        };
    };
    /* -----------------------------------------------------------
      DECODERS
    ----------------------------------------------------------- */
    var decode = function (importer) {
        return function (explore) {
            return function (meta) {
                var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k;
                var expressions = [];
                if (meta.any)
                    expressions.push(typescript_1.default.factory.createStringLiteral("any type used..."));
                // NULL COALESCING
                if (meta.isRequired() === false || meta.functions.length)
                    expressions.push(typescript_1.default.factory.createIdentifier("undefined"));
                if (meta.nullable === true)
                    expressions.push(typescript_1.default.factory.createNull());
                try {
                    // CONSTANT TYPES
                    for (var _l = __values(meta.constants), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var constant = _m.value;
                        try {
                            for (var _o = (e_2 = void 0, __values(constant.values)), _p = _o.next(); !_p.done; _p = _o.next()) {
                                var value = _p.value.value;
                                expressions.push(decode_atomic(value));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_p && !_p.done && (_b = _o.return)) _b.call(_o);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_a = _l.return)) _a.call(_l);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    // ATOMIC VARIABLES
                    for (var _q = __values(meta.templates), _r = _q.next(); !_r.done; _r = _q.next()) {
                        var template = _r.value;
                        expressions.push(decode_template(importer)(explore)(template));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_r && !_r.done && (_c = _q.return)) _c.call(_q);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    for (var _s = __values(meta.atomics), _t = _s.next(); !_t.done; _t = _s.next()) {
                        var atomic = _t.value;
                        if (atomic.type === "boolean")
                            expressions.push(decode_boolean(importer));
                        else if (atomic.type === "number")
                            expressions.push.apply(expressions, __spreadArray([], __read(decode_number(importer)(atomic)), false));
                        else if (atomic.type === "string")
                            expressions.push.apply(expressions, __spreadArray([], __read(decode_string(importer)(atomic)), false));
                        else if (atomic.type === "bigint")
                            expressions.push.apply(expressions, __spreadArray([], __read(decode_bigint(importer)(atomic)), false));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_t && !_t.done && (_d = _s.return)) _d.call(_s);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                // INSTANCE TYPES
                if (meta.escaped)
                    expressions.push(decode(importer)(explore)(meta.escaped.returns));
                try {
                    for (var _u = __values(meta.arrays), _v = _u.next(); !_v.done; _v = _u.next()) {
                        var array = _v.value;
                        expressions.push.apply(expressions, __spreadArray([], __read(decode_array(importer)(explore)(array)), false));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_v && !_v.done && (_e = _u.return)) _e.call(_u);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                try {
                    for (var _w = __values(meta.tuples), _x = _w.next(); !_x.done; _x = _w.next()) {
                        var tuple = _x.value;
                        expressions.push(decode_tuple(importer)(explore)(tuple));
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_x && !_x.done && (_f = _w.return)) _f.call(_w);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                try {
                    for (var _y = __values(meta.objects), _z = _y.next(); !_z.done; _z = _y.next()) {
                        var o = _z.value;
                        expressions.push(decode_object(importer)(explore)(o));
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_z && !_z.done && (_g = _y.return)) _g.call(_y);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                try {
                    for (var _0 = __values(meta.natives), _1 = _0.next(); !_1.done; _1 = _0.next()) {
                        var native = _1.value;
                        expressions.push(decode_native(importer)(native));
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_1 && !_1.done && (_h = _0.return)) _h.call(_0);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                try {
                    for (var _2 = __values(meta.sets), _3 = _2.next(); !_3.done; _3 = _2.next()) {
                        var set = _3.value;
                        expressions.push(decode_set(importer)(explore)(set));
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_3 && !_3.done && (_j = _2.return)) _j.call(_2);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                try {
                    for (var _4 = __values(meta.maps), _5 = _4.next(); !_5.done; _5 = _4.next()) {
                        var map = _5.value;
                        expressions.push(decode_map(importer)(explore)(map));
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_5 && !_5.done && (_k = _4.return)) _k.call(_4);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
                // PICK UP A TYPE
                if (expressions.length === 1)
                    return expressions[0];
                return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createCallExpression(importer.use("pick"), undefined, [
                    typescript_1.default.factory.createArrayLiteralExpression(expressions.map(function (expr) {
                        return typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, expr);
                    }), true),
                ]), undefined, undefined);
            };
        };
    };
    var decode_boolean = function (importer) {
        return typescript_1.default.factory.createCallExpression(COALESCE(importer)("boolean"), undefined, undefined);
    };
    var decode_atomic = function (value) {
        return typeof value === "boolean"
            ? typescript_1.default.factory.createIdentifier(value.toString())
            : typeof value === "number"
                ? ExpressionFactory_1.ExpressionFactory.number(value)
                : typeof value === "string"
                    ? typescript_1.default.factory.createStringLiteral(value)
                    : ExpressionFactory_1.ExpressionFactory.bigint(Number(value));
    };
    var decode_template = function (importer) {
        return function (explore) {
            return function (template) {
                return TemplateFactory_1.TemplateFactory.generate(template.row.map(function (meta) { return decode(importer)(explore)(meta); }));
            };
        };
    };
    var decode_number = function (importer) {
        return function (atomic) {
            return (atomic.tags.length ? atomic.tags : [[]]).map(function (tags) {
                var type = tags.find(function (t) {
                    return t.kind === "type" && (t.value === "int32" || t.value === "int64");
                })
                    ? "int"
                    : tags.find(function (t) {
                        return t.kind === "type" &&
                            (t.value === "uint32" || t.value === "uint64");
                    })
                        ? "uint"
                        : "double";
                var multiply = tags.find(function (t) { return t.kind === "multipleOf"; });
                return (0, random_custom_1.random_custom)(COALESCE(importer))("number")(tags)(RandomRanger_1.RandomRanger.number({
                    type: type,
                    transform: function (value) { return ExpressionFactory_1.ExpressionFactory.number(value); },
                    setter: function (args) {
                        return typescript_1.default.factory.createCallExpression(type !== "double" || multiply !== undefined
                            ? COALESCE(importer)("integer")
                            : COALESCE(importer)("number"), undefined, args.map(function (val) { return ExpressionFactory_1.ExpressionFactory.number(val); }));
                    },
                })({
                    minimum: 0,
                    maximum: 100,
                    gap: 10,
                })(tags));
            });
        };
    };
    var decode_bigint = function (importer) {
        return function (atomic) {
            return (atomic.tags.length ? atomic.tags : [[]]).map(function (tags) {
                return (0, random_custom_1.random_custom)(COALESCE(importer))("bigint")(tags)(RandomRanger_1.RandomRanger.number({
                    type: tags.find(function (t) {
                        return t.kind === "type" &&
                            (t.value === "uint" || t.value === "uint64");
                    })
                        ? "uint"
                        : "int",
                    transform: function (value) { return ExpressionFactory_1.ExpressionFactory.bigint(value); },
                    setter: function (args) {
                        return typescript_1.default.factory.createCallExpression(COALESCE(importer)("bigint"), undefined, args.map(function (value) { return ExpressionFactory_1.ExpressionFactory.bigint(value); }));
                    },
                })({
                    minimum: 0,
                    maximum: 100,
                    gap: 10,
                })(tags));
            });
        };
    };
    var decode_string = function (importer) {
        return function (atomic) {
            return (atomic.tags.length ? atomic.tags : [[]]).map(function (tags) {
                return (0, random_custom_1.random_custom)(COALESCE(importer))("string")(tags)((function () {
                    var e_11, _a;
                    try {
                        for (var tags_1 = __values(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
                            var t = tags_1_1.value;
                            if (t.kind === "format")
                                return typescript_1.default.factory.createCallExpression(COALESCE(importer)(emendFormat(t.value)), undefined, undefined);
                            else if (t.kind === "pattern")
                                return typescript_1.default.factory.createCallExpression(COALESCE(importer)("pattern"), undefined, [
                                    typescript_1.default.factory.createIdentifier("RegExp(".concat(JSON.stringify(t.value), ")")),
                                ]);
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                    var tail = RandomRanger_1.RandomRanger.length(COALESCE(importer))({
                        minimum: 5,
                        maximum: 25,
                        gap: 5,
                    })({
                        minimum: "minLength",
                        maximum: "maxLength",
                    })(tags);
                    return typescript_1.default.factory.createCallExpression(COALESCE(importer)("string"), undefined, tail ? [tail] : undefined);
                })());
            });
        };
    };
    var decode_array = function (importer) {
        return function (explore) {
            return function (array) {
                var fixed = (array.tags.length ? array.tags : [[]]).map(function (tags) { return [
                    RandomRanger_1.RandomRanger.length(COALESCE(importer))({
                        minimum: 0,
                        maximum: 3,
                        gap: 3,
                    })({
                        minimum: "minItems",
                        maximum: "maxItems",
                    })(tags),
                    (function () {
                        var uniqueItems = tags.find(function (t) { return t.kind === "uniqueItems"; });
                        return uniqueItems === undefined
                            ? undefined
                            : uniqueItems.value === false
                                ? typescript_1.default.factory.createFalse()
                                : typescript_1.default.factory.createTrue();
                    })(),
                ]; });
                if (array.type.recursive)
                    return fixed.map(function (_a) {
                        var _b = __read(_a, 2), len = _b[0], unique = _b[1];
                        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal(Prefix.array(array.type.index))), undefined, [
                            len !== null && len !== void 0 ? len : COALESCE(importer)("length"),
                            unique !== null && unique !== void 0 ? unique : typescript_1.default.factory.createFalse(),
                            typescript_1.default.factory.createTrue(),
                            explore.recursive
                                ? typescript_1.default.factory.createAdd(ExpressionFactory_1.ExpressionFactory.number(1), typescript_1.default.factory.createIdentifier("_depth"))
                                : ExpressionFactory_1.ExpressionFactory.number(0),
                        ]);
                    });
                return fixed.map(function (_a) {
                    var _b = __read(_a, 2), len = _b[0], unique = _b[1];
                    var expr = RandomJoiner_1.RandomJoiner.array(COALESCE(importer))(decode(importer)(explore))(explore)(len, unique)(array.type.value);
                    return explore.recursive
                        ? typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createIdentifier("_recursive"), typescript_1.default.factory.createLessThan(ExpressionFactory_1.ExpressionFactory.number(5), typescript_1.default.factory.createIdentifier("_depth"))), undefined, typescript_1.default.factory.createIdentifier("[]"), undefined, expr)
                        : expr;
                });
            };
        };
    };
    var decode_tuple = function (importer) {
        return function (explore) {
            return function (tuple) {
                return tuple.type.recursive
                    ? typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal(Prefix.tuple(tuple.type.index))), undefined, [
                        typescript_1.default.factory.createTrue(),
                        explore.recursive
                            ? typescript_1.default.factory.createAdd(ExpressionFactory_1.ExpressionFactory.number(1), typescript_1.default.factory.createIdentifier("_depth"))
                            : ExpressionFactory_1.ExpressionFactory.number(0),
                    ])
                    : RandomJoiner_1.RandomJoiner.tuple(decode(importer)(explore))(tuple.type.elements);
            };
        };
    };
    var decode_object = function (importer) {
        return function (explore) {
            return function (object) {
                return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal(Prefix.object(object.index))), undefined, explore.function
                    ? [
                        explore.recursive
                            ? typescript_1.default.factory.createTrue()
                            : typescript_1.default.factory.createIdentifier("_recursive"),
                        typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createIdentifier("_recursive"), undefined, typescript_1.default.factory.createAdd(ExpressionFactory_1.ExpressionFactory.number(1), typescript_1.default.factory.createIdentifier("_depth")), undefined, typescript_1.default.factory.createIdentifier("_depth")),
                    ]
                    : undefined);
            };
        };
    };
    /* -----------------------------------------------------------
      NATIVE CLASSES
    ----------------------------------------------------------- */
    var decode_set = function (importer) { return function (explore) { return function (meta) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Set"), undefined, [
            decode_array(importer)(explore)(MetadataArray_1.MetadataArray.create({
                tags: [],
                type: MetadataArrayType_1.MetadataArrayType.create({
                    value: meta,
                    recursive: false,
                    index: null,
                    nullables: [],
                    name: "Set<".concat(meta.getName(), ">"),
                }),
            }))[0],
        ]);
    }; }; };
    var decode_map = function (importer) {
        return function (explore) {
            return function (map) {
                return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Map"), undefined, [
                    decode_array(importer)(explore)(MetadataArray_1.MetadataArray.create({
                        tags: [],
                        type: MetadataArrayType_1.MetadataArrayType.create({
                            name: "Map<".concat(map.key.getName(), ", ").concat(map.value.getName(), ">"),
                            index: null,
                            recursive: false,
                            nullables: [],
                            value: Metadata_1.Metadata.create(__assign(__assign({}, Metadata_1.Metadata.initialize()), { tuples: [
                                    (function () {
                                        var type = MetadataTupleType_1.MetadataTupleType.create({
                                            name: "[".concat(map.key.getName(), ", ").concat(map.value.getName(), "]"),
                                            index: null,
                                            recursive: false,
                                            nullables: [],
                                            elements: [map.key, map.value],
                                        });
                                        type.of_map = true;
                                        return MetadataTuple_1.MetadataTuple.create({
                                            type: type,
                                            tags: [],
                                        });
                                    })(),
                                ] })),
                        }),
                    }))[0],
                ]);
            };
        };
    };
    var decode_native = function (importer) {
        return function (type) {
            if (type === "Boolean")
                return decode_boolean(importer);
            else if (type === "Number")
                return decode_number(importer)(MetadataAtomic_1.MetadataAtomic.create({
                    type: "number",
                    tags: [],
                }))[0];
            else if (type === "String")
                return decode_string(importer)(MetadataAtomic_1.MetadataAtomic.create({
                    type: "string",
                    tags: [],
                }))[0];
            else if (type === "Date")
                return decode_native_date(importer);
            else if (type === "Uint8Array" ||
                type === "Uint8ClampedArray" ||
                type === "Uint16Array" ||
                type === "Uint32Array" ||
                type === "BigUint64Array" ||
                type === "Int8Array" ||
                type === "Int16Array" ||
                type === "Int32Array" ||
                type === "BigInt64Array" ||
                type === "Float32Array" ||
                type === "Float64Array")
                return decode_native_byte_array(importer)(type);
            else if (type === "ArrayBuffer" || type === "SharedArrayBuffer")
                return decode_native_array_buffer(importer)(type);
            else if (type === "DataView")
                return decode_native_data_view(importer);
            else if (type === "Blob")
                return decode_native_blob(importer);
            else if (type === "File")
                return decode_native_file(importer);
            else if (type === "RegExp")
                return decode_regexp();
            else
                return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier(type), undefined, []);
        };
    };
    var decode_native_date = function (importer) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Date"), undefined, [
            typescript_1.default.factory.createCallExpression(COALESCE(importer)("datetime"), undefined, []),
        ]);
    };
    var decode_native_byte_array = function (importer) {
        return function (type) {
            new BigInt64Array();
            var _a = __read((function () {
                if (type === "Uint8Array" || type === "Uint8ClampedArray")
                    return [0, 255];
                else if (type === "Uint16Array")
                    return [0, 65535];
                else if (type === "Uint32Array")
                    return [0, 4294967295];
                else if (type === "BigUint64Array")
                    return [0, 18446744073709551615];
                else if (type === "Int8Array")
                    return [-128, 127];
                else if (type === "Int16Array")
                    return [-32768, 32767];
                else if (type === "Int32Array")
                    return [-2147483648, 2147483647];
                else if (type === "BigInt64Array")
                    return [-9223372036854775808, 9223372036854775807];
                else if (type === "Float32Array")
                    return [-1.175494351e38, 3.4028235e38];
                return [Number.MIN_VALUE, Number.MAX_VALUE];
            })(), 2), minimum = _a[0], maximum = _a[1];
            var literal = type === "BigInt64Array" || type === "BigUint64Array"
                ? ExpressionFactory_1.ExpressionFactory.bigint
                : ExpressionFactory_1.ExpressionFactory.number;
            return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier(type), [], [
                typescript_1.default.factory.createCallExpression(COALESCE(importer)("array"), undefined, [
                    typescript_1.default.factory.createArrowFunction(undefined, undefined, [], TypeFactory_1.TypeFactory.keyword("any"), undefined, typescript_1.default.factory.createCallExpression(COALESCE(importer)(type === "Float32Array" || type === "Float64Array"
                        ? "number"
                        : type === "BigInt64Array" || type === "BigUint64Array"
                            ? "bigint"
                            : "integer"), undefined, [literal(minimum), literal(maximum)])),
                ]),
            ]);
        };
    };
    var decode_native_blob = function (importer) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Blob"), undefined, [
            typescript_1.default.factory.createArrayLiteralExpression([decode_native_byte_array(importer)("Uint8Array")], true),
        ]);
    };
    var decode_native_file = function (importer) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("File"), undefined, [
            typescript_1.default.factory.createArrayLiteralExpression([decode_native_byte_array(importer)("Uint8Array")], true),
            typescript_1.default.factory.createTemplateExpression(typescript_1.default.factory.createTemplateHead(""), [
                typescript_1.default.factory.createTemplateSpan(typescript_1.default.factory.createCallExpression(COALESCE(importer)("string"), undefined, [typescript_1.default.factory.createNumericLiteral(8)]), typescript_1.default.factory.createTemplateMiddle(".")),
                typescript_1.default.factory.createTemplateSpan(typescript_1.default.factory.createCallExpression(COALESCE(importer)("string"), undefined, [typescript_1.default.factory.createNumericLiteral(3)]), typescript_1.default.factory.createTemplateTail("")),
            ]),
        ]);
    };
    var decode_native_array_buffer = function (importer) {
        return function (type) {
            return type === "ArrayBuffer"
                ? IdentifierFactory_1.IdentifierFactory.access(decode_native_byte_array(importer)("Uint8Array"))("buffer")
                : ExpressionFactory_1.ExpressionFactory.selfCall(typescript_1.default.factory.createBlock([
                    StatementFactory_1.StatementFactory.constant("length", typescript_1.default.factory.createCallExpression(COALESCE(importer)("integer"), undefined, [])),
                    StatementFactory_1.StatementFactory.constant("buffer", typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("SharedArrayBuffer"), [], [typescript_1.default.factory.createIdentifier("length")])),
                    StatementFactory_1.StatementFactory.constant("bytes", typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Uint8Array"), [], [typescript_1.default.factory.createIdentifier("buffer")])),
                    typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createIdentifier("bytes"))("set"), undefined, [
                        typescript_1.default.factory.createCallExpression(COALESCE(importer)("array"), undefined, [
                            typescript_1.default.factory.createArrowFunction(undefined, undefined, [], TypeFactory_1.TypeFactory.keyword("any"), undefined, typescript_1.default.factory.createCallExpression(COALESCE(importer)("integer"), undefined, [
                                ExpressionFactory_1.ExpressionFactory.number(0),
                                ExpressionFactory_1.ExpressionFactory.number(255),
                            ])),
                            typescript_1.default.factory.createIdentifier("length"),
                        ]),
                        ExpressionFactory_1.ExpressionFactory.number(0),
                    ])),
                    typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createIdentifier("buffer")),
                ], true));
        };
    };
    var decode_native_data_view = function (importer) {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("DataView"), [], [
            IdentifierFactory_1.IdentifierFactory.access(decode_native_byte_array(importer)("Uint8Array"))("buffer"),
        ]);
    };
    var decode_regexp = function () {
        return typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("RegExp"), [], [typescript_1.default.factory.createIdentifier("/(?:)/")]);
    };
})(RandomProgrammer || (exports.RandomProgrammer = RandomProgrammer = {}));
var Prefix = {
    object: function (i) { return "$ro".concat(i); },
    array: function (i) { return "$ra".concat(i); },
    tuple: function (i) { return "$rt".concat(i); },
};
var COALESCE = function (importer) { return function (name) {
    return ExpressionFactory_1.ExpressionFactory.coalesce(Escaper_1.Escaper.variable(name)
        ? typescript_1.default.factory.createPropertyAccessChain(typescript_1.default.factory.createIdentifier("_generator"), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.default.factory.createIdentifier(name))
        : typescript_1.default.factory.createElementAccessChain(typescript_1.default.factory.createIdentifier("_generator"), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.default.factory.createStringLiteral(name)))(IdentifierFactory_1.IdentifierFactory.access(importer.use("generator"))(name));
}; };
var emendFormat = function (key) {
    return key === "date-time"
        ? "datetime"
        : key
            .split("-")
            .map(function (str, i) {
            return i === 0 || str.length === 0
                ? str
                : str[0].toUpperCase() + str.substring(1);
        })
            .join("");
};
//# sourceMappingURL=RandomProgrammer.js.map