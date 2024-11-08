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
exports.ProtobufFactory = void 0;
var ProtobufUtil_1 = require("../programmers/helpers/ProtobufUtil");
var TransformerError_1 = require("../transformers/TransformerError");
var MetadataFactory_1 = require("./MetadataFactory");
var ProtobufFactory;
(function (ProtobufFactory) {
    ProtobufFactory.metadata = function (method) {
        return function (checker, context) {
            return function (collection) {
                return function (type) {
                    // COMPOSE METADATA WITH INDIVIDUAL VALIDATIONS
                    var result = MetadataFactory_1.MetadataFactory.analyze(checker, context)({
                        escape: false,
                        constant: true,
                        absorb: true,
                        validate: validate,
                    })(collection)(type);
                    if (result.success === false)
                        throw TransformerError_1.TransformerError.from("typia.protobuf.".concat(method))(result.errors);
                    return result.data;
                };
            };
        };
    };
    var validate = function (meta, explore) {
        var e_1, _a, e_2, _b;
        var errors = [];
        var insert = function (msg) { return errors.push(msg); };
        if (explore.top === true) {
            var onlyObject = meta.size() === 1 &&
                meta.objects.length === 1 &&
                meta.objects[0].properties.every(function (p) { return p.key.isSoleLiteral(); }) &&
                meta.isRequired() === true &&
                meta.nullable === false;
            if (onlyObject === false)
                insert("target type must be a sole and static object type");
        }
        //----
        // NOT SUPPORTED TYPES
        //----
        var noSupport = function (msg) { return insert("does not support ".concat(msg)); };
        // PROHIBIT ANY TYPE
        if (meta.any)
            noSupport("any type");
        // PROHIBIT FUNCTIONAL TYPE
        if (meta.functions.length)
            noSupport("functional type");
        // PROHIBIT TUPLE TYPE
        if (meta.tuples.length)
            noSupport("tuple type");
        // PROHIBIT SET TYPE
        if (meta.sets.length)
            noSupport("Set type");
        // NATIVE TYPE, BUT NOT Uint8Array
        if (meta.natives.length)
            try {
                for (var _c = __values(meta.natives), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var native = _d.value;
                    if (native === "Uint8Array")
                        continue;
                    var instead = BANNED_NATIVE_TYPES.get(native);
                    if (instead === undefined)
                        noSupport("".concat(native, " type"));
                    else
                        noSupport("".concat(native, " type. Use ").concat(instead, " type instead."));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        //----
        // ATOMIC CASES
        //----
        if (meta.atomics.length) {
            var numbers = ProtobufUtil_1.ProtobufUtil.getNumbers(meta);
            var bigints = ProtobufUtil_1.ProtobufUtil.getBigints(meta);
            var _loop_1 = function (type) {
                if (numbers.some(function (n) { return n === type; }) && bigints.some(function (b) { return b === type; }))
                    insert("tags.Type<\"".concat(type, "\"> cannot be used in both number and bigint types. Recommend to remove from number type"));
            };
            try {
                for (var _e = __values(["int64", "uint64"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var type = _f.value;
                    _loop_1(type);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        //----
        // ARRRAY CASES
        //----
        // DO NOT ALLOW MULTI-DIMENTIONAL ARRAY
        if (meta.arrays.length &&
            meta.arrays.some(function (array) { return !!array.type.value.arrays.length; }))
            noSupport("over two dimenstional array type");
        // CHILD OF ARRAY TYPE MUST BE REQUIRED
        if (meta.arrays.length &&
            meta.arrays.some(function (array) {
                return array.type.value.isRequired() === false ||
                    array.type.value.nullable === true;
            }))
            noSupport("optional type in array");
        // UNION IN ARRAY
        if (meta.arrays.length &&
            meta.arrays.some(function (a) {
                var _a;
                return a.type.value.size() > 1 &&
                    a.type.value.constants.length !== 1 &&
                    ((_a = a.type.value.constants[0]) === null || _a === void 0 ? void 0 : _a.values.length) !== a.type.value.size();
            }))
            noSupport("union type in array");
        // DO DYNAMIC OBJECT IN ARRAY
        if (meta.arrays.length &&
            meta.arrays.some(function (a) {
                return a.type.value.maps.length ||
                    (a.type.value.objects.length &&
                        a.type.value.objects.some(function (o) { return ProtobufUtil_1.ProtobufUtil.isStaticObject(o) === false; }));
            }))
            noSupport("dynamic object in array");
        // UNION WITH ARRAY
        if (meta.size() > 1 && meta.arrays.length)
            noSupport("union type with array type");
        //----
        // OBJECT CASES
        //----
        // EMPTY PROPERTY
        if (meta.objects.length &&
            meta.objects.some(function (obj) { return obj.properties.length === 0; }))
            noSupport("empty object type");
        // MULTIPLE DYNAMIC KEY TYPED PROPERTIES
        if (meta.objects.length &&
            meta.objects.some(function (obj) {
                return obj.properties.filter(function (p) { return !p.key.isSoleLiteral(); }).length > 1;
            }))
            noSupport("object type with multiple dynamic key typed properties. Keep only one.");
        // STATIC AND DYNAMIC PROPERTIES ARE COMPATIBLE
        if (meta.objects.length &&
            meta.objects.some(function (obj) {
                return obj.properties.some(function (p) { return p.key.isSoleLiteral(); }) &&
                    obj.properties.some(function (p) { return !p.key.isSoleLiteral(); });
            }))
            noSupport("object type with mixed static and dynamic key typed properties. Keep statics or dynamic only.");
        // DYNAMIC OBJECT, BUT PROPERTY VALUE TYPE IS ARRAY
        if (meta.objects.length &&
            isDynamicObject(meta.objects[0]) &&
            meta.objects[0].properties.some(function (p) { return !!p.value.arrays.length; }))
            noSupport("dynamic object with array value type");
        // UNION WITH DYNAMIC OBJECT
        if (meta.size() > 1 &&
            meta.objects.length &&
            isDynamicObject(meta.objects[0]))
            noSupport("union type with dynamic object type");
        // UNION IN DYNAMIC PROPERTY VALUE
        if (meta.objects.length &&
            meta.objects.some(function (obj) {
                return isDynamicObject(obj) &&
                    obj.properties.some(function (p) { return ProtobufUtil_1.ProtobufUtil.isUnion(p.value); });
            }))
            noSupport("union type in dynamic property");
        //----
        // MAP CASES
        //----
        // KEY TYPE IS UNION
        if (meta.maps.length && meta.maps.some(function (m) { return ProtobufUtil_1.ProtobufUtil.isUnion(m.key); }))
            noSupport("union key typed map");
        // KEY TYPE IS NOT ATOMIC
        if (meta.maps.length &&
            meta.maps.some(function (m) { return ProtobufUtil_1.ProtobufUtil.getAtomics(m.key).length !== 1; }))
            noSupport("non-atomic key typed map");
        // MAP TYPE, BUT PROPERTY KEY TYPE IS OPTIONAL
        if (meta.maps.length &&
            meta.maps.some(function (m) { return m.key.isRequired() === false || m.key.nullable; }))
            noSupport("optional key typed map");
        // MAP TYPE, BUT VALUE TYPE IS ARRAY
        if (meta.maps.length && meta.maps.some(function (m) { return !!m.value.arrays.length; }))
            noSupport("map type with array value type");
        // UNION WITH MAP
        if (meta.size() > 1 && meta.maps.length)
            noSupport("union type with map type");
        // UNION IN MAP
        if (meta.maps.length &&
            meta.maps.some(function (m) { return ProtobufUtil_1.ProtobufUtil.isUnion(m.value); }))
            noSupport("union type in map value type");
        return errors;
    };
})(ProtobufFactory || (exports.ProtobufFactory = ProtobufFactory = {}));
var isDynamicObject = function (obj) {
    return obj.properties[0].key.isSoleLiteral() === false;
};
var BANNED_NATIVE_TYPES = new Map(__spreadArray(__spreadArray([
    ["Date", "string"],
    ["Boolean", "boolean"],
    ["BigInt", "bigint"],
    ["Number", "number"],
    ["String", "string"]
], __read([
    "Buffer",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigUint64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "BigInt64Array",
    "Float32Array",
    "Float64Array",
    "DataView",
    "ArrayBuffer",
    "SharedArrayBuffer",
].map(function (name) { return [name, "Uint8Array"]; })), false), [
    ["WeakSet", "Array"],
    ["WeakMap", "Map"],
], false));
//# sourceMappingURL=ProtobufFactory.js.map