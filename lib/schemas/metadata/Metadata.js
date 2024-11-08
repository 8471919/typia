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
exports.Metadata = void 0;
var ArrayUtil_1 = require("../../utils/ArrayUtil");
var MetadataArray_1 = require("./MetadataArray");
var MetadataAtomic_1 = require("./MetadataAtomic");
var MetadataConstant_1 = require("./MetadataConstant");
var MetadataEscaped_1 = require("./MetadataEscaped");
var MetadataFunction_1 = require("./MetadataFunction");
var MetadataObject_1 = require("./MetadataObject");
var MetadataTemplate_1 = require("./MetadataTemplate");
var MetadataTuple_1 = require("./MetadataTuple");
var Metadata = /** @class */ (function () {
    /* -----------------------------------------------------------
      CONSTRUCTORS
    ----------------------------------------------------------- */
    /**
     * @hidden
     */
    function Metadata(props) {
        /** @internal */ this.parent_resolved_ = false;
        this.any = props.any;
        this.required = props.required;
        this.optional = props.optional;
        this.nullable = props.nullable;
        this.functions = props.functions;
        this.escaped = props.escaped;
        this.atomics = props.atomics;
        this.constants = props.constants;
        this.templates = props.templates;
        this.rest = props.rest;
        this.arrays = props.arrays;
        this.tuples = props.tuples;
        this.objects = props.objects;
        this.aliases = props.aliases;
        this.natives = props.natives;
        this.sets = props.sets;
        this.maps = props.maps;
    }
    /**
     * @internal
     */
    Metadata.create = function (props) {
        return new Metadata(props);
    };
    /**
     * @internal
     */
    Metadata.initialize = function (parentResolved) {
        if (parentResolved === void 0) { parentResolved = false; }
        var meta = Metadata.create({
            any: false,
            nullable: false,
            required: true,
            optional: false,
            escaped: null,
            constants: [],
            atomics: [],
            templates: [],
            arrays: [],
            tuples: [],
            objects: [],
            aliases: [],
            functions: [],
            rest: null,
            natives: [],
            sets: [],
            maps: [],
        });
        meta.parent_resolved_ = parentResolved;
        return meta;
    };
    Metadata.prototype.toJSON = function () {
        return {
            any: this.any,
            required: this.required,
            optional: this.optional,
            nullable: this.nullable,
            functions: this.functions.map(function (f) { return f.toJSON(); }),
            atomics: this.atomics.map(function (a) { return a.toJSON(); }),
            constants: this.constants.map(function (c) { return c.toJSON(); }),
            templates: this.templates.map(function (tpl) { return tpl.toJSON(); }),
            escaped: this.escaped ? this.escaped.toJSON() : null,
            rest: this.rest ? this.rest.toJSON() : null,
            arrays: this.arrays.map(function (array) { return ({
                name: array.type.name,
                tags: array.tags.map(function (r) { return r.slice(); }),
            }); }),
            tuples: this.tuples.map(function (tuple) { return ({
                name: tuple.type.name,
                tags: tuple.tags.map(function (r) { return r.slice(); }),
            }); }),
            objects: this.objects.map(function (obj) { return obj.name; }),
            aliases: this.aliases.map(function (alias) { return alias.name; }),
            natives: this.natives.slice(),
            sets: this.sets.map(function (meta) { return meta.toJSON(); }),
            maps: this.maps.map(function (entry) { return ({
                key: entry.key.toJSON(),
                value: entry.value.toJSON(),
            }); }),
        };
    };
    Metadata.from = function (meta, dict) {
        var _this = this;
        return Metadata.create({
            any: meta.any,
            required: meta.required,
            optional: meta.optional,
            nullable: meta.nullable,
            functions: meta.functions.map(function (f) { return MetadataFunction_1.MetadataFunction.from(f, dict); }),
            constants: meta.constants.map(MetadataConstant_1.MetadataConstant.from),
            atomics: meta.atomics.map(MetadataAtomic_1.MetadataAtomic.from),
            templates: meta.templates.map(function (tpl) { return MetadataTemplate_1.MetadataTemplate.from(tpl, dict); }),
            escaped: meta.escaped ? MetadataEscaped_1.MetadataEscaped.from(meta.escaped, dict) : null,
            rest: meta.rest ? this.from(meta.rest, dict) : null,
            arrays: meta.arrays.map(function (ref) {
                var type = dict.arrays.get(ref.name);
                if (type === undefined)
                    throw new RangeError("Error on Metadata.from(): failed to find array \"".concat(ref.name, "\"."));
                return MetadataArray_1.MetadataArray.create({
                    type: type,
                    tags: ref.tags.map(function (row) { return row.slice(); }),
                });
            }),
            tuples: meta.tuples.map(function (t) {
                var type = dict.tuples.get(t.name);
                if (type === undefined)
                    throw new RangeError("Error on Metadata.from(): failed to find tuple \"".concat(t.name, "\"."));
                return MetadataTuple_1.MetadataTuple.create({
                    type: type,
                    tags: t.tags.map(function (r) { return r.slice(); }),
                });
            }),
            objects: meta.objects.map(function (name) {
                var found = dict.objects.get(name);
                if (found === undefined)
                    throw new RangeError("Error on Metadata.from(): failed to find object \"".concat(name, "\"."));
                return found;
            }),
            aliases: meta.aliases.map(function (alias) {
                var found = dict.aliases.get(alias);
                if (found === undefined)
                    throw new RangeError("Error on Metadata.from(): failed to find alias \"".concat(alias, "\"."));
                return found;
            }),
            natives: meta.natives.slice(),
            sets: meta.sets.map(function (meta) { return _this.from(meta, dict); }),
            maps: meta.maps.map(function (entry) { return ({
                key: _this.from(entry.key, dict),
                value: _this.from(entry.value, dict),
            }); }),
        });
    };
    /* -----------------------------------------------------------
      ACCESSORS
    ----------------------------------------------------------- */
    Metadata.prototype.getName = function () {
        var _a;
        return ((_a = this.name_) !== null && _a !== void 0 ? _a : (this.name_ = getName(this)));
    };
    Metadata.prototype.empty = function () {
        return this.bucket() === 0 || this.size() === 0;
    };
    Metadata.prototype.size = function () {
        return ((this.any ? 1 : 0) +
            (this.escaped ? 1 : 0) +
            (this.rest ? this.rest.size() : 0) +
            this.templates.length +
            this.atomics.length +
            this.constants.map(function (c) { return c.values.length; }).reduce(function (x, y) { return x + y; }, 0) +
            this.arrays.length +
            this.tuples.length +
            this.natives.length +
            this.maps.length +
            this.sets.length +
            this.objects.length +
            this.functions.length +
            this.aliases.length);
    };
    Metadata.prototype.bucket = function () {
        return ((this.any ? 1 : 0) +
            (this.escaped ? 1 : 0) +
            (this.templates.length ? 1 : 0) +
            (this.atomics.length ? 1 : 0) +
            (this.constants.length ? 1 : 0) +
            (this.rest ? this.rest.size() : 0) +
            (this.arrays.length ? 1 : 0) +
            (this.tuples.length ? 1 : 0) +
            (this.natives.length ? 1 : 0) +
            (this.sets.length ? 1 : 0) +
            (this.maps.length ? 1 : 0) +
            (this.objects.length ? 1 : 0) +
            (this.functions.length ? 1 : 0) +
            (this.aliases.length ? 1 : 0));
    };
    Metadata.prototype.isConstant = function () {
        return this.bucket() === (this.constants.length ? 1 : 0);
    };
    Metadata.prototype.isRequired = function () {
        return this.required === true && this.optional === false;
    };
    /**
     * @internal
     */
    Metadata.prototype.isUnionBucket = function () {
        var size = this.bucket();
        var emended = !!this.atomics.length && !!this.constants.length ? size - 1 : size;
        return emended > 1;
    };
    /**
     * @internal
     */
    Metadata.prototype.getSoleLiteral = function () {
        if (this.size() === 1 &&
            this.constants.length === 1 &&
            this.constants[0].type === "string" &&
            this.constants[0].values.length === 1)
            return this.constants[0].values[0].value;
        else
            return null;
    };
    Metadata.prototype.isSoleLiteral = function () {
        return this.getSoleLiteral() !== null;
    };
    /**
     * @internal
     */
    Metadata.prototype.isParentResolved = function () {
        return this.parent_resolved_;
    };
    return Metadata;
}());
exports.Metadata = Metadata;
(function (Metadata) {
    Metadata.intersects = function (x, y) {
        var e_1, _a, e_2, _b;
        // CHECK ANY & OPTIONAL
        if (x.any || y.any)
            return true;
        if (x.isRequired() === false && false === y.isRequired())
            return true;
        if (x.nullable === true && true === y.nullable)
            return true;
        if (!!x.functions.length && !!y.functions.length === true)
            return true;
        //----
        // INSTANCES
        //----
        // ARRAYS
        if (x.arrays.length && y.arrays.length)
            return true;
        if (x.tuples.length && y.tuples.length)
            return true;
        if (x.objects.length && y.objects.length)
            return true;
        if (x.aliases.length && y.aliases.length)
            return true;
        // NATIVES
        if (x.natives.length && y.natives.length)
            if (x.natives.some(function (xn) { return y.natives.some(function (yn) { return xn === yn; }); }))
                return true;
        // ESCAPED
        if (x.escaped && y.escaped)
            return (Metadata.intersects(x.escaped.original, y.escaped.original) ||
                Metadata.intersects(x.escaped.returns, y.escaped.returns));
        var _loop_1 = function (atomic) {
            if (y.atomics.some(function (ya) { return atomic.type === ya.type; }))
                return { value: true };
            if (y.constants.some(function (yc) { return atomic.type === yc.type; }))
                return { value: true };
        };
        try {
            //----
            // VALUES
            //----
            // ATOMICS
            for (var _c = __values(x.atomics), _d = _c.next(); !_d.done; _d = _c.next()) {
                var atomic = _d.value;
                var state_1 = _loop_1(atomic);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_2 = function (constant) {
            var atomic = y.atomics.find(function (elem) { return elem.type === constant.type; });
            if (atomic !== undefined)
                return { value: true };
            var opposite = y.constants.find(function (elem) { return elem.type === constant.type; });
            if (opposite === undefined)
                return "continue";
            var values = new Set(__spreadArray(__spreadArray([], __read(constant.values.map(function (e) { return e.value; })), false), __read(opposite.values.map(function (e) { return e.value; })), false));
            if (values.size !== constant.values.length + opposite.values.length)
                return { value: true };
        };
        try {
            // CONSTANTS
            for (var _e = __values(x.constants), _f = _e.next(); !_f.done; _f = _e.next()) {
                var constant = _f.value;
                var state_2 = _loop_2(constant);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // TEMPLATES
        if (!!x.templates.length && y.atomics.some(function (ya) { return ya.type === "string"; }))
            return true;
        else if (!!y.templates.length &&
            x.atomics.some(function (xa) { return xa.type === "string"; }))
            return true;
        return false;
    };
    Metadata.covers = function (x, y, level, escaped) {
        var e_3, _a, e_4, _b, e_5, _c, e_6, _d, e_7, _e, e_8, _f, e_9, _g;
        if (level === void 0) { level = 0; }
        if (escaped === void 0) { escaped = false; }
        // CHECK ANY
        if (x === y)
            return false;
        else if (x.any)
            return true;
        else if (y.any)
            return false;
        if (escaped === false) {
            if (x.escaped === null && y.escaped !== null)
                return false;
            else if (x.escaped !== null &&
                y.escaped !== null &&
                (!Metadata.covers(x.escaped.original, y.escaped.original, level, true) ||
                    !Metadata.covers(x.escaped.returns, y.escaped.returns, level, true)))
                return false;
        }
        //----
        // INSTANCES
        //----
        if (level === 0) {
            var _loop_3 = function (ya) {
                if (!x.arrays.some(function (xa) {
                    return Metadata.covers(xa.type.value, ya.type.value, level + 1);
                })) {
                    return { value: false };
                }
            };
            try {
                // ARRAYS
                for (var _h = __values(y.arrays), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var ya = _j.value;
                    var state_3 = _loop_3(ya);
                    if (typeof state_3 === "object")
                        return state_3.value;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
            var _loop_4 = function (yt) {
                if (yt.type.elements.length !== 0 &&
                    x.tuples.some(function (xt) {
                        return xt.type.elements.length >= yt.type.elements.length &&
                            xt.type.elements
                                .slice(yt.type.elements.length)
                                .every(function (xv, i) { return Metadata.covers(xv, yt.type.elements[i], level + 1); });
                    }) === false)
                    return { value: false };
            };
            try {
                // TUPLES
                for (var _k = __values(y.tuples), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var yt = _l.value;
                    var state_4 = _loop_4(yt);
                    if (typeof state_4 === "object")
                        return state_4.value;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_b = _k.return)) _b.call(_k);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        var _loop_5 = function (yo) {
            if (x.objects.some(function (xo) { return MetadataObject_1.MetadataObject.covers(xo, yo); }) === false)
                return { value: false };
        };
        try {
            // OBJECTS
            for (var _m = __values(y.objects), _o = _m.next(); !_o.done; _o = _m.next()) {
                var yo = _o.value;
                var state_5 = _loop_5(yo);
                if (typeof state_5 === "object")
                    return state_5.value;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var _loop_6 = function (yd) {
            if (x.aliases.some(function (xd) { return xd.name === yd.name; }) === false)
                return { value: false };
        };
        try {
            // ALIASES
            for (var _p = __values(y.aliases), _q = _p.next(); !_q.done; _q = _p.next()) {
                var yd = _q.value;
                var state_6 = _loop_6(yd);
                if (typeof state_6 === "object")
                    return state_6.value;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_q && !_q.done && (_d = _p.return)) _d.call(_p);
            }
            finally { if (e_6) throw e_6.error; }
        }
        var _loop_7 = function (yn) {
            if (x.natives.some(function (xn) { return xn === yn; }) === false)
                return { value: false };
        };
        try {
            // NATIVES
            for (var _r = __values(y.natives), _s = _r.next(); !_s.done; _s = _r.next()) {
                var yn = _s.value;
                var state_7 = _loop_7(yn);
                if (typeof state_7 === "object")
                    return state_7.value;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var _loop_8 = function (ys) {
            if (x.sets.some(function (xs) { return Metadata.covers(xs, ys); }) === false)
                return { value: false };
        };
        try {
            // SETS
            for (var _t = __values(y.sets), _u = _t.next(); !_u.done; _u = _t.next()) {
                var ys = _u.value;
                var state_8 = _loop_8(ys);
                if (typeof state_8 === "object")
                    return state_8.value;
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_u && !_u.done && (_f = _t.return)) _f.call(_t);
            }
            finally { if (e_8) throw e_8.error; }
        }
        //----
        // VALUES
        //----
        // ATOMICS
        if (y.atomics.some(function (ya) { return x.atomics.some(function (xa) { return xa.type === ya.type; }) === false; }))
            return false;
        var _loop_9 = function (yc) {
            if (x.atomics.some(function (atom) { return yc.type === atom.type; }))
                return "continue";
            var xc = x.constants.find(function (elem) { return elem.type === yc.type; });
            if (xc === undefined)
                return { value: false };
            else if (yc.values.map(function (e) { return e.value; }).some(function (yv) { return xc.values.includes(yv) === false; }))
                return { value: false };
        };
        try {
            // CONSTANTS
            for (var _v = __values(y.constants), _w = _v.next(); !_w.done; _w = _v.next()) {
                var yc = _w.value;
                var state_9 = _loop_9(yc);
                if (typeof state_9 === "object")
                    return state_9.value;
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_w && !_w.done && (_g = _v.return)) _g.call(_v);
            }
            finally { if (e_9) throw e_9.error; }
        }
        // FUNCTIONAL
        if (!!x.functions.length === false && !!y.functions.length)
            return false;
        // SUCCESS
        return true;
    };
    /**
     * @internal
     */
    Metadata.merge = function (x, y) {
        var e_10, _a, e_11, _b, e_12, _c;
        var _d, _e;
        var output = Metadata.create({
            any: x.any || y.any,
            nullable: x.nullable || y.nullable,
            required: x.required && y.required,
            optional: x.optional || y.optional,
            functions: x.functions.length ? x.functions : y.functions, // @todo
            escaped: x.escaped !== null && y.escaped !== null
                ? MetadataEscaped_1.MetadataEscaped.create({
                    original: Metadata.merge(x.escaped.original, y.escaped.original),
                    returns: Metadata.merge(x.escaped.returns, y.escaped.returns),
                })
                : ((_d = x.escaped) !== null && _d !== void 0 ? _d : y.escaped),
            atomics: mergeTaggedTypes({
                container: x.atomics,
                equals: function (x, y) { return x.type === y.type; },
                getter: function (x) { return x.tags; },
            })(y.atomics),
            constants: __spreadArray([], __read(x.constants), false),
            templates: x.templates.slice(),
            rest: x.rest !== null && y.rest !== null
                ? Metadata.merge(x.rest, y.rest)
                : ((_e = x.rest) !== null && _e !== void 0 ? _e : y.rest),
            // arrays: x.arrays.slice(),
            arrays: mergeTaggedTypes({
                container: x.arrays,
                equals: function (x, y) { return x.type.name === y.type.name; },
                getter: function (x) { return x.tags; },
            })(y.arrays),
            tuples: mergeTaggedTypes({
                container: x.tuples,
                equals: function (x, y) { return x.type.name === y.type.name; },
                getter: function (x) { return x.tags; },
            })(y.tuples),
            objects: x.objects.slice(),
            aliases: x.aliases.slice(),
            natives: __spreadArray([], __read(new Set(__spreadArray(__spreadArray([], __read(x.natives), false), __read(y.natives), false))), false),
            sets: x.sets.slice(),
            maps: x.maps.slice(),
        });
        var _loop_10 = function (constant) {
            var e_13, _m;
            var target = ArrayUtil_1.ArrayUtil.take(output.constants, function (elem) { return elem.type === constant.type; }, function () {
                return MetadataConstant_1.MetadataConstant.create({
                    type: constant.type,
                    values: [],
                });
            });
            try {
                for (var _o = (e_13 = void 0, __values(constant.values)), _p = _o.next(); !_p.done; _p = _o.next()) {
                    var value = _p.value;
                    ArrayUtil_1.ArrayUtil.add(target.values, value, function (a, b) { return a.value === b.value; });
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_p && !_p.done && (_m = _o.return)) _m.call(_o);
                }
                finally { if (e_13) throw e_13.error; }
            }
        };
        try {
            for (var _f = __values(y.constants), _g = _f.next(); !_g.done; _g = _f.next()) {
                var constant = _g.value;
                _loop_10(constant);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_10) throw e_10.error; }
        }
        try {
            for (var _h = __values(y.objects), _j = _h.next(); !_j.done; _j = _h.next()) {
                var obj = _j.value;
                ArrayUtil_1.ArrayUtil.set(output.objects, obj, function (elem) { return elem.name; });
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
            }
            finally { if (e_11) throw e_11.error; }
        }
        try {
            for (var _k = __values(y.aliases), _l = _k.next(); !_l.done; _l = _k.next()) {
                var alias = _l.value;
                ArrayUtil_1.ArrayUtil.set(output.aliases, alias, function (elem) { return elem.name; });
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return output;
    };
})(Metadata || (exports.Metadata = Metadata = {}));
var getName = function (metadata) {
    var e_14, _a, e_15, _b, e_16, _c, e_17, _d, e_18, _e, e_19, _f, e_20, _g, e_21, _h, e_22, _j, e_23, _k, e_24, _l;
    if (metadata.any === true)
        return "any";
    var elements = [];
    // OPTIONAL
    if (metadata.nullable === true)
        elements.push("null");
    if (metadata.isRequired() === false)
        elements.push("undefined");
    try {
        // ATOMIC
        for (var _m = __values(metadata.atomics), _o = _m.next(); !_o.done; _o = _m.next()) {
            var atom = _o.value;
            elements.push(atom.getName());
        }
    }
    catch (e_14_1) { e_14 = { error: e_14_1 }; }
    finally {
        try {
            if (_o && !_o.done && (_a = _m.return)) _a.call(_m);
        }
        finally { if (e_14) throw e_14.error; }
    }
    try {
        for (var _p = __values(metadata.constants), _q = _p.next(); !_q.done; _q = _p.next()) {
            var constant = _q.value;
            try {
                for (var _r = (e_16 = void 0, __values(constant.values)), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var value = _s.value;
                    elements.push(value.getName());
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_c = _r.return)) _c.call(_r);
                }
                finally { if (e_16) throw e_16.error; }
            }
        }
    }
    catch (e_15_1) { e_15 = { error: e_15_1 }; }
    finally {
        try {
            if (_q && !_q.done && (_b = _p.return)) _b.call(_p);
        }
        finally { if (e_15) throw e_15.error; }
    }
    try {
        for (var _t = __values(metadata.templates), _u = _t.next(); !_u.done; _u = _t.next()) {
            var template = _u.value;
            elements.push(template.getName());
        }
    }
    catch (e_17_1) { e_17 = { error: e_17_1 }; }
    finally {
        try {
            if (_u && !_u.done && (_d = _t.return)) _d.call(_t);
        }
        finally { if (e_17) throw e_17.error; }
    }
    try {
        // NATIVES
        for (var _v = __values(metadata.natives), _w = _v.next(); !_w.done; _w = _v.next()) {
            var native = _w.value;
            elements.push(native);
        }
    }
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (_w && !_w.done && (_e = _v.return)) _e.call(_v);
        }
        finally { if (e_18) throw e_18.error; }
    }
    try {
        for (var _x = __values(metadata.sets), _y = _x.next(); !_y.done; _y = _x.next()) {
            var set = _y.value;
            elements.push("Set<".concat(set.getName(), ">"));
        }
    }
    catch (e_19_1) { e_19 = { error: e_19_1 }; }
    finally {
        try {
            if (_y && !_y.done && (_f = _x.return)) _f.call(_x);
        }
        finally { if (e_19) throw e_19.error; }
    }
    try {
        for (var _z = __values(metadata.maps), _0 = _z.next(); !_0.done; _0 = _z.next()) {
            var map = _0.value;
            elements.push("Map<".concat(map.key.getName(), ", ").concat(map.value.getName(), ">"));
        }
    }
    catch (e_20_1) { e_20 = { error: e_20_1 }; }
    finally {
        try {
            if (_0 && !_0.done && (_g = _z.return)) _g.call(_z);
        }
        finally { if (e_20) throw e_20.error; }
    }
    // INSTANCES
    if (metadata.rest !== null)
        elements.push("...".concat(metadata.rest.getName()));
    try {
        for (var _1 = __values(metadata.tuples), _2 = _1.next(); !_2.done; _2 = _1.next()) {
            var tuple = _2.value;
            elements.push(tuple.type.name);
        }
    }
    catch (e_21_1) { e_21 = { error: e_21_1 }; }
    finally {
        try {
            if (_2 && !_2.done && (_h = _1.return)) _h.call(_1);
        }
        finally { if (e_21) throw e_21.error; }
    }
    try {
        for (var _3 = __values(metadata.arrays), _4 = _3.next(); !_4.done; _4 = _3.next()) {
            var array = _4.value;
            elements.push(array.getName());
        }
    }
    catch (e_22_1) { e_22 = { error: e_22_1 }; }
    finally {
        try {
            if (_4 && !_4.done && (_j = _3.return)) _j.call(_3);
        }
        finally { if (e_22) throw e_22.error; }
    }
    try {
        for (var _5 = __values(metadata.objects), _6 = _5.next(); !_6.done; _6 = _5.next()) {
            var object = _6.value;
            elements.push(object.name);
        }
    }
    catch (e_23_1) { e_23 = { error: e_23_1 }; }
    finally {
        try {
            if (_6 && !_6.done && (_k = _5.return)) _k.call(_5);
        }
        finally { if (e_23) throw e_23.error; }
    }
    try {
        for (var _7 = __values(metadata.aliases), _8 = _7.next(); !_8.done; _8 = _7.next()) {
            var alias = _8.value;
            elements.push(alias.name);
        }
    }
    catch (e_24_1) { e_24 = { error: e_24_1 }; }
    finally {
        try {
            if (_8 && !_8.done && (_l = _7.return)) _l.call(_7);
        }
        finally { if (e_24) throw e_24.error; }
    }
    if (metadata.escaped !== null)
        elements.push(metadata.escaped.getName());
    // RETURNS
    if (elements.length === 0)
        return "unknown";
    else if (elements.length === 1)
        return elements[0];
    elements.sort();
    return "(".concat(elements.join(" | "), ")");
};
var mergeTaggedTypes = function (props) {
    return function (opposite) {
        var e_25, _a;
        var output = __spreadArray([], __read(props.container), false);
        var _loop_11 = function (elem) {
            var e_26, _b;
            var equal = props.container.find(function (x) { return props.equals(x, elem); });
            if (equal === undefined) {
                output.push(elem);
                return "continue";
            }
            var matrix = props
                .getter(equal)
                .map(function (tags) { return tags.map(function (t) { return t.name; }); })
                .sort();
            var _loop_12 = function (tags) {
                var names = tags.map(function (t) { return t.name; }).sort();
                if (matrix.some(function (m) {
                    return m.length === names.length && m.every(function (s, i) { return s === names[i]; });
                }))
                    return "continue";
                props.getter(equal).push(tags);
            };
            try {
                for (var _c = (e_26 = void 0, __values(props.getter(elem))), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var tags = _d.value;
                    _loop_12(tags);
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_26) throw e_26.error; }
            }
        };
        try {
            for (var opposite_1 = __values(opposite), opposite_1_1 = opposite_1.next(); !opposite_1_1.done; opposite_1_1 = opposite_1.next()) {
                var elem = opposite_1_1.value;
                _loop_11(elem);
            }
        }
        catch (e_25_1) { e_25 = { error: e_25_1 }; }
        finally {
            try {
                if (opposite_1_1 && !opposite_1_1.done && (_a = opposite_1.return)) _a.call(opposite_1);
            }
            finally { if (e_25) throw e_25.error; }
        }
        return output;
    };
};
//# sourceMappingURL=Metadata.js.map