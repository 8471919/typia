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
exports.ProtobufUtil = void 0;
var ProtobufUtil;
(function (ProtobufUtil) {
    ProtobufUtil.isStaticObject = function (obj) {
        return obj.properties.length >= 1 &&
            obj.properties.every(function (p) { return p.key.isSoleLiteral(); });
    };
    ProtobufUtil.size = function (meta) {
        return ProtobufUtil.getAtomics(meta).length +
            meta.arrays.length +
            meta.tuples.length +
            meta.natives.length +
            meta.objects.length +
            meta.maps.length;
    };
    ProtobufUtil.isUnion = function (meta) { return ProtobufUtil.size(meta) > 1; };
    ProtobufUtil.getAtomics = function (meta) {
        var e_1, _a, e_2, _b;
        var set = new Set();
        if (meta.templates.length)
            set.add("string");
        try {
            for (var _c = __values(meta.constants), _d = _c.next(); !_d.done; _d = _c.next()) {
                var c = _d.value;
                if (c.type === "boolean")
                    set.add("bool");
                else if (c.type === "bigint")
                    set.add("uint64");
                else if (c.type === "number")
                    set.add(deduce_numeric_type(c.values.map(function (v) { return v.value; })));
                else if (c.type === "string")
                    set.add("string");
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
            for (var _e = __values(meta.atomics), _f = _e.next(); !_f.done; _f = _e.next()) {
                var atomic = _f.value;
                if (atomic.type === "boolean")
                    set.add("bool");
                else if (atomic.type === "bigint")
                    decode_bigint(atomic.tags).forEach(function (t) { return set.add(t); });
                else if (atomic.type === "number")
                    decode_number(atomic.tags).forEach(function (t) { return set.add(t); });
                else if (atomic.type === "string")
                    set.add("string");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return __spreadArray([], __read(set), false).sort(compare);
    };
    ProtobufUtil.getNumbers = function (meta) {
        var e_3, _a, e_4, _b;
        var set = new Set();
        try {
            for (var _c = __values(meta.constants), _d = _c.next(); !_d.done; _d = _c.next()) {
                var c = _d.value;
                if (c.type === "number")
                    set.add(deduce_numeric_type(c.values.map(function (v) { return v.value; })));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _e = __values(meta.atomics), _f = _e.next(); !_f.done; _f = _e.next()) {
                var atomic = _f.value;
                if (atomic.type === "number")
                    decode_number(atomic.tags).forEach(function (t) { return set.add(t); });
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return __spreadArray([], __read(set), false).sort(compare);
    };
    ProtobufUtil.getBigints = function (meta) {
        var e_5, _a, e_6, _b;
        var set = new Set();
        try {
            for (var _c = __values(meta.constants), _d = _c.next(); !_d.done; _d = _c.next()) {
                var c = _d.value;
                if (c.type === "bigint")
                    set.add("uint64");
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
        try {
            for (var _e = __values(meta.atomics), _f = _e.next(); !_f.done; _f = _e.next()) {
                var atomic = _f.value;
                if (atomic.type === "bigint")
                    decode_bigint(atomic.tags).forEach(function (t) { return set.add(t); });
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return __spreadArray([], __read(set), false).sort(compare);
    };
    var compare = function (x, y) {
        return ATOMIC_ORDER.get(x) - ATOMIC_ORDER.get(y);
    };
})(ProtobufUtil || (exports.ProtobufUtil = ProtobufUtil = {}));
var ATOMIC_ORDER = new Map([
    "bool",
    "int32",
    "uint32",
    "int64",
    "uint64",
    "float",
    "double",
    "string",
].map(function (str, i) { return [str, i]; }));
var deduce_numeric_type = function (values) {
    return values.every(function (v) { return Math.floor(v) === v; })
        ? values.every(function (v) { return -2147483648 <= v && v <= 2147483647; })
            ? "int32"
            : "int64"
        : "double";
};
var decode_bigint = function (typeTags) {
    var e_7, _a;
    var _b;
    if (typeTags.length === 0)
        return ["int64"];
    var types = new Set();
    try {
        for (var typeTags_1 = __values(typeTags), typeTags_1_1 = typeTags_1.next(); !typeTags_1_1.done; typeTags_1_1 = typeTags_1.next()) {
            var row = typeTags_1_1.value;
            var value = (_b = row.find(function (tag) {
                return tag.kind === "type" &&
                    (tag.value === "int64" || tag.value === "uint64");
            })) === null || _b === void 0 ? void 0 : _b.value;
            types.add(value !== null && value !== void 0 ? value : "int64");
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (typeTags_1_1 && !typeTags_1_1.done && (_a = typeTags_1.return)) _a.call(typeTags_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return __spreadArray([], __read(types), false);
};
var decode_number = function (typeTags) {
    var e_8, _a;
    var _b;
    if (typeTags.length === 0)
        return ["double"];
    var types = new Set();
    try {
        for (var typeTags_2 = __values(typeTags), typeTags_2_1 = typeTags_2.next(); !typeTags_2_1.done; typeTags_2_1 = typeTags_2.next()) {
            var row = typeTags_2_1.value;
            var value = (_b = row.find(function (tag) {
                return tag.kind === "type" &&
                    (tag.value === "int32" ||
                        tag.value === "uint32" ||
                        tag.value === "int64" ||
                        tag.value === "uint64" ||
                        tag.value === "float" ||
                        tag.value === "double");
            })) === null || _b === void 0 ? void 0 : _b.value;
            types.add(value !== null && value !== void 0 ? value : "double");
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (typeTags_2_1 && !typeTags_2_1.done && (_a = typeTags_2.return)) _a.call(typeTags_2);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return __spreadArray([], __read(types), false);
};
//# sourceMappingURL=ProtobufUtil.js.map