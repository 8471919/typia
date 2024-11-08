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
exports.ProtobufEncodeProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var NumericRangeFactory_1 = require("../../factories/NumericRangeFactory");
var ProtobufFactory_1 = require("../../factories/ProtobufFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataAtomic_1 = require("../../schemas/metadata/MetadataAtomic");
var MetadataProperty_1 = require("../../schemas/metadata/MetadataProperty");
var FeatureProgrammer_1 = require("../FeatureProgrammer");
var IsProgrammer_1 = require("../IsProgrammer");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var ProtobufUtil_1 = require("../helpers/ProtobufUtil");
var UnionPredicator_1 = require("../helpers/UnionPredicator");
var decode_union_object_1 = require("../internal/decode_union_object");
var ProtobufEncodeProgrammer;
(function (ProtobufEncodeProgrammer) {
    ProtobufEncodeProgrammer.decompose = function (props) {
        var _a;
        var collection = new MetadataCollection_1.MetadataCollection();
        var meta = ProtobufFactory_1.ProtobufFactory.metadata(props.modulo.getText())(props.project.checker, props.project.context)(collection)(props.type);
        var callEncoder = function (writer) { return function (factory) {
            return StatementFactory_1.StatementFactory.constant(writer, typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("encoder"), undefined, [factory, typescript_1.default.factory.createIdentifier("input")]));
        }; };
        return {
            functions: {
                encoder: StatementFactory_1.StatementFactory.constant(props.importer.useLocal("encoder"), write_encoder(props.project)(props.importer)(collection)(meta)),
            },
            statements: [],
            arrow: typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory_1.IdentifierFactory.parameter("input", typescript_1.default.factory.createTypeReferenceNode((_a = props.name) !== null && _a !== void 0 ? _a : TypeFactory_1.TypeFactory.getFullName(props.project.checker)(props.type))),
            ], typescript_1.default.factory.createTypeReferenceNode("Uint8Array"), undefined, typescript_1.default.factory.createBlock([
                callEncoder("sizer")(typescript_1.default.factory.createNewExpression(props.importer.use("Sizer"), undefined, [])),
                callEncoder("writer")(typescript_1.default.factory.createNewExpression(props.importer.use("Writer"), undefined, [typescript_1.default.factory.createIdentifier("sizer")])),
                typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("buffer"), undefined, undefined)),
            ], true)),
        };
    };
    ProtobufEncodeProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = ProtobufEncodeProgrammer.decompose({
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
    var write_encoder = function (project) {
        return function (importer) {
            return function (collection) {
                return function (meta) {
                    var functors = collection
                        .objects()
                        .filter(function (obj) { return ProtobufUtil_1.ProtobufUtil.isStaticObject(obj); })
                        .map(function (obj) {
                        return StatementFactory_1.StatementFactory.constant("".concat(PREFIX, "o").concat(obj.index), write_object_function(project)(importer)(typescript_1.default.factory.createIdentifier("input"), obj, {
                            source: "function",
                            from: "object",
                            tracable: false,
                            postfix: "",
                        }));
                    });
                    var main = decode(project)(importer)(null)(typescript_1.default.factory.createIdentifier("input"), meta, {
                        source: "top",
                        from: "top",
                        tracable: false,
                        postfix: "",
                    });
                    return typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                        IdentifierFactory_1.IdentifierFactory.parameter("writer"),
                        IdentifierFactory_1.IdentifierFactory.parameter("input"),
                    ], TypeFactory_1.TypeFactory.keyword("any"), undefined, typescript_1.default.factory.createBlock(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(importer.declareUnions()), false), __read(functors), false), __read(IsProgrammer_1.IsProgrammer.write_function_statements(project)(importer)(collection)), false), __read(main.statements), false), [
                        typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createIdentifier("writer")),
                    ], false), true));
                };
            };
        };
    };
    var write_object_function = function (project) {
        return function (importer) {
            return function (input, obj, explore) {
                var index = 1;
                var body = obj.properties
                    .map(function (p) {
                    var block = decode(project)(importer)(index)(IdentifierFactory_1.IdentifierFactory.access(input)(p.key.getSoleLiteral()), p.value, explore);
                    index += ProtobufUtil_1.ProtobufUtil.size(p.value);
                    return __spreadArray([
                        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createIdentifier("// property \"".concat(p.key.getSoleLiteral(), "\"")))
                    ], __read(block.statements), false);
                })
                    .flat();
                return typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("input")], TypeFactory_1.TypeFactory.keyword("any"), undefined, typescript_1.default.factory.createBlock(body, true));
            };
        };
    };
    /* -----------------------------------------------------------
          DECODERS
      ----------------------------------------------------------- */
    var decode = function (project) {
        return function (importer) {
            return function (index) {
                return function (input, meta, explore) {
                    var e_1, _a;
                    var wrapper = meta.isRequired() && meta.nullable === false
                        ? function (block) { return block; }
                        : meta.isRequired() === false && meta.nullable === true
                            ? function (block) {
                                return typescript_1.default.factory.createBlock([
                                    typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createIdentifier("undefined"), input), typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createNull(), input)), block),
                                ], true);
                            }
                            : meta.isRequired() === false
                                ? function (block) {
                                    return typescript_1.default.factory.createBlock([
                                        typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createIdentifier("undefined"), input), block),
                                    ], true);
                                }
                                : function (block) {
                                    return typescript_1.default.factory.createBlock([
                                        typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createNull(), input), block),
                                    ], true);
                                };
                    // STARTS FROM ATOMIC TYPES
                    var unions = [];
                    var numbers = ProtobufUtil_1.ProtobufUtil.getNumbers(meta);
                    var bigints = ProtobufUtil_1.ProtobufUtil.getBigints(meta);
                    var _loop_1 = function (atom) {
                        if (atom === "bool")
                            unions.push({
                                type: "bool",
                                is: function () {
                                    return typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("boolean"), typescript_1.default.factory.createTypeOfExpression(input));
                                },
                                value: function (index) { return decode_bool(index)(input); },
                            });
                        else if (atom === "int32" ||
                            atom === "uint32" ||
                            atom === "float" ||
                            atom === "double")
                            unions.push(decode_number(numbers)(atom)(input));
                        else if (atom === "int64" || atom === "uint64")
                            if (numbers.some(function (n) { return n === atom; }))
                                unions.push(decode_number(numbers)(atom)(input));
                            else
                                unions.push(decode_bigint(bigints)(atom)(input));
                        else if (atom === "string")
                            unions.push({
                                type: "string",
                                is: function () {
                                    return typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("string"), typescript_1.default.factory.createTypeOfExpression(input));
                                },
                                value: function (index) { return decode_bytes("string")(index)(input); },
                            });
                    };
                    try {
                        for (var _b = __values(ProtobufUtil_1.ProtobufUtil.getAtomics(meta)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var atom = _c.value;
                            _loop_1(atom);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    // CONSIDER BYTES
                    if (meta.natives.length)
                        unions.push({
                            type: "bytes",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Uint8Array")(input); },
                            value: function (index) { return decode_bytes("bytes")(index)(input); },
                        });
                    // CONSIDER ARRAYS
                    if (meta.arrays.length)
                        unions.push({
                            type: "array",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isArray(input); },
                            value: function (index) {
                                return decode_array(project)(importer)(index)(input, meta.arrays[0], __assign(__assign({}, explore), { from: "array" }));
                            },
                        });
                    // CONSIDER MAPS
                    if (meta.maps.length)
                        unions.push({
                            type: "map",
                            is: function () { return ExpressionFactory_1.ExpressionFactory.isInstanceOf("Map")(input); },
                            value: function (index) {
                                return decode_map(project)(importer)(index)(input, meta.maps[0], __assign(__assign({}, explore), { from: "array" }));
                            },
                        });
                    // CONSIDER OBJECTS
                    if (meta.objects.length)
                        unions.push({
                            type: "object",
                            is: function () {
                                return ExpressionFactory_1.ExpressionFactory.isObject({
                                    checkNull: true,
                                    checkArray: false,
                                })(input);
                            },
                            value: function (index) {
                                return explore_objects(project)(importer)(0)(index)(input, meta.objects, __assign(__assign({}, explore), { from: "object" }));
                            },
                        });
                    // RETURNS
                    if (unions.length === 1)
                        return wrapper(unions[0].value(index));
                    else
                        return wrapper(iterate(importer)(index)(unions)(meta.getName())(input));
                };
            };
        };
    };
    var iterate = function (importer) {
        return function (index) {
            return function (unions) {
                return function (expected) {
                    return function (input) {
                        return typescript_1.default.factory.createBlock([
                            unions
                                .map(function (u, i) {
                                return typescript_1.default.factory.createIfStatement(u.is(), u.value(index ? index + i : null), i === unions.length - 1
                                    ? create_throw_error(importer)(expected)(input)
                                    : undefined);
                            })
                                .reverse()
                                .reduce(function (a, b) {
                                return typescript_1.default.factory.createIfStatement(b.expression, b.thenStatement, a);
                            }),
                        ], true);
                    };
                };
            };
        };
    };
    var decode_map = function (project) {
        return function (importer) {
            return function (index) {
                return function (input, map, explore) {
                    var each = __spreadArray(__spreadArray(__spreadArray([
                        typescript_1.default.factory.createExpressionStatement(decode_tag(2 /* ProtobufWire.LEN */)(index)),
                        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("fork"), undefined, undefined))
                    ], __read(decode(project)(importer)(1)(typescript_1.default.factory.createIdentifier("key"), map.key, explore).statements), false), __read(decode(project)(importer)(2)(typescript_1.default.factory.createIdentifier("value"), map.value, explore).statements), false), [
                        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("ldelim"), undefined, undefined)),
                    ], false);
                    return typescript_1.default.factory.createBlock([
                        typescript_1.default.factory.createForOfStatement(undefined, StatementFactory_1.StatementFactory.entry("key")("value"), input, typescript_1.default.factory.createBlock(each)),
                    ], true);
                };
            };
        };
    };
    var decode_object = function (project) {
        return function (importer) {
            return function (index) {
                return function (input, object, explore) {
                    var top = object.properties[0];
                    if (top.key.isSoleLiteral() === false)
                        return decode_map(project)(importer)(index)(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.entries"), [], [input]), MetadataProperty_1.MetadataProperty.create(__assign(__assign({}, top), { key: (function () {
                                var key = Metadata_1.Metadata.initialize();
                                key.atomics.push(MetadataAtomic_1.MetadataAtomic.create({
                                    type: "string",
                                    tags: [],
                                }));
                                return key;
                            })() })), explore);
                    return typescript_1.default.factory.createBlock(__spreadArray(__spreadArray(__spreadArray([
                        typescript_1.default.factory.createIdentifier("//".concat(index !== null ? " ".concat(index, " -> ") : "").concat(object.name))
                    ], __read((index !== null
                        ? [
                            decode_tag(2 /* ProtobufWire.LEN */)(index),
                            typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("fork"), undefined, undefined),
                        ]
                        : [])), false), [
                        typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(PREFIX, "o").concat(object.index))), [], [input])
                    ], false), __read((index !== null
                        ? [
                            typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("ldelim"), undefined, undefined),
                        ]
                        : [])), false).map(function (expr) { return typescript_1.default.factory.createExpressionStatement(expr); }), true);
                };
            };
        };
    };
    var decode_array = function (project) {
        return function (importer) {
            return function (index) {
                return function (input, array, explore) {
                    var wire = get_standalone_wire(array.type.value);
                    var forLoop = function (index) {
                        return typescript_1.default.factory.createForOfStatement(undefined, typescript_1.default.factory.createVariableDeclarationList([typescript_1.default.factory.createVariableDeclaration("elem")], typescript_1.default.NodeFlags.Const), input, decode(project)(importer)(index)(typescript_1.default.factory.createIdentifier("elem"), array.type.value, explore));
                    };
                    var length = function (block) {
                        return typescript_1.default.factory.createBlock([
                            typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictInequality(ExpressionFactory_1.ExpressionFactory.number(0), IdentifierFactory_1.IdentifierFactory.access(input)("length")), block),
                        ], true);
                    };
                    if (wire === 2 /* ProtobufWire.LEN */)
                        return length(typescript_1.default.factory.createBlock([forLoop(index)], true));
                    return length(typescript_1.default.factory.createBlock([
                        typescript_1.default.factory.createExpressionStatement(decode_tag(2 /* ProtobufWire.LEN */)(index)),
                        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("fork"), undefined, undefined)),
                        forLoop(null),
                        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("ldelim"), undefined, undefined)),
                    ], true));
                };
            };
        };
    };
    var decode_bool = function (index) { return function (input) {
        return typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([], __read((index !== null ? [decode_tag(0 /* ProtobufWire.VARIANT */)(index)] : [])), false), [
            typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("bool"), undefined, [input]),
        ], false).map(function (exp) { return typescript_1.default.factory.createExpressionStatement(exp); }), true);
    }; };
    var decode_number = function (candidates) {
        return function (type) {
            return function (input) { return ({
                type: type,
                is: function () {
                    return candidates.length === 1
                        ? typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("number"), typescript_1.default.factory.createTypeOfExpression(input))
                        : typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("number"), typescript_1.default.factory.createTypeOfExpression(input)), NumericRangeFactory_1.NumericRangeFactory.number(type)(input));
                },
                value: function (index) {
                    return typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([], __read((index !== null
                        ? [decode_tag(get_numeric_wire(type))(index)]
                        : [])), false), [
                        typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())(type), undefined, [input]),
                    ], false).map(function (exp) { return typescript_1.default.factory.createExpressionStatement(exp); }), true);
                },
            }); };
        };
    };
    var decode_bigint = function (candidates) {
        return function (type) {
            return function (input) { return ({
                type: type,
                is: function () {
                    return candidates.length === 1
                        ? typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("bigint"), typescript_1.default.factory.createTypeOfExpression(input))
                        : typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("bigint"), typescript_1.default.factory.createTypeOfExpression(input)), NumericRangeFactory_1.NumericRangeFactory.bigint(type)(input));
                },
                value: function (index) {
                    return typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([], __read((index !== null
                        ? [decode_tag(0 /* ProtobufWire.VARIANT */)(index)]
                        : [])), false), [
                        typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())(type), undefined, [input]),
                    ], false).map(function (exp) { return typescript_1.default.factory.createExpressionStatement(exp); }), true);
                },
            }); };
        };
    };
    var decode_bytes = function (method) {
        return function (index) {
            return function (input) {
                return typescript_1.default.factory.createBlock([
                    decode_tag(2 /* ProtobufWire.LEN */)(index),
                    typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())(method), undefined, [input]),
                ].map(function (expr) { return typescript_1.default.factory.createExpressionStatement(expr); }), true);
            };
        };
    };
    var decode_tag = function (wire) {
        return function (index) {
            return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(WRITER())("uint32"), undefined, [ExpressionFactory_1.ExpressionFactory.number((index << 3) | wire)]);
        };
    };
    var get_standalone_wire = function (meta) {
        if (meta.arrays.length ||
            meta.objects.length ||
            meta.maps.length ||
            meta.natives.length)
            return 2 /* ProtobufWire.LEN */;
        var v = ProtobufUtil_1.ProtobufUtil.getAtomics(meta)[0];
        if (v === "string")
            return 2 /* ProtobufWire.LEN */;
        else if (v === "bool" ||
            v === "int32" ||
            v === "uint32" ||
            v === "int64" ||
            v === "uint64")
            return 0 /* ProtobufWire.VARIANT */;
        else if (v === "float")
            return 5 /* ProtobufWire.I32 */;
        return 1 /* ProtobufWire.I64 */;
    };
    var get_numeric_wire = function (type) {
        return type === "double"
            ? 1 /* ProtobufWire.I64 */
            : type === "float"
                ? 5 /* ProtobufWire.I32 */
                : 0 /* ProtobufWire.VARIANT */;
    };
    /* -----------------------------------------------------------
          EXPLORERS
      ----------------------------------------------------------- */
    var explore_objects = function (project) {
        return function (importer) {
            return function (level) {
                return function (index) {
                    return function (input, targets, explore, indexes) {
                        if (targets.length === 1)
                            return decode_object(project)(importer)(indexes ? indexes.get(targets[0]) : index)(input, targets[0], explore);
                        var expected = "(".concat(targets.map(function (t) { return t.name; }).join(" | "), ")");
                        // POSSIBLE TO SPECIALIZE?
                        var specList = UnionPredicator_1.UnionPredicator.object(targets);
                        indexes !== null && indexes !== void 0 ? indexes : (indexes = new Map(targets.map(function (t, i) { return [t, index + i]; })));
                        if (specList.length === 0) {
                            var condition_1 = (0, decode_union_object_1.decode_union_object)(IsProgrammer_1.IsProgrammer.decode_object(project)(importer))(function (i, o, e) {
                                return ExpressionFactory_1.ExpressionFactory.selfCall(decode_object(project)(importer)(indexes.get(o))(i, o, e));
                            })(function (expr) { return expr; })(function (value, expected) {
                                return create_throw_error(importer)(expected)(value);
                            })(input, targets, explore);
                            return StatementFactory_1.StatementFactory.block(condition_1);
                        }
                        var remained = targets.filter(function (t) { return specList.find(function (s) { return s.object === t; }) === undefined; });
                        // DO SPECIALIZE
                        var condition = specList
                            .filter(function (spec) { return spec.property.key.getSoleLiteral() !== null; })
                            .map(function (spec, i, array) {
                            var key = spec.property.key.getSoleLiteral();
                            var accessor = IdentifierFactory_1.IdentifierFactory.access(input)(key);
                            var pred = spec.neighbour
                                ? IsProgrammer_1.IsProgrammer.decode(project)(importer)(accessor, spec.property.value, __assign(__assign({}, explore), { tracable: false, postfix: IdentifierFactory_1.IdentifierFactory.postfix(key) }))
                                : ExpressionFactory_1.ExpressionFactory.isRequired(accessor);
                            return typescript_1.default.factory.createIfStatement(pred, typescript_1.default.factory.createExpressionStatement(ExpressionFactory_1.ExpressionFactory.selfCall(decode_object(project)(importer)(indexes.get(spec.object))(input, spec.object, explore))), i === array.length - 1
                                ? remained.length
                                    ? typescript_1.default.factory.createExpressionStatement(ExpressionFactory_1.ExpressionFactory.selfCall(explore_objects(project)(importer)(level + 1)(index)(input, remained, explore, indexes)))
                                    : create_throw_error(importer)(expected)(input)
                                : undefined);
                        })
                            .reverse()
                            .reduce(function (a, b) {
                            return typescript_1.default.factory.createIfStatement(b.expression, b.thenStatement, a);
                        });
                        // RETURNS WITH CONDITIONS
                        return typescript_1.default.factory.createBlock([condition], true);
                    };
                };
            };
        };
    };
    /* -----------------------------------------------------------
          CONFIGURATIONS
      ----------------------------------------------------------- */
    var PREFIX = "$pe";
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
})(ProtobufEncodeProgrammer || (exports.ProtobufEncodeProgrammer = ProtobufEncodeProgrammer = {}));
var WRITER = function () { return typescript_1.default.factory.createIdentifier("writer"); };
//# sourceMappingURL=ProtobufEncodeProgrammer.js.map