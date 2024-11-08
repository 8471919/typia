"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template_to_pattern = void 0;
var PatternUtil_1 = require("../../utils/PatternUtil");
var metadata_to_pattern_1 = require("./metadata_to_pattern");
/**
 * @internal
 */
var template_to_pattern = function (top) { return function (template) {
    var pattern = template
        .map(function (meta) { return (0, metadata_to_pattern_1.metadata_to_pattern)(false)(meta); })
        .join("");
    return top ? PatternUtil_1.PatternUtil.fix(pattern) : pattern;
}; };
exports.template_to_pattern = template_to_pattern;
//# sourceMappingURL=template_to_pattern.js.map