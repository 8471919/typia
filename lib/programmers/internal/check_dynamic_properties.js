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
exports.check_dynamic_properties = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var check_dynamic_key_1 = require("./check_dynamic_key");
var check_everything_1 = require("./check_everything");
/**
 * @internal
 */
var check_dynamic_properties = function (props) {
    return function (project) {
        return function (importer) {
            return function (input, regular, dynamic) {
                var length = IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.keys"), undefined, [input]))("length");
                var left = props.equals === true && dynamic.length === 0
                    ? props.undefined === true || regular.every(function (r) { return r.meta.isRequired(); })
                        ? typescript_1.default.factory.createStrictEquality(ExpressionFactory_1.ExpressionFactory.number(regular.filter(function (r) { return r.meta.isRequired(); }).length), length)
                        : typescript_1.default.factory.createCallExpression(importer.use("is_between"), [], [
                            length,
                            ExpressionFactory_1.ExpressionFactory.number(regular.filter(function (r) { return r.meta.isRequired(); }).length),
                            ExpressionFactory_1.ExpressionFactory.number(regular.length),
                        ])
                    : null;
                if (props.undefined === false &&
                    left !== null &&
                    regular.every(function (r) { return r.meta.isRequired(); }))
                    return left;
                var criteria = props.entries
                    ? typescript_1.default.factory.createCallExpression(props.entries, undefined, [
                        typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.keys"), undefined, [input]),
                        check_dynamic_property(props)(project)(importer)(input, regular, dynamic),
                    ])
                    : typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.keys"), undefined, [input]))(props.assert ? "every" : "map"), undefined, [
                        check_dynamic_property(props)(project)(importer)(input, regular, dynamic),
                    ]);
                var right = (props.halt || (function (elem) { return elem; }))(props.assert ? criteria : (0, check_everything_1.check_everything)(criteria));
                return left
                    ? (props.undefined
                        ? typescript_1.default.factory.createLogicalOr
                        : typescript_1.default.factory.createLogicalAnd)(left, right)
                    : right;
            };
        };
    };
};
exports.check_dynamic_properties = check_dynamic_properties;
var check_dynamic_property = function (props) {
    return function (project) {
        return function (importer) {
            return function (input, regular, dynamic) {
                var e_1, _a;
                //----
                // IF CONDITIONS
                //----
                // PREPARE ASSETS
                var key = typescript_1.default.factory.createIdentifier("key");
                var value = typescript_1.default.factory.createIdentifier("value");
                var statements = [];
                var add = function (exp, output) {
                    return statements.push(typescript_1.default.factory.createIfStatement(exp, typescript_1.default.factory.createReturnStatement(output)));
                };
                var broken = { value: false };
                // GATHER CONDITIONS
                if (regular.length)
                    add(is_regular_property(regular), props.positive);
                statements.push(StatementFactory_1.StatementFactory.constant("value", typescript_1.default.factory.createElementAccessExpression(input, key)));
                if (props.undefined === true)
                    add(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("undefined"), value), props.positive);
                try {
                    for (var dynamic_1 = __values(dynamic), dynamic_1_1 = dynamic_1.next(); !dynamic_1_1.done; dynamic_1_1 = dynamic_1.next()) {
                        var entry = dynamic_1_1.value;
                        var condition = (0, check_dynamic_key_1.check_dynamic_key)(project)(importer)(key, entry.key);
                        if (condition.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
                            statements.push(typescript_1.default.factory.createReturnStatement(entry.expression));
                            broken.value = true;
                            break;
                        }
                        else
                            add(condition, entry.expression);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (dynamic_1_1 && !dynamic_1_1.done && (_a = dynamic_1.return)) _a.call(dynamic_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                //----
                // FUNCTION BODY
                //----
                // CLOSURE BLOCK
                var block = typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([], __read(statements), false), __read((broken.value
                    ? []
                    : [
                        typescript_1.default.factory.createReturnStatement(props.equals === true
                            ? props.superfluous(value)
                            : props.positive),
                    ])), false), true);
                // RETURNS
                return typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("key")], undefined, undefined, block);
            };
        };
    };
};
var is_regular_property = function (regular) {
    return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createArrayLiteralExpression(regular.map(function (entry) {
        return typescript_1.default.factory.createStringLiteral(entry.key.getSoleLiteral());
    })))("some"), undefined, [
        typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("prop")], undefined, undefined, typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("key"), typescript_1.default.factory.createIdentifier("prop"))),
    ]);
};
//# sourceMappingURL=check_dynamic_properties.js.map