"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_object = void 0;
var typescript_1 = __importDefault(require("typescript"));
var check_dynamic_properties_1 = require("./check_dynamic_properties");
var check_everything_1 = require("./check_everything");
/**
 * @internal
 */
var check_object = function (props) {
    return function (project) {
        return function (importer) {
            return function (input, entries) {
                // PREPARE ASSETS
                var regular = entries.filter(function (entry) { return entry.key.isSoleLiteral(); });
                var dynamic = entries.filter(function (entry) { return !entry.key.isSoleLiteral(); });
                var flags = regular.map(function (entry) { return entry.expression; });
                // REGULAR WITHOUT DYNAMIC PROPERTIES
                if (props.equals === false && dynamic.length === 0)
                    return regular.length === 0 ? props.positive : reduce(props)(flags);
                // CHECK DYNAMIC PROPERTIES
                flags.push((0, check_dynamic_properties_1.check_dynamic_properties)(props)(project)(importer)(input, regular, dynamic));
                return reduce(props)(flags);
            };
        };
    };
};
exports.check_object = check_object;
/**
 * @internal
 */
var reduce = function (props) { return function (expressions) {
    return props.assert
        ? expressions.reduce(props.reduce)
        : (0, check_everything_1.check_everything)(typescript_1.default.factory.createArrayLiteralExpression(expressions));
}; };
//# sourceMappingURL=check_object.js.map