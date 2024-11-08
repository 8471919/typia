"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.application_templates = void 0;
var Metadata_1 = require("../../schemas/metadata/Metadata");
var application_plugin_1 = require("./application_plugin");
var metadata_to_pattern_1 = require("./metadata_to_pattern");
/**
 * @internal
 */
var application_templates = function (meta) {
    var e_1, _a;
    var _b;
    var pureTemplates = meta.templates.filter(function (t) { var _a; return isPure((_a = t.tags) !== null && _a !== void 0 ? _a : []) === true; });
    var taggedTemplates = meta.templates.filter(function (t) { var _a; return isPure((_a = t.tags) !== null && _a !== void 0 ? _a : []) === false; });
    var output = [];
    if (pureTemplates.length)
        output.push({
            type: "string",
            pattern: (0, metadata_to_pattern_1.metadata_to_pattern)(true)(Metadata_1.Metadata.create(__assign(__assign({}, Metadata_1.Metadata.initialize()), { templates: pureTemplates }))),
        });
    try {
        for (var taggedTemplates_1 = __values(taggedTemplates), taggedTemplates_1_1 = taggedTemplates_1.next(); !taggedTemplates_1_1.done; taggedTemplates_1_1 = taggedTemplates_1.next()) {
            var tpl = taggedTemplates_1_1.value;
            output.push.apply(output, __spreadArray([], __read((0, application_plugin_1.application_plugin)({
                type: "string",
                pattern: (0, metadata_to_pattern_1.metadata_to_pattern)(false)(Metadata_1.Metadata.create(__assign(__assign({}, Metadata_1.Metadata.initialize()), { templates: [tpl] }))),
            }, (_b = tpl.tags) !== null && _b !== void 0 ? _b : [])), false));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (taggedTemplates_1_1 && !taggedTemplates_1_1.done && (_a = taggedTemplates_1.return)) _a.call(taggedTemplates_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
};
exports.application_templates = application_templates;
var isPure = function (matrix) {
    return matrix.every(function (tags) { return filter(tags).length === 0; });
};
var filter = function (tags) {
    return tags.filter(function (t) { return t.schema !== undefined; });
};
//# sourceMappingURL=application_templates.js.map