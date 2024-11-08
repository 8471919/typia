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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufMessageProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var MetadataCollection_1 = require("../../factories/MetadataCollection");
var ProtobufFactory_1 = require("../../factories/ProtobufFactory");
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataAtomic_1 = require("../../schemas/metadata/MetadataAtomic");
var MetadataProperty_1 = require("../../schemas/metadata/MetadataProperty");
var MapUtil_1 = require("../../utils/MapUtil");
var NameEncoder_1 = require("../../utils/NameEncoder");
var ProtobufUtil_1 = require("../helpers/ProtobufUtil");
var ProtobufMessageProgrammer;
(function (ProtobufMessageProgrammer) {
    ProtobufMessageProgrammer.write = function (project) { return function (type) {
        var e_1, _a;
        // PARSE TARGET TYPE
        var collection = new MetadataCollection_1.MetadataCollection();
        ProtobufFactory_1.ProtobufFactory.metadata("message")(project.checker, project.context)(collection)(type);
        // STRINGIFY
        var hierarchies = new Map();
        try {
            for (var _b = __values(collection.objects()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var obj = _c.value;
                if (is_dynamic_object(obj) === false)
                    emplace(hierarchies)(obj);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var content = "syntax = \"proto3\";\n\n" +
            __spreadArray([], __read(hierarchies.values()), false).map(function (hier) { return write_hierarchy(hier); })
                .join("\n\n");
        // RETURNS
        return typescript_1.default.factory.createStringLiteral(content);
    }; };
    var emplace = function (dict) { return function (obj) {
        var accessors = obj.name.split(".");
        accessors.forEach(function (access, i) {
            var hierarchy = MapUtil_1.MapUtil.take(dict)(access, function () { return ({
                key: access,
                object: null,
                children: new Map(),
            }); });
            dict = hierarchy.children;
            if (i === accessors.length - 1)
                hierarchy.object = obj;
        });
    }; };
    var is_dynamic_object = function (obj) {
        return obj.properties.length === 1 &&
            obj.properties[0].key.isSoleLiteral() === false;
    };
    var write_hierarchy = function (hierarchy) {
        var elements = [
            "message ".concat(NameEncoder_1.NameEncoder.encode(hierarchy.key), " {"),
        ];
        if (hierarchy.object !== null) {
            var text = write_object(hierarchy.object);
            elements.push.apply(elements, __spreadArray([], __read(text.split("\n").map(function (str) { return "".concat(TAB).concat(str); })), false));
        }
        if (hierarchy.children.size)
            elements.push(__spreadArray([], __read(hierarchy.children.values()), false).map(function (child) { return write_hierarchy(child); })
                .map(function (body) {
                return body
                    .split("\n")
                    .map(function (line) { return "".concat(TAB).concat(line); })
                    .join("\n");
            })
                .join("\n\n"));
        elements.push("}");
        return elements.join("\n");
    };
    var write_object = function (obj) {
        var ptr = { value: 0 };
        return obj.properties
            .map(function (prop) {
            var key = prop.key.getSoleLiteral();
            var type = decode(ptr)(prop.value);
            return type.indexOf("${name}") !== -1
                ? type.replace("${name}", key)
                : "".concat(prop.value.arrays.length || type.startsWith("map<")
                    ? ""
                    : !prop.value.isRequired() || prop.value.nullable
                        ? "optional "
                        : "required ").concat(type, " ").concat(key, " = ").concat(++ptr.value, ";");
        })
            .join("\n");
    };
    /* -----------------------------------------------------------
          DECODERS
      ----------------------------------------------------------- */
    var decode = function (ptr) {
        return function (meta) {
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
            var elements = new Set();
            if (meta.natives.length)
                elements.add("bytes");
            try {
                for (var _e = __values(ProtobufUtil_1.ProtobufUtil.getAtomics(meta)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var atomic = _f.value;
                    elements.add(atomic);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var _g = __values(meta.arrays), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var array = _h.value;
                    elements.add("repeated ".concat(decode(ptr)(array.type.value)));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var _j = __values(meta.objects), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var obj = _k.value;
                    elements.add(is_dynamic_object(obj)
                        ? decode_map(ptr)(MetadataProperty_1.MetadataProperty.create(__assign(__assign({}, obj.properties[0]), { key: (function () {
                                var key = Metadata_1.Metadata.initialize();
                                key.atomics.push(MetadataAtomic_1.MetadataAtomic.create({
                                    type: "string",
                                    tags: [],
                                }));
                                return key;
                            })() })))
                        : NameEncoder_1.NameEncoder.encode(obj.name));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_4) throw e_4.error; }
            }
            try {
                for (var _l = __values(meta.maps), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var map = _m.value;
                    elements.add(decode_map(ptr)(map));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return elements.size === 1
                ? __spreadArray([], __read(elements), false)[0]
                : __spreadArray(__spreadArray([
                    "oneof ${name} {"
                ], __read(__spreadArray([], __read(elements), false).map(function (str) { return "".concat(TAB).concat(str, " v").concat(ptr.value + 1, " = ").concat(++ptr.value, ";"); })), false), [
                    "}",
                ], false).join("\n");
        };
    };
    var decode_map = function (ptr) {
        return function (prop) {
            return "map<".concat(decode(ptr)(prop.key), ", ").concat(decode(ptr)(prop.value), ">");
        };
    };
})(ProtobufMessageProgrammer || (exports.ProtobufMessageProgrammer = ProtobufMessageProgrammer = {}));
var TAB = " ".repeat(2);
//# sourceMappingURL=ProtobufMessageProgrammer.js.map