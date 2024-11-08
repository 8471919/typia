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
exports.PatternUtil = void 0;
var PatternUtil;
(function (PatternUtil) {
    PatternUtil.fix = function (str) {
        var first = str.indexOf(PatternUtil.STRING);
        var last = str.lastIndexOf(PatternUtil.STRING);
        return [
            first === -1 || none("(")(str.slice(0, first)) ? "^" : "",
            str,
            last === -1 || none(")")(str.slice(last + PatternUtil.STRING.length)) ? "$" : "",
        ].join("");
    };
    PatternUtil.escape = function (str) {
        return str.replace(/[|\\/{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    };
    PatternUtil.NUMBER = "[+-]?" + // optional sign
        "\\d+(?:\\.\\d+)?" + // integer or decimal
        "(?:[eE][+-]?\\d+)?"; // optional exponent
    PatternUtil.BOOLEAN = "true|false";
    PatternUtil.STRING = "(.*)";
})(PatternUtil || (exports.PatternUtil = PatternUtil = {}));
var none = function (parenthesis) {
    return function (str) {
        var e_1, _a;
        try {
            for (var str_1 = __values(str), str_1_1 = str_1.next(); !str_1_1.done; str_1_1 = str_1.next()) {
                var ch = str_1_1.value;
                if (ch !== parenthesis)
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (str_1_1 && !str_1_1.done && (_a = str_1.return)) _a.call(str_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
};
//# sourceMappingURL=PatternUtil.js.map