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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emplace_metadata_object = void 0;
var typescript_1 = __importDefault(require("typescript"));
var MetadataProperty_1 = require("../../../schemas/metadata/MetadataProperty");
var Writable_1 = require("../../../typings/Writable");
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var CommentFactory_1 = require("../../CommentFactory");
var MetadataHelper_1 = require("./MetadataHelper");
var explore_metadata_1 = require("./explore_metadata");
var iterate_metadata_coalesce_1 = require("./iterate_metadata_coalesce");
var emplace_metadata_object = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (parent, nullable) {
                    var e_1, _a, e_2, _b;
                    var _c, _d;
                    // EMPLACE OBJECT
                    var _e = __read(collection.emplace(checker, parent), 2), obj = _e[0], newbie = _e[1];
                    ArrayUtil_1.ArrayUtil.add(obj.nullables, nullable, function (elem) { return elem === nullable; });
                    if (newbie === false)
                        return obj;
                    // PREPARE ASSETS
                    var isClass = parent.isClass();
                    var isProperty = significant(!!options.functional);
                    var pred = isClass
                        ? function (node) {
                            var _a, _b;
                            var kind = (_b = (_a = node
                                .getChildren()[0]) === null || _a === void 0 ? void 0 : _a.getChildren()[0]) === null || _b === void 0 ? void 0 : _b.kind;
                            return (kind !== typescript_1.default.SyntaxKind.PrivateKeyword &&
                                kind !== typescript_1.default.SyntaxKind.ProtectedKeyword &&
                                isProperty(node));
                        }
                        : function (node) { return isProperty(node); };
                    var insert = function (key) {
                        return function (value) {
                            return function (symbol, filter) {
                                var _a, _b;
                                // COMMENTS AND TAGS
                                var description = symbol
                                    ? ((_a = CommentFactory_1.CommentFactory.description(symbol)) !== null && _a !== void 0 ? _a : null)
                                    : null;
                                var jsDocTags = ((_b = symbol === null || symbol === void 0 ? void 0 : symbol.getJsDocTags()) !== null && _b !== void 0 ? _b : []).filter(filter !== null && filter !== void 0 ? filter : (function () { return true; }));
                                // THE PROPERTY
                                var property = MetadataProperty_1.MetadataProperty.create({
                                    key: key,
                                    value: value,
                                    description: description,
                                    jsDocTags: jsDocTags,
                                });
                                obj.properties.push(property);
                                return property;
                            };
                        };
                    };
                    var _loop_1 = function (prop) {
                        // CHECK INTERNAL TAG
                        if (((_c = prop.getJsDocTags(checker)) !== null && _c !== void 0 ? _c : []).find(function (tag) { return tag.name === "internal"; }) !== undefined)
                            return "continue";
                        // CHECK NODE IS A FORMAL PROPERTY
                        var _k = __read((function () {
                            var _a;
                            var node = (_a = prop.getDeclarations()) === null || _a === void 0 ? void 0 : _a[0];
                            var type = node
                                ? checker.getTypeOfSymbolAtLocation(prop, node)
                                : checker.getTypeOfPropertyOfType(parent, prop.name);
                            return [node, type];
                        })(), 2), node = _k[0], type = _k[1];
                        if ((node && pred(node) === false) || type === undefined)
                            return "continue";
                        // GET EXACT TYPE
                        var key = MetadataHelper_1.MetadataHelper.literal_to_metadata(prop.name);
                        var value = (0, explore_metadata_1.explore_metadata)(checker)(options)(collection)(errors)(type, {
                            top: false,
                            object: obj,
                            property: prop.name,
                            parameter: null,
                            nested: null,
                            aliased: false,
                            escaped: false,
                            output: false,
                        });
                        (0, Writable_1.Writable)(value).optional = (prop.flags & typescript_1.default.SymbolFlags.Optional) !== 0;
                        insert(key)(value)(prop);
                    };
                    try {
                        //----
                        // REGULAR PROPERTIES
                        //----
                        for (var _f = __values(parent.getApparentProperties()), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var prop = _g.value;
                            _loop_1(prop);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    try {
                        //----
                        // DYNAMIC PROPERTIES
                        //----
                        for (var _h = __values(checker.getIndexInfosOfType(parent)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var index = _j.value;
                            // GET EXACT TYPE
                            var analyzer = function (type) { return function (property) {
                                return (0, explore_metadata_1.explore_metadata)(checker)(options)(collection)(errors)(type, {
                                    top: false,
                                    object: obj,
                                    property: property,
                                    parameter: null,
                                    nested: null,
                                    aliased: false,
                                    escaped: false,
                                    output: false,
                                });
                            }; };
                            var key = analyzer(index.keyType)(null);
                            var value = analyzer(index.type)({});
                            if (key.atomics.length +
                                key.constants.map(function (c) { return c.values.length; }).reduce(function (a, b) { return a + b; }, 0) +
                                key.templates.length +
                                key.natives.filter(function (type) {
                                    return type === "Boolean" ||
                                        type === "BigInt" ||
                                        type === "Number" ||
                                        type === "String";
                                }).length !==
                                key.size())
                                errors.push({
                                    name: key.getName(),
                                    explore: {
                                        top: false,
                                        object: obj,
                                        property: "[key]",
                                        parameter: null,
                                        nested: null,
                                        aliased: false,
                                        escaped: false,
                                        output: false,
                                    },
                                    messages: [],
                                });
                            // INSERT WITH REQUIRED CONFIGURATION
                            insert(key)(value)(((_d = index.declaration) === null || _d === void 0 ? void 0 : _d.parent)
                                ? checker.getSymbolAtLocation(index.declaration.parent)
                                : undefined, function (doc) { return doc.name !== "default"; });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return obj;
                };
            };
        };
    };
};
exports.emplace_metadata_object = emplace_metadata_object;
var significant = function (functional) {
    return functional
        ? function (node) { return !typescript_1.default.isAccessor(node); }
        : function (node) {
            return typescript_1.default.isParameter(node) ||
                typescript_1.default.isPropertyDeclaration(node) ||
                typescript_1.default.isPropertyAssignment(node) ||
                typescript_1.default.isPropertySignature(node) ||
                typescript_1.default.isTypeLiteralNode(node) ||
                typescript_1.default.isShorthandPropertyAssignment(node);
        };
};
var iterate_optional_coalesce = function (meta, type) {
    if (type.isUnionOrIntersection())
        type.types.forEach(function (child) { return iterate_optional_coalesce(meta, child); });
    else
        (0, iterate_metadata_coalesce_1.iterate_metadata_coalesce)(meta, type);
};
//# sourceMappingURL=emplace_metadata_object.js.map