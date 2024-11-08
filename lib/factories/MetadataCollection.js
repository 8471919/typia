"use strict";
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
exports.MetadataCollection = void 0;
var MetadataAlias_1 = require("../schemas/metadata/MetadataAlias");
var MetadataArrayType_1 = require("../schemas/metadata/MetadataArrayType");
var MetadataObject_1 = require("../schemas/metadata/MetadataObject");
var MetadataTupleType_1 = require("../schemas/metadata/MetadataTupleType");
var Writable_1 = require("../typings/Writable");
var MapUtil_1 = require("../utils/MapUtil");
var CommentFactory_1 = require("./CommentFactory");
var TypeFactory_1 = require("./TypeFactory");
var MetadataCollection = /** @class */ (function () {
    function MetadataCollection(options) {
        this.options = options;
        this.objects_ = new Map();
        this.object_unions_ = new Map();
        this.aliases_ = new Map();
        this.arrays_ = new Map();
        this.tuples_ = new Map();
        this.names_ = new Map();
        this.object_index_ = 0;
        this.recursive_array_index_ = 0;
        this.recursive_tuple_index_ = 0;
    }
    MetadataCollection.prototype.clone = function () {
        var output = new MetadataCollection();
        output.objects_ = new Map(this.objects_);
        output.object_unions_ = new Map(this.object_unions_);
        output.aliases_ = new Map(this.aliases_);
        output.arrays_ = new Map(this.arrays_);
        output.tuples_ = new Map(this.tuples_);
        output.names_ = new Map(this.names_);
        output.object_index_ = this.object_index_;
        output.recursive_array_index_ = this.recursive_array_index_;
        output.recursive_tuple_index_ = this.recursive_tuple_index_;
        return output;
    };
    /* -----------------------------------------------------------
          ACCESSORS
      ----------------------------------------------------------- */
    MetadataCollection.prototype.aliases = function () {
        return __spreadArray([], __read(this.aliases_.values()), false);
    };
    MetadataCollection.prototype.objects = function () {
        return __spreadArray([], __read(this.objects_.values()), false);
    };
    MetadataCollection.prototype.unions = function () {
        return __spreadArray([], __read(this.object_unions_.values()), false);
    };
    MetadataCollection.prototype.arrays = function () {
        return __spreadArray([], __read(this.arrays_.values()), false);
    };
    MetadataCollection.prototype.tuples = function () {
        return __spreadArray([], __read(this.tuples_.values()), false);
    };
    MetadataCollection.prototype.getName = function (checker, type) {
        var _this = this;
        var name = (function () {
            var _a;
            var str = TypeFactory_1.TypeFactory.getFullName(checker)(type);
            return ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.replace) ? _this.options.replace(str) : str;
        })();
        var duplicates = MapUtil_1.MapUtil.take(this.names_)(name, function () { return new Map(); });
        var oldbie = duplicates.get(type);
        if (oldbie !== undefined)
            return oldbie;
        var addicted = duplicates.size
            ? "".concat(name, ".o").concat(duplicates.size)
            : name;
        duplicates.set(type, addicted);
        return addicted;
    };
    /**
     * @internal
     */
    MetadataCollection.prototype.getUnionIndex = function (meta) {
        var key = meta.objects.map(function (obj) { return obj.name; }).join(" | ");
        MapUtil_1.MapUtil.take(this.object_unions_)(key, function () { return meta.objects; });
        return __spreadArray([], __read(this.object_unions_.keys()), false).indexOf(key);
    };
    /* -----------------------------------------------------------
          INSTANCES
      ----------------------------------------------------------- */
    MetadataCollection.prototype.emplace = function (checker, type) {
        var _a, _b, _c, _d, _e, _f;
        var oldbie = this.objects_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false];
        var $id = this.getName(checker, type);
        var obj = MetadataObject_1.MetadataObject.create({
            name: $id,
            properties: [],
            description: (_b = (_a = (type.aliasSymbol && CommentFactory_1.CommentFactory.description(type.aliasSymbol))) !== null && _a !== void 0 ? _a : (type.symbol && CommentFactory_1.CommentFactory.description(type.symbol))) !== null && _b !== void 0 ? _b : undefined,
            jsDocTags: (_f = (_d = (_c = type.aliasSymbol) === null || _c === void 0 ? void 0 : _c.getJsDocTags()) !== null && _d !== void 0 ? _d : (_e = type.symbol) === null || _e === void 0 ? void 0 : _e.getJsDocTags()) !== null && _f !== void 0 ? _f : [],
            validated: false,
            index: this.object_index_++,
            recursive: null,
            nullables: [],
        });
        this.objects_.set(type, obj);
        return [obj, true];
    };
    MetadataCollection.prototype.emplaceAlias = function (checker, type, symbol) {
        var _a, _b;
        var oldbie = this.aliases_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false, function () { }];
        var $id = this.getName(checker, type);
        var alias = MetadataAlias_1.MetadataAlias.create({
            name: $id,
            value: null,
            description: (_a = CommentFactory_1.CommentFactory.description(symbol)) !== null && _a !== void 0 ? _a : null,
            recursive: null,
            nullables: [],
            jsDocTags: (_b = symbol.getJsDocTags()) !== null && _b !== void 0 ? _b : [],
        });
        this.aliases_.set(type, alias);
        return [alias, true, function (meta) { return ((0, Writable_1.Writable)(alias).value = meta); }];
    };
    MetadataCollection.prototype.emplaceArray = function (checker, type) {
        var oldbie = this.arrays_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false, function () { }];
        var $id = this.getName(checker, type);
        var array = MetadataArrayType_1.MetadataArrayType.create({
            name: $id,
            value: null,
            index: null,
            recursive: null,
            nullables: [],
        });
        this.arrays_.set(type, array);
        return [array, true, function (meta) { return ((0, Writable_1.Writable)(array).value = meta); }];
    };
    MetadataCollection.prototype.emplaceTuple = function (checker, type) {
        var oldbie = this.tuples_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false, function () { }];
        var $id = this.getName(checker, type);
        var tuple = MetadataTupleType_1.MetadataTupleType.create({
            name: $id,
            elements: null,
            index: null,
            recursive: null,
            nullables: [],
        });
        this.tuples_.set(type, tuple);
        return [tuple, true, function (elements) { return ((0, Writable_1.Writable)(tuple).elements = elements); }];
    };
    /**
     * @internal
     */
    MetadataCollection.prototype.setObjectRecursive = function (obj, recursive) {
        (0, Writable_1.Writable)(obj).recursive = recursive;
    };
    /**
     * @internal
     */
    MetadataCollection.prototype.setAliasRecursive = function (alias, recursive) {
        (0, Writable_1.Writable)(alias).recursive = recursive;
    };
    /**
     * @internal
     */
    MetadataCollection.prototype.setArrayRecursive = function (array, recursive) {
        (0, Writable_1.Writable)(array).recursive = recursive;
        if (recursive)
            (0, Writable_1.Writable)(array).index = this.recursive_array_index_++;
    };
    MetadataCollection.prototype.setTupleRecursive = function (tuple, recursive) {
        (0, Writable_1.Writable)(tuple).recursive = recursive;
        if (recursive)
            (0, Writable_1.Writable)(tuple).index = this.recursive_tuple_index_++;
    };
    MetadataCollection.prototype.toJSON = function () {
        return {
            objects: this.objects().map(function (o) { return o.toJSON(); }),
            aliases: this.aliases().map(function (d) { return d.toJSON(); }),
            arrays: __spreadArray([], __read(this.arrays_.values()), false).map(function (a) { return a.toJSON(); }),
            tuples: __spreadArray([], __read(this.tuples_.values()), false).map(function (t) { return t.toJSON(); }),
        };
    };
    return MetadataCollection;
}());
exports.MetadataCollection = MetadataCollection;
(function (MetadataCollection) {
    MetadataCollection.replace = function (str) {
        var e_1, _a, e_2, _b;
        var replaced = str;
        try {
            for (var REPLACERS_1 = __values(REPLACERS), REPLACERS_1_1 = REPLACERS_1.next(); !REPLACERS_1_1.done; REPLACERS_1_1 = REPLACERS_1.next()) {
                var _c = __read(REPLACERS_1_1.value, 1), before = _c[0];
                replaced = replaced.split(before).join("");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (REPLACERS_1_1 && !REPLACERS_1_1.done && (_a = REPLACERS_1.return)) _a.call(REPLACERS_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (replaced.length !== 0)
            return replaced;
        try {
            for (var REPLACERS_2 = __values(REPLACERS), REPLACERS_2_1 = REPLACERS_2.next(); !REPLACERS_2_1.done; REPLACERS_2_1 = REPLACERS_2.next()) {
                var _d = __read(REPLACERS_2_1.value, 2), before = _d[0], after = _d[1];
                str = str.split(before).join(after);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (REPLACERS_2_1 && !REPLACERS_2_1.done && (_b = REPLACERS_2.return)) _b.call(REPLACERS_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return str;
    };
    MetadataCollection.escape = function (str) {
        var e_3, _a;
        try {
            for (var REPLACERS_3 = __values(REPLACERS), REPLACERS_3_1 = REPLACERS_3.next(); !REPLACERS_3_1.done; REPLACERS_3_1 = REPLACERS_3.next()) {
                var _b = __read(REPLACERS_3_1.value, 2), before = _b[0], after = _b[1];
                if (after !== "")
                    str = str.split(after).join(before);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (REPLACERS_3_1 && !REPLACERS_3_1.done && (_a = REPLACERS_3.return)) _a.call(REPLACERS_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return str;
    };
})(MetadataCollection || (exports.MetadataCollection = MetadataCollection = {}));
var REPLACERS = [
    ["$", "_dollar_"],
    ["&", "_and_"],
    ["|", "_or_"],
    ["{", "_blt_"],
    ["}", "_bgt_"],
    ["<", "_lt_"],
    [">", "_gt_"],
    ["[", "_alt_"],
    ["]", "_agt_"],
    [",", "_comma_"],
    ["`", "_backquote_"],
    ["'", "_singlequote_"],
    ['"', "_doublequote_"],
    [" ", "_space_"],
    ["?", "_question_"],
    [":", "_colon_"],
    [";", "_semicolon_"],
];
//# sourceMappingURL=MetadataCollection.js.map