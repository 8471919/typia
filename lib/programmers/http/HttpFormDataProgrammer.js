"use strict";
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
exports.HttpFormDataProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../factories/MetadataFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var MetadataArrayType_1 = require("../../schemas/metadata/MetadataArrayType");
var TransformerError_1 = require("../../transformers/TransformerError");
var Escaper_1 = require("../../utils/Escaper");
var FeatureProgrammer_1 = require("../FeatureProgrammer");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var HttpMetadataUtil_1 = require("../helpers/HttpMetadataUtil");
var HttpFormDataProgrammer;
(function (HttpFormDataProgrammer) {
    HttpFormDataProgrammer.decompose = function (props) {
        var _a;
        // ANALYZE TYPE
        var collection = new MetadataCollection_1.MetadataCollection();
        var result = MetadataFactory_1.MetadataFactory.analyze(props.project.checker, props.project.context)({
            escape: false,
            constant: true,
            absorb: true,
            validate: HttpFormDataProgrammer.validate,
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
                IdentifierFactory_1.IdentifierFactory.parameter("input", typescript_1.default.factory.createTypeReferenceNode("FormData")),
            ], typescript_1.default.factory.createImportTypeNode(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral("typia")), undefined, typescript_1.default.factory.createIdentifier("Resolved"), [
                typescript_1.default.factory.createTypeReferenceNode((_a = props.name) !== null && _a !== void 0 ? _a : TypeFactory_1.TypeFactory.getFullName(props.project.checker)(props.type)),
            ], false), undefined, typescript_1.default.factory.createBlock(statements, true)),
        };
    };
    HttpFormDataProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var result = HttpFormDataProgrammer.decompose({
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
    HttpFormDataProgrammer.validate = function (meta, explore) {
        var errors = [];
        var insert = function (msg) { return errors.push(msg); };
        if (explore.top === true) {
            // TOP MUST BE ONLY OBJECT
            if (meta.objects.length !== 1 || meta.bucket() !== 1)
                insert("only one object type is allowed.");
            if (meta.nullable === true)
                insert("formdata parameters cannot be null.");
            if (meta.isRequired() === false)
                insert("formdata parameters cannot be undefined.");
        }
        else if (explore.nested !== null &&
            explore.nested instanceof MetadataArrayType_1.MetadataArrayType) {
            //----
            // ARRAY
            //----
            var atomics = HttpMetadataUtil_1.HttpMetadataUtil.atomics(meta);
            var expected = meta.atomics.length +
                meta.templates.length +
                meta.constants.map(function (c) { return c.values.length; }).reduce(function (a, b) { return a + b; }, 0) +
                meta.natives.filter(function (n) { return n === "Blob" || n === "File"; }).length;
            if (atomics.size > 1)
                insert("union type is not allowed in array.");
            if (meta.size() !== expected)
                insert("only atomic, constant or blob (file) types are allowed in array.");
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
                meta.natives.filter(function (n) { return n !== "Blob" && n !== "File"; }).length)
                insert("nested object type is not allowed.");
        }
        return errors;
    };
    var decode_object = function (importer) {
        return function (object) {
            // const input: ts.Identifier = ts.factory.createIdentifier("input");
            var output = typescript_1.default.factory.createIdentifier("output");
            return [
                StatementFactory_1.StatementFactory.constant("output", typescript_1.default.factory.createObjectLiteralExpression(object.properties.map(function (prop) {
                    return decode_regular_property(importer)(prop);
                }), true)),
                typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createAsExpression(output, TypeFactory_1.TypeFactory.keyword("any"))),
            ];
        };
    };
    var decode_regular_property = function (importer) {
        return function (property) {
            var key = property.key.constants[0].values[0].value;
            var value = property.value;
            var _a = __read(value
                .atomics.length
                ? [value.atomics[0].type, false]
                : value.constants.length
                    ? [value.constants[0].type, false]
                    : value.templates.length
                        ? ["string", false]
                        : value.natives.includes("Blob")
                            ? ["blob", false]
                            : value.natives.includes("File")
                                ? ["file", false]
                                : (function () {
                                    var _a, _b;
                                    var meta = (_b = (_a = value.arrays[0]) === null || _a === void 0 ? void 0 : _a.type.value) !== null && _b !== void 0 ? _b : value.tuples[0].type.elements[0];
                                    return meta.atomics.length
                                        ? [meta.atomics[0].type, true]
                                        : meta.templates.length
                                            ? ["string", true]
                                            : meta.natives.includes("Blob")
                                                ? ["blob", true]
                                                : meta.natives.includes("File")
                                                    ? ["file", true]
                                                    : [meta.constants[0].type, true];
                                })(), 2), type = _a[0], isArray = _a[1];
            return typescript_1.default.factory.createPropertyAssignment(Escaper_1.Escaper.variable(key) ? key : typescript_1.default.factory.createStringLiteral(key), isArray
                ? decode_array(importer)(value)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("input.getAll"), undefined, [typescript_1.default.factory.createStringLiteral(key)]))("map"), undefined, [
                    typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("elem")], undefined, undefined, decode_value(importer)(type)(false)(typescript_1.default.factory.createIdentifier("elem"))),
                ]))
                : decode_value(importer)(type)(value.nullable === false && value.isRequired() === false)(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("input.get"), undefined, [typescript_1.default.factory.createStringLiteral(key)])));
        };
    };
    var decode_value = function (importer) {
        return function (type) {
            return function (onlyUndefindable) {
                return function (value) {
                    var call = typescript_1.default.factory.createCallExpression(importer.use(type), undefined, [value]);
                    return onlyUndefindable
                        ? typescript_1.default.factory.createBinaryExpression(call, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionToken), typescript_1.default.factory.createIdentifier("undefined"))
                        : call;
                };
            };
        };
    };
    var decode_array = function (importer) {
        return function (value) {
            return function (expression) {
                return value.nullable || value.isRequired() === false
                    ? typescript_1.default.factory.createCallExpression(importer.use("array"), undefined, [
                        expression,
                        value.nullable
                            ? typescript_1.default.factory.createNull()
                            : typescript_1.default.factory.createIdentifier("undefined"),
                    ])
                    : expression;
            };
        };
    };
})(HttpFormDataProgrammer || (exports.HttpFormDataProgrammer = HttpFormDataProgrammer = {}));
//# sourceMappingURL=HttpFormDataProgrammer.js.map