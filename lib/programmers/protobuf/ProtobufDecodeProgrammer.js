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
exports.ProtobufDecodeProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../factories/MetadataFactory");
var ProtobufFactory_1 = require("../../factories/ProtobufFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataAtomic_1 = require("../../schemas/metadata/MetadataAtomic");
var MetadataProperty_1 = require("../../schemas/metadata/MetadataProperty");
var FeatureProgrammer_1 = require("../FeatureProgrammer");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var ProtobufUtil_1 = require("../helpers/ProtobufUtil");
var ProtobufDecodeProgrammer;
(function (ProtobufDecodeProgrammer) {
    ProtobufDecodeProgrammer.decompose = function (props) {
        var _a;
        var collection = new MetadataCollection_1.MetadataCollection();
        var meta = ProtobufFactory_1.ProtobufFactory.metadata(props.modulo.getText())(props.project.checker, props.project.context)(collection)(props.type);
        return {
            functions: Object.fromEntries(collection
                .objects()
                .filter(function (obj) { return ProtobufUtil_1.ProtobufUtil.isStaticObject(obj); })
                .map(function (obj) { return [
                "".concat(PREFIX, "o").concat(obj.index),
                StatementFactory_1.StatementFactory.constant(props.importer.useLocal("".concat(PREFIX, "o").concat(obj.index)), write_object_function(props.project)(props.importer)(obj)),
            ]; })),
            statements: [],
            arrow: typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory_1.IdentifierFactory.parameter("input", typescript_1.default.factory.createTypeReferenceNode("Uint8Array")),
            ], typescript_1.default.factory.createImportTypeNode(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral("typia")), undefined, typescript_1.default.factory.createIdentifier("Resolved"), [
                typescript_1.default.factory.createTypeReferenceNode((_a = props.name) !== null && _a !== void 0 ? _a : TypeFactory_1.TypeFactory.getFullName(props.project.checker)(props.type)),
            ]), undefined, typescript_1.default.factory.createBlock([
                StatementFactory_1.StatementFactory.constant("reader", typescript_1.default.factory.createNewExpression(props.importer.use("Reader"), undefined, [typescript_1.default.factory.createIdentifier("input")])),
                typescript_1.default.factory.createReturnStatement(decode_regular_object(true)(meta.objects[0])),
            ], true)),
        };
    };
    ProtobufDecodeProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = ProtobufDecodeProgrammer.decompose({
                    project: project,
                    modulo: modulo,
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
    var write_object_function = function (project) {
        return function (importer) {
            return function (obj) {
                return typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                    IdentifierFactory_1.IdentifierFactory.parameter("reader"),
                    IdentifierFactory_1.IdentifierFactory.parameter("length", TypeFactory_1.TypeFactory.keyword("number"), ExpressionFactory_1.ExpressionFactory.number(-1)),
                ], TypeFactory_1.TypeFactory.keyword("any"), undefined, typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([
                    typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier("length"), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createLessThan(typescript_1.default.factory.createIdentifier("length"), ExpressionFactory_1.ExpressionFactory.number(0)), undefined, typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("size"), undefined, undefined), undefined, typescript_1.default.factory.createAdd(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("index"), undefined, undefined), typescript_1.default.factory.createIdentifier("length")))))
                ], __read(write_object_function_body(project)(importer)({
                    condition: typescript_1.default.factory.createLessThan(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("index"), undefined, undefined), typescript_1.default.factory.createIdentifier("length")),
                    tag: "tag",
                    output: "output",
                })(obj.properties)), false), [
                    typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createIdentifier("output")),
                ], false), true));
            };
        };
    };
    var write_object_function_body = function (project) {
        return function (importer) {
            return function (props) {
                return function (properties) {
                    var i = 1;
                    var clauses = properties
                        .map(function (p) {
                        var clause = decode_property(project)(importer)(i)(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createIdentifier(props.output))(p.key.getSoleLiteral()), p.value);
                        i += ProtobufUtil_1.ProtobufUtil.size(p.value);
                        return clause;
                    })
                        .flat();
                    return [
                        StatementFactory_1.StatementFactory.constant(props.output, typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createObjectLiteralExpression(properties
                            .filter(function (p) {
                            return !(project.compilerOptions.exactOptionalPropertyTypes ===
                                true && p.value.optional === true);
                        })
                            .map(function (p) {
                            return typescript_1.default.factory.createPropertyAssignment(IdentifierFactory_1.IdentifierFactory.identifier(p.key.getSoleLiteral()), write_property_default_value(p.value));
                        }), true), TypeFactory_1.TypeFactory.keyword("any"))),
                        typescript_1.default.factory.createWhileStatement(props.condition, typescript_1.default.factory.createBlock([
                            StatementFactory_1.StatementFactory.constant(props.tag, typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("uint32"), undefined, undefined)),
                            typescript_1.default.factory.createSwitchStatement(typescript_1.default.factory.createUnsignedRightShift(typescript_1.default.factory.createIdentifier(props.tag), ExpressionFactory_1.ExpressionFactory.number(3)), typescript_1.default.factory.createCaseBlock(__spreadArray(__spreadArray([], __read(clauses), false), [
                                typescript_1.default.factory.createDefaultClause([
                                    typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("skipType"), undefined, [
                                        typescript_1.default.factory.createBitwiseAnd(typescript_1.default.factory.createIdentifier(props.tag), ExpressionFactory_1.ExpressionFactory.number(7)),
                                    ])),
                                    typescript_1.default.factory.createBreakStatement(),
                                ]),
                            ], false))),
                        ])),
                    ];
                };
            };
        };
    };
    var write_property_default_value = function (value) {
        return typescript_1.default.factory.createAsExpression(value.nullable
            ? typescript_1.default.factory.createNull()
            : value.isRequired() === false
                ? typescript_1.default.factory.createIdentifier("undefined")
                : value.arrays.length
                    ? typescript_1.default.factory.createArrayLiteralExpression()
                    : value.maps.length
                        ? typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Map"), undefined, [])
                        : value.natives.length
                            ? typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Uint8Array"), undefined, [])
                            : value.atomics.some(function (a) { return a.type === "string"; }) ||
                                value.constants.some(function (c) {
                                    return c.type === "string" &&
                                        c.values.some(function (v) { return v.value === ""; });
                                }) ||
                                value.templates.some(function (tpl) {
                                    return tpl.row.length === 1 &&
                                        tpl.row[0].getName() === "string";
                                })
                                ? typescript_1.default.factory.createStringLiteral("")
                                : value.objects.length &&
                                    value.objects.some(function (obj) { return !ProtobufUtil_1.ProtobufUtil.isStaticObject(obj); })
                                    ? typescript_1.default.factory.createObjectLiteralExpression()
                                    : typescript_1.default.factory.createIdentifier("undefined"), TypeFactory_1.TypeFactory.keyword("any"));
    };
    /* -----------------------------------------------------------
          DECODERS
      ----------------------------------------------------------- */
    var decode_property = function (project) {
        return function (importer) {
            return function (index) {
                return function (accessor, meta) {
                    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
                    var clauses = [];
                    var emplace = function (name) { return function (v) {
                        return clauses.push(typescript_1.default.factory.createCaseClause(ExpressionFactory_1.ExpressionFactory.number(index++), Array.isArray(v)
                            ? __spreadArray(__spreadArray([
                                typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createIdentifier("// type: ".concat(name)))
                            ], __read(v), false), [
                                typescript_1.default.factory.createBreakStatement(),
                            ], false) : [
                            typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createIdentifier("// ".concat(name))),
                            typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createBinaryExpression(accessor, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), v)),
                            typescript_1.default.factory.createBreakStatement(),
                        ]));
                    }; };
                    var required = meta.isRequired() && !meta.nullable;
                    try {
                        for (var _e = __values(ProtobufUtil_1.ProtobufUtil.getAtomics(meta)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var atomic = _f.value;
                            emplace(atomic)(decode_atomic(meta)(atomic));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (meta.natives.length)
                        emplace("bytes")(decode_bytes("bytes"));
                    try {
                        for (var _g = __values(meta.arrays), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var array = _h.value;
                            emplace("Array<".concat(array.type.value.getName(), ">"))(decode_array(accessor, array, required));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    try {
                        for (var _j = __values(meta.maps), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var map = _k.value;
                            emplace("Map<string, ".concat(map.value.getName(), ">"))(decode_map(project)(importer)(accessor, map, required));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    try {
                        for (var _l = __values(meta.objects), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var obj = _m.value;
                            emplace(obj.name)(ProtobufUtil_1.ProtobufUtil.isStaticObject(obj)
                                ? decode_regular_object(false)(obj)
                                : decode_dynamic_object(project)(importer)(accessor, obj, required));
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    return clauses;
                };
            };
        };
    };
    var decode_atomic = function (meta) {
        return function (atomic) {
            if (atomic === "string")
                return decode_bytes("string");
            var call = typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createIdentifier("reader"))(atomic), undefined, undefined);
            if (atomic !== "int64" && atomic !== "uint64")
                return call;
            var isNumber = ProtobufUtil_1.ProtobufUtil.getNumbers(meta).some(function (n) { return n === atomic; });
            return isNumber
                ? typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Number"), undefined, [call])
                : call;
        };
    };
    var decode_bytes = function (method) {
        return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createIdentifier("reader"))(method), undefined, undefined);
    };
    var decode_array = function (accessor, array, required) {
        var statements = [];
        if (required === false)
            statements.push(typescript_1.default.factory.createBinaryExpression(accessor, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionEqualsToken), typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createArrayLiteralExpression(), typescript_1.default.factory.createTypeReferenceNode("any[]"))));
        var atomics = ProtobufUtil_1.ProtobufUtil.getAtomics(array.type.value);
        var decoder = atomics.length
            ? function () { return decode_atomic(array.type.value)(atomics[0]); }
            : array.type.value.natives.length
                ? function () { return decode_bytes("bytes"); }
                : array.type.value.objects.length
                    ? function () { return decode_regular_object(false)(array.type.value.objects[0]); }
                    : null;
        if (decoder === null)
            throw new Error("Never reach here.");
        else if (atomics.length && atomics[0] !== "string") {
            statements.push(typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(ExpressionFactory_1.ExpressionFactory.number(2), typescript_1.default.factory.createBitwiseAnd(typescript_1.default.factory.createIdentifier("tag"), ExpressionFactory_1.ExpressionFactory.number(7))), typescript_1.default.factory.createBlock([
                StatementFactory_1.StatementFactory.constant("piece", typescript_1.default.factory.createAdd(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("uint32"), undefined, undefined), typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("index"), undefined, undefined))),
                typescript_1.default.factory.createWhileStatement(typescript_1.default.factory.createLessThan(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("index"), undefined, undefined), typescript_1.default.factory.createIdentifier("piece")), typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(accessor)("push"), undefined, [decoder()]))),
            ], true), typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(accessor)("push"), undefined, [decoder()]))));
        }
        else
            statements.push(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(accessor)("push"), undefined, [decoder()]));
        return statements.map(function (stmt) {
            return typescript_1.default.isExpression(stmt) ? typescript_1.default.factory.createExpressionStatement(stmt) : stmt;
        });
    };
    var decode_regular_object = function (top) {
        return function (obj) {
            return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("".concat(PREFIX, "o").concat(obj.index)), undefined, __spreadArray([
                typescript_1.default.factory.createIdentifier("reader")
            ], __read((top
                ? []
                : [
                    typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("uint32"), undefined, undefined),
                ])), false));
        };
    };
    var decode_dynamic_object = function (project) {
        return function (importer) {
            return function (accessor, obj, required) {
                var top = obj.properties[0];
                return decode_entry(project)(importer)({
                    initializer: function () {
                        return typescript_1.default.factory.createBinaryExpression(accessor, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionEqualsToken), typescript_1.default.factory.createObjectLiteralExpression());
                    },
                    setter: function () {
                        return typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createElementAccessExpression(accessor, typescript_1.default.factory.createIdentifier("entry.key")), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.default.factory.createIdentifier("entry.value"));
                    },
                })(MetadataProperty_1.MetadataProperty.create(__assign(__assign({}, top), { key: (function () {
                        var key = Metadata_1.Metadata.initialize();
                        key.atomics.push(MetadataAtomic_1.MetadataAtomic.create({
                            type: "string",
                            tags: [],
                        }));
                        return key;
                    })() })), required);
            };
        };
    };
    var decode_map = function (project) {
        return function (importer) {
            return function (accessor, map, required) {
                return decode_entry(project)(importer)({
                    initializer: function () {
                        return typescript_1.default.factory.createBinaryExpression(accessor, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionEqualsToken), typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier("Map"), [TypeFactory_1.TypeFactory.keyword("any"), TypeFactory_1.TypeFactory.keyword("any")], []));
                    },
                    setter: function () {
                        return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(accessor)("set"), undefined, [
                            typescript_1.default.factory.createIdentifier("entry.key"),
                            typescript_1.default.factory.createIdentifier("entry.value"),
                        ]);
                    },
                })(map, required);
            };
        };
    };
    var decode_entry = function (project) {
        return function (importer) {
            return function (props) {
                return function (map, required) {
                    var statements = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read((required
                        ? []
                        : [typescript_1.default.factory.createExpressionStatement(props.initializer())])), false), [
                        StatementFactory_1.StatementFactory.constant("piece", typescript_1.default.factory.createAdd(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("uint32"), undefined, undefined), typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("index"), undefined, undefined)))
                    ], false), __read(write_object_function_body(project)(importer)({
                        condition: typescript_1.default.factory.createLessThan(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(READER())("index"), undefined, undefined), typescript_1.default.factory.createIdentifier("piece")),
                        tag: "kind",
                        output: "entry",
                    })([
                        MetadataProperty_1.MetadataProperty.create({
                            key: MetadataFactory_1.MetadataFactory.soleLiteral("key"),
                            value: map.key,
                            description: null,
                            jsDocTags: [],
                        }),
                        MetadataProperty_1.MetadataProperty.create({
                            key: MetadataFactory_1.MetadataFactory.soleLiteral("value"),
                            value: map.value,
                            description: null,
                            jsDocTags: [],
                        }),
                    ])), false), [
                        typescript_1.default.factory.createExpressionStatement(props.setter()),
                    ], false);
                    return [
                        typescript_1.default.factory.createExpressionStatement(ExpressionFactory_1.ExpressionFactory.selfCall(typescript_1.default.factory.createBlock(statements, true))),
                    ];
                };
            };
        };
    };
})(ProtobufDecodeProgrammer || (exports.ProtobufDecodeProgrammer = ProtobufDecodeProgrammer = {}));
var PREFIX = "$pd";
var READER = function () { return typescript_1.default.factory.createIdentifier("reader"); };
//# sourceMappingURL=ProtobufDecodeProgrammer.js.map