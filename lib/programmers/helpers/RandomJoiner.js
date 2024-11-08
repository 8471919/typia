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
exports.RandomJoiner = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var Escaper_1 = require("../../utils/Escaper");
var RandomJoiner;
(function (RandomJoiner) {
    RandomJoiner.array = function (coalesce) {
        return function (decoder) {
            return function (explore) {
                return function (length, unique) {
                    return function (item) {
                        var generator = typescript_1.default.factory.createCallExpression(coalesce("array"), undefined, __spreadArray(__spreadArray([
                            typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, decoder(item))
                        ], __read((length
                            ? [length]
                            : unique
                                ? [typescript_1.default.factory.createIdentifier("undefined")]
                                : [])), false), __read((unique ? [unique] : [])), false));
                        if (explore.recursive === false)
                            return generator;
                        return typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createGreaterThanEquals(ExpressionFactory_1.ExpressionFactory.number(5), typescript_1.default.factory.createIdentifier("_depth")), undefined, generator, undefined, typescript_1.default.factory.createArrayLiteralExpression([]));
                    };
                };
            };
        };
    };
    RandomJoiner.tuple = function (decoder) { return function (elements) {
        return typescript_1.default.factory.createArrayLiteralExpression(elements.map(function (elem) { var _a; return decoder((_a = elem.rest) !== null && _a !== void 0 ? _a : elem); }), true);
    }; };
    RandomJoiner.object = function (coalesce) {
        return function (decoder) {
            return function (obj) {
                if (obj.properties.length === 0)
                    return typescript_1.default.factory.createIdentifier("{}");
                // LIST UP PROPERTIES
                var regular = obj.properties.filter(function (p) { return p.key.isSoleLiteral(); });
                var dynamic = obj.properties.filter(function (p) { return !p.key.isSoleLiteral(); });
                // REGULAR OBJECT
                var literal = typescript_1.default.factory.createObjectLiteralExpression(regular.map(function (p) {
                    var str = p.key.getSoleLiteral();
                    return typescript_1.default.factory.createPropertyAssignment(Escaper_1.Escaper.variable(str) ? str : typescript_1.default.factory.createStringLiteral(str), decoder(p.value));
                }), true);
                if (dynamic.length === 0)
                    return literal;
                var properties = dynamic.map(function (p) {
                    return typescript_1.default.factory.createExpressionStatement(dynamicProperty(coalesce)(decoder)(p));
                });
                return typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([
                    StatementFactory_1.StatementFactory.constant("output", typescript_1.default.factory.createAsExpression(literal, TypeFactory_1.TypeFactory.keyword("any")))
                ], __read((obj.recursive
                    ? [
                        typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createGreaterThanEquals(ExpressionFactory_1.ExpressionFactory.number(5), typescript_1.default.factory.createIdentifier("_depth")), typescript_1.default.factory.createBlock(properties, true)),
                    ]
                    : properties)), false), [
                    typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createIdentifier("output")),
                ], false), true);
            };
        };
    };
    var dynamicProperty = function (coalesce) {
        return function (decoder) {
            return function (p) {
                return typescript_1.default.factory.createCallExpression(coalesce("array"), undefined, [
                    typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createElementAccessExpression(typescript_1.default.factory.createIdentifier("output"), decoder(p.key)), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), decoder(p.value))),
                    typescript_1.default.factory.createCallExpression(coalesce("integer"), undefined, [
                        ExpressionFactory_1.ExpressionFactory.number(0),
                        ExpressionFactory_1.ExpressionFactory.number(3),
                    ]),
                ]);
            };
        };
    };
})(RandomJoiner || (exports.RandomJoiner = RandomJoiner = {}));
//# sourceMappingURL=RandomJoiner.js.map