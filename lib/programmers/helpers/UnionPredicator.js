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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionPredicator = void 0;
var Metadata_1 = require("../../schemas/metadata/Metadata");
var ArrayUtil_1 = require("../../utils/ArrayUtil");
var MapUtil_1 = require("../../utils/MapUtil");
var UnionPredicator;
(function (UnionPredicator) {
    UnionPredicator.object = function (targets) {
        var e_1, _a, e_2, _b;
        // PROPERTY MATRIX
        var matrix = new Map();
        try {
            for (var targets_1 = __values(targets), targets_1_1 = targets_1.next(); !targets_1_1.done; targets_1_1 = targets_1.next()) {
                var obj = targets_1_1.value;
                try {
                    for (var _c = (e_2 = void 0, __values(obj.properties)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var prop = _d.value;
                        var key = prop.key.getSoleLiteral();
                        if (key !== null)
                            MapUtil_1.MapUtil.take(matrix)(key, function () {
                                return ArrayUtil_1.ArrayUtil.repeat(targets.length, function () { return null; });
                            });
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (targets_1_1 && !targets_1_1.done && (_a = targets_1.return)) _a.call(targets_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        targets.forEach(function (obj, i) {
            var e_3, _a;
            try {
                for (var _b = __values(obj.properties), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var prop = _c.value;
                    var key = prop.key.getSoleLiteral();
                    if (key !== null)
                        matrix.get(key)[i] = prop;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
        // EXPLORE SPECIALIZERS
        var output = [];
        targets.forEach(function (obj, i) {
            var children = [];
            obj.properties.forEach(function (prop) {
                // MUST BE REQUIRED
                if (prop.value.isRequired() === false)
                    return;
                var key = prop.key.getSoleLiteral();
                if (key === null)
                    return;
                // FIND NEIGHBORHOOD PROPERTIES
                var neighbors = matrix
                    .get(key)
                    .filter(function (oppo, k) { return i !== k && oppo !== null; });
                // NO NEIGHBORHOOD
                var unique = neighbors.length === 0 ||
                    neighbors.every(function (n) { return !Metadata_1.Metadata.intersects(prop.value, n.value); });
                if (unique === true)
                    children.push({
                        property: prop,
                        neighbour: neighbors.length !== 0,
                    });
            });
            if (children.length === 0)
                return;
            var top = children.find(function (child) { return child.property.value.isConstant(); }) ||
                children[0];
            output.push(__assign({ index: i, object: obj }, top));
        });
        return output;
    };
})(UnionPredicator || (exports.UnionPredicator = UnionPredicator = {}));
//# sourceMappingURL=UnionPredicator.js.map