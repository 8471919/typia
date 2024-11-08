"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_template = void 0;
var typescript_1 = __importDefault(require("typescript"));
var template_to_pattern_1 = require("./template_to_pattern");
/**
 * @internal
 */
var check_template = function (templates) {
    return function (input) {
        // TYPEOF STRING & TAGS
        var conditions = [
            typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("string"), typescript_1.default.factory.createTypeOfExpression(input)),
        ];
        // TEMPLATES
        var internal = templates.map(function (tpl) {
            return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("RegExp(/".concat((0, template_to_pattern_1.template_to_pattern)(true)(tpl.row), "/).test")), undefined, [input]);
        });
        conditions.push(internal.length === 1
            ? internal[0]
            : internal.reduce(function (x, y) { return typescript_1.default.factory.createLogicalOr(x, y); }));
        // COMBINATION
        return {
            expression: conditions.reduce(function (x, y) {
                return typescript_1.default.factory.createLogicalAnd(x, y);
            }),
            conditions: [],
            expected: templates.map(function (tpl) { return tpl.getName(); }).join(" | "),
        };
    };
};
exports.check_template = check_template;
//# sourceMappingURL=check_template.js.map