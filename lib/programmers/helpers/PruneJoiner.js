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
exports.PruneJoiner = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var metadata_to_pattern_1 = require("../internal/metadata_to_pattern");
var prune_object_properties_1 = require("../internal/prune_object_properties");
var PruneJoiner;
(function (PruneJoiner) {
    PruneJoiner.object = function (input, entries, obj) {
        // PREPARE ASSETS
        var regular = entries.filter(function (entry) { return entry.key.isSoleLiteral(); });
        var dynamic = entries.filter(function (entry) { return !entry.key.isSoleLiteral(); });
        var statements = regular
            .map(function (entry) {
            return typescript_1.default.isBlock(entry.expression)
                ? __spreadArray([], __read(entry.expression.statements), false) : [typescript_1.default.factory.createExpressionStatement(entry.expression)];
        })
            .flat();
        if (dynamic.length)
            statements.push(typescript_1.default.factory.createExpressionStatement(iterate_dynamic_properties({ regular: regular, dynamic: dynamic })(input)));
        statements.push((0, prune_object_properties_1.prune_object_properties)(obj));
        return typescript_1.default.factory.createBlock(statements, true);
    };
    PruneJoiner.array = function (input, arrow) {
        return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("forEach"), undefined, [arrow]);
    };
    PruneJoiner.tuple = function (children, rest) {
        var entire = __spreadArray([], __read(children), false);
        if (rest !== null)
            entire.push(rest);
        var statements = entire
            .map(function (elem) {
            return typescript_1.default.isBlock(elem)
                ? __spreadArray([], __read(elem.statements), false) : [typescript_1.default.factory.createExpressionStatement(elem)];
        })
            .flat();
        return typescript_1.default.factory.createBlock(statements, true);
    };
})(PruneJoiner || (exports.PruneJoiner = PruneJoiner = {}));
var iterate_dynamic_properties = function (props) {
    return function (input) {
        return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.entries"), undefined, [input]))("forEach"), undefined, [
            typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory_1.IdentifierFactory.parameter(typescript_1.default.factory.createArrayBindingPattern(["key", "value"].map(function (l) {
                    return typescript_1.default.factory.createBindingElement(undefined, undefined, typescript_1.default.factory.createIdentifier(l), undefined);
                }))),
            ], undefined, undefined, typescript_1.default.factory.createBlock(__spreadArray(__spreadArray([
                typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("undefined"), typescript_1.default.factory.createIdentifier("value")), typescript_1.default.factory.createReturnStatement())
            ], __read(props.regular.map(function (_a) {
                var key = _a.key;
                return typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral(key.getSoleLiteral()), typescript_1.default.factory.createIdentifier("key")), typescript_1.default.factory.createReturnStatement());
            })), false), __read(props.dynamic.map(function (dynamic) {
                return typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("RegExp(/".concat((0, metadata_to_pattern_1.metadata_to_pattern)(true)(dynamic.key), "/).test")), undefined, [typescript_1.default.factory.createIdentifier("key")]), typescript_1.default.isBlock(dynamic.expression)
                    ? dynamic.expression
                    : typescript_1.default.factory.createBlock([
                        typescript_1.default.factory.createExpressionStatement(dynamic.expression),
                    ]));
            })), false), true)),
        ]);
    };
};
//# sourceMappingURL=PruneJoiner.js.map