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
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata_to_pattern = void 0;
var PatternUtil_1 = require("../../utils/PatternUtil");
var template_to_pattern_1 = require("./template_to_pattern");
/**
 * @internal
 */
var metadata_to_pattern = function (top) {
    return function (meta) {
        var e_1, _a, e_2, _b;
        if (meta.atomics.find(function (a) { return a.type === "string"; }) !== undefined)
            return "(.*)";
        var values = meta.constants
            .map(function (c) {
            if (c.type !== "string")
                return c.values.map(function (v) { return v.toString(); });
            return c.values.map(function (v) { return v.value; }).map(function (str) {
                return PatternUtil_1.PatternUtil.escape(str);
            });
        })
            .flat();
        try {
            for (var _c = __values(meta.atomics), _d = _c.next(); !_d.done; _d = _c.next()) {
                var a = _d.value;
                if (a.type === "number" || a.type === "bigint")
                    values.push(PatternUtil_1.PatternUtil.NUMBER);
                else if (a.type === "boolean")
                    values.push(PatternUtil_1.PatternUtil.BOOLEAN);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(meta.templates), _f = _e.next(); !_f.done; _f = _e.next()) {
                var row = _f.value.row;
                values.push("(" + (0, template_to_pattern_1.template_to_pattern)(false)(row) + ")");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var pattern = values.length === 1 ? values[0] : "(" + values.join("|") + ")";
        return top ? PatternUtil_1.PatternUtil.fix(pattern) : pattern;
    };
};
exports.metadata_to_pattern = metadata_to_pattern;
//# sourceMappingURL=metadata_to_pattern.js.map