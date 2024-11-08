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
exports.stringify_regular_properties = void 0;
var typescript_1 = __importDefault(require("typescript"));
var TemplateFactory_1 = require("../../factories/TemplateFactory");
var ValueFactory_1 = require("../../factories/ValueFactory");
/**
 * @internal
 */
var stringify_regular_properties = function (regular, dynamic) {
    var output = [];
    regular.sort(function (x, y) { return sequence(x.meta) - sequence(y.meta); });
    regular.forEach(function (entry, index) {
        // BASE ELEMENTS
        var key = entry.key.getSoleLiteral();
        var base = [
            typescript_1.default.factory.createStringLiteral("".concat(JSON.stringify(key), ":")),
            entry.expression,
        ];
        if (index !== regular.length - 1 || dynamic.length !== 0)
            base.push(typescript_1.default.factory.createStringLiteral(","));
        var empty = (entry.meta.isRequired() === false &&
            entry.meta.nullable === false &&
            entry.meta.size() === 0) ||
            (!!entry.meta.functions.length &&
                entry.meta.nullable === false &&
                entry.meta.size() === 1);
        if (empty === true)
            return;
        else if (entry.meta.isRequired() === false ||
            entry.meta.functions.length ||
            entry.meta.any === true)
            output.push(typescript_1.default.factory.createConditionalExpression((function () {
                var conditions = [];
                if (entry.meta.isRequired() === false || entry.meta.any)
                    conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("undefined"), entry.input));
                if (entry.meta.functions.length || entry.meta.any)
                    conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("function"), ValueFactory_1.ValueFactory.TYPEOF(entry.input)));
                return conditions.length === 1
                    ? conditions[0]
                    : conditions.reduce(function (x, y) { return typescript_1.default.factory.createLogicalOr(x, y); });
            })(), undefined, typescript_1.default.factory.createStringLiteral(""), undefined, TemplateFactory_1.TemplateFactory.generate(base)));
        else
            output.push.apply(output, __spreadArray([], __read(base), false));
    });
    return output;
};
exports.stringify_regular_properties = stringify_regular_properties;
/**
 * @internal
 */
var sequence = function (meta) {
    return meta.any || !meta.isRequired() || meta.functions.length ? 0 : 1;
};
//# sourceMappingURL=stringify_regular_properties.js.map