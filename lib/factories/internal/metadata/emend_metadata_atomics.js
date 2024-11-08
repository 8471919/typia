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
exports.emend_metadata_atomics = void 0;
var MetadataAtomic_1 = require("../../../schemas/metadata/MetadataAtomic");
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var emend_metadata_atomics = function (meta) {
    var e_1, _a;
    var _loop_1 = function (a) {
        if (is_not_pure(a))
            return "continue";
        var index = meta.constants.findIndex(function (c) { return c.type === a.type; });
        if (index !== -1)
            meta.constants.splice(index, 1);
    };
    try {
        // ATOMICS
        for (var _b = __values(meta.atomics), _c = _b.next(); !_c.done; _c = _b.next()) {
            var a = _c.value;
            _loop_1(a);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // BOOLEAN
    {
        var index = meta.constants.findIndex(function (c) { return c.type === "boolean"; });
        if (index !== -1 && meta.constants[index].values.length === 2) {
            var temp_1 = meta.constants.splice(index, 1)[0];
            ArrayUtil_1.ArrayUtil.take(meta.atomics, function (a) { return a.type === "boolean"; }, function () {
                var _a;
                return MetadataAtomic_1.MetadataAtomic.create({
                    type: "boolean",
                    tags: (_a = temp_1.values[0].tags) !== null && _a !== void 0 ? _a : [],
                });
            });
        }
    }
    // TEMPLATE
    if (meta.templates.length) {
        var atomic = meta.atomics.find(function (a) { return a.type === "string"; });
        if (atomic !== undefined && false === is_not_pure(atomic))
            meta.templates.splice(0, meta.templates.length);
    }
};
exports.emend_metadata_atomics = emend_metadata_atomics;
var is_not_pure = function (atomic) {
    return atomic.tags.length !== 0 &&
        atomic.tags.every(function (row) { return row.length !== 0 && row.every(function (c) { var _a; return !!((_a = c.validate) === null || _a === void 0 ? void 0 : _a.length); }); });
};
//# sourceMappingURL=emend_metadata_atomics.js.map