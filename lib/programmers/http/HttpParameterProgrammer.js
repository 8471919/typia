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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpParameterProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../factories/MetadataFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var TransformerError_1 = require("../../transformers/TransformerError");
var AssertProgrammer_1 = require("../AssertProgrammer");
var FunctionImporter_1 = require("../helpers/FunctionImporter");
var HttpMetadataUtil_1 = require("../helpers/HttpMetadataUtil");
var HttpParameterProgrammer;
(function (HttpParameterProgrammer) {
    HttpParameterProgrammer.write = function (project) {
        return function (modulo) {
            return function (type, name) {
                var result = MetadataFactory_1.MetadataFactory.analyze(project.checker, project.context)({
                    escape: false,
                    constant: true,
                    absorb: true,
                    validate: HttpParameterProgrammer.validate,
                })(new MetadataCollection_1.MetadataCollection())(type);
                if (result.success === false)
                    throw TransformerError_1.TransformerError.from(modulo.getText())(result.errors);
                var atomic = __spreadArray([], __read(HttpMetadataUtil_1.HttpMetadataUtil.atomics(result.data)), false)[0];
                var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                var block = [
                    StatementFactory_1.StatementFactory.constant("assert", AssertProgrammer_1.AssertProgrammer.write(__assign(__assign({}, project), { options: {
                            numeric: true,
                        } }))(modulo)(false)(type, name)),
                    StatementFactory_1.StatementFactory.constant("value", typescript_1.default.factory.createCallExpression(importer.use(atomic), undefined, [
                        typescript_1.default.factory.createIdentifier("input"),
                    ])),
                    typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("assert"), undefined, [typescript_1.default.factory.createIdentifier("value")])),
                ];
                return typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                    IdentifierFactory_1.IdentifierFactory.parameter("input", typescript_1.default.factory.createTypeReferenceNode("string")),
                ], typescript_1.default.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory_1.TypeFactory.getFullName(project.checker)(type)), undefined, typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([], __read(importer.declare(modulo)), false), __read(block), false), true));
            };
        };
    };
    HttpParameterProgrammer.validate = function (meta) {
        var errors = [];
        var insert = function (msg) { return errors.push(msg); };
        if (meta.any)
            insert("do not allow any type");
        if (meta.isRequired() === false)
            insert("do not allow undefindable type");
        var atomics = HttpMetadataUtil_1.HttpMetadataUtil.atomics(meta);
        var expected = meta.atomics.length +
            meta.templates.length +
            meta.constants.map(function (c) { return c.values.length; }).reduce(function (a, b) { return a + b; }, 0);
        if (meta.size() !== expected || atomics.size === 0)
            insert("only atomic or constant types are allowed");
        if (atomics.size > 1)
            insert("do not allow union type");
        return errors;
    };
})(HttpParameterProgrammer || (exports.HttpParameterProgrammer = HttpParameterProgrammer = {}));
//# sourceMappingURL=HttpParameterProgrammer.js.map