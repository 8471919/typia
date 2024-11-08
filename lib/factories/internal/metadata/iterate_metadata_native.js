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
exports.iterate_metadata_native = void 0;
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var TypeFactory_1 = require("../../TypeFactory");
var iterate_metadata_native = function (checker) {
    return function (meta, type) {
        var e_1, _a;
        var _b;
        var validator = validate(checker)(type);
        var name = TypeFactory_1.TypeFactory.getFullName(checker)(type, type.getSymbol());
        var simple = SIMPLES.get(name);
        if (simple && validator(simple)) {
            ArrayUtil_1.ArrayUtil.set(meta.natives, name, function (str) { return str; });
            return true;
        }
        try {
            for (var GENERICS_1 = __values(GENERICS), GENERICS_1_1 = GENERICS_1.next(); !GENERICS_1_1.done; GENERICS_1_1 = GENERICS_1.next()) {
                var generic = GENERICS_1_1.value;
                if (name.substring(0, generic.name.length) === generic.name &&
                    validator(generic)) {
                    ArrayUtil_1.ArrayUtil.set(meta.natives, (_b = generic.name) !== null && _b !== void 0 ? _b : name, function (str) { return str; });
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (GENERICS_1_1 && !GENERICS_1_1.done && (_a = GENERICS_1.return)) _a.call(GENERICS_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
};
exports.iterate_metadata_native = iterate_metadata_native;
var validate = function (checker) { return function (type) { return function (info) {
    var _a, _b;
    return ((_a = info.methods) !== null && _a !== void 0 ? _a : []).every(function (method) {
        var returnType = TypeFactory_1.TypeFactory.getReturnType(checker)(type)(method.name);
        return (returnType !== null &&
            checker.typeToString(returnType) === method.return);
    }) &&
        ((_b = info.properties) !== null && _b !== void 0 ? _b : []).every(function (property) {
            var prop = checker.getPropertyOfType(type, property.name);
            var propType = (prop === null || prop === void 0 ? void 0 : prop.valueDeclaration)
                ? checker.getTypeAtLocation(prop === null || prop === void 0 ? void 0 : prop.valueDeclaration)
                : undefined;
            return (propType !== undefined &&
                checker.typeToString(propType) === property.type);
        });
}; }; };
var getBinaryProps = function (className) { return ({
    name: className,
    methods: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(["indexOf", "lastIndexOf"].map(function (name) { return ({
        name: name,
        return: "number",
    }); })), false), __read(["some", "every"].map(function (name) { return ({
        name: name,
        return: "boolean",
    }); })), false), __read(["join", "toLocaleString"].map(function (name) { return ({
        name: name,
        return: "string",
    }); })), false), __read(["reverse", "slice", "subarray"].map(function (name) { return ({
        name: name,
        return: className,
    }); })), false),
    properties: ["BYTES_PER_ELEMENT", "length", "byteLength", "byteOffset"].map(function (name) { return ({
        name: name,
        type: "number",
    }); }),
}); };
var SIMPLES = new Map(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
    [
        "Date",
        {
            methods: ["getTime", "getFullYear", "getMonth", "getMinutes"].map(function (name) { return ({
                name: name,
                return: "number",
            }); }),
        },
    ],
    [
        "Boolean",
        {
            methods: [
                {
                    name: "valueOf",
                    return: "boolean",
                },
            ],
        },
    ],
    [
        "Number",
        {
            methods: __spreadArray(__spreadArray([], __read(["toFixed", "toExponential", "toPrecision"].map(function (name) { return ({
                name: name,
                return: "string",
            }); })), false), [
                { name: "valueOf", return: "number" },
            ], false),
        },
    ],
    [
        "String",
        {
            methods: [
                "charAt",
                "concat",
                "valueOf",
                "trim",
                "replace",
                "substring",
            ].map(function (name) { return ({ name: name, return: "string" }); }),
        },
    ]
], __read([
    "Uint8Array",
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
].map(function (name) { return [name, getBinaryProps(name)]; })), false), __read(["ArrayBuffer", "SharedArrayBuffer"].map(function (className) {
    var info = {
        methods: [{ name: "slice", return: className }],
        properties: [{ name: "byteLength", type: "number" }],
    };
    return [className, info];
})), false), __read(["Blob", "File"].map(function (className) {
    return [
        className,
        {
            methods: [
                { name: "arrayBuffer", return: "Promise<ArrayBuffer>" },
                { name: "slice", return: "Blob" },
                { name: "text", return: "Promise<string>" },
            ],
            properties: [
                { name: "size", type: "number" },
                { name: "type", type: "string" },
            ],
        },
    ];
})), false), [
    [
        "DataView",
        {
            methods: [
                "getFloat32",
                "getFloat64",
                "getInt8",
                "getInt16",
                "getInt32",
                "getUint8",
                "getUint16",
                "getUint32",
            ].map(function (name) { return ({
                name: name,
                return: "number",
            }); }),
        },
    ],
    [
        "RegExp",
        {
            methods: [
                {
                    name: "test",
                    return: "boolean",
                },
            ],
        },
    ],
], false));
var GENERICS = [
    "WeakMap",
    "WeakSet",
].map(function (name) { return ({
    name: name,
    methods: ["has", "delete"].map(function (name) { return ({
        name: name,
        return: "boolean",
    }); }),
}); });
//# sourceMappingURL=iterate_metadata_native.js.map