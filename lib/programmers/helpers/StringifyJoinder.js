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
exports.StringifyJoiner = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var TemplateFactory_1 = require("../../factories/TemplateFactory");
var stringify_dynamic_properties_1 = require("../internal/stringify_dynamic_properties");
var stringify_regular_properties_1 = require("../internal/stringify_regular_properties");
var StringifyJoiner;
(function (StringifyJoiner) {
    StringifyJoiner.object = function (importer) {
        return function (_input, entries) {
            // CHECK AND SORT ENTRIES
            if (entries.length === 0)
                return typescript_1.default.factory.createStringLiteral("{}");
            // PROPERTIES
            var regular = entries.filter(function (entry) { return entry.key.isSoleLiteral(); });
            var dynamic = entries.filter(function (entry) { return !entry.key.isSoleLiteral(); });
            var expressions = __spreadArray(__spreadArray([], __read((0, stringify_regular_properties_1.stringify_regular_properties)(regular, dynamic)), false), __read((dynamic.length
                ? [
                    (0, stringify_dynamic_properties_1.stringify_dynamic_properties)(dynamic, regular.map(function (r) { return r.key.getSoleLiteral(); })),
                ]
                : [])), false);
            // POP LAST COMMA, IF REQUIRED
            var filtered = (regular.length &&
                regular[regular.length - 1].meta.isRequired() &&
                dynamic.length === 0) ||
                (regular.length === 0 && dynamic.length)
                ? expressions
                : [
                    typescript_1.default.factory.createCallExpression(importer.use("tail"), undefined, [
                        TemplateFactory_1.TemplateFactory.generate(expressions),
                    ]),
                ];
            // RETURNS WITH OBJECT BRACKET
            return TemplateFactory_1.TemplateFactory.generate(__spreadArray(__spreadArray([
                typescript_1.default.factory.createStringLiteral("{")
            ], __read(filtered), false), [
                typescript_1.default.factory.createStringLiteral("}"),
            ], false));
        };
    };
    StringifyJoiner.array = function (input, arrow) {
        return TemplateFactory_1.TemplateFactory.generate([
            typescript_1.default.factory.createStringLiteral("["),
            typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createPropertyAccessExpression(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("map"), undefined, [arrow]), typescript_1.default.factory.createIdentifier("join")), undefined, [typescript_1.default.factory.createStringLiteral(",")]),
            typescript_1.default.factory.createStringLiteral("]"),
        ]);
    };
    StringifyJoiner.tuple = function (children, rest) {
        if (children.length === 0)
            return typescript_1.default.factory.createStringLiteral("[]");
        if (rest === null && children.every(function (child) { return typescript_1.default.isStringLiteral(child); }))
            return typescript_1.default.factory.createStringLiteral("[" +
                children.map(function (child) { return child.text; }).join(",") +
                "]");
        var elements = [typescript_1.default.factory.createStringLiteral("[")];
        children.forEach(function (child, i) {
            elements.push(child);
            if (i !== children.length - 1)
                elements.push(typescript_1.default.factory.createStringLiteral(","));
        });
        if (rest !== null)
            elements.push(rest);
        elements.push(typescript_1.default.factory.createStringLiteral("]"));
        return TemplateFactory_1.TemplateFactory.generate(elements);
    };
})(StringifyJoiner || (exports.StringifyJoiner = StringifyJoiner = {}));
//# sourceMappingURL=StringifyJoinder.js.map