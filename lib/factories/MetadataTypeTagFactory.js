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
exports.MetadataTypeTagFactory = void 0;
var MetadataTypeTagSchemaFactory_1 = require("./MetadataTypeTagSchemaFactory");
var MetadataTypeTagFactory;
(function (MetadataTypeTagFactory) {
    MetadataTypeTagFactory.analyze = function (errors) {
        return function (type) {
            return function (objects, explore) {
                var e_1, _a;
                var messages = [];
                var report = function (property) {
                    return function (msg) {
                        messages.push("the property ".concat(property === null ? "[\"typia.tag\"]" : "[\"typia.tag.".concat(property, "\"]"), " ").concat(msg, "."));
                        return false;
                    };
                };
                //----
                // VALIDATION PROCESS
                //----
                var filtered = objects.filter(function (obj) {
                    // ONLY ONE PROPERTY
                    if (obj.properties.length !== 1)
                        return false;
                    // THE TAG.TYPE PROPERTY MUST BE
                    var top = obj.properties[0];
                    if (top.key.getSoleLiteral() !== "typia.tag" ||
                        top.value.size() !== 1 ||
                        top.value.objects.length !== 1)
                        return false;
                    else if (top.value.optional === false)
                        return report(null)("must be optional object");
                    // CHECK LIST OF PROPERTIES
                    var tag = top.value.objects[0];
                    var statics = tag.properties
                        .map(function (p) { return p.key.getSoleLiteral(); })
                        .filter(function (str) { return str !== null; });
                    if (ESSENTIAL_FIELDS.some(function (f) { return !statics.includes(f); }))
                        return report(null)("must have at least three properties - ".concat(ESSENTIAL_FIELDS.map(function (str) { return "'".concat(str, "'"); }).join(", ")));
                    var each = tag.properties.map(function (p) {
                        var key = p.key.getSoleLiteral();
                        if (key === null)
                            return true;
                        else if (FIELDS.includes(key) === false)
                            return true;
                        return validate_property(report)(key, p.value);
                    });
                    return each.every(function (v) { return v === true; });
                });
                if (filtered.length === 0)
                    return [];
                //----
                // CONSTRUCT TYPE TAGS
                //----
                // CREATE 1ST
                var tagList = filtered.map(create_metadata_type_tag(report));
                var output = [];
                try {
                    for (var tagList_1 = __values(tagList), tagList_1_1 = tagList_1.next(); !tagList_1_1.done; tagList_1_1 = tagList_1.next()) {
                        var tag = tagList_1_1.value;
                        if (tag !== null)
                            output.push({
                                target: tag.target.some(function (str) { return str === type; }) ? type : null,
                                name: tag.name,
                                kind: tag.kind,
                                value: tag.value,
                                validate: tag.validate[type],
                                exclusive: tag.exclusive,
                                schema: tag.schema,
                            });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (tagList_1_1 && !tagList_1_1.done && (_a = tagList_1.return)) _a.call(tagList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                MetadataTypeTagFactory.validate(report)(type)(output);
                if (messages.length > 0) {
                    errors.push({
                        name: __spreadArray([type], __read(objects.map(function (o) { return o.name; })), false).join(" & "),
                        explore: explore,
                        messages: messages,
                    });
                    return [];
                }
                return output;
            };
        };
    };
    MetadataTypeTagFactory.validate = function (report) {
        return function (type) {
            return function (tagList) {
                var e_2, _a;
                var success = true;
                try {
                    for (var tagList_2 = __values(tagList), tagList_2_1 = tagList_2.next(); !tagList_2_1.done; tagList_2_1 = tagList_2.next()) {
                        var tag = tagList_2_1.value;
                        if (tag.target !== type) {
                            success && (success = report(null)("target must constains ".concat(type, " type")));
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (tagList_2_1 && !tagList_2_1.done && (_a = tagList_2.return)) _a.call(tagList_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                tagList.forEach(function (tag, i) {
                    if (tag.exclusive === false)
                        return;
                    else if (tag.exclusive === true) {
                        var some = tagList.some(function (opposite, j) { return i !== j && opposite.kind === tag.kind; });
                        if (some === true)
                            success && (success = report(null)("kind '".concat(tag.kind, "' can't be duplicated")));
                    }
                    else if (Array.isArray(tag.exclusive)) {
                        var some = tagList.find(function (opposite, j) {
                            return i !== j &&
                                opposite.kind === tag.kind &&
                                tag.exclusive.includes(opposite.name);
                        });
                        if (some !== undefined)
                            success !== null && success !== void 0 ? success : (success = report(null)("kind '".concat(tag.kind, "' can't be used with '").concat(some.name, "'")));
                    }
                });
                return success;
            };
        };
    };
    var validate_property = function (report) {
        return function (key, value) {
            var _a;
            if (
            // TARGET
            key === "target" &&
                (value.constants.length !== 1 ||
                    value.constants[0].values.length !== value.size() ||
                    value.constants[0].values.some(function (v) {
                        return v.value !== "boolean" &&
                            v.value !== "bigint" &&
                            v.value !== "number" &&
                            v.value !== "string" &&
                            v.value !== "array";
                    })))
                return report(key)("must be one of 'boolean', 'bigint', 'number', 'string', 'array'");
            else if (
            // KIND
            key === "kind" &&
                (value.size() !== 1 ||
                    value.constants.length !== 1 ||
                    value.constants[0].type !== "string" ||
                    value.constants[0].values.length !== 1))
                return report(key)("must be a string literal type");
            else if (
            // VALUE
            key === "value" &&
                (value.size() > 1 ||
                    (value.size() !== 0 &&
                        (value.constants.length !== 1 ||
                            value.constants[0].values.length !== 1))))
                return report(key)("must be a constant literal type or undefined value");
            else if (key === "exclusive")
                return get_exclusive(report)(key)(value) !== null;
            else if (key === "validate") {
                //----
                // VALIDATE
                //----
                // UNDEFINED CASE
                if (value.size() === 0 &&
                    value.isRequired() === false &&
                    value.nullable === false)
                    return true;
                // STRING CASE
                if (value.size() === 1 &&
                    value.constants.length === 1 &&
                    value.constants[0].type === "string" &&
                    (value.constants[0].values.length === 1) === true)
                    return true;
                // RECORD<TARGET, STRING>
                var target_1 = (_a = value.objects[0]) === null || _a === void 0 ? void 0 : _a.properties.map(function (p) { return p.key.getSoleLiteral(); }).filter(function (str) { return str !== null; });
                if (target_1 === undefined)
                    return report("target")("must be one of 'boolean', 'bigint', 'number', 'string', 'array'");
                var variadic = value.size() === 1 &&
                    value.objects.length === 1 &&
                    value.objects[0].properties.every(function (vp) {
                        return vp.value.size() === 1 &&
                            vp.value.isRequired() &&
                            vp.value.nullable === false &&
                            vp.value.constants.length === 1 &&
                            vp.value.constants[0].type === "string" &&
                            vp.value.constants[0].values.length === 1 &&
                            target_1.includes(vp.key.getSoleLiteral());
                    });
                if (variadic === false)
                    return report(key)("must be a string literal type or Record<Target, string> type.");
            }
            return true;
        };
    };
    var create_metadata_type_tag = function (report) {
        return function (obj) {
            var _a, _b, _c;
            var find = function (key) {
                var _a, _b;
                return (_b = (_a = obj.properties[0]) === null || _a === void 0 ? void 0 : _a.value.objects[0]) === null || _b === void 0 ? void 0 : _b.properties.find(function (p) { return p.key.getSoleLiteral() === key; });
            };
            var target = find("target").value.constants[0].values.map(function (v) { return v.value; });
            var kind = find("kind").value.constants[0].values[0]
                .value;
            var value = (_b = (_a = find("value")) === null || _a === void 0 ? void 0 : _a.value.constants[0]) === null || _b === void 0 ? void 0 : _b.values[0].value;
            var exclusive = get_exclusive(report)("exclusive")((_c = find("exclusive")) === null || _c === void 0 ? void 0 : _c.value);
            if (exclusive === null)
                return null;
            var validate = (function () {
                var _a;
                var validate = (_a = find("validate")) === null || _a === void 0 ? void 0 : _a.value;
                if (!validate || validate.size() === 0)
                    return {};
                else if (validate.constants.length)
                    return Object.fromEntries(target.map(function (t) { return [
                        t,
                        validate.constants[0].values[0].value,
                    ]; }));
                return Object.fromEntries(validate.objects[0].properties.map(function (p) { return [
                    p.key.getSoleLiteral(),
                    p.value.constants[0].values[0].value,
                ]; }));
            })();
            var schema = (function () {
                var _a;
                var p = (_a = find("schema")) === null || _a === void 0 ? void 0 : _a.value;
                if (p === undefined)
                    return undefined;
                else if (p.size() === 0 && p.isRequired() === false)
                    return undefined;
                else if (p.size() === 1 &&
                    p.nullable === false &&
                    p.isRequired() === true &&
                    p.any === false)
                    return MetadataTypeTagSchemaFactory_1.MetadataTypeTagSchemaFactory.object(function (msg) {
                        return report("schema")(msg);
                    })(p.objects[0]);
                report("schema")("must be an object type");
                return undefined;
            })();
            return {
                name: obj.name,
                target: target,
                kind: kind,
                value: value,
                validate: validate,
                exclusive: exclusive !== null && exclusive !== void 0 ? exclusive : false,
                schema: schema,
            };
        };
    };
    var get_exclusive = function (report) {
        return function (key) {
            return function (value) {
                if (value === undefined)
                    return false;
                else if (value.size() === 1 &&
                    value.constants.length === 1 &&
                    value.constants[0].type === "boolean" &&
                    value.constants[0].values.length === 1)
                    return value.constants[0].values[0].value;
                else if (value.size() === 1 &&
                    value.tuples.length === 1 &&
                    value.tuples[0].type.elements.every(function (elem) {
                        return elem.size() === 1 &&
                            elem.constants.length === 1 &&
                            elem.constants[0].type === "string" &&
                            elem.constants[0].values.length === 1;
                    }))
                    return value.tuples[0].type.elements.map(function (elem) { return elem.constants[0].values[0].value; });
                report(key)("must a boolean literal type or a tuple of string literal types.");
                return null;
            };
        };
    };
})(MetadataTypeTagFactory || (exports.MetadataTypeTagFactory = MetadataTypeTagFactory = {}));
var ESSENTIAL_FIELDS = ["target", "kind", "value"];
var FIELDS = __spreadArray(__spreadArray([], __read(ESSENTIAL_FIELDS), false), ["validate", "exclusive"], false);
//# sourceMappingURL=MetadataTypeTagFactory.js.map