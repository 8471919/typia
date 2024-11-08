"use strict";
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
exports.HttpHeadersProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../factories/MetadataFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var MetadataArrayType_1 = require("../../schemas/metadata/MetadataArrayType");
var TransformerError_1 = require("../../transformers/TransformerError");
var Escaper_1 = require("../../utils/Escaper");
var MapUtil_1 = require("../../utils/MapUtil");
var FeatureProgrammer_1 = require("../FeatureProgrammer");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var HttpMetadataUtil_1 = require("../helpers/HttpMetadataUtil");
var HttpHeadersProgrammer;
(function (HttpHeadersProgrammer) {
    HttpHeadersProgrammer.INPUT_TYPE = "Record<string, string | string[] | undefined>";
    HttpHeadersProgrammer.decompose = function (props) {
        var _a;
        // ANALYZE TYPE
        var collection = new MetadataCollection_1.MetadataCollection();
        var result = MetadataFactory_1.MetadataFactory.analyze(props.project.checker, props.project.context)({
            escape: false,
            constant: true,
            absorb: true,
            validate: HttpHeadersProgrammer.validate,
        })(collection)(props.type);
        if (result.success === false)
            throw TransformerError_1.TransformerError.from("typia.http.".concat(props.importer.method))(result.errors);
        // DO TRANSFORM
        var object = result.data.objects[0];
        var statements = decode_object(props.importer)(object);
        return {
            functions: {},
            statements: [],
            arrow: typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory_1.IdentifierFactory.parameter("input", typescript_1.default.factory.createTypeReferenceNode(HttpHeadersProgrammer.INPUT_TYPE)),
            ], typescript_1.default.factory.createImportTypeNode(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral("typia")), undefined, typescript_1.default.factory.createIdentifier("Resolved"), [
                typescript_1.default.factory.createTypeReferenceNode((_a = props.name) !== null && _a !== void 0 ? _a : TypeFactory_1.TypeFactory.getFullName(props.project.checker)(props.type)),
            ], false), undefined, typescript_1.default.factory.createBlock(statements, true)),
        };
    };
    HttpHeadersProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = HttpHeadersProgrammer.decompose({
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
    HttpHeadersProgrammer.validate = function (meta, explore) {
        var e_1, _a, e_2, _b;
        var errors = [];
        var insert = function (msg) { return errors.push(msg); };
        if (explore.top === true) {
            // TOP MUST BE ONLY OBJECT
            if (meta.objects.length !== 1 || meta.bucket() !== 1)
                insert("only one object type is allowed.");
            if (meta.nullable === true)
                insert("headers cannot be null.");
            if (meta.isRequired() === false)
                insert("headers cannot be null.");
        }
        else if (explore.nested !== null &&
            explore.nested instanceof MetadataArrayType_1.MetadataArrayType) {
            //----
            // ARRAY
            //----
            var atomics = HttpMetadataUtil_1.HttpMetadataUtil.atomics(meta);
            var expected = meta.atomics.length +
                meta.templates.length +
                meta.constants.map(function (c) { return c.values.length; }).reduce(function (a, b) { return a + b; }, 0);
            if (atomics.size > 1)
                insert("union type is not allowed in array.");
            if (meta.size() !== expected)
                insert("only atomic or constant types are allowed in array.");
            if (meta.nullable === true)
                insert("nullable type is not allowed in array.");
            if (meta.isRequired() === false)
                insert("optional type is not allowed in array.");
        }
        else if (explore.object && explore.property !== null) {
            //----
            // COMMON
            //----
            // PROPERTY MUST BE SOLE
            if (typeof explore.property === "object")
                insert("dynamic property is not allowed.");
            // DO NOT ALLOW TUPLE TYPE
            if (meta.tuples.length)
                insert("tuple type is not allowed.");
            // DO NOT ALLOW UNION TYPE
            if (HttpMetadataUtil_1.HttpMetadataUtil.isUnion(meta))
                insert("union type is not allowed.");
            // DO NOT ALLOW NESTED OBJECT
            if (meta.objects.length ||
                meta.sets.length ||
                meta.maps.length ||
                meta.natives.length)
                insert("nested object type is not allowed.");
            // DO NOT ALLOW NULLABLE
            if (meta.nullable === true)
                insert("nullable type is not allowed.");
            //----
            // SPECIAL KEY NAMES
            //----
            var isArray = meta.arrays.length >= 1 || meta.tuples.length >= 1;
            // SET-COOKIE MUST BE ARRAY
            if (typeof explore.property === "string" &&
                explore.property.toLowerCase() === "set-cookie" &&
                isArray === false)
                insert("".concat(explore.property, " property must be array."));
            // MUST BE SINGULAR CASE
            if (typeof explore.property === "string" &&
                SINGULAR.has(explore.property.toLowerCase()) &&
                isArray === true)
                insert("property cannot be array.");
        }
        else if (explore.object && explore.property === null) {
            var counter = new Map();
            try {
                for (var _c = __values(explore.object.properties), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var prop = _d.value;
                    var key = prop.key.getSoleLiteral();
                    if (key === null)
                        continue;
                    MapUtil_1.MapUtil.take(counter)(key.toLowerCase(), function () { return new Set(); }).add(key);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var counter_1 = __values(counter), counter_1_1 = counter_1.next(); !counter_1_1.done; counter_1_1 = counter_1.next()) {
                    var _e = __read(counter_1_1.value, 2), key = _e[0], set = _e[1];
                    if (set.size > 1)
                        insert("duplicated keys when converting to lowercase letters: [".concat(__spreadArray([], __read(set), false).join(", "), "] -> ").concat(key));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (counter_1_1 && !counter_1_1.done && (_b = counter_1.return)) _b.call(counter_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return errors;
    };
    var decode_object = function (importer) {
        return function (object) {
            var output = typescript_1.default.factory.createIdentifier("output");
            var optionals = [];
            return __spreadArray(__spreadArray([
                StatementFactory_1.StatementFactory.constant("output", typescript_1.default.factory.createObjectLiteralExpression(object.properties.map(function (prop) {
                    if (!prop.value.isRequired() &&
                        prop.value.arrays.length + prop.value.tuples.length > 0)
                        optionals.push(prop.key.constants[0].values[0].value);
                    return decode_regular_property(importer)(prop);
                }), true))
            ], __read(optionals.map(function (key) {
                var access = IdentifierFactory_1.IdentifierFactory.access(output)(key);
                return typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(ExpressionFactory_1.ExpressionFactory.number(0), IdentifierFactory_1.IdentifierFactory.access(access)("length")), typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createDeleteExpression(access)));
            })), false), [
                typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createAsExpression(output, TypeFactory_1.TypeFactory.keyword("any"))),
            ], false);
        };
    };
    var decode_regular_property = function (importer) {
        return function (property) {
            var key = property.key.constants[0].values[0].value;
            var value = property.value;
            var _a = __read(value.atomics.length
                ? [value.atomics[0].type, false]
                : value.constants.length
                    ? [value.constants[0].type, false]
                    : value.templates.length
                        ? ["string", false]
                        : (function () {
                            var _a, _b;
                            var meta = (_b = (_a = value.arrays[0]) === null || _a === void 0 ? void 0 : _a.type.value) !== null && _b !== void 0 ? _b : value.tuples[0].type.elements[0];
                            return meta.atomics.length
                                ? [meta.atomics[0].type, true]
                                : meta.templates.length
                                    ? ["string", true]
                                    : [meta.constants[0].type, true];
                        })(), 2), type = _a[0], isArray = _a[1];
            var accessor = IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createIdentifier("input"))(key.toLowerCase());
            return typescript_1.default.factory.createPropertyAssignment(Escaper_1.Escaper.variable(key) ? key : typescript_1.default.factory.createStringLiteral(key), isArray
                ? key === "set-cookie"
                    ? accessor
                    : decode_array(importer)(type)(key)(value)(accessor)
                : decode_value(importer)(type)(accessor));
        };
    };
    var decode_value = function (importer) {
        return function (type) {
            return function (value) {
                return type === "string"
                    ? value
                    : typescript_1.default.factory.createCallExpression(importer.use(type), undefined, [
                        value,
                    ]);
            };
        };
    };
    var decode_array = function (importer) {
        return function (type) {
            return function (key) {
                return function (value) {
                    return function (accessor) {
                        var split = typescript_1.default.factory.createCallChain(typescript_1.default.factory.createPropertyAccessChain(typescript_1.default.factory.createCallChain(typescript_1.default.factory.createPropertyAccessChain(accessor, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.default.factory.createIdentifier("split")), undefined, undefined, [typescript_1.default.factory.createStringLiteral(key === "cookie" ? "; " : ", ")]), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.default.factory.createIdentifier("map")), undefined, undefined, [importer.use(type)]);
                        return typescript_1.default.factory.createConditionalExpression(ExpressionFactory_1.ExpressionFactory.isArray(accessor), undefined, typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(accessor)("map"), undefined, [importer.use(type)]), undefined, value.isRequired() === false
                            ? split
                            : typescript_1.default.factory.createBinaryExpression(split, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionToken), typescript_1.default.factory.createArrayLiteralExpression([], false)));
                    };
                };
            };
        };
    };
})(HttpHeadersProgrammer || (exports.HttpHeadersProgrammer = HttpHeadersProgrammer = {}));
var SINGULAR = new Set([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "server",
    "user-agent",
]);
//# sourceMappingURL=HttpHeadersProgrammer.js.map