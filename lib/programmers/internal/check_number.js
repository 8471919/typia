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
exports.check_number = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var OptionPredicator_1 = require("../helpers/OptionPredicator");
/**
 * @internal
 */
var check_number = function (project, numeric) {
    return function (atomic) {
        return function (input) {
            var base = typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("number"), typescript_1.default.factory.createTypeOfExpression(input));
            var addition = numeric === true
                ? OptionPredicator_1.OptionPredicator.finite(project.options)
                    ? typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Number.isFinite"), undefined, [input])
                    : OptionPredicator_1.OptionPredicator.numeric(project.options)
                        ? typescript_1.default.factory.createLogicalNot(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Number.isNaN"), undefined, [input]))
                        : null
                : null;
            var conditions = check_numeric_type_tags(project)(atomic)(addition)(input);
            return {
                expected: atomic.getName(),
                expression: addition !== null && conditions.length === 0
                    ? typescript_1.default.factory.createLogicalAnd(base, addition)
                    : base,
                conditions: conditions,
            };
        };
    };
};
exports.check_number = check_number;
/**
 * @internal
 */
var check_numeric_type_tags = function (project) {
    return function (atomic) {
        return function (addition) {
            return function (input) {
                return atomic.tags
                    .map(function (row) { return row.filter(function (tag) { return !!tag.validate; }); })
                    .filter(function (row) { return !!row.length; })
                    .map(function (row) { return __spreadArray(__spreadArray([], __read((addition === null
                    ? []
                    : row.some(function (tag) {
                        return tag.kind === "type" &&
                            (tag.value === "int32" ||
                                tag.value === "uint32" ||
                                tag.value === "int64" ||
                                tag.value === "uint64" ||
                                tag.value === "float");
                    }) ||
                        row.some(function (tag) {
                            return tag.kind === "multipleOf" && typeof tag.value === "number";
                        }) ||
                        (row.some(function (tag) {
                            return (tag.kind === "minimum" || tag.kind === "exclusiveMinimum") &&
                                typeof tag.value === "number";
                        }) &&
                            row.some(function (tag) {
                                return (tag.kind === "maximum" ||
                                    tag.kind === "exclusiveMaximum") &&
                                    typeof tag.value === "number";
                            }))
                        ? []
                        : [
                            {
                                expected: "number",
                                expression: addition,
                            },
                        ])), false), __read(row.map(function (tag) {
                    var _a;
                    return ({
                        expected: "number & ".concat(tag.name),
                        expression: ((_a = tag.predicate) !== null && _a !== void 0 ? _a : ExpressionFactory_1.ExpressionFactory.transpile(project.context)(tag.validate))(input),
                    });
                })), false); });
            };
        };
    };
};
//# sourceMappingURL=check_number.js.map