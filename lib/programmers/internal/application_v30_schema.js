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
exports.application_v30_schema = void 0;
var MetadataAtomic_1 = require("../../schemas/metadata/MetadataAtomic");
var AtomicPredicator_1 = require("../helpers/AtomicPredicator");
var application_array_1 = require("./application_array");
var application_bigint_1 = require("./application_bigint");
var application_boolean_1 = require("./application_boolean");
var application_escaped_1 = require("./application_escaped");
var application_number_1 = require("./application_number");
var application_string_1 = require("./application_string");
var application_templates_1 = require("./application_templates");
var application_union_discriminator_1 = require("./application_union_discriminator");
var application_v30_alias_1 = require("./application_v30_alias");
var application_v30_constant_1 = require("./application_v30_constant");
var application_v30_native_1 = require("./application_v30_native");
var application_v30_object_1 = require("./application_v30_object");
var application_v30_tuple_1 = require("./application_v30_tuple");
/**
 * @internal
 */
var application_v30_schema = function (blockNever) {
    return function (components) {
        return function (attribute) {
            return function (meta) {
                var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g;
                var _h, _j, _k;
                // VULNERABLE CASE
                if (meta.any === true)
                    return __assign(__assign({}, attribute), { type: undefined });
                else if (meta.nullable && meta.empty())
                    return __assign({ type: "null" }, attribute);
                //----
                // GATHER UNION SCHEMAS
                //----
                var union = [];
                var insert = meta.nullable
                    ? function (schema) {
                        return union.push(__assign(__assign({}, schema), { nullable: schema.type
                                ? true
                                : undefined }));
                    }
                    : function (schema) { return union.push(schema); };
                // toJSON() METHOD
                if (meta.escaped !== null)
                    (0, application_escaped_1.application_escaped)((0, exports.application_v30_schema)(false)(components)({}))(meta.escaped).forEach(insert);
                // ATOMIC TYPES
                if (meta.templates.length && AtomicPredicator_1.AtomicPredicator.template(meta))
                    (0, application_templates_1.application_templates)(meta).forEach(insert);
                try {
                    for (var _l = __values(meta.constants), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var constant = _m.value;
                        if (AtomicPredicator_1.AtomicPredicator.constant(meta)(constant.type) === false)
                            continue;
                        else
                            insert((0, application_v30_constant_1.application_v30_constant)(constant));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_a = _l.return)) _a.call(_l);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _o = __values(meta.atomics), _p = _o.next(); !_p.done; _p = _o.next()) {
                        var a = _p.value;
                        if (a.type === "boolean")
                            (0, application_boolean_1.application_boolean)(a).forEach(insert);
                        else if (a.type === "bigint")
                            (0, application_bigint_1.application_bigint)(a).forEach(insert);
                        else if (a.type === "number")
                            (0, application_number_1.application_number)(a).forEach(insert);
                        else if (a.type === "string")
                            (0, application_string_1.application_string)(a).forEach(insert);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_p && !_p.done && (_b = _o.return)) _b.call(_o);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    // ARRAY
                    for (var _q = __values(meta.arrays), _r = _q.next(); !_r.done; _r = _q.next()) {
                        var array = _r.value;
                        (0, application_array_1.application_array)((0, exports.application_v30_schema)(false)(components)({}))(components)(array).forEach(insert);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_r && !_r.done && (_c = _q.return)) _c.call(_q);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    // TUPLE
                    for (var _s = __values(meta.tuples), _t = _s.next(); !_t.done; _t = _s.next()) {
                        var tuple = _t.value;
                        insert((0, application_v30_tuple_1.application_v30_tuple)(components)(tuple)(attribute));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_t && !_t.done && (_d = _s.return)) _d.call(_s);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                var _loop_1 = function (native) {
                    if (AtomicPredicator_1.AtomicPredicator.native(native)) {
                        var type_1 = native.toLowerCase();
                        if (meta.atomics.some(function (a) { return a.type === type_1; }))
                            return "continue";
                        else if (type_1 === "boolean")
                            insert((0, application_boolean_1.application_boolean)(MetadataAtomic_1.MetadataAtomic.create({
                                type: "boolean",
                                tags: [],
                            }))[0]);
                        else if (type_1 === "bigint")
                            insert((0, application_bigint_1.application_bigint)(MetadataAtomic_1.MetadataAtomic.create({
                                type: "bigint",
                                tags: [],
                            }))[0]);
                        else if (type_1 === "number")
                            insert((0, application_number_1.application_number)(MetadataAtomic_1.MetadataAtomic.create({
                                type: "number",
                                tags: [],
                            }))[0]);
                        else if (type_1 === "string")
                            insert((0, application_string_1.application_string)(MetadataAtomic_1.MetadataAtomic.create({
                                type: "string",
                                tags: [],
                            }))[0]);
                    }
                    else
                        insert((0, application_v30_native_1.application_v30_native)(components)(native)(meta.nullable));
                };
                try {
                    // NATIVES
                    for (var _u = __values(meta.natives), _v = _u.next(); !_v.done; _v = _u.next()) {
                        var native = _v.value;
                        _loop_1(native);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_v && !_v.done && (_e = _u.return)) _e.call(_u);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                if (meta.sets.length)
                    insert((0, application_v30_native_1.application_v30_native)(components)("Set")(meta.nullable));
                if (meta.maps.length)
                    insert((0, application_v30_native_1.application_v30_native)(components)("Map")(meta.nullable));
                try {
                    // OBJECT
                    for (var _w = __values(meta.objects), _x = _w.next(); !_x.done; _x = _w.next()) {
                        var obj = _x.value;
                        insert((0, application_v30_object_1.application_v30_object)(components)(obj)(meta.nullable));
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_x && !_x.done && (_f = _w.return)) _f.call(_w);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                try {
                    // ALIASES
                    for (var _y = __values(meta.aliases), _z = _y.next(); !_z.done; _z = _y.next()) {
                        var alias = _z.value;
                        insert((0, application_v30_alias_1.application_v30_alias)(blockNever)(components)(alias)(meta.nullable));
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_z && !_z.done && (_g = _y.return)) _g.call(_y);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                //----
                // RETURNS
                //----
                if (union.length === 0 && blockNever === true)
                    return null;
                var schema = union.length === 0
                    ? { type: undefined }
                    : union.length === 1
                        ? union[0]
                        : {
                            oneOf: union,
                            discriminator: (0, application_union_discriminator_1.application_union_discriminator)(meta),
                        };
                return __assign(__assign(__assign({}, schema), attribute), { title: (_h = attribute.title) !== null && _h !== void 0 ? _h : schema.title, description: (_j = attribute.description) !== null && _j !== void 0 ? _j : schema.description, deprecated: (_k = attribute.deprecated) !== null && _k !== void 0 ? _k : schema.deprecated });
            };
        };
    };
};
exports.application_v30_schema = application_v30_schema;
//# sourceMappingURL=application_v30_schema.js.map