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
exports.MiscLiteralsProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../factories/MetadataFactory");
var TransformerError_1 = require("../../transformers/TransformerError");
var MiscLiteralsProgrammer;
(function (MiscLiteralsProgrammer) {
    MiscLiteralsProgrammer.write = function (project) { return function (type) {
        var result = MetadataFactory_1.MetadataFactory.analyze(project.checker, project.context)({
            escape: true,
            constant: true,
            absorb: true,
            validate: function (meta) {
                var length = meta.constants
                    .map(function (c) { return c.values.length; })
                    .reduce(function (a, b) { return a + b; }, 0) +
                    meta.atomics.filter(function (a) { return a.type === "boolean"; }).length;
                if (0 === length)
                    return [ErrorMessages.NO];
                else if (meta.size() !== length)
                    return [ErrorMessages.ONLY];
                return [];
            },
        })(new MetadataCollection_1.MetadataCollection())(type);
        if (result.success === false)
            throw TransformerError_1.TransformerError.from("typia.misc.literals")(result.errors);
        var meta = result.data;
        var values = new Set(__spreadArray(__spreadArray(__spreadArray([], __read(meta.constants.map(function (c) { return c.values.map(function (v) { return v.value; }); }).flat()), false), __read((meta.atomics.filter(function (a) { return a.type === "boolean"; }).length
            ? [true, false]
            : [])), false), __read((meta.nullable ? [null] : [])), false));
        return typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createArrayLiteralExpression(__spreadArray([], __read(values), false).map(function (v) {
            return v === null
                ? typescript_1.default.factory.createNull()
                : typeof v === "boolean"
                    ? v
                        ? typescript_1.default.factory.createTrue()
                        : typescript_1.default.factory.createFalse()
                    : typeof v === "number"
                        ? ExpressionFactory_1.ExpressionFactory.number(v)
                        : typeof v === "bigint"
                            ? ExpressionFactory_1.ExpressionFactory.bigint(Number(v))
                            : typescript_1.default.factory.createStringLiteral(v);
        }), true), typescript_1.default.factory.createTypeReferenceNode("const"));
    }; };
})(MiscLiteralsProgrammer || (exports.MiscLiteralsProgrammer = MiscLiteralsProgrammer = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["NO"] = "no constant literal type found.";
    ErrorMessages["ONLY"] = "only constant literal types are allowed.";
})(ErrorMessages || (ErrorMessages = {}));
//# sourceMappingURL=MiscLiteralsProgrammer.js.map